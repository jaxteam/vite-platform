import i18next from 'i18next';
import {
    initReactI18next
  } from 'react-i18next';

i18next.use(initReactI18next).init({
    lng: 'en',
    debug: true,
    resources: {
        en: {
            translation: {
                "key": "hello world",
                "GLOBAL.EDIT":"编辑",
                "GLOBAL.REMOVE":"删除"
            }
        }
    }
});

// console.log(i18next.t("GLOBAL.EDIT"))


export default i18next