import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EventList } from "@/components/EventList";
import { getEvents } from "@/lib/content";

export const revalidate = 300;

export default async function EventsPage() {
  const upcomingEvents = await getEvents();

  return (
    <main className="content-shell single-column">
      <h1>Upcoming</h1>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Upcoming", href: "/events" }]} />

      <p className="result-count">{upcomingEvents.length} events found.</p>

      <section className="events-toolbar" aria-label="Search and views navigation">
        <form className="event-search" action="/events" method="get">
          <label>
            Search
            <input name="keyword" type="search" placeholder="Enter keyword" />
          </label>
          <button type="submit">Find</button>
        </form>
        <div className="view-tabs" aria-label="Views navigation">
          <Link href="/events">List</Link>
          <Link href="/events">Month</Link>
          <Link href="/events">Day</Link>
        </div>
      </section>

      <EventList items={upcomingEvents} />

      <nav className="calendar-links" aria-label="Subscribe to calendar">
        <span>Subscribe to calendar</span>
        <a href="https://www.google.com/calendar" target="_blank" rel="noreferrer">
          Google Calendar
        </a>
        <Link href="/events">iCalendar</Link>
        <Link href="/events">Outlook 365</Link>
        <Link href="/events">Export .ics file</Link>
      </nav>
    </main>
  );
}

