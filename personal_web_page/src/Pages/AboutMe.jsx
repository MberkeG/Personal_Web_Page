import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

function AboutMe() {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(false);
    const timer = setTimeout(() => setShow(true), 80);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="main-content">
      <h1 className="title">{t('about.title')}</h1>
      <div className={`description aboutme-text aboutme-fadein${show ? ' show' : ''}`}>
        <p
          dangerouslySetInnerHTML={{
            __html: t('about.p1')
              .replace('Melik Berke Gül', '<b>Melik Berke Gül</b>')
          }}
        />
        <p
          dangerouslySetInnerHTML={{
            __html: t('about.p2')
              .replace('Kastamonu İl Özel İdaresi', '<b>Kastamonu İl Özel İdaresi</b>')
              .replace('TÜBİTAK SAGE', '<b>TÜBİTAK SAGE</b>')
          }}
        />
        <p
          dangerouslySetInnerHTML={{
            __html: t('about.p3')
              .replace('TÜBİTAK 2209-A', '<b>TÜBİTAK 2209-A</b>')
          }}
        />
        <p>{t('about.p4')}</p>
        <p>{t('about.p5')}</p>
      </div>
    </div>
  )
}

export default AboutMe; 