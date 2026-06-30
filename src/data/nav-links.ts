export type NavLinkKey = "goldenLine" | "silverLine" | "driveLine" | "ourStory" | "contact";

export type NavLink = { key: NavLinkKey; href: string };

/**
 * Structural source of truth for nav hrefs. Labels live in the dictionary
 * (src/messages/en.json) since they're translatable UI chrome, not routing
 * structure. Nav.tsx, NavMobile.tsx, and Footer.tsx all read from this one
 * list instead of maintaining their own copies.
 */
export const navLinks: NavLink[] = [
  { key: "goldenLine", href: "/ranges/golden-line/" },
  { key: "silverLine", href: "/ranges/silver-line/" },
  { key: "driveLine", href: "/ranges/drive-line/" },
  { key: "ourStory", href: "/our-story/" },
  { key: "contact", href: "/contact/" },
];
