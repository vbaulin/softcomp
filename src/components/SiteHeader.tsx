import Link from "next/link";
import type { NavItem } from "@/types/content";
import { siteMeta } from "@/lib/fallback-content";

function NavList({ items }: { items: NavItem[] }) {
  return (
    <ul className="nav-list">
      {items.map((item) => (
        <li key={item.id} className={item.children?.length ? "nav-item has-children" : "nav-item"}>
          <Link href={item.href}>{item.label}</Link>
          {item.children?.length ? (
            <ul className="sub-menu">
              {item.children.map((child) => (
                <li key={child.id}>
                  <Link href={child.href}>{child.label}</Link>
                </li>
              ))}
            </ul>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

export function SiteHeader({ navigation }: { navigation: NavItem[] }) {
  return (
    <header className="site-header">
      <div className="header-shell">
        <Link href="/" className="brand" aria-label="SoftComp home">
          <img src={siteMeta.logoUrl} alt="SoftComp" width={238} height={54} />
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          <NavList items={navigation} />
        </nav>

        <details className="mobile-nav">
          <summary>Menu</summary>
          <NavList items={navigation} />
        </details>
      </div>
    </header>
  );
}
