import I18n from "react-native-i18n";
import en from "./Locales/en";

I18n.fallbacks = true;

I18n.translations = {
  en
};

export const strings = (name, params = {}) => I18n.t(name, params);
export const switchLanguage = (lang, component) => {
  I18n.locale = lang;
  component.forceUpdate();
};

export default I18n;
