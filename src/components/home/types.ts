export type NavLink = { label: string; path: string };

/** Links the homepage may show. Each holds only pages that exist in this build. */
export type HomeNav = {
  services: NavLink[];
  areas: NavLink[];
  districts: NavLink[];
  freezer?: string;
  contact?: string;
  about?: string;
  blog?: string;
  bangla?: string;
};
