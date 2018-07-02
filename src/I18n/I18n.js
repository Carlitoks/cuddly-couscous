import I18n from "react-native-i18n";
import en from "./Locales/en";
import ja from "./Locales/ja";
import zh_hans from "./Locales/zh-hans";
import zh_hant from "./Locales/zh-hant";

I18n.fallbacks = true;

I18n.translations = {
  en,
  ja,
  'zh-hans': zh_hans,
  'zh-hant': zh_hant
};

export const strings = (name, params = {}) => I18n.t(name, params);
export const switchLanguage = (lang, component) => {
  I18n.locale = lang;
  component.forceUpdate();
};

export default I18n;

// generate list of primary languages, returns [{code: "string", i18nKey: "string"}], based on the languages defined in the
// English translated code map
let primaryLanguages = [];
for (const [key, value] of Object.entries(en.languages)) {
  primaryLanguages.push({code: key, i18nKey: `languages.${key}`});
}
export {primaryLanguages}