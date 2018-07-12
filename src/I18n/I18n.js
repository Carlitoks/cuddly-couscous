import I18n from "react-native-i18n";
import {getLanguages} from "react-native-i18n";
import en from "./Locales/en";
import ja from "./Locales/ja";
import zh_hans from "./Locales/zh-hans";
import zh_hant from "./Locales/zh-hant";

I18n.fallbacks = true;

I18n.translations = {
  es,
  en,
  ja,
  "zh-hans": zh_hans,
  "zh-hant": zh_hant
};

export const strings = (name, params = {}) => I18n.t(name, params);
export const switchLanguage = (lang, component) => {
  I18n.locale = lang;
  component.forceUpdate();
};

export default I18n;

export const strings = (name, params = {}) => I18n.t(name, params);

let locales = [];
let targetLocale = I18n.currentLocale();

const redetectLocales = () => {
  getLanguages().then((locs) => {
    locales = locs;
    for (let loc of fallbackLocales(targetLocale)) {
      locales.unshift(loc);
    }
  });
}

redetectLocales();

export const fallbackLocales = (locale) => {
  let parts = locale.split('-');
  let fallbacks = [];
  for (let i = 0; i < parts.length; i++) {
    fallbacks.push(parts.slice(0, i + 1).join('-').toLowerCase());
  }
  return fallbacks;
}

export const switchLanguage = (lang, component) => {
  I18n.locale = lang;
  targetLocale = lang;
  component.forceUpdate();
  redetectLocales();
};

export const translateProperty = (obj, fieldName) => {
  // this is a temporary hack until the server should standardizes on fields named `<field>I18N`
  const fieldOrder = [fieldName+'I18N', fieldName+'Translations', 'translations'];

  for (let locale of locales) {
    const code = locale.toLowerCase();
    for (let field of fieldOrder) {
      if (obj[field] && obj[field][code]) {
        return obj[field][code];
      }
    }
  }

  // default case - just return the default field name
  if (obj[fieldName]) {
    return obj[fieldName];
  }
  
  return `missing: '${fieldName}'`;
}

export const translateLanguage = (code, defaultStr) => {
  // make sure there actually is at least an english translation of the target lang code
  if (en.languagesList[code]) {
    return I18n.t('languagesList.'+code);
  }
  
  return defaultStr;
}

// generate list of primary languages, returns [{code: "string", i18nKey: "string"}], based on the languages defined in the
// English translated code map
let primaryLanguages = []; // TODO: change to map for lookup
for (const [key, value] of Object.entries(en.languagesList)) {
  primaryLanguages.push({code: key, i18nKey: `languagesList.${key}`});
}
export {primaryLanguages}
