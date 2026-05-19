import { notFound } from "next/navigation";
import type { EventItem, NavItem, NewsPost, SitePage } from "@/types/content";
import { events, fallbackPages, navItems, newsPosts } from "@/lib/fallback-content";
import { getSupabaseClient } from "@/lib/supabase";

type NavigationRow = {
  id: string;
  parent_id: string | null;
  label: string;
  href: string;
  position: number;
};

function buildNavigation(rows: NavigationRow[]): NavItem[] {
  const sortedRows = [...rows].sort((a, b) => a.position - b.position);
  const byId = new Map<string, NavItem>();
  const roots: NavItem[] = [];

  for (const row of sortedRows) {
    byId.set(row.id, { id: row.id, label: row.label, href: row.href, children: [] });
  }

  for (const row of sortedRows) {
    const item = byId.get(row.id);
    if (!item) {
      continue;
    }

    if (row.parent_id) {
      const parent = byId.get(row.parent_id);
      parent?.children?.push(item);
    } else {
      roots.push(item);
    }
  }

  return roots.map((item) => ({
    ...item,
    children: item.children?.length ? item.children : undefined
  }));
}

export async function getNavigation(): Promise<NavItem[]> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return navItems;
  }

  const { data, error } = await supabase
    .from("navigation_items")
    .select("id,parent_id,label,href,position")
    .order("position", { ascending: true });

  if (error || !data?.length) {
    return navItems;
  }

  return buildNavigation(data as NavigationRow[]);
}

export async function getNewsPosts(limit?: number): Promise<NewsPost[]> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return limit ? newsPosts.slice(0, limit) : newsPosts;
  }

  let query = supabase
    .from("posts")
    .select("slug,title,excerpt,published_at,category_label,image_url,image_alt,likes")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error || !data?.length) {
    return limit ? newsPosts.slice(0, limit) : newsPosts;
  }

  return data.map((row) => ({
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt ?? "",
    publishedAt: row.published_at,
    categoryLabel: row.category_label ?? "News",
    imageUrl: row.image_url ?? undefined,
    imageAlt: row.image_alt ?? undefined,
    likes: row.likes ?? 0
  }));
}

export async function getEvents(limit?: number): Promise<EventItem[]> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return limit ? events.slice(0, limit) : events;
  }

  let query = supabase
    .from("events")
    .select("slug,title,starts_at,ends_at,venue,excerpt,image_url,image_alt")
    .eq("status", "published")
    .order("starts_at", { ascending: true });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error || !data?.length) {
    return limit ? events.slice(0, limit) : events;
  }

  return data.map((row) => ({
    slug: row.slug,
    title: row.title,
    startsAt: row.starts_at,
    endsAt: row.ends_at ?? undefined,
    venue: row.venue ?? undefined,
    excerpt: row.excerpt ?? "",
    imageUrl: row.image_url ?? undefined,
    imageAlt: row.image_alt ?? undefined
  }));
}

export async function getSitePage(slugSegments: string[]): Promise<SitePage> {
  const slug = slugSegments.join("/");
  const fallback = fallbackPages[slug];
  const supabase = getSupabaseClient();

  if (!supabase) {
    if (fallback) {
      return fallback;
    }
    notFound();
  }

  const { data, error } = await supabase
    .from("site_pages")
    .select("slug,title,breadcrumbs,content_blocks")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error || !data) {
    if (fallback) {
      return fallback;
    }
    notFound();
  }

  return {
    slug: data.slug,
    title: data.title,
    breadcrumbs: data.breadcrumbs ?? [
      { label: "Home", href: "/" },
      { label: data.title, href: `/${data.slug}` }
    ],
    blocks: data.content_blocks ?? []
  };
}

