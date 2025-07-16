import React, { useEffect, useState } from 'react';
import './CV.css';
import { useTranslation } from 'react-i18next';

function CV() {
  const { t, i18n } = useTranslation();
  const [cvData, setCvData] = useState(null);

  useEffect(() => {
    const lang = i18n.language || 'tr';
    fetch(`/cvData_${lang}.json`)
      .then((res) => res.json())
      .then((data) => setCvData(data));
  }, [i18n.language]);

  if (!cvData) {
    return <div className="main-content"><p>{t('cv.loading')}</p></div>;
  }

  return (
    <div className="main-content cv-page">
      <div className="cv-header">
        <h1 className="title">{t('cv.title')}</h1>
        <a href="/Melik_Berke_Gül_CV.pdf" download className="cv-download-btn">
          {t('cv.download')}
        </a>
      </div>
      {/* Kişisel Bilgiler */}
      <div className="cv-personal-info-box">
        <h2>{cvData.name}</h2>
        <p className="cv-title">{cvData.title}</p>
        <div className="cv-personal-row">
          <span>📍 {cvData.location}</span>
          <span>📧 {cvData.email}</span>
          <span>📱 {cvData.phone}</span>
          <span>💼 <a href={cvData.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></span>
        </div>
      </div>
      {/* Timeline */}
      <div className="cv-timeline">
        {/* Eğitim */}
        {cvData.education.map((edu, i) => (
          <div className="cv-timeline-item" key={"edu-"+i}>
            <div className="cv-timeline-dot"></div>
            <div className="cv-timeline-content">
              <div className="cv-timeline-date">{edu.years}</div>
              <div className="cv-timeline-title">{t('cv.education')}</div>
              <div className="cv-timeline-box">
                <strong>{edu.institution}</strong><br/>
                <span>{edu.department}</span><br/>
                <span>{edu.location}</span><br/>
                <span>GPA: {edu.gpa}</span>
                {edu.activities && (
                  <div className="cv-timeline-tags">
                    {edu.activities.map((act, j) => <span className="cv-timeline-tag" key={j}>{act}</span>)}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {/* Deneyim */}
        {cvData.experience.map((exp, i) => (
          <div className="cv-timeline-item" key={"exp-"+i}>
            <div className="cv-timeline-dot"></div>
            <div className="cv-timeline-content">
              <div className="cv-timeline-date">{exp.date}</div>
              <div className="cv-timeline-title">{exp.title}</div>
              <div className="cv-timeline-box">
                <strong>{exp.company}</strong><br/>
                <span>{exp.location}</span>
                {exp.description && <p>{exp.description}</p>}
              </div>
            </div>
          </div>
        ))}
        {/* Projeler */}
        {cvData.projects.map((proj, i) => (
          <div className="cv-timeline-item" key={"proj-"+i}>
            <div className="cv-timeline-dot"></div>
            <div className="cv-timeline-content">
              <div className="cv-timeline-date">Proje</div>
              <div className="cv-timeline-title">{proj.title}</div>
              <div className="cv-timeline-box">
                <span>{proj.description}</span>
                <div className="cv-timeline-tags">
                  {proj.technologies.map((tech, j) => <span className="cv-timeline-tag" key={j}>{tech}</span>)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Yetenekler ve Sertifikalar */}
      <div className="cv-bottom-section">
        <div className="cv-bottom-card">
          <div className="cv-bottom-title">{t('cv.skills')}</div>
          <div className="cv-bottom-skills">
            <div>
              <strong>{t('cv.technical')}:</strong>
              <div className="cv-bottom-tags">
                {cvData.skills.technical.map((skill, i) => <span className="cv-timeline-tag" key={i}>{skill}</span>)}
              </div>
            </div>
            <div>
              <strong>{t('cv.soft')}:</strong>
              <div className="cv-bottom-tags">
                {cvData.skills.soft.map((skill, i) => <span className="cv-timeline-tag" key={i}>{skill}</span>)}
              </div>
            </div>
          </div>
        </div>
        <div className="cv-bottom-card">
          <div className="cv-bottom-title">{t('cv.certifications')}</div>
          <ul className="cv-bottom-cert-list">
            {cvData.certifications.map((cert, i) => <li key={i}>{cert}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CV; 