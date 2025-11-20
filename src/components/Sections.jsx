import { useEffect, useState } from 'react';

const API = import.meta.env.VITE_BACKEND_URL || '';

export function Timeline({ t }) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch(`${API}/api/timeline`).then(r=>r.json()).then(setItems).catch(()=>setItems([]));
  }, []);
  return (
    <section id="timeline" className="max-w-5xl mx-auto px-6 py-16 text-[#e9e5f2]">
      <h2 className="text-2xl md:text-3xl font-[Marcellus] text-[#d0b36f] mb-6">{t('timeline')}</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {items.map(ev => (
          <div key={ev.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
            <div className="text-[#7a4ecb] font-semibold">{ev.time} {ev.location ? `• ${ev.location}`: ''}</div>
            <div className="text-xl font-semibold mt-1">{ev.title}</div>
            {ev.description && <p className="text-white/80 mt-1">{ev.description}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

export function Gifts({ t }) {
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [note, setNote] = useState('');

  const load = () => {
    setLoading(true);
    fetch(`${API}/api/gifts`).then(r=>r.json()).then(d=>{setGifts(d); setLoading(false);}).catch(()=>{setError('Failed to load'); setLoading(false);});
  };
  useEffect(() => { load(); }, []);

  const toggleClaim = async (g) => {
    const action = g.claimed_by ? 'unclaim' : 'claim';
    const res = await fetch(`${API}/api/gifts/${g.id}/claim`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, note, action }) });
    if (res.ok) load();
  };

  return (
    <section id="gifts" className="max-w-5xl mx-auto px-6 py-16 text-[#e9e5f2]">
      <h2 className="text-2xl md:text-3xl font-[Marcellus] text-[#d0b36f] mb-6">{t('gifts')}</h2>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md mb-4">
        <div className="grid md:grid-cols-3 gap-3">
          <input placeholder={t('yourName')} value={name} onChange={e=>setName(e.target.value)} className="bg-black/30 border border-white/10 rounded-lg px-3 py-2" />
          <input placeholder={t('noteOptional')} value={note} onChange={e=>setNote(e.target.value)} className="bg-black/30 border border-white/10 rounded-lg px-3 py-2 md:col-span-2" />
        </div>
      </div>
      {loading ? <p>{t('loading')}</p> : (
        <div className="grid md:grid-cols-2 gap-4">
          {gifts.map(g => (
            <div key={g.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md flex items-center justify-between">
              <div>
                <div className="text-lg font-semibold">{g.title}</div>
                <div className="text-sm text-white/70">{g.claimed_by ? `${t('claimedBy')} ${g.claimed_by}` : t('available')}</div>
              </div>
              <button onClick={()=>toggleClaim(g)} className={`px-4 py-2 rounded-lg ${g.claimed_by ? 'bg-white/10' : 'bg-[#7a4ecb] hover:bg-[#6a41b5]'}`}>
                {g.claimed_by ? t('unclaim') : t('claim')}
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export function Guestbook({ t }) {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [publicMsg, setPublicMsg] = useState(true);

  const load = () => fetch(`${API}/api/messages`).then(r=>r.json()).then(setMessages);
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API}/api/messages`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, text, public: publicMsg }) });
    if (res.ok) { setName(''); setText(''); setPublicMsg(true); load(); }
  };

  return (
    <section id="guestbook" className="max-w-5xl mx-auto px-6 py-16 text-[#e9e5f2]">
      <h2 className="text-2xl md:text-3xl font-[Marcellus] text-[#d0b36f] mb-6">{t('guestbook')}</h2>
      <form onSubmit={submit} className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md space-y-3">
        <div className="grid md:grid-cols-2 gap-3">
          <input required placeholder={t('yourName')} value={name} onChange={e=>setName(e.target.value)} className="bg-black/30 border border-white/10 rounded-lg px-3 py-2" />
          <select value={publicMsg? 'public':'private'} onChange={e=>setPublicMsg(e.target.value==='public')} className="bg-black/30 border border-white/10 rounded-lg px-3 py-2">
            <option value="public">{t('public')}</option>
            <option value="private">{t('private')}</option>
          </select>
        </div>
        <textarea required rows={3} placeholder={t('message')} value={text} onChange={e=>setText(e.target.value)} className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2" />
        <button className="px-4 py-2 rounded-lg bg-[#7a4ecb] hover:bg-[#6a41b5]">{t('send')}</button>
      </form>
      <div className="mt-6 grid gap-3">
        {messages.map(m => (
          <div key={m.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
            <div className="text-sm text-white/70">{m.created_at ? new Date(m.created_at).toLocaleString() : ''}</div>
            <div className="font-semibold">{m.name}</div>
            <p className="text-white/90">{m.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function RSVP({ t }) {
  const [form, setForm] = useState({ email: '', name: '', attending: true, guests: 0, dietary: '', message: '' });
  const [status, setStatus] = useState('');

  const loadExisting = async (email) => {
    const r = await fetch(`${API}/api/rsvp?email=${encodeURIComponent(email)}`);
    if (r.ok) {
      const data = await r.json();
      if (data) setForm({ ...form, ...data });
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    const res = await fetch(`${API}/api/rsvp`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    if (res.ok) setStatus('success'); else setStatus('error');
  };

  return (
    <section id="rsvp" className="max-w-3xl mx-auto px-6 py-16 text-[#e9e5f2]">
      <h2 className="text-2xl md:text-3xl font-[Marcellus] text-[#d0b36f] mb-6">{t('rsvp')}</h2>
      <form onSubmit={submit} className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md space-y-3">
        <div className="grid md:grid-cols-2 gap-3">
          <input required type="email" placeholder={t('email')} value={form.email} onBlur={(e)=>loadExisting(e.target.value)} onChange={(e)=>setForm({...form, email: e.target.value})} className="bg-black/30 border border-white/10 rounded-lg px-3 py-2" />
          <input required placeholder={t('yourName')} value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} className="bg-black/30 border border-white/10 rounded-lg px-3 py-2" />
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          <select value={form.attending? 'yes':'no'} onChange={(e)=>setForm({...form, attending: e.target.value==='yes'})} className="bg-black/30 border border-white/10 rounded-lg px-3 py-2">
            <option value="yes">{t('attendingYes')}</option>
            <option value="no">{t('attendingNo')}</option>
          </select>
          <input type="number" min="0" max="10" placeholder={t('guestCount')} value={form.guests} onChange={(e)=>setForm({...form, guests: Number(e.target.value)})} className="bg-black/30 border border-white/10 rounded-lg px-3 py-2" />
          <input placeholder={t('dietary')} value={form.dietary} onChange={(e)=>setForm({...form, dietary: e.target.value})} className="bg-black/30 border border-white/10 rounded-lg px-3 py-2" />
        </div>
        <textarea rows={3} placeholder={t('message')} value={form.message} onChange={(e)=>setForm({...form, message: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2" />
        <button className="px-4 py-2 rounded-lg bg-[#7a4ecb] hover:bg-[#6a41b5]">{t('submit')}</button>
        {status==='success' && <p className="text-emerald-400">✓ {t('rsvpSuccess')}</p>}
        {status==='error' && <p className="text-red-400">✗ {t('error')}</p>}
      </form>
    </section>
  );
}
