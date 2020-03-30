import React from 'react';
import { useTranslation } from 'react-i18next';
import me from '../../resources/assets/me.jpeg';
import './about.scss';

const About = () => {
  const [t] = useTranslation();
  return (
    <section id="about-section" className="section">
      <h2 className="about-header section-header">{t('about.header')}</h2>
      <img className='person-picture' src={me} alt="bryan" />
      <p className="about-school">{t('about.school')}</p>
      <p className="about-tech">{t('about.tech')}</p>
    </section>
  );
};
export default About;