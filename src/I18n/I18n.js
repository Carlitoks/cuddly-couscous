import I18n from "react-native-i18n";
import {getLanguages} from "react-native-i18n";
import en from "./Locales/en";
import ja from "./Locales/ja";
import zh_hans from "./Locales/zh-hans";
import zh_hant from "./Locales/zh-hant";

I18n.fallbacks = true;

I18n.translations = {
  en,
  ja,
  "zh-hans": zh_hans,
  "zh-hant": zh_hant
};

export const strings = (name, params = {}) => I18n.t(name, params);

let locales = getLanguages();
export const switchLanguage = (lang, component) => {
  I18n.locale = lang;
  component.forceUpdate();
  locales = getLanguages();
};

export default I18n;

export const translateProperty = (obj, fieldName) => {
  const fieldOrder = [fieldName+'I18N', fieldName+'Translations'];
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
