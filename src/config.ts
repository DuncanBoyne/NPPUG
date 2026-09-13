// Central site configuration — update values here, not in individual pages.

export const SITE = {
  name: 'Norfolk Power Platform User Group',
  shortName: 'NPPUG',
  // One-line positioning used in hero, footer, and meta descriptions.
  tagline:
    "Norfolk's Microsoft community. Free monthly meetups in Norwich for everyone working with Power Platform, Power BI, Fabric, Dynamics 365, and Copilot.",
  linkedin: 'https://www.linkedin.com/company/norfolk-power-platform-user-group/',
  sessionize: 'https://sessionize.com/norfolk-power-platform-user-group-IP/',
  eoepps: 'https://eoepps.co.uk/',
  sponsorPack: '/documents/NPPUG Sponsorship pack.pdf',
  founded: 2025,
};

// Proof bar on the homepage. Keep these honest and update them quarterly —
// real numbers are the whole point.
export const STATS = [
  { value: '20+', label: 'attendees at every meetup' },
  { value: 'Free', label: 'every event, always' },
  { value: '385+', label: 'LinkedIn followers' },
  { value: 'EoEPPS', label: 'organisers of the East of England Power Platform Summit' },
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
