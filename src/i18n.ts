import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import ar from './locales/ar.json'
import de from './locales/de.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ar: { translation: ar },
      de: { translation: de },
    },
    lng: 'ar', // اللغة الافتراضية
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
