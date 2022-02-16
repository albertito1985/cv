import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import languageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
.use(languageDetector)
.use(HttpApi)
.use(initReactI18next)
.init({
  supportedLngs:['en','es','se'],
  debug: true,
  fallbackLng:"en",
  detection:{
      order:['cookie','htmlTag','path','localStorage', 'subdomain'],
      caches: ['cookie','localStorage']
  },
  backend:{
      loadPath: '/assets/locales/{{lng}}/translation.json'
  },
  react:{useSuspense:true}
});

export default i18n;