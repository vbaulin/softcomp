export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(date));
}

export function formatEventRange(startsAt: string, endsAt?: string): string {
  const start = formatDate(startsAt);
  if (!endsAt) {
    return start;
  }

  const end = formatDate(endsAt);
  return start === end ? start : `${start} - ${end}`;
}

