import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';
import { useTranslation } from 'react-i18next';

function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name: '',
    surname: '',
    email: '',
    message: ''
  });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const formRef = useRef();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSent(false);
    setError(false);
    emailjs.sendForm(
      'service_jwbneri',
      'template_wkpzwem',
      formRef.current,
      'WQ1CaAuwpSfb35JkH'
    )
    .then((result) => {
      setSent(true);
      setForm({ name: '', surname: '', email: '', message: '' });
    }, (error) => {
      setError(true);
    });
  };

  return (
    <div className="main-content contact-page">
      <h1 className="title">{t('contact.title')}</h1>
      <div className="contact-form-container">
        {sent ? (
          <div className="contact-success">{t('contact.success')}</div>
        ) : error ? (
          <div className="contact-error">{t('contact.error')}</div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit} autoComplete="off" ref={formRef}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">{t('contact.name')}</label>
                <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="surname">{t('contact.surname')}</label>
                <input type="text" id="surname" name="surname" value={form.surname} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">{t('contact.email')}</label>
              <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="message">{t('contact.message')}</label>
              <textarea id="message" name="message" value={form.message} onChange={handleChange} rows={5} required />
            </div>
            <button type="submit" className="contact-btn">{t('contact.send')}</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Contact; 