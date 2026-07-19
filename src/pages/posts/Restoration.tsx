import GrainOverlay from "../../components/art/GrainOverlay";
import Scrollytelling from "../../components/scrolly/Scrollytelling";
import Reveal from "../../components/scrolly/Reveal";
import Footer from "../../components/layout/Footer";
import { PORTRAIT_IMG } from "../../data/media";
import "./restoration.css";

const STANZAS: string[][] = [
  [
    "i am taking myself to this mountain that has seen too much of me.",
    "my self-driving makeup routines,",
    "covering my eyelids while i steer with my knees",
    ".",
    "i am arriving an hour before sunset",
    "to hills more beautiful than i want them to be",
    "to crunched sandstone and paragliders",
    "maybe they can cure me",
  ],
  [
    "i hike to get closer, i'd like to be closer,",
    "to these people who have learned",
    "to have a very good day, to fly without crying",
    ".",
    "when i see the sun fall below the ocean, i will know",
    "what i didn't say, why i left, the reason i'm not okay.",
    "but i keep turning corners to find another one in front of me.",
  ],
  [
    "there are many things i don't know about me, but i do know that i like to run",
    "i can run until the looming ache becomes nothing but wind and breath",
    "sage brush and sandstone",
    "faster, tuck my hair, turn a corner, and startle myself with a smile breaking through and",
    "i reach up my arms to whoo like i used to without trying.",
    "it feels good but like a diet soda.",
  ],
  [
    "but i'll take it.",
    "and i take myself to 75% up before i see that i've missed her lecture",
    "on the other side of the mountain where the sun has surely set and the gliders have left",
    "so i'm left to continue my self-help books, regretted words, and hope that maybe the next artist date will cure me",
  ],
  [
    "maybe it's silly but i swear, many attested-- i've seen it in my books and the looks on some faces of strangers,",
    "how they now sit on their thrones of instagram advice,",
    "new boyfriends, good poem paradise",
    ".",
    "the air is crisp and i will myself to appreciate this view. please, grace? can we not love any longer?",
    "need you know it all before you smile?",
  ],
  [
    "so i'll sit and eat my cherries, and spit the pits into my bag.",
    "i'll see the clouds get blurry and",
    "startle myself again with how much water i produce.",
    ".",
    "i guess she wanted me here, throat pinched,",
    "feet warm, bangs stuck sideways with cool sweat and cupcake crumbs",
    "i'll take it.",
  ],
];

// Faint light-leak motes over the portrait — the flare/dots, in monochrome.
const LEAKS = [
  { left: "20%", top: "22%", size: 70, o: 0.14 },
  { left: "48%", top: "14%", size: 30, o: 0.2 },
  { left: "30%", top: "78%", size: 110, o: 0.1 },
  { left: "12%", top: "54%", size: 24, o: 0.22 },
  { left: "40%", top: "40%", size: 46, o: 0.12 },
];

export default function Restoration() {
  const steps = STANZAS.map((lines, i) => (
    <div key={i} className="poem__stanza">
      {lines.map((line, j) => (
        <Reveal as="p" key={j} delay={j * 0.12} y={16} className="poem__line">
          {line}
        </Reveal>
      ))}
    </div>
  ));

  return (
    <div className="poem">
      {/* title */}
      <header className="poem__title-card">
        <h1 className="poem__title">restoration</h1>
        {/* <p className="poem__byline">a poem, in black and white</p> */}
        <div className="poem__rule" />
        {/* <p className="poem__cue">scroll</p> */}
      </header>

      <Scrollytelling
        className="poem__scrolly"
        align="right"
        renderSticky={() => (
          <div className="poem__stage">
            <div className="poem__portrait">
              <img className="poem__portrait-img" src={PORTRAIT_IMG} />
            </div>
            {/* light-leak dots */}
            <div className="poem__leaks" aria-hidden>
              <span className="poem__streak" />
              {LEAKS.map((l, i) => (
                <span
                  key={i}
                  className="poem__mote"
                  style={{
                    left: l.left,
                    top: l.top,
                    width: l.size,
                    height: l.size,
                    opacity: l.o,
                  }}
                />
              ))}
            </div>
            <div className="poem__vignette" />
            <GrainOverlay opacity={0.14} blend="screen" />
          </div>
        )}
        steps={steps}
      />

      {/* <section className="poem__coda">
        <Reveal as="p" className="poem__coda-line">
          — for the ones who are not on the stair
        </Reveal>
      </section> */}

      <Footer tone="dark" />
    </div>
  );
}
