import '../App.css'
import { useTranslation } from 'react-i18next';

const profileImg = '/ppresim.jpg';

function HomePage() {
  const { t } = useTranslation();
  return (
    <>
      <main className="main-content">
        <img src={profileImg} alt="Profil" className="profile-img" />
        <h1 className="title">{t('homepage.title')}</h1>
        <h2 className="subtitle">{t('homepage.subtitle')}</h2>
        <p className="description">
          {t('homepage.desc')}
        </p>
      </main>
    </>
  )
}

export default HomePage; 