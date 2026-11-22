import type { CollectionEntry } from 'astro:content';
import { PLANNED_DATES } from '../config';

type Event = CollectionEntry<'events'>;

// Online vs in person, from the venue/location text (same rule the homepage has always used).
export const isOnlineEvent = (e: Event) => /online|virtual/i.test(`${e.data.venue} ${e.data.location}`);

// Planned dates that have not passed and do not have an event page yet.
// Event dates are naive wall-clock times parsed as UTC, so compare the UTC date part.
export function visiblePlannedDates(events: Event[], now = new Date()): Date[] {
  const taken = new Set(events.map((e) => e.data.date.toISOString().slice(0, 10)));
  return PLANNED_DATES
    .filter((d) => !taken.has(d) && new Date(`${d}T23:59:59Z`) >= now)
    .map((d) => new Date(`${d}T00:00:00Z`));
}
