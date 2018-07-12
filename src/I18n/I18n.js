import I18n from "react-native-i18n";
import en from "./Locales/en";
import es from "./Locales/es";
import zh from "./Locales/zh";
import zhHans from "./Locales/zh-hans";
import zhHant from "./Locales/zh-hant";

I18n.fallbacks = true;

I18n.translations = {
  es,
  en,
  "en-US": en,
  zh,
  "zh-hans": zhHans,
  "zh-hant": zhHant
};

export const strings = (name, params = {}) => I18n.t(name, params);
export const switchLanguage = (lang, component) => {
  I18n.locale = lang;
  component.forceUpdate();
};

export default I18n;
