import PlaceholderPortrait from '../../components/art/PlaceholderPortrait';
import GrainOverlay from '../../components/art/GrainOverlay';
import Scrollytelling from '../../components/scrolly/Scrollytelling';
import Reveal from '../../components/scrolly/Reveal';
import Footer from '../../components/layout/Footer';
import './sad-poem.css';

/**
 * To use real photography instead of the drawn placeholders, drop images into
 * public/images/portraits/ and replace the matching entry below with its URL,
 * e.g. `import.meta.env.BASE_URL + 'images/portraits/01.jpg'`. Leave an entry
 * as null to keep the placeholder. Grayscale/contrast is applied in CSS, so
 * color photos will read as black and white automatically.
 */
const PORTRAITS: (string | null)[] = [null, null, null, null];

const STANZAS: string[][] = [
  ['The house learned your silence', 'before I did —', 'it keeps the shape of you', 'in every unlit room.'],
  ['I set two cups down, still.', 'My hands have not been told.', 'They go on believing', 'in the sound of the door.'],
  ['Grief is not the storm.', 'Grief is the after:', 'the flat grey light,', 'the clock that keeps its promises.'],
  ['People say you are at peace.', 'I would settle for', 'a footstep on the stair,', 'a reason to look up.'],
  ['I am learning the weight of quiet —', 'how it fills a coat,', 'a chair, a Sunday,', 'and asks to be carried like a child.'],
  ['So I carry it.', 'Out into the grey.', 'One foot,', 'then the other.'],
];

// which portrait is shown while each stanza is active
const PORTRAIT_FOR_STANZA = [0, 0, 1, 2, 2, 3];

function Portrait({ index }: { index: number }) {
  const src = PORTRAITS[index];
  if (src) {
    return <img className="poem__portrait-img" src={src} alt="" />;
  }
  return <PlaceholderPortrait variant={index} className="poem__portrait-img" />;
}

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

  const activePortrait = (active: number) => PORTRAIT_FOR_STANZA[active] ?? 0;

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
        renderSticky={(active) => (
          <div className="poem__stage">
            {PORTRAITS.map((_, i) => (
              <div
                key={i}
                className="poem__portrait"
                style={{ opacity: activePortrait(active) === i ? 1 : 0 }}
              >
                <Portrait index={i} />
              </div>
            ))}
            <div className="poem__vignette" />
            <GrainOverlay opacity={0.12} blend="screen" />
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
