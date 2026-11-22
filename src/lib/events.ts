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

// Slide decks recorded in speakers' `presentations` front matter.
type Speaker = CollectionEntry<'speakers'>;
export type Deck = { title: string; url: string; speaker: Speaker };
export type DeckGroup = { label: string; date?: Date; event?: Event; decks: Deck[] };

const sameEvent = (p: Speaker['data']['presentations'][number], e: Event) =>
  p.event === e.data.title || (!!p.date && p.date.toISOString().slice(0, 10) === e.data.date.toISOString().slice(0, 10));

export function decksForEvent(event: Event, speakers: Speaker[]): Deck[] {
  return speakers.flatMap((s) =>
    s.data.presentations.filter((p) => sameEvent(p, event)).map((p) => ({ title: p.title, url: p.url, speaker: s })),
  );
}

// Every deck, grouped by event (newest first). Decks that match no event page group under their own `event` label.
export function decksByEvent(events: Event[], speakers: Speaker[]): DeckGroup[] {
  const groups = new Map<string, DeckGroup>();
  for (const s of speakers) {
    for (const p of s.data.presentations) {
      const event = events.find((e) => sameEvent(p, e));
      const key = event?.slug ?? p.event ?? 'Other talks';
      const g = groups.get(key) ?? { label: event?.data.title ?? p.event ?? 'Other talks', date: event?.data.date ?? p.date, event, decks: [] };
      g.decks.push({ title: p.title, url: p.url, speaker: s });
      groups.set(key, g);
    }
  }
  return [...groups.values()].sort((a, b) => (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0));
}
