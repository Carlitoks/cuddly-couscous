import I18n from "react-native-i18n";
import {getLanguages} from "react-native-i18n";
import en from "./Locales/en";
import es from "./Locales/es";
import ja from "./Locales/ja";
import pt from "./Locales/pt";
import fr from "./Locales/fr";
import de from "./Locales/de";
import it from "./Locales/it";
import ko from "./Locales/ko";
import zh_hans from "./Locales/zh-hans";
import zh_hant from "./Locales/zh-hant";

I18n.fallbacks = true;

I18n.translations = {
  en,
  es,
  ja,
  pt,
  fr,
  ko,
  de,
  it,
  "zh-hans": zh_hans,
  "zh-hant": zh_hant
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

// these are raw error strings that come from the api backend.  They are mapped
// to translation keys
const apiErrorsI18N = {
  "both email and password required": "api.errDefaultAuth",
  "user not found": "api.errNoUser",
  "Email not found": "api.errNoEmail",
  "email already in use": "api.errEmailInUse",
  "user already exists": "api.errEmailInUse",
  "Password incorrect": "api.errPasswordIncorrect",
  "authentication required": "api.errAuthRequired",
  "failed to validate event": "api.errEventInvalid",
  "event is not currently available": "api.errEventUnavailable",
  "promo code not found": "api.errEventUnavailable",
  "event is not active": "api.errEventInactive",
  "event requires a scenario to be specified": "api.errEventScenarioMissing",
  "payment details required": "api.errPaymentDetailsRequired",
  "no time remaining": "api.errEventTimeExpired",
  "event already used": "api.errEventAlreadyUsed",
  "code already used": "api.errEventAlreadyUsed",
  "location restricted":"api.errLocationRestricted"
};

export const translateApiErrorString = (str, defaultKey) => {
  if (!!apiErrorsI18N[str]) {
    return I18n.t(apiErrorsI18N[str]);
  }
  if (!!defaultKey) {
    return I18n.t(defaultKey);
  }
  return str;
};

// handle error responses and try to extract
// an error message from the body if present,
// otherwise fall back to a default error message
export const translateApiError = (e, i18nDefaultKey) => {
  // some api error responses might be changed through a series of
  // promises - so it's possible that the return has already
  // been turned into a string
  if ("string" == typeof e) {
    return e;
  }

  // otherwise check for a response error data strcture
  if (e.response && e.response.data && e.response.data.errors) {
    let key = e.response.data.errors[0];
    if (!!apiErrorsI18N[key]) {
      return I18n.t(apiErrorsI18N[key]);
    } else {
      return e.response.data.errors[0];
    }
  }

  if (!!i18nDefaultKey) {
    return I18n.t(i18nDefaultKey);
  }

  return I18n.t('api.errUnexpected');
}

// Localize Currency
// all price objects have the following format:
//
// let price = {
//   amount: 120,
//   currency: "jpy" - lowerCase()
// };

// converts a price IF POSSIBLE, otherwise original is returned.  Returns an object because
// both amount and currencyCode need to be returned
export const convertPrice = (price, targetCurrencyCode, conversionMap = null, exchangeRates = null) => {
  // is there an explicit mapping to the cost in another currency?

  //sanitize object
  price.currency = price.currency.toLowerCase();

  if (!!conversionMap && !!conversionMap[targetCurrencyCode]) {
      return {
          currency: targetCurrencyCode,
          amount: conversionMap[targetCurrencyCode]
      };
  }

  // otherwise do we have an exchange rate we should convert with?
  if (!!exchangeRates && !!exchangeRates[price.currency] && !!exchangeRates[price.currency][targetCurrencyCode]) {
      return {
          currency: targetCurrencyCode,
          amount: price.amount * exchangeRates[price.currency][targetCurrencyCode]
      };
  }

  // otherwise we couldn't convert it, so return the original
  return price;
};

// convert and translate a price to an actual display string
export const localizePrice = (price) => {
  //sanitize object
  price.currency = price.currency.toLowerCase();

  // some currencies have to be converted for display
  const displayOps = {
      usd: (amount) => amount/100,
      jpy: (amount) => amount,
      gbp: (amount) =>  amount/100,
      eur: (amount) =>  amount/100,
      cny: (amount) =>  amount/100,
  };

  let num = price.amount
  if (!!displayOps[price.currency]) {
    num = Number(displayOps[price.currency](num)).toLocaleString(price.currency);
  }
  return i18n.t(`cost.${price.currency}`, {num});
};