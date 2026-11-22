// JSON-LD helpers. BaseLayout always emits Organization + WebSite (+ BreadcrumbList on
// inner pages); pages add their own nodes through the layout's `schema` prop.
import type { CollectionEntry } from 'astro:content';
import { SITE } from '../config';
import { isOnlineEvent } from './events';

export const OG_IMAGE = '/images/og-card.png';
export const LOGO = '/images/logo-520.png';

export const abs = (p: string) => new URL(p, SITE.url).href;

// Event dates are naive UK wall-clock strings (e.g. 2026-10-15T18:00:00) that Astro parses
// as UTC. Re-emit the same wall-clock time with the Europe/London offset for that date:
// +01:00 in BST, +00:00 in GMT. Midnight means "date only" (e.g. the summit), so emit a date.
// ponytail: the offset is read at the wall-clock instant, which is only wrong inside the
// one-hour DST switch window at 01:00 on a Sunday morning; no meetup starts then.
export function londonIso(d: Date): string {
  const iso = d.toISOString();
  if (d.getUTCHours() === 0 && d.getUTCMinutes() === 0) return iso.slice(0, 10);
  const tz = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', timeZoneName: 'longOffset' })
    .formatToParts(d)
    .find((p) => p.type === 'timeZoneName')!.value; // "GMT" or "GMT+01:00"
  return `${iso.slice(0, 19)}${tz === 'GMT' ? '+00:00' : tz.slice(3)}`;
}

const orgId = `${SITE.url}/#organization`;
export const orgRef = { '@id': orgId };

const venuePlace = () => {
  const { name, latitude, longitude, ...address } = SITE.venue;
  return {
    '@type': 'Place',
    name,
    address: { '@type': 'PostalAddress', ...address },
    geo: { '@type': 'GeoCoordinates', latitude, longitude },
  };
};

export const organizationNode = {
  '@type': 'Organization',
  '@id': orgId,
  name: SITE.name,
  alternateName: SITE.shortName,
  url: `${SITE.url}/`,
  logo: abs(LOGO),
  description: SITE.tagline,
  foundingDate: String(SITE.founded),
  location: venuePlace(),
  email: SITE.email,
  sameAs: [SITE.linkedin, SITE.meetup],
  // `founder` left out on purpose: two pages disagree on who founded the group.
};

export const websiteNode = {
  '@type': 'WebSite',
  '@id': `${SITE.url}/#website`,
  url: `${SITE.url}/`,
  name: SITE.name,
  inLanguage: 'en-GB',
  publisher: orgRef,
};

export const breadcrumbNode = (crumbs: { name: string; path: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: abs(c.path) })),
});

export const personId = (slug: string) => `${abs(`/speakers/${slug}/`)}#person`;

export function eventNode(
  event: CollectionEntry<'events'>,
  speakers: CollectionEntry<'speakers'>[],
  isPast: boolean,
) {
  const d = event.data;
  const url = abs(`/events/${event.slug}/`);
  const online = isOnlineEvent(event);
  // Meetups are free. The summit page does not say whether it was free, so make no price claim for it.
  const isSummit = event.slug.includes('eoepps');

  // Linked speaker profiles first, then talks whose speaker has no profile.
  const performers: Record<string, unknown>[] = speakers.map((s) => ({
    '@type': 'Person',
    '@id': personId(s.slug),
    name: s.data.name,
    url: abs(`/speakers/${s.slug}/`),
  }));
  const named = new Set(speakers.map((s) => s.data.name));
  for (const s of d.sessions) {
    if (!named.has(s.speaker)) {
      named.add(s.speaker);
      performers.push({ '@type': 'Person', name: s.speaker });
    }
  }

  const location = online
    ? { '@type': 'VirtualLocation', url: d.registrationUrl ?? url }
    : /townshend/i.test(d.venue)
      ? venuePlace()
      : {
          '@type': 'Place',
          name: d.venue,
          address: { '@type': 'PostalAddress', addressLocality: d.location.split(',')[0].trim(), addressCountry: 'GB' },
        };

  return {
    '@type': 'Event',
    '@id': `${url}#event`,
    name: d.title,
    description: d.description,
    url,
    startDate: londonIso(d.date),
    ...(d.endDate && { endDate: londonIso(d.endDate) }),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: online
      ? 'https://schema.org/OnlineEventAttendanceMode'
      : 'https://schema.org/OfflineEventAttendanceMode',
    location,
    image: [abs(OG_IMAGE)],
    ...(!isSummit && {
      isAccessibleForFree: true,
      offers: {
        '@type': 'Offer',
        price: 0,
        priceCurrency: 'GBP',
        ...(d.registrationUrl && { url: d.registrationUrl }),
        ...(!isPast && { availability: 'https://schema.org/InStock' }),
      },
    }),
    organizer: { '@type': 'Organization', '@id': orgId, name: SITE.name, url: `${SITE.url}/` },
    ...(performers.length > 0 && { performer: performers }),
    inLanguage: 'en-GB',
  };
}
