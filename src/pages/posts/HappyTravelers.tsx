import GrainOverlay from "../../components/art/GrainOverlay";
import Scrollytelling from "../../components/scrolly/Scrollytelling";
import Reveal from "../../components/scrolly/Reveal";
import Footer from "../../components/layout/Footer";
import "./happy-travelers.css";

/**
 * Each stanza is one scroll step. `img` is the picture that pins in the sticky
 * stage while the stanza reads; it's empty for now, so a blank framed slot
 * shows instead. Drop a URL in later (or import from `../../data/media`) and the
 * frame fills automatically — nothing else needs to change. `slot` is a short
 * hint for where each image belongs while the frames are still blank.
 */
interface Stanza {
  lines: string[];
  img?: string;
  slot: string;
  /** which mood the sticky stage wears: warm pasture → cold storm */
  mood: "dawn" | "meadow" | "town" | "restless" | "ravens" | "rain";
}

const STANZAS: Stanza[] = [
  {
    mood: "dawn",
    slot: "waking — soft light, a horse in the field",
    lines: [
      "breeze, sweet as a mother's hug.",
      "the voices of my family drift up in my soft slumber.",
      "i wake to the dark horse still standing and a black bird, came up to say hello",
    ],
  },
  {
    mood: "meadow",
    slot: "the only words — horse, bird, honeybee",
    lines: [
      "these are the only words i've got— dark horse, black bird, the fluffy kind of honeybee",
      "i'm sure my sister would know",
    ],
  },
  {
    mood: "town",
    slot: "the town — cottages, someone else's finished work",
    lines: [
      "i'm sure many sat here before and actually did something, composed lullabies, mysteries, essays with depth and any kind of conviction",
      "i'm sure many finished novels, biked hundreds of miles, because this town is begging you to think, us to listen",
    ],
  },
  {
    mood: "restless",
    slot: "too much time — grass, flowers along the shoreline",
    lines: [
      "in between pleasant pastures and quaint cottages all i think is there is too much time.",
      "and too many projects i'd like to will myself to write.",
      "too many anxieties i'd like to burn from my brain.",
      "too many tears i need to cry for no reason, before this soft grass, sweet hum, yellow flowers painted along the shoreline can speak to me.",
    ],
  },
  {
    mood: "ravens",
    slot: "the turn — a thousand ravens leaving the trees",
    lines: [
      "tonight, when i've finally released my tears, a thousand ravens emerge from the trees",
      "they scream, and the happy travelers cover their ears.",
    ],
  },
  {
    mood: "rain",
    slot: "the ravens speak — rocky cliffs, deep water, rain",
    lines: [
      "“did you not believe?",
      "you must not be healed to listen.",
      "you thought we could not hear?",
      "this town is more rocky cliffs than sunsets, more deep waters than shore.",
      "we love the rain, my dear.”",
    ],
  },
];

export default function HappyTravelers() {
  const steps = STANZAS.map((stanza, i) => (
    <div key={i} className="travelers__stanza">
      {stanza.lines.map((line, j) => (
        <Reveal as="p" key={j} delay={j * 0.12} y={16} className="travelers__line">
          {line}
        </Reveal>
      ))}
    </div>
  ));

  return (
    <div className="travelers">
      {/* title */}
      <header className="travelers__title-card">
        <p className="travelers__kicker">a poem</p>
        <h1 className="travelers__title">happy travelers</h1>
        <div className="travelers__rule" />
      </header>

      <Scrollytelling
        className="travelers__scrolly"
        align="right"
        renderSticky={(active) => {
          const stanza = STANZAS[active] ?? STANZAS[0];
          return (
            <div className={`travelers__stage travelers__stage--${stanza.mood}`}>
              <div className="travelers__frame">
                {stanza.img ? (
                  <img className="travelers__frame-img" src={stanza.img} alt="" />
                ) : (
                  /* blank space for a picture, added later */
                  <div className="travelers__frame-blank">
                    <span className="travelers__frame-hint">{stanza.slot}</span>
                  </div>
                )}
              </div>
              <div className="travelers__vignette" />
              <GrainOverlay opacity={0.1} blend="soft-light" />
            </div>
          );
        }}
        steps={steps}
      />

      <Footer tone="light" />
    </div>
  );
}
