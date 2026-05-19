import Image from "next/image";
import Link from "next/link";
import { EventList } from "@/components/EventList";
import { Hero } from "@/components/Hero";
import { NewsList } from "@/components/NewsList";
import { Sidebar } from "@/components/Sidebar";
import { getEvents, getNewsPosts } from "@/lib/content";
import { features, heroSlides } from "@/lib/fallback-content";

export const revalidate = 300;

export default async function HomePage() {
  const [posts, upcomingEvents] = await Promise.all([getNewsPosts(2), getEvents(5)]);

  return (
    <main>
      <Hero slides={heroSlides} />

      <div className="content-shell home-grid">
        <section className="main-column">
          <div className="section-heading">
            <h1>News</h1>
            <Link href="/news">Read all</Link>
          </div>
          <NewsList posts={posts} compact />

          <section className="feature-row" aria-label="SoftComp overview">
            {features.map((feature) => (
              <article className="feature-card" key={feature.title}>
                <Image src={feature.imageUrl} alt={feature.imageAlt} width={80} height={80} />
                <div>
                  <h2>{feature.title}</h2>
                  <p>{feature.body}</p>
                  <Link className="text-link" href={feature.href}>
                    Read more
                  </Link>
                </div>
              </article>
            ))}
          </section>

          <figure className="wide-image">
            <Image
              src="https://eu-softcomp.net/wp-content/uploads/2017/01/Infrastructure-1024x683.jpg"
              alt="SoftComp infrastructure"
              width={1024}
              height={683}
            />
          </figure>
        </section>

        <aside className="support-column">
          <section className="side-section">
            <h2>Upcoming Events</h2>
            <EventList items={upcomingEvents} compact />
          </section>
          <Sidebar />
        </aside>
      </div>
    </main>
  );
}

