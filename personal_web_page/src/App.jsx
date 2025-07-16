import './App.css'
import HomePage from './Pages/HomePage'
import AboutMe from './Pages/AboutMe'
import Portfolio from './Pages/Portfolio'
import CV from './Pages/CV'
import Contact from './Pages/Contact'
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const pages = [
  { name: 'home', component: <HomePage /> },
  { name: 'about', component: <AboutMe /> },
  { name: 'portfolio', component: <Portfolio /> },
  { name: 'cv', component: <CV /> },
  { name: 'contact', component: <Contact /> },
];

function App() {
  const [activePage, setActivePage] = useState(0);
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState('tr');
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <div className="splash-screen">
        <div className="splash-logo">MBG</div>
        <div className="splash-loader"></div>
      </div>
    );
  }

  const handleLangChange = (lng) => {
    setLang(lng);
    i18n.changeLanguage(lng);
  };

  return (
    <div className="container fullpage-bg">
      <nav className="navbar">
        <div className="logo">Melik Berke Gül</div>
        <ul className="nav-links">
          {pages.map((p, i) => (
            <li key={p.name}>
              <a
                href="#"
                className={activePage === i ? 'active' : ''}
                onClick={e => { e.preventDefault(); setActivePage(i) }}
              >
                {t(`menu.${p.name}`)}
              </a>
            </li>
          ))}
        </ul>
        <div className="lang-switcher">
          <span className={lang === 'tr' ? 'lang active' : 'lang'} onClick={() => handleLangChange('tr')}>TR</span>
          <span className="lang-divider">|</span>
          <span className={lang === 'en' ? 'lang active' : 'lang'} onClick={() => handleLangChange('en')}>ENG</span>
        </div>
      </nav>
      {pages[activePage].name === 'about' ? <AboutMe trigger={activePage} /> : pages[activePage].component}
    </div>
  );
}

export default App
