/**
 * Curated public data about ultimate frisbee, for the data-exploration essay.
 * Every figure is hand-entered from a public source (cited per block). The sets
 * are intentionally small — the point of the page is to survey *what exists*,
 * not to mirror an entire database — so charts render from local data with no
 * runtime network calls.
 */

export interface SportChange {
  sport: string;
  /** core-participant % change, 2022 → 2023 */
  pct: number;
}
// source: SGB Media / SFIA 2024 U.S. Trends in Team Sports Report
// https://sgbonline.com/exec-ten-takeaways-from-sfias-2024-team-sports-report/
export const CORE_CHANGE_2023: SportChange[] = [
  { sport: 'Ultimate', pct: -20.0 },
  { sport: 'Wrestling', pct: -9.0 },
  { sport: 'Rugby', pct: -5.9 },
  { sport: 'Tackle football', pct: 1.0 },
  { sport: 'Basketball', pct: 1.1 },
  { sport: 'Baseball', pct: 2.0 },
  { sport: 'Indoor soccer', pct: 6.2 },
];

export interface SportSize {
  sport: string;
  /** U.S. participants, millions */
  millions: number;
  note?: string;
}
// source: SFIA 2024 Topline / single-sport reports (tennis figure is 2023)
// https://sfia.org/resources/sfias-topline-participation-report-shows-247-1-million-americans-were-active-in-2024/
export const US_PARTICIPATION: SportSize[] = [
  { sport: 'Basketball', millions: 29.7 },
  { sport: 'Tennis', millions: 23.8, note: '2023' },
  { sport: 'Pickleball', millions: 19.8 },
  { sport: 'Baseball', millions: 16.7 },
  { sport: 'Outdoor soccer', millions: 14.1 },
  { sport: 'Ultimate', millions: 1.68 },
];

export interface GrowthPoint {
  year: number;
  countries: number;
}
// source: World Flying Disc Federation (member associations) — WFDF / Wikipedia
// https://en.wikipedia.org/wiki/World_Flying_Disc_Federation
export const WFDF_MEMBER_COUNTRIES: GrowthPoint[] = [
  { year: 2010, countries: 53 },
  { year: 2025, countries: 126 },
];
export const WFDF_ACTIVE_PLAYER_GROWTH = '+12.6%'; // active players, 2023 → 2024 (WFDF 2024 Census)

export interface Tile {
  value: string;
  label: string;
  tone?: 'down' | 'up' | 'neutral';
}
// source: SFIA via Ultiworld — "Ultimate Participation Down 40% Since 2020"
// https://ultiworld.com/2026/04/22/ultimate-participation-down-40-since-2020-according-to-industry-report/
export const DECLINE_TILES: Tile[] = [
  { value: '502K', label: 'U.S. core players in 2025', tone: 'neutral' },
  { value: '−40%', label: 'core players since 2020', tone: 'down' },
  { value: '#1', label: 'steepest-declining U.S. team sport', tone: 'down' },
  { value: '2.05M → 1.68M', label: 'total U.S. players, 2024 → 2025', tone: 'down' },
];

// Spirit of the Game — the five categories scored 0–4 each (0–20 total).
// source: WFDF Spirit of the Game rules & scoring
// https://wfdf.sport/spirit-of-the-game/sotg-rules-scoring/
export const SPIRIT_CATEGORIES = [
  'Rules Knowledge & Use',
  'Fouls & Body Contact',
  'Fair-Mindedness',
  'Positive Attitude & Self-Control',
  'Communication',
];
export const SPIRIT_TYPICAL = 10; // ~10 / 20 is a normal game average, even at Worlds

export interface Source {
  name: string;
  what: string;
  grain: string;
  access: 'free' | 'paid' | 'open source';
  url: string;
}
export const DATA_SOURCES: Source[] = [
  {
    name: 'UFA Almanac',
    what: 'Every player, team & game in pro (UFA/AUDL) history, 2012–present',
    grain: 'per-game box scores, career leaders',
    access: 'free',
    url: 'https://www.ufaalmanac.com/',
  },
  {
    name: 'WatchUFA Stats',
    what: 'Official pro-league player, team & league stats',
    grain: 'per-game / per-season',
    access: 'free',
    url: 'https://watchufa.com/stats/player-stats',
  },
  {
    name: 'WFDF Annual Census',
    what: 'Active players per country, per discipline, worldwide',
    grain: 'national aggregates, yearly',
    access: 'free',
    url: 'https://wfdf.sport/wp-content/uploads/2024/09/WFDF-2024-Annual-Census-Report.pdf',
  },
  {
    name: 'SFIA Team Sports Report',
    what: 'U.S. participation by sport (core vs casual), incl. ultimate',
    grain: 'annual national survey',
    access: 'paid',
    url: 'https://sfia.org/resources/',
  },
  {
    name: 'USA Ultimate',
    what: 'Club/college/youth scores, rankings & membership',
    grain: 'event & team level',
    access: 'free',
    url: 'https://usaultimate.org/',
  },
  {
    name: 'SCORE Network',
    what: '2024 College Championship statistics, classroom-ready',
    grain: 'clean tabular game data',
    access: 'free',
    url: 'https://data.scorenetwork.org/disc_sports/ultimate_college_championship-2024.html',
  },
  {
    name: 'fRisbee (R package)',
    what: 'College & club rankings + 5,400+ game results',
    grain: 'game-level',
    access: 'open source',
    url: 'https://github.com/bbwieland/fRisbee',
  },
  {
    name: 'UltiAnalytics Pull',
    what: 'Cleaned per-possession data — your own team, plus pro AUDL/PUL',
    grain: 'per-throw / per-possession',
    access: 'open source',
    url: 'https://github.com/dfiorino/ultianalyticspull',
  },
  {
    name: 'WFDF Spirit Scores',
    what: "Opponents' 0–20 sportsmanship ratings at world events",
    grain: 'per-game, per-team',
    access: 'free',
    url: 'https://wfdf.sport/spirit-of-the-game/sotg-rules-scoring/',
  },
];

export const DATA_GAPS = [
  'What % of calls are contested or overturned — nobody publishes this; it would have to be hand-charted from film.',
  'Layouts as a labeled event — pro stats log "blocks," never the dive itself.',
  'Clean state-by-state U.S. participation — USA Ultimate does not release it.',
  'Granular women’s-pro (WUL / PUL) play-by-play — far thinner than the men’s UFA data.',
];
