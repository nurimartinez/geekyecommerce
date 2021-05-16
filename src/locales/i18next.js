import i18next from 'i18next'
import es from './es.json'
import en from './en.json'


export default i18next.init({
  lng: 'es',
  fallbackLng: ["en"],
  debug: false,  
  resources: {
    en,  
    es    
  }
})
