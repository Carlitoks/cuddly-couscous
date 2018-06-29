import I18n from "react-native-i18n";
import en from "./Locales/en";
import es from "./Locales/es";

I18n.fallbacks = true;

I18n.translations = {
  en,
  es
};

export default I18n;
