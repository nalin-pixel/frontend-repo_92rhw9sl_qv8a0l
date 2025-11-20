import Spline from '@splinetool/react-spline';
import { useEffect, useMemo, useState } from 'react';

const WEDDING_DATE = new Date('2026-02-06T12:00:00');

function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const diff = Math.max(0, targetDate - now);
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setTimeLeft({ d, h, m, s });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return timeLeft;
}

export default function Hero({ t }) {
  const { d, h, m, s } = useCountdown(WEDDING_DATE);

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0b0b0e] text-[#e9e5f2]">
      {/* Radial gradient backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_70%_-10%,rgba(122,78,203,0.25),transparent),radial-gradient(800px_400px_at_30%_110%,rgba(208,179,111,0.18),transparent)]" />

      {/* Spline 3D asset */}
      <div className="absolute inset-0 opacity-70">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Content card */}
      <div className="relative z-10 max-w-5xl w-full px-6">
        <div className="mx-auto backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="text-center">
            <p className="uppercase tracking-[0.35em] text-xs md:text-sm text-[#d0b36f]">{t('date')} • {t('location')}</p>
            <h1 className="text-4xl md:text-6xl font-semibold font-[Marcellus] mt-4">
              {t('names')}
            </h1>
            <div className="mt-6 grid grid-cols-4 gap-3 md:gap-4 max-w-md mx-auto">
              {[{label: t('days'), value: d},{label: t('hours'), value: h},{label: t('mins'), value: m},{label: t('secs'), value: s}].map((item, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-md rounded-2xl py-4 md:py-5 border border-white/10">
                  <div className="text-2xl md:text-3xl font-semibold">{String(item.value).padStart(2,'0')}</div>
                  <div className="text-[10px] md:text-xs uppercase tracking-wider text-white/70">{item.label}</div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex items-center justify-center gap-3">
              <a href="#rsvp" className="px-5 py-3 rounded-xl bg-[#7a4ecb] hover:bg-[#6a41b5] transition-colors shadow-lg">
                {t('rsvp')}
              </a>
              <a href="#details" className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors border border-white/10">
                {t('details')}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Celtic knot divider */}
      <svg className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[140%] max-w-none opacity-30" height="80" viewBox="0 0 1200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 50 C150 0 300 100 450 50 C600 0 750 100 900 50 C1050 0 1200 100 1350 50" stroke="#d0b36f" strokeOpacity="0.4" strokeWidth="2" />
      </svg>
    </section>
  );
}
