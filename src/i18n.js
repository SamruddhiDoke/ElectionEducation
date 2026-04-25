/**
 * @file i18n.js
 * @description Localization configuration using react-i18next
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Comprehensive translation structures for Hindi and English
const resources = {
  en: {
    translation: {
      "app": {
        "title": "Bharat Votes",
        "subtitle": "Your Path to Informed Voting"
      },
      "nav": {
        "home": "Home",
        "learn": "Learn",
        "timeline": "Timeline",
        "quiz": "Quiz",
        "about": "About",
        "assistant": "AI Civic Agent"
      },
      "progress": "Progress"
    }
  },
  hi: {
    translation: {
      "app": {
        "title": "भारत वोट्स",
        "subtitle": "सूचित मतदान का आपका मार्ग"
      },
      "nav": {
        "home": "होम",
        "learn": "सीखें",
        "timeline": "टाइमलाइन",
        "quiz": "क्विज़",
        "about": "हमारे बारे में",
        "assistant": "सत्यापित एजेंट"
      },
      "progress": "प्रगति"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
