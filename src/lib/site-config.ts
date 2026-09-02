/**
 * Centralized site configuration — single source of truth for contact info,
 * social links, and navigation. Used across Navbar, Footer, Contact, etc.
 */

export const SITE = {
  name: 'Thrive Moyo Spring Foundation',
  shortName: 'Thrive Moyo',
  domain: 'thrivemoyospring.org',
  tagline: '360° of Care for Every Person, Every Community.',
  founded: 2019,

  contact: {
    crisisHotline: '+254 719 288 177',
    crisisHotlineDisplay: '0719 288 177',
    generalEmail: 'info@thrivemoyospring.org',
    partnershipsEmail: 'partnerships@thrivemoyospring.org',
    mediaEmail: 'media@thrivemoyospring.org',
    partnershipsPhone: '+254 719 288 178',
    mediaPhone: '+254 719 288 179',
    mombasaPhone: '+254 719 288 180',
    kisumuPhone: '+254 719 288 181',
    hours: 'Mon–Fri, 8:00 AM – 5:00 PM EAT',
  },

  addresses: {
    nairobi: 'Ngong Road Plaza, Ngong Road, Nairobi, Kenya',
    mombasa: 'Moi Avenue Tower, Moi Avenue, Mombasa, Kenya',
    kisumu: 'Oginga Odinga Street, Suite 4B, Kisumu, Kenya',
  },

  // Map of social platforms → real profile URL (replace placeholders when accounts are created)
  social: [
    { platform: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/thrivemoyospring', icon: 'Facebook' },
    { platform: 'twitter', label: 'Twitter / X', href: 'https://twitter.com/thrivemoyo', icon: 'Twitter' },
    { platform: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/thrivemoyospring', icon: 'Instagram' },
    { platform: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/thrive-moyo-spring-foundation', icon: 'Linkedin' },
    { platform: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@thrivemoyospring', icon: 'Youtube' },
  ],
} as const;

export const EMERGENCY_RESOURCES = [
  { name: 'Kenya Emergency Services', phone: '999', note: 'Police, Ambulance, Fire — nationwide' },
  { name: 'Pan-African Emergency', phone: '112', note: 'Mobile-compatible emergency number' },
  { name: 'Thrive Moyo Crisis Hotline', phone: '+254 719 288 177', note: '24/7 mental health & GBV crisis support' },
  { name: 'NACADA Helpline', phone: '1192', note: 'Substance use & addiction — toll free' },
  { name: 'Befrienders Kenya', phone: '+254 722 178 177', note: 'Suicide prevention & emotional support' },
  { name: 'Gender Violence Recovery Centre (GVRC)', phone: '1195', note: 'GBV response, toll free' },
  { name: 'Childline Kenya', phone: '116', note: 'Child protection — toll free' },
  { name: 'UNHCR Helpline', phone: '+254 20 422 2000', note: 'Refugee protection support' },
] as const;

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Programs', href: '/programs' },
  { label: 'Impact', href: '/impact' },
  { label: 'Partners', href: '/partners' },
  { label: 'Resources', href: '/resources' },
  { label: 'Events', href: '/events' },
  { label: 'Contact', href: '/contact' },
] as const;
