import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageRenderer } from "@/components/PageRenderer";
import { Sidebar } from "@/components/Sidebar";
import { getSitePage } from "@/lib/content";

export const revalidate = 300;

export default async function DynamicPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const page = await getSitePage(slug);

  return (
    <main className="content-shell page-grid">
      <section className="main-column">
        <h1>{page.title}</h1>
        <Breadcrumbs items={page.breadcrumbs} />
        <PageRenderer blocks={page.blocks} />
      </section>
      <Sidebar />
    </main>
  );
}

