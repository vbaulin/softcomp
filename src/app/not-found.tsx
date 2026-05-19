import Link from "next/link";

export default function NotFound() {
  return (
    <main className="content-shell single-column not-found">
      <h1>Page not found</h1>
      <p>The requested SoftComp page is not available in the migrated content yet.</p>
      <Link className="text-link" href="/">
        Return home
      </Link>
    </main>
  );
}

