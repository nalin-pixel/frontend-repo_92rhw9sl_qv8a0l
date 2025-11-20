import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';

export default function Navbar({ t, currentLang, setLang }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-40 transition-all ${scrolled ? 'backdrop-blur-xl bg-black/40' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#hero" className="text-[#d0b36f] font-[Marcellus] text-lg">{t('brand')}</a>

        <nav className="hidden md:flex items-center gap-6 text-[#e9e5f2]">
          <a href="#timeline" className="hover:text-[#d0b36f] transition-colors">{t('timeline')}</a>
          <a href="#gifts" className="hover:text-[#d0b36f] transition-colors">{t('gifts')}</a>
          <a href="#gallery" className="hover:text-[#d0b36f] transition-colors">{t('gallery')}</a>
          <a href="#guestbook" className="hover:text-[#d0b36f] transition-colors">{t('guestbook')}</a>
          <a href="#rsvp" className="px-3 py-1.5 rounded-lg bg-[#7a4ecb] hover:bg-[#6a41b5]">{t('rsvp')}</a>

          <select aria-label="Language" value={currentLang} onChange={(e)=>setLang(e.target.value)} className="bg-transparent border border-white/20 rounded-md px-2 py-1">
            <option value="en">EN</option>
            <option value="de">DE</option>
            <option value="ru">RU</option>
          </select>
        </nav>

        <button className="md:hidden text-white" onClick={()=>setOpen(v=>!v)} aria-label="Menu"><Menu /></button>
      </div>
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-2 text-[#e9e5f2] bg-black/60 backdrop-blur-xl">
          {['timeline','gifts','gallery','guestbook','rsvp'].map(key => (
            <a key={key} href={`#${key}`} className="block py-1" onClick={()=>setOpen(false)}>{t(key)}</a>
          ))}
          <div className="pt-2">
            <select aria-label="Language" value={currentLang} onChange={(e)=>setLang(e.target.value)} className="w-full bg-transparent border border-white/20 rounded-md px-2 py-2">
              <option value="en">EN</option>
              <option value="de">DE</option>
              <option value="ru">RU</option>
            </select>
          </div>
        </div>
      )}
    </header>
  );
}
