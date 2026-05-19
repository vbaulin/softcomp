import Image from "next/image";
import Link from "next/link";
import { siteMeta } from "@/lib/fallback-content";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-shell">
        <p>
          <a href={`mailto:${siteMeta.email}`}>{siteMeta.email}</a> | <Link href="/imprint">Imprint</Link> |{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>
        </p>
        <a className="research-gate" href={siteMeta.researchGateUrl} target="_blank" rel="noreferrer">
          <Image src="https://eu-softcomp.net/wp-content/uploads/2017/01/upload-40x40.png" alt="Research Gate" width={40} height={40} />
        </a>
      </div>
    </footer>
  );
}

