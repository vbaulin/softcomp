import Image from "next/image";
import Link from "next/link";
import type { EventItem } from "@/types/content";
import { formatDate, formatEventRange } from "@/lib/date";

function dayLabel(date: string) {
  return new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric" }).format(new Date(date));
}

export function EventList({ items, compact = false }: { items: EventItem[]; compact?: boolean }) {
  return (
    <div className={compact ? "event-list compact" : "event-list"}>
      {items.map((event) => (
        <article className={event.imageUrl && !compact ? "event-item has-image" : "event-item"} key={event.slug}>
          <div className="event-date">
            <span>{dayLabel(event.startsAt).split(" ")[0]}</span>
            <strong>{dayLabel(event.startsAt).split(" ")[1]}</strong>
          </div>
          {event.imageUrl && !compact ? (
            <div className="event-image">
              <Image src={event.imageUrl} alt={event.imageAlt ?? ""} fill sizes="120px" />
            </div>
          ) : null}
          <div>
            <p className="date-line">{formatEventRange(event.startsAt, event.endsAt)}</p>
            <h3>
              <Link href={`/events/${event.slug}`}>{event.title}</Link>
            </h3>
            {event.venue ? <p className="venue">{event.venue}</p> : null}
            <p>{event.excerpt}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export function MonthHeading({ date }: { date: string }) {
  return <h3 className="month-heading">{formatDate(date).replace(/^\d+ /, "")}</h3>;
}
