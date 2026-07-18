import { useMemo } from 'react';
import GoldenScene from '../../components/art/GoldenScene';
import Scrollytelling from '../../components/scrolly/Scrollytelling';
import ProgressBar from '../../components/scrolly/ProgressBar';
import Reveal from '../../components/scrolly/Reveal';
import Footer from '../../components/layout/Footer';
import './golden-hour.css';

const STEPS: { h?: string; body: string }[] = [
  {
    h: 'Six in the evening',
    body: 'The day has spent itself, and what is left is the good part. The sun drops toward the far hedgerow and the whole valley leans into the light.',
  },
  {
    body: 'For an hour the country is unbearably kind. Midges hang in the gold like dust in an attic. Everything ordinary — a gate, a puddle, a cow — is briefly lit as if it mattered.',
  },
  {
    h: 'The stag',
    body: 'He comes out of the tree line the way he always does, without deciding to. He is not afraid of me because I have stopped being a person and become part of the field.',
  },
  {
    body: 'We hold still together. The light gets lower and redder, the way a fire does when you stop feeding it and just let it be beautiful for a while.',
  },
  {
    h: 'The thorns',
    body: 'Along the ditch the wild roses are out — pink, blowsy, already loosening their petals. You forget, until you reach for one, that the same plant grew the thorn.',
  },
  {
    body: 'That is the whole trick of a place like this. It is soft and it will still draw blood, and it does not see any contradiction in that. Neither, by dusk, do I.',
  },
  {
    h: 'Dusk',
    body: 'The sun goes under the hill and takes the gold with it. The cold comes up out of the grass. I walk home in the blue, carrying the hour the way you carry a coal — cupped, and only for a minute.',
  },
];

export default function GoldenHour() {
  // Map the active step to a 0..1 sun position for the scene.
  const steps = useMemo(
    () =>
      STEPS.map((s, i) => (
        <div key={i}>
          {s.h && <h2 className="gh__step-h">{s.h}</h2>}
          <p className="gh__step-p">{s.body}</p>
        </div>
      )),
    []
  );

  return (
    <div className="gh">
      <ProgressBar color="#eab758" />

      {/* title */}
      <header className="gh__title-card">
        <div className="gh__title-scene">
          <GoldenScene idle />
          <div className="gh__title-scrim" />
        </div>
        <div className="gh__title-copy">
          <p className="gh__kicker">a walk at dusk</p>
          <h1 className="gh__title">Golden Hour</h1>
          <p className="gh__standfirst">
            On the country light that only stays for a moment — and the thorns it
            forgives.
          </p>
        </div>
      </header>

      {/* the scrollytelling walk */}
      <Scrollytelling
        align="left"
        renderSticky={(active) => (
          <GoldenScene progress={active / (STEPS.length - 1)} />
        )}
        steps={steps}
      />

      {/* coda */}
      <section className="gh__coda">
        <Reveal as="p" className="gh__coda-line">
          And then it is just a field again, in the dark, and I am glad I looked.
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
