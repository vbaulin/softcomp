import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { formatEventRange } from "@/lib/date";
import { events, siteMeta } from "@/lib/fallback-content";
import { getAdjacentFallbackEvents, getEventBySlug } from "@/lib/content";

export const revalidate = 300;

type EventPageProps = {
  params: Promise<{ slug: string }>;
};

function ordinalDay(date: Date) {
  const day = date.getDate();
  const suffix = day % 10 === 1 && day !== 11 ? "st" : day % 10 === 2 && day !== 12 ? "nd" : day % 10 === 3 && day !== 13 ? "rd" : "th";
  return `${day}${suffix}`;
}

function formatSingleEventDate(date: string) {
  const parsed = new Date(date);
  const monthYear = new Intl.DateTimeFormat("en-GB", {
    month: "long",
    year: "numeric"
  }).format(parsed);

  return `${ordinalDay(parsed)} ${monthYear}`;
}

function formatSingleEventRange(startsAt: string, endsAt?: string) {
  if (!endsAt) {
    return formatSingleEventDate(startsAt);
  }
  return `${formatSingleEventDate(startsAt)} - ${formatSingleEventDate(endsAt)}`;
}

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  return {
    title: `${event.title} - SoftComp`,
    description: event.excerpt || siteMeta.description,
    openGraph: {
      title: `${event.title} - SoftComp`,
      description: event.excerpt || siteMeta.description,
      url: `https://eu-softcomp.net/events/${event.slug}/`,
      siteName: "SoftComp",
      type: "article"
    }
  };
}

export default async function EventDetailPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  const { previous, next } = getAdjacentFallbackEvents(slug);

  if (!event) {
    notFound();
  }

  return (
    <main>
      <section className="event-subheader">
        <div className="content-shell event-subheader-inner">
          <h1>{event.title}</h1>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: event.title, href: `/events/${event.slug}` }]} />
        </div>
      </section>

      <section className="content-shell single-column event-detail">
        <p className="event-back">
          <Link href="/events">&laquo; All Events</Link>
        </p>

        <h1 className="tribe-title">{event.title}</h1>
        <div className="tribe-schedule">{formatSingleEventRange(event.startsAt, event.endsAt)}</div>

        <nav className="event-neighbours" aria-label="Event navigation">
          <span>{previous ? <Link href={`/events/${previous.slug}`}>&laquo; {previous.title}</Link> : null}</span>
          <span>{next ? <Link href={`/events/${next.slug}`}>{next.title} &raquo;</Link> : null}</span>
        </nav>

        <article className="event-description">
          {event.contentHtml ? <div dangerouslySetInnerHTML={{ __html: event.contentHtml }} /> : <p>{event.excerpt}</p>}
        </article>

        <nav className="calendar-links event-calendar-links" aria-label="Subscribe to calendar">
          <span>Subscribe to calendar</span>
          <a href="https://www.google.com/calendar" target="_blank" rel="noreferrer">
            Google Calendar
          </a>
          <Link href={`/events/${event.slug}`}>iCalendar</Link>
          <Link href={`/events/${event.slug}`}>Outlook 365</Link>
          <Link href={`/events/${event.slug}`}>Export .ics file</Link>
        </nav>

        <section className="event-meta-grid" aria-label="Event details">
          <div className="event-meta-group">
            <h2>Details</h2>
            <dl>
              <div>
                <dt>Start:</dt>
                <dd>{formatEventRange(event.startsAt)}</dd>
              </div>
              {event.endsAt ? (
                <div>
                  <dt>End:</dt>
                  <dd>{formatEventRange(event.endsAt)}</dd>
                </div>
              ) : null}
              <div>
                <dt>Category:</dt>
                <dd>
                  <Link href="/events/category/events">Events</Link>
                </dd>
              </div>
              {event.websiteUrl ? (
                <div>
                  <dt>Website:</dt>
                  <dd>
                    <a href={event.websiteUrl}>{event.websiteUrl}</a>
                  </dd>
                </div>
              ) : null}
            </dl>
          </div>

          {event.organizer ? (
            <div className="event-meta-group">
              <h2>Organiser</h2>
              <dl>
                <div>
                  <dt>{event.organizer.name}</dt>
                  <dd />
                </div>
                {event.organizer.phone ? (
                  <div>
                    <dt>Phone:</dt>
                    <dd>{event.organizer.phone}</dd>
                  </div>
                ) : null}
                {event.organizer.email ? (
                  <div>
                    <dt>Email:</dt>
                    <dd>
                      <a href={`mailto:${event.organizer.email}`}>{event.organizer.email}</a>
                    </dd>
                  </div>
                ) : null}
                {event.organizer.url ? (
                  <div>
                    <dt>Website:</dt>
                    <dd>
                      <a href={event.organizer.url}>{event.organizer.url}</a>
                    </dd>
                  </div>
                ) : null}
              </dl>
            </div>
          ) : null}
        </section>

        {event.venue ? (
          <section className="event-meta-grid venue-grid" aria-label="Venue">
            <div className="event-meta-group">
              <h2>Venue</h2>
              <p>{event.venue}</p>
              {event.venueAddress ? <address>{event.venueAddress}</address> : null}
              {event.venueAddress ? (
                <a href={`https://maps.google.com/maps?q=${encodeURIComponent(event.venueAddress)}`} target="_blank" rel="noreferrer">
                  + Google Map
                </a>
              ) : null}
            </div>
            <div className="event-map" aria-label="Map placeholder" />
          </section>
        ) : null}

        <nav className="event-neighbours event-footer-nav" aria-label="Event footer navigation">
          <span>{previous ? <Link href={`/events/${previous.slug}`}>&laquo; {previous.title}</Link> : null}</span>
          <span>{next ? <Link href={`/events/${next.slug}`}>{next.title} &raquo;</Link> : null}</span>
        </nav>
      </section>
    </main>
  );
}
