"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { HeroSlide } from "@/types/content";

export function Hero({ slides }: { slides: HeroSlide[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex] ?? slides[0];

  useEffect(() => {
    if (slides.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, [slides.length]);

  if (!activeSlide) {
    return null;
  }

  return (
    <section className="hero" aria-label="SoftComp research areas">
      <article className="hero-card" key={activeSlide.title}>
        <Image src={activeSlide.imageUrl} alt={activeSlide.imageAlt} fill sizes="min(1180px, 100vw)" priority />
        <div className="hero-card-content">
          <p className="hero-kicker">{activeSlide.kicker}</p>
          <h2>{activeSlide.title}</h2>
          <p>{activeSlide.description}</p>
          <Link href={activeSlide.href}>More</Link>
          <small>{activeSlide.credit}</small>
        </div>
      </article>
      <div className="hero-dots">
        {slides.map((slide, index) => (
          <button
            aria-label={`Show ${slide.title}`}
            className={index === activeIndex ? "is-active" : undefined}
            key={`${slide.title}-dot`}
            onClick={() => setActiveIndex(index)}
            type="button"
          />
        ))}
      </div>
    </section>
  );
}
