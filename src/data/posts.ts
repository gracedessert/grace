import type { ComponentType } from "react";
import Restoration from "../pages/posts/Restoration";
import UltimateData from "../pages/posts/UltimateData";
import HappyTravelers from "../pages/posts/HappyTravelers";

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
    slug: "happy-travelers",
    title: "Happy Travelers",
    subtitle: "A morning in a town that begs you to think — and the ravens that answer.",
    date: "2026-07-23",
    kicker: "a poem",
    accent: "#d9922f",
    swatch: ["#eab758", "#2b3a2a"],
    component: HappyTravelers,
  },
  {
    slug: "ultimate-data",
    title: "What We Count About Ultimate",
    subtitle: "A data exploration of the sport I just fell for.",
    date: "2026-07-20",
    kicker: "a data exploration",
    accent: "#3987e5",
    swatch: ["#3987e5", "#101210"],
    component: UltimateData,
  },
  {
    slug: "restoration",
    title: "Restoration",
    subtitle: "",
    date: "2026-07-19",
    kicker: "a poem",
    accent: "#ededed",
    swatch: ["#2a2a2a", "#050505"],
    mono: true,
    component: Restoration,
  },
];

export const getPost = (slug?: string): Post | undefined =>
  posts.find((p) => p.slug === slug);
