import Hero from './components/Hero';
import Navbar from './components/Navbar';
import { Timeline, Gifts, Guestbook, RSVP } from './components/Sections';
import { useI18n } from './components/i18n';
import Lock from './components/Lock';

function App() {
  const { t, currentLang, setLang } = useI18n();
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('authToken') : null;

  if (!token) {
    return <Lock t={t} onUnlock={() => window.location.reload()} />;
  }

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
      <footer className="text-center text-white/50 py-10">© 2026 M&M</footer>
    </div>
  )
}

export default App