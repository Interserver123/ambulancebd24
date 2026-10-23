/** Icon path data (24×24, 1.5px stroke). Used by Icon.astro and the inline SVG infographics. */
export type IconName =
  | 'phone' | 'check' | 'whatsapp' | 'pin' | 'chevron-down' | 'arrow-right' | 'clock'
  | 'ambulance' | 'route' | 'receipt' | 'headset' | 'mail' | 'facebook' | 'x' | 'youtube' | 'map'
  | 'heart-pulse' | 'baby' | 'snow' | 'wind' | 'fan' | 'building' | 'star' | 'share' | 'navigation'
  | 'camera' | 'arrow-up' | 'first-aid' | 'external' | 'plane' | 'menu' | 'close';

export const iconPaths: Record<IconName, string> = {
  phone:
    '<path d="M5 4h3.5l1.6 4.2-2.1 1.4a12 12 0 0 0 6.4 6.4l1.4-2.1L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4Z"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  whatsapp:
    '<path d="M4 20l1.2-4.1A8 8 0 1 1 8.4 19L4 20Z"/><path d="M9.2 8.6c.2-.4.5-.4.8-.4h.5c.2 0 .4.1.5.4l.6 1.5c.1.3 0 .5-.2.7l-.4.5c.6 1.1 1.5 2 2.6 2.6l.5-.4c.2-.2.5-.3.7-.2l1.5.6c.3.1.4.3.4.5v.5c0 .3 0 .6-.4.8-.5.3-1.3.5-2.2.2a9 9 0 0 1-5-5c-.3-.9-.1-1.7.1-2.3Z"/>',
  pin: '<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z"/><circle cx="12" cy="10" r="2.3"/>',
  'chevron-down': '<path d="m6 9 6 6 6-6"/>',
  'arrow-right': '<path d="M5 12h14M13 6l6 6-6 6"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  ambulance:
    '<path d="M2.5 16.5V8A1.5 1.5 0 0 1 4 6.5h10v10"/><path d="M14 9.5h3.6l3.4 4v3h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/><path d="M8.5 9v4M6.5 11h4"/>',
  plane: '<path d="M10.5 13.5 4 12l-1-1.5 2-.5 5.5 1L15 6.5a2 2 0 0 1 3 0 2 2 0 0 1 0 3l-4.5 4.5 1 5.5-.5 2-1.5-1-1.5-6.5Z"/>',
  route: '<circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h7a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h7"/>',
  receipt: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z"/><path d="M9 8h6M9 12h6M9 16h3"/>',
  headset:
    '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="13.5" width="4" height="6" rx="1.5"/><rect x="17" y="13.5" width="4" height="6" rx="1.5"/><path d="M19 19.5a3 3 0 0 1-3 2.5h-3"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
  facebook: '<path d="M14.5 8H17V4.5h-2.5A3.5 3.5 0 0 0 11 8v2.5H8.5V14H11v6.5h3.5V14H17l.5-3.5h-3V8.5a.5.5 0 0 1 .5-.5Z"/>',
  x: '<path d="M4 4h4.5L20 20h-4.5L4 4Z"/><path d="m20 4-6.6 7.2M10.6 12.8 4 20"/>',
  youtube: '<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="m10.5 9.5 4.5 2.5-4.5 2.5v-5Z"/>',
  map: '<path d="m9 4.5-5.5 2v13l5.5-2 6 2 5.5-2v-13l-5.5 2-6-2Z"/><path d="M9 4.5v13M15 6.5v13"/>',
  'heart-pulse': '<path d="M20.5 9.5c0 5-8.5 10.5-8.5 10.5S3.5 14.5 3.5 9.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8.5 2.5Z"/><path d="M3.5 12h4l1.5-2.5 2.5 5 1.5-2.5h7.5"/>',
  baby: '<circle cx="12" cy="12" r="8.5"/><path d="M9.5 15a3.5 3.5 0 0 0 5 0"/><path d="M9 10.5h.01M15 10.5h.01"/><path d="M12 3.5c-1.5 1-1.5 2.5 0 3"/>',
  snow: '<path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9"/><path d="m9.5 4.5 2.5 2 2.5-2M9.5 19.5l2.5-2 2.5 2"/>',
  wind: '<path d="M3 8h11a3 3 0 1 0-3-3"/><path d="M3 12h16a3 3 0 1 1-3 3"/><path d="M3 16h7"/>',
  fan: '<rect x="3" y="5" width="18" height="8" rx="2"/><path d="M7 9h10M8 16.5c0 1.5-1 2.5-1 2.5M12 16.5V20M16 16.5c0 1.5 1 2.5 1 2.5"/>',
  building: '<path d="M4.5 20.5V5.5A1.5 1.5 0 0 1 6 4h8a1.5 1.5 0 0 1 1.5 1.5v15"/><path d="M15.5 10H18a1.5 1.5 0 0 1 1.5 1.5v9M3 20.5h18M8 8h4M8 12h4M8 16h4"/>',
  star: '<path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.3-4.1 5.9-.9L12 3.5Z"/>',
  share: '<circle cx="18" cy="5.5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="18.5" r="2.5"/><path d="m8.2 10.8 7.6-4.1M8.2 13.2l7.6 4.1"/>',
  navigation: '<path d="M20 4 4 10.5l7 2.5 2.5 7L20 4Z"/>',
  camera: '<path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2.3l1.5-2h5.4l1.5 2h2.3A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5v-9Z"/><circle cx="12" cy="13" r="3.2"/>',
  'arrow-up': '<path d="M12 19V5M6 11l6-6 6 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  'first-aid': '<rect x="3.5" y="7" width="17" height="12.5" rx="2"/><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M12 10.5v5.5M9.25 13.25h5.5"/>',
  external: '<path d="M14 4h6v6M20 4l-9 9M18 14v4.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10"/>',
};
