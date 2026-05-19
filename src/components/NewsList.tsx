import Image from "next/image";
import Link from "next/link";
import type { NewsPost } from "@/types/content";
import { formatDate } from "@/lib/date";

export function NewsList({ posts, compact = false }: { posts: NewsPost[]; compact?: boolean }) {
  return (
    <div className={compact ? "news-list compact" : "news-list"}>
      {posts.map((post) => (
        <article className="news-item" key={post.slug}>
          {post.imageUrl ? (
            <Link className="news-image" href={`/news/${post.slug}`} aria-label={post.title}>
              <Image src={post.imageUrl} alt={post.imageAlt ?? ""} fill sizes="(max-width: 760px) 100vw, 270px" />
            </Link>
          ) : null}
          <div>
            <p className="date-line">{formatDate(post.publishedAt)}</p>
            <h3>
              <Link href={`/news/${post.slug}`}>{post.title}</Link>
            </h3>
            <p>{post.excerpt}</p>
            <p className="item-meta">
              {post.categoryLabel} <span>Do you like it? {post.likes ?? 0}</span>
            </p>
            <Link className="text-link" href={`/news/${post.slug}`}>
              Read more
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

