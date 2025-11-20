import Hero from './components/Hero';
import Navbar from './components/Navbar';
import { Timeline, Gifts, Guestbook, RSVP } from './components/Sections';
import { useI18n } from './components/i18n';

function App() {
  const { t, currentLang, setLang } = useI18n();

  return (
    <div className="min-h-screen bg-[#0b0b0e]">
      <Navbar t={t} currentLang={currentLang} setLang={setLang} />
      <Hero t={t} />
      <main className="relative">
        <Timeline t={t} />
        <Gifts t={t} />
        <Guestbook t={t} />
        <RSVP t={t} />
      </main>
      <footer className="text-center text-white/50 py-10">© 2026 A&N</footer>
    </div>
  )
}

export default App