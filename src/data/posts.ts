import type { ComponentType } from "react";
import SadPoem from "../pages/posts/SadPoem";

export interface Post {
  /** URL slug, mounted at /essays/:slug */
  slug: string;
  title: string;
  /** short line shown under the title on cards + headers */
  subtitle: string;
  /** publication date, ISO */
  date: string;
  /** reading label, e.g. "a walk" or "3 min" */
  kicker: string;
  /** accent color used on the home index card + progress bar */
  accent: string;
  /** two-stop gradient for the card's preview swatch */
  swatch: [string, string];
  /** whether the card should preview as a dark/mono world */
  mono?: boolean;
  component: ComponentType;
}

/**
 * The single source of truth for essays. The router and the home index both
 * read from here, so adding a new essay is: write the component, add an entry.
 */
export const posts: Post[] = [
  {
    slug: "the-weight-of-quiet",
    title: "The Weight of Quiet",
    subtitle: "A poem, in black and white.",
    date: "2026-02-09",
    kicker: "a poem",
    accent: "#ededed",
    swatch: ["#2a2a2a", "#050505"],
    mono: true,
    component: SadPoem,
  },
];

export const getPost = (slug?: string): Post | undefined =>
  posts.find((p) => p.slug === slug);
