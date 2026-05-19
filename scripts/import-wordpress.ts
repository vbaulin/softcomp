import "dotenv/config";
import mysql from "mysql2/promise";
import { createClient } from "@supabase/supabase-js";

type WpPost = {
  ID: number;
  post_author: number;
  post_date_gmt: Date | string | null;
  post_modified_gmt: Date | string | null;
  post_content: string;
  post_title: string;
  post_excerpt: string;
  post_name: string;
  post_parent: number;
  post_type: "page" | "post" | "tribe_events";
  menu_order: number;
};

type TermRow = {
  post_id: number;
  name: string;
  taxonomy: string;
};

const wordpressDatabaseUrl = process.env.WORDPRESS_DATABASE_URL;
const tablePrefix = process.env.WORDPRESS_TABLE_PREFIX ?? "wp_";
const wordpressPublicUrl = process.env.WORDPRESS_PUBLIC_URL ?? "https://eu-softcomp.net";
const mediaBaseUrl = process.env.NEXT_PUBLIC_MEDIA_BASE_URL;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function requireEnv(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(`${name} is required.`);
  }
  return value;
}

const requiredWordPressDatabaseUrl = requireEnv(wordpressDatabaseUrl, "WORDPRESS_DATABASE_URL");
const requiredSupabaseUrl = requireEnv(supabaseUrl, "NEXT_PUBLIC_SUPABASE_URL");
const requiredSupabaseServiceRoleKey = requireEnv(supabaseServiceRoleKey, "SUPABASE_SERVICE_ROLE_KEY");

const supabase = createClient(requiredSupabaseUrl, requiredSupabaseServiceRoleKey);

function stripTags(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function toIso(value: Date | string | null): string | null {
  if (!value) {
    return null;
  }
  return new Date(value).toISOString();
}

function uploadUrl(file: string | null | undefined): string | undefined {
  if (!file) {
    return undefined;
  }
  if (/^https?:\/\//i.test(file)) {
    return file;
  }
  const cleanFile = file.replace(/^\/+/, "");
  if (mediaBaseUrl) {
    return `${mediaBaseUrl.replace(/\/$/, "")}/${cleanFile}`;
  }
  return `${wordpressPublicUrl.replace(/\/$/, "")}/wp-content/uploads/${cleanFile}`;
}

function rewriteContent(html: string): string {
  const uploadsUrl = `${wordpressPublicUrl.replace(/\/$/, "")}/wp-content/uploads/`;
  const targetUploadsUrl = mediaBaseUrl ? `${mediaBaseUrl.replace(/\/$/, "")}/` : uploadsUrl;

  return html
    .replaceAll('src="/wp-content/uploads/', `src="${targetUploadsUrl}`)
    .replaceAll("src='/wp-content/uploads/", `src='${targetUploadsUrl}`)
    .replaceAll(`src="${uploadsUrl}`, `src="${targetUploadsUrl}`)
    .replaceAll(`href="${uploadsUrl}`, `href="${targetUploadsUrl}`);
}

function pagePath(page: WpPost, pagesById: Map<number, WpPost>): string {
  const parts: string[] = [];
  let cursor: WpPost | undefined = page;

  while (cursor) {
    if (cursor.post_name) {
      parts.unshift(cursor.post_name);
    }
    cursor = cursor.post_parent ? pagesById.get(cursor.post_parent) : undefined;
  }

  return parts.join("/");
}

async function featuredImage(connection: mysql.Connection, postId: number): Promise<string | undefined> {
  const [rows] = await connection.execute<mysql.RowDataPacket[]>(
    `
      select attached.meta_value as file
      from ${tablePrefix}postmeta thumb
      join ${tablePrefix}postmeta attached
        on attached.post_id = cast(thumb.meta_value as unsigned)
       and attached.meta_key = '_wp_attached_file'
      where thumb.post_id = ?
        and thumb.meta_key = '_thumbnail_id'
      limit 1
    `,
    [postId]
  );

  return uploadUrl(rows[0]?.file);
}

async function postMeta(connection: mysql.Connection, postId: number): Promise<Record<string, string>> {
  const [rows] = await connection.execute<mysql.RowDataPacket[]>(
    `select meta_key, meta_value from ${tablePrefix}postmeta where post_id = ?`,
    [postId]
  );

  return Object.fromEntries(rows.map((row) => [String(row.meta_key), String(row.meta_value)]));
}

async function importContent() {
  const connection = await mysql.createConnection(requiredWordPressDatabaseUrl);

  const [postRows] = await connection.execute<mysql.RowDataPacket[]>(
    `
      select ID, post_author, post_date_gmt, post_modified_gmt, post_content, post_title,
             post_excerpt, post_name, post_parent, post_type, menu_order
      from ${tablePrefix}posts
      where post_status = 'publish'
        and post_type in ('page', 'post', 'tribe_events')
      order by post_type, menu_order, post_date_gmt desc
    `
  );

  const posts = postRows as WpPost[];
  const pagesById = new Map(posts.filter((post) => post.post_type === "page").map((post) => [post.ID, post]));
  const postIds = posts.map((post) => post.ID);
  const termsByPost = new Map<number, TermRow[]>();

  if (postIds.length) {
    const [termRows] = await connection.query<mysql.RowDataPacket[]>(
      `
        select tr.object_id as post_id, t.name, tt.taxonomy
        from ${tablePrefix}term_relationships tr
        join ${tablePrefix}term_taxonomy tt on tt.term_taxonomy_id = tr.term_taxonomy_id
        join ${tablePrefix}terms t on t.term_id = tt.term_id
        where tr.object_id in (?)
      `,
      [postIds]
    );

    for (const row of termRows as TermRow[]) {
      const current = termsByPost.get(row.post_id) ?? [];
      current.push(row);
      termsByPost.set(row.post_id, current);
    }
  }

  for (const post of posts) {
    const imageUrl = await featuredImage(connection, post.ID);
    const blocks = [{ type: "html", html: rewriteContent(post.post_content) }];
    const excerpt = post.post_excerpt || stripTags(post.post_content).slice(0, 320);
    const terms = termsByPost.get(post.ID) ?? [];
    const category = terms.find((term) => term.taxonomy === "category")?.name;
    const tags = terms.filter((term) => term.taxonomy === "post_tag").map((term) => term.name);

    if (post.post_type === "page") {
      const slug = pagePath(post, pagesById);
      const { error } = await supabase.from("site_pages").upsert(
        {
          slug,
          title: post.post_title,
          excerpt,
          status: "published",
          breadcrumbs: [
            { label: "Home", href: "/" },
            { label: post.post_title, href: `/${slug}` }
          ],
          content_blocks: blocks,
          wp_id: post.ID,
          wp_modified_at: toIso(post.post_modified_gmt)
        },
        { onConflict: "wp_id" }
      );

      if (error) {
        throw error;
      }
      continue;
    }

    if (post.post_type === "tribe_events") {
      const meta = await postMeta(connection, post.ID);
      const startsAt = meta._EventStartDate ? new Date(meta._EventStartDate).toISOString() : toIso(post.post_date_gmt);
      const endsAt = meta._EventEndDate ? new Date(meta._EventEndDate).toISOString() : startsAt;

      if (!startsAt) {
        continue;
      }

      const { error } = await supabase.from("events").upsert(
        {
          slug: post.post_name,
          title: post.post_title,
          excerpt,
          content_blocks: blocks,
          status: "published",
          starts_at: startsAt,
          ends_at: endsAt,
          venue: meta._EventVenueID ? `WordPress venue ID ${meta._EventVenueID}` : null,
          image_url: imageUrl,
          wp_id: post.ID,
          wp_modified_at: toIso(post.post_modified_gmt)
        },
        { onConflict: "wp_id" }
      );

      if (error) {
        throw error;
      }
      continue;
    }

    const { error } = await supabase.from("posts").upsert(
      {
        slug: post.post_name,
        title: post.post_title,
        excerpt,
        content_blocks: blocks,
        status: "published",
        published_at: toIso(post.post_date_gmt),
        category_label: category,
        tags,
        image_url: imageUrl,
        wp_id: post.ID,
        wp_modified_at: toIso(post.post_modified_gmt)
      },
      { onConflict: "wp_id" }
    );

    if (error) {
      throw error;
    }
  }

  await connection.end();
  console.log(`Imported ${posts.length} WordPress records into Supabase.`);
}

importContent().catch((error) => {
  console.error(error);
  process.exit(1);
});
