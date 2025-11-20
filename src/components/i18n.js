const strings = {
  en: {
    brand: 'A&N',
    names: 'Anna & Noah',
    date: 'February 6, 2026',
    location: 'Berlin, Germany',
    rsvp: 'RSVP',
    details: 'Details',
    days: 'Days', hours: 'Hours', mins: 'Mins', secs: 'Secs',
    timeline: 'Timeline',
    gifts: 'Gift Registry',
    gallery: 'Photos',
    guestbook: 'Guestbook',
    yourName: 'Your name',
    noteOptional: 'Note (optional)',
    loading: 'Loading...','claimedBy': 'Claimed by', available: 'Available', claim: 'Claim', unclaim: 'Unclaim',
    public: 'Public', private: 'Private', message: 'Message', send: 'Send',
    email: 'Email', attendingYes: 'Attending', attendingNo: 'Not attending', guestCount: 'Guest count', dietary: 'Dietary needs', submit: 'Submit', rsvpSuccess: 'Thank you! Your RSVP is saved.', error: 'Something went wrong.'
  },
  de: {
    brand: 'A&N',
    names: 'Anna & Noah',
    date: '6. Februar 2026',
    location: 'Berlin, Deutschland',
    rsvp: 'Zusagen',
    details: 'Details',
    days: 'Tage', hours: 'Stunden', mins: 'Min', secs: 'Sek',
    timeline: 'Ablauf',
    gifts: 'Geschenkliste',
    gallery: 'Fotos',
    guestbook: 'Gästebuch',
    yourName: 'Dein Name',
    noteOptional: 'Notiz (optional)',
    loading: 'Lädt...','claimedBy': 'Reserviert von', available: 'Verfügbar', claim: 'Reservieren', unclaim: 'Freigeben',
    public: 'Öffentlich', private: 'Privat', message: 'Nachricht', send: 'Senden',
    email: 'E-Mail', attendingYes: 'Kommt', attendingNo: 'Kommt nicht', guestCount: 'Anzahl Gäste', dietary: 'Besonderes Essen', submit: 'Absenden', rsvpSuccess: 'Danke! Deine Zusage wurde gespeichert.', error: 'Etwas ist schiefgelaufen.'
  },
  ru: {
    brand: 'A&N',
    names: 'Анна и Ноа',
    date: '6 Февраля 2026',
    location: 'Берлин, Германия',
    rsvp: 'Ответить',
    details: 'Подробности',
    days: 'Дни', hours: 'Часы', mins: 'Мин', secs: 'Сек',
    timeline: 'Расписание',
    gifts: 'Подарки',
    gallery: 'Фото',
    guestbook: 'Гостевая',
    yourName: 'Ваше имя',
    noteOptional: 'Заметка (необязательно)',
    loading: 'Загрузка...','claimedBy': 'Забронировано', available: 'Доступно', claim: 'Забронировать', unclaim: 'Освободить',
    public: 'Публично', private: 'Приватно', message: 'Сообщение', send: 'Отправить',
    email: 'Email', attendingYes: 'Приду', attendingNo: 'Не приду', guestCount: 'Количество гостей', dietary: 'Пищевые предпочтения', submit: 'Отправить', rsvpSuccess: 'Спасибо! Ваш ответ сохранён.', error: 'Ошибка.'
  }
};

export function useI18n() {
  const detected = (typeof navigator !== 'undefined' && (navigator.language || 'en').slice(0,2)) || 'en';
  const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('lang') : null;
  const defaultLang = (saved && strings[saved]) ? saved : (strings[detected] ? detected : 'en');
  let currentLang = defaultLang;
  const t = (key) => strings[currentLang][key] || key;
  const setLang = (lang) => {
    if (strings[lang]) { currentLang = lang; localStorage.setItem('lang', lang); window.location.reload(); }
  };
  return { t, currentLang, setLang };
}
