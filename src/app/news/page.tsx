import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { NewsList } from "@/components/NewsList";
import { Sidebar } from "@/components/Sidebar";
import { getNewsPosts } from "@/lib/content";

export const revalidate = 300;

const filters = [
  "All",
  "Focus Articles",
  "Scientific Highlights",
  "Scientific Highlights from Network Area 1",
  "Scientific Highlights from Network Area 2",
  "Scientific Highlights from Network Area 4",
  "Uncategorised",
  "Webinars"
];

const tags = [
  "2019",
  "2025",
  "active particles",
  "adhesion",
  "Annual Meeting",
  "artificial cells",
  "condensates",
  "DNA",
  "emulsions",
  "green chemistry",
  "microfluidic chip",
  "phase separation",
  "polymers",
  "Soft Matter",
  "summer school"
];

export default async function NewsPage() {
  const posts = await getNewsPosts();

  return (
    <main className="content-shell page-grid">
      <section className="main-column">
        <h1>News</h1>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "News", href: "/news" }]} />

        <div className="filter-panel">
          <p>Filter by</p>
          <div className="filter-group">
            {filters.map((filter) => (
              <Link key={filter} href="/news">
                {filter}
              </Link>
            ))}
          </div>
          <div className="tag-cloud">
            {tags.map((tag) => (
              <Link key={tag} href="/news">
                {tag}
              </Link>
            ))}
          </div>
        </div>

        <NewsList posts={posts} />

        <nav className="pagination" aria-label="Pagination">
          {Array.from({ length: 13 }, (_, index) => (
            <Link key={index + 1} href="/news">
              {index + 1}
            </Link>
          ))}
          <Link href="/news">Next page</Link>
        </nav>
      </section>

      <Sidebar />
    </main>
  );
}

