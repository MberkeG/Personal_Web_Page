import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const projects = [
  {
    key: 'web',
  },
  {
    key: 'tarim',
  },
  {
    key: 'kur',
  },
  {
    key: 'ulkeler',
  }
];

const projectData = {
  web: {
    github: 'https://github.com/MberkeG/personal_web_page',
    technologies: [
      { name: 'React', icon: '/react.svg', fallback: '/react.png' },
      { name: 'Vite', icon: '/vite.svg', fallback: '/vite.png' },
      { name: 'EmailJS', icon: '/emailjs.svg', fallback: '/emailjs.png' },
      { name: 'i18next', icon: '/i18next.svg', fallback: '/i18next.png' },
      { name: 'CSS', icon: '/css.svg', fallback: '/css.png' }
    ],
    images: [
      '/personalWebResim/1.jpg',
      '/personalWebResim/2.jpg',
      '/personalWebResim/3.jpg',
      '/personalWebResim/4.jpg',
      '/personalWebResim/5.jpg'
    ].filter(Boolean)
  },
  tarim: {
    github: 'https://github.com/MberkeG/dijital_tarim',
    technologies: [
      { name: 'Flutter', icon: '/flutter.svg', fallback: '/flutter.png' },
      { name: 'Google Maps API', icon: '/google-maps.svg', fallback: '/google-maps.png' }
    ],
    images: [
      '/tarimProjeResim/1.jpg',
      '/tarimProjeResim/2.jpg',
      '/tarimProjeResim/3.jpg',
      '/tarimProjeResim/4.jpg',
      '/tarimProjeResim/5.jpg',
    ].filter(Boolean)
  },
  kur: {
    github: 'https://github.com/MberkeG/Currency-Converter',
    technologies: [
      { name: 'Flutter', icon: '/flutter.svg', fallback: '/flutter.png' }
    ],
    images: [
      '/kurDonusturucuResim/1.jpg',
      '/kurDonusturucuResim/2.jpg',
      '/kurDonusturucuResim/3.jpg',
    ].filter(Boolean)
  },
  ulkeler: {
    github: 'https://github.com/MberkeG/Countries',
    technologies: [
      { name: 'Flutter', icon: '/flutter.svg', fallback: '/flutter.png' }
    ],
    images: [
      '/ulkelerResim/1.jpg',
      '/ulkelerResim/2.jpg',
      '/ulkelerResim/3.jpg',
      '/ulkelerResim/4.jpg',
      '/ulkelerResim/5.jpg',
    ].filter(Boolean)
  }
};

function Portfolio() {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [modalProject, setModalProject] = useState(null);
  const [showCards, setShowCards] = useState([false, false, false, false]);

  // ESC ile lightbox kapama
  useEffect(() => {
    if (lightboxImg) {
      window.onkeydown = (e) => {
        if (e.key === 'Escape') setLightboxImg(null);
      };
      document.body.classList.add('modal-open');
    } else {
      window.onkeydown = null;
      document.body.classList.remove('modal-open');
    }
    return () => {
      window.onkeydown = null;
      document.body.classList.remove('modal-open');
    };
  }, [lightboxImg]);

  // Kartlara animasyonlu giriş
  useEffect(() => {
    setShowCards([false, false, false, false]);
    projects.forEach((_, idx) => {
      setTimeout(() => {
        setShowCards(prev => {
          const copy = [...prev];
          copy[idx] = true;
          return copy;
        });
      }, 200 + idx * 180);
    });
  }, []);

  const openModal = (project) => {
    setModalProject(project);
    setModalOpen(true);
  };

  return (
    <div className="main-content">
      <h1 className="title">{t('portfolio.title')}</h1>
      <div className="portfolio-cards-row">
        {projects.map((project, idx) => (
          <div className={`portfolio-card portfolio-fadein${showCards[idx] ? ' show' : ''}`} key={project.key} style={{display:'flex', flexDirection:'column', alignItems:'center', height:'100%'}}>
            <div className="portfolio-card-content" style={{width:'100%'}}>
              <h2 className="portfolio-title">{t(`portfolio.projects.${project.key}.title`)}</h2>
              <p className="portfolio-desc">{t(`portfolio.projects.${project.key}.desc`)}</p>
            </div>
            <div className="portfolio-tech-flex" style={{flexDirection: 'column', alignItems: 'center', gap: '0.5rem', width:'100%'}}>
              <span className="portfolio-tech-label" style={{textAlign:'center', width:'100%'}}>{t('portfolio.techLabel')}</span>
              <div className="portfolio-tech-list flex-tech" style={{justifyContent: 'center', minHeight: '60px', width:'100%'}}>
                {projectData[project.key].technologies.map(tech => (
                  <span className="tech-badge" key={tech.name}>
                    <img 
                      src={imgError ? tech.fallback : tech.icon} 
                      alt={tech.name} 
                      className="tech-icon"
                      onError={() => setImgError(true)}
                    />
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="portfolio-tech-divider-grey"></div>
            <div className="portfolio-card-actions" style={{marginTop:'auto', width:'100%', justifyContent:'center'}}>
              <button className="portfolio-btn" onClick={() => openModal(projectData[project.key])}>{t('portfolio.detail')}</button>
              <a className="portfolio-btn github" href={projectData[project.key].github} target="_blank" rel="noopener noreferrer">{t('portfolio.github')}</a>
            </div>
          </div>
        ))}
      </div>
      {modalOpen && modalProject && (
        <div className="portfolio-modal-bg" onClick={() => { setModalOpen(false); setModalProject(null); }}>
          <div className="portfolio-modal" onClick={e => e.stopPropagation()}>
            <h3 className="modal-title">- {t('portfolio.projectImages')} -</h3>
            <div className="modal-images horizontal-scroll">
              {modalProject.images.map((img, i) => (
                <img src={img} alt={`Proje ${i+1}`} key={img} className="modal-img" onClick={() => setLightboxImg(img)} style={{cursor:'zoom-in'}} />
              ))}
            </div>
            <button className="modal-close" onClick={() => { setModalOpen(false); setModalProject(null); }}>{t('portfolio.close')}</button>
          </div>
        </div>
      )}
      {lightboxImg && (
        <div className="lightbox-bg" onClick={() => setLightboxImg(null)}>
          <img src={lightboxImg} alt="Büyük Görsel" className="lightbox-img" onClick={e => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}

export default Portfolio; 