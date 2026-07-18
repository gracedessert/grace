import GrainOverlay from '../../components/art/GrainOverlay';
import Scrollytelling from '../../components/scrolly/Scrollytelling';
import Reveal from '../../components/scrolly/Reveal';
import Footer from '../../components/layout/Footer';
import { PORTRAIT_IMG } from '../../data/media';
import './sad-poem.css';

const STANZAS: string[][] = [
  ['The house learned your silence', 'before I did —', 'it keeps the shape of you', 'in every unlit room.'],
  ['I set two cups down, still.', 'My hands have not been told.', 'They go on believing', 'in the sound of the door.'],
  ['Grief is not the storm.', 'Grief is the after:', 'the flat grey light,', 'the clock that keeps its promises.'],
  ['People say you are at peace.', 'I would settle for', 'a footstep on the stair,', 'a reason to look up.'],
  ['I am learning the weight of quiet —', 'how it fills a coat,', 'a chair, a Sunday,', 'and asks to be carried like a child.'],
  ['So I carry it.', 'Out into the grey.', 'One foot,', 'then the other.'],
];

// Faint light-leak motes over the portrait — the flare/dots, in monochrome.
const LEAKS = [
  { left: '20%', top: '22%', size: 70, o: 0.14 },
  { left: '48%', top: '14%', size: 30, o: 0.2 },
  { left: '30%', top: '78%', size: 110, o: 0.1 },
  { left: '12%', top: '54%', size: 24, o: 0.22 },
  { left: '40%', top: '40%', size: 46, o: 0.12 },
];

export default function SadPoem() {
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
        <h1 className="poem__title">The Weight of Quiet</h1>
        <p className="poem__byline">a poem, in black and white</p>
        <div className="poem__rule" />
        <p className="poem__cue">scroll slowly</p>
      </header>

      <Scrollytelling
        className="poem__scrolly"
        align="right"
        renderSticky={() => (
          <div className="poem__stage">
            <div className="poem__portrait">
              <img
                className="poem__portrait-img"
                src={PORTRAIT_IMG}
                alt="A black-and-white portrait of a woman, her gaze lowered"
              />
            </div>
            {/* light-leak dots */}
            <div className="poem__leaks" aria-hidden>
              <span className="poem__streak" />
              {LEAKS.map((l, i) => (
                <span
                  key={i}
                  className="poem__mote"
                  style={{ left: l.left, top: l.top, width: l.size, height: l.size, opacity: l.o }}
                />
              ))}
            </div>
            <div className="poem__vignette" />
            <GrainOverlay opacity={0.14} blend="screen" />
          </div>
        )}
        steps={steps}
      />

      <section className="poem__coda">
        <Reveal as="p" className="poem__coda-line">
          — for the ones who are not on the stair
        </Reveal>
      </section>

      <Footer tone="dark" />
    </div>
  );
}
