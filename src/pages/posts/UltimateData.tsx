import Reveal from '../../components/scrolly/Reveal';
import Footer from '../../components/layout/Footer';
import StatTiles from '../../components/charts/StatTiles';
import DivergingBars from '../../components/charts/DivergingBars';
import MagnitudeBars from '../../components/charts/MagnitudeBars';
import GrowthLine from '../../components/charts/GrowthLine';
import SpiritMeter from '../../components/charts/SpiritMeter';
import { DATA_SOURCES, DATA_GAPS } from '../../data/ultimate';
import './ultimate-data.css';

// how the leagues officiate — public rulebooks, no dataset needed
const OFFICIATING = [
  { league: 'USA Ultimate (club)', who: 'Players + observers', refs: false },
  { league: 'WFDF (worlds)', who: 'Players + game advisors', refs: false },
  { league: 'WUL / PUL (women’s pro)', who: 'Players + observers', refs: false },
  { league: 'UFA (men’s pro)', who: 'Referees', refs: true },
];

export default function UltimateData() {
  return (
    <div className="data viz-root">
      <header className="data__hero">
        <p className="data__kicker">a data exploration</p>
        <h1 className="data__title">What we count about ultimate</h1>
        <p className="data__standfirst">
          I fell for this sport a year ago. Then I went looking for its data — to
          see what a pile of numbers could say about a thing that mostly lives in
          your legs and your teammates. Here’s what’s out there, what it shows,
          and where it goes quiet.
        </p>
      </header>

      <main className="data__body">
        {/* 1. the decline */}
        <Reveal as="section" className="data__section">
          <h2 className="data__h2">1 · A strange time to fall in love</h2>
          <p className="data__p">
            The first thing the numbers told me was unsettling: in the United
            States, ultimate is <em>shrinking</em>, and faster than any other team
            sport.
          </p>
          <StatTiles />
          <DivergingBars />
        </Reveal>

        {/* 2. scale */}
        <Reveal as="section" className="data__section">
          <h2 className="data__h2">2 · A very small world</h2>
          <p className="data__p">
            It was never big to begin with. Against the sports it’s measured
            against, ultimate barely registers — which is exactly why everyone in
            it seems to know everyone.
          </p>
          <MagnitudeBars />
        </Reveal>

        {/* 3. global */}
        <Reveal as="section" className="data__section">
          <h2 className="data__h2">3 · Except it’s booming elsewhere</h2>
          <p className="data__p">
            The American decline hides the real story. Outside the U.S., the sport
            is spreading fast — the number of countries with a national federation
            has more than doubled since 2010.
          </p>
          <GrowthLine />
        </Reveal>

        {/* 4. spirit */}
        <Reveal as="section" className="data__section">
          <h2 className="data__h2">4 · The number no other sport keeps</h2>
          <p className="data__p">
            Here’s the dataset I find most beautiful. Ultimate is self-officiated:
            there are no referees at almost every level, so players make their own
            calls — and then rate each other on sportsmanship, every single game.
          </p>
          <SpiritMeter />
          <p className="data__p data__p--tight">
            When the sport went pro, the leagues split on whether to keep trusting
            players. The men’s league brought in referees; the women’s leagues and
            the entire club world kept governing themselves.
          </p>
          <div className="offic">
            {OFFICIATING.map((o) => (
              <div key={o.league} className={`offic__row offic__row--${o.refs ? 'refs' : 'self'}`}>
                <span className="offic__league">{o.league}</span>
                <span className="offic__who">{o.who}</span>
                <span className="offic__tag">{o.refs ? 'referees' : 'self-officiated'}</span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* 5. the catalog */}
        <Reveal as="section" className="data__section">
          <h2 className="data__h2">5 · Where the data actually lives</h2>
          <p className="data__p">
            If you want to dig in yourself, this is the map — from the pro league’s
            full statistical history to the app your club team probably already
            uses.
          </p>
          <ul className="sources">
            {DATA_SOURCES.map((s) => (
              <li key={s.name} className="source-card">
                <div className="source-card__top">
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="source-card__name">
                    {s.name}
                  </a>
                  <span className={`source-card__access source-card__access--${s.access.replace(' ', '-')}`}>
                    {s.access}
                  </span>
                </div>
                <p className="source-card__what">{s.what}</p>
                <p className="source-card__grain">{s.grain}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* 6. the gaps */}
        <Reveal as="section" className="data__section">
          <h2 className="data__h2">6 · Where the data goes quiet</h2>
          <p className="data__p">
            And the honest part — the questions I couldn’t answer, because nobody
            counts them yet:
          </p>
          <ul className="gaps">
            {DATA_GAPS.map((g, i) => (
              <li key={i}>{g}</li>
            ))}
          </ul>
          <p className="data__p data__p--tight">
            Which, for a sport this small and this self-governed, feels about
            right. Some of it you still have to be there for.
          </p>
        </Reveal>
      </main>

      <Footer tone="dark" />
    </div>
  );
}
