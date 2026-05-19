import Image from "next/image";
import Link from "next/link";
import type { HeroSlide } from "@/types/content";

export function Hero({ slides }: { slides: HeroSlide[] }) {
  return (
    <section className="hero" aria-label="SoftComp research areas">
      {slides.map((slide) => (
        <article className="hero-card" key={slide.title}>
          <Image src={slide.imageUrl} alt={slide.imageAlt} fill sizes="(max-width: 900px) 100vw, 33vw" priority />
          <div className="hero-card-content">
            <p className="hero-kicker">{slide.kicker}</p>
            <h2>{slide.title}</h2>
            <p>{slide.description}</p>
            <Link href={slide.href}>More</Link>
            <small>{slide.credit}</small>
          </div>
        </article>
      ))}
    </section>
  );
}

