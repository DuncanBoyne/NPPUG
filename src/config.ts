// Central site configuration — update values here, not in individual pages.

export const SITE = {
  name: 'Norfolk Power Platform User Group',
  shortName: 'NPPUG',
  // One-line positioning used in hero, footer, and meta descriptions.
  tagline:
    "Norfolk's Microsoft community. Free monthly meetups in Norwich for everyone working with Power Platform, Power BI, Fabric, Dynamics 365, and Copilot.",
  url: 'https://www.nppug.co.uk',
  linkedin: 'https://www.linkedin.com/company/norfolk-power-platform-user-group/',
  meetup: 'https://www.meetup.com/norfolk-power-platform-user-group/',
  // Open call for speakers (open until 9 Sep 2027). The old "-IP" call closed on 31 Aug 2026.
  sessionize: 'https://sessionize.com/norfolk-power-platform-user-group2468/',
  // East of England Summit (formerly the East of England Power Platform Summit, EoEPPS).
  eoes: 'https://www.eoes.co.uk/',
  // Hyphenated copy. The old "NPPUG Sponsorship pack.pdf" stays in public/ so old links still work.
  sponsorPack: '/documents/nppug-sponsorship-pack.pdf',
  founded: 2025,
  // Venue for in-person meetups (from the group's Meetup venue record). Used in structured data.
  venue: {
    name: 'Spaces Digital Hub, Townshend House',
    streetAddress: '30 Crown Road',
    addressLocality: 'Norwich',
    addressRegion: 'Norfolk',
    postalCode: 'NR1 3DT',
    addressCountry: 'GB',
    latitude: 52.628493,
    longitude: 1.298436,
  },
};

// Planned meetup dates (YYYY-MM-DD) shown as a small "Planned for ..." line on the
// homepage and events page. A date hides itself once it has passed or once an event
// page exists for that day, so just add or remove dates here.
export const PLANNED_DATES = ['2027-02-04', '2027-03-04', '2027-04-06', '2027-07-06'];

// Proof bar on the homepage. Keep these honest and update them quarterly —
// real numbers are the whole point.
export const STATS = [
  { value: '20+', label: 'attendees at every meetup' },
  { value: 'Free', label: 'every event, always' },
  { value: '385+', label: 'LinkedIn followers' },
  { value: 'EoES', label: 'organisers of the East of England Summit' },
];

// Newsletter provider form action (e.g. Buttondown, Mailchimp, MailerLite embed
// endpoint). Leave as null until a provider is set up — the signup component
// falls back to LinkedIn + contact links so nothing on the site is broken.
export const NEWSLETTER_FORM_ACTION: string | null = null;

// Photos shown in the homepage "community in action" strip.
// Drop images into public/images/community/ and list them here.
// The section is hidden while this list is empty.
export const COMMUNITY_PHOTOS: { src: string; alt: string }[] = [
  // { src: '/images/community/2026-06-meetup-1.jpg', alt: 'Attendees networking at the June 2026 meetup' },
];
