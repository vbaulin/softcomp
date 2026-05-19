import Link from "next/link";

export function Breadcrumbs({ items }: { items: Array<{ label: string; href: string }> }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumbs">
      {items.map((item, index) => (
        <span key={`${item.href}-${item.label}`}>
          {index > 0 ? <span className="breadcrumb-separator">/</span> : null}
          <Link href={item.href}>{item.label}</Link>
        </span>
      ))}
    </nav>
  );
}

