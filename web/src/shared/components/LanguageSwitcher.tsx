import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
    localStorage.setItem('i18nextLng', newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-100 bg-white hover:bg-gray-50 hover:border-orange-200 transition-all group shadow-sm"
      title={i18n.language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
    >
      <Globe 
        size={16} 
        className={`${i18n.language === 'es' ? 'text-orange-500' : 'text-blue-500'} transition-colors group-hover:scale-110 duration-300`} 
      />
      <span className="text-[10px] font-black uppercase tracking-widest text-gray-900 italic">
        {i18n.language === 'es' ? 'ES' : 'EN'}
      </span>
    </button>
  );
};
