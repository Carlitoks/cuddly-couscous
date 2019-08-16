import {
  SupportedLanguages,
  ComingSoonLanguages,
  AllowedLanguagePairs,
  LanguagesRollover,
  getLangForCity, supportedLangCodes, LocaleLangMap
} from "../Config/Languages";
import { Alert } from "react-native";
import I18n, { translateApiErrorString } from "../I18n/I18n";
import { createNewSession } from "./CurrentSessionReducer";
import navReducer from "./NavigationReducer";

const ACTIONS = {
  CLEAR: "newSession/clear",
  UPDATE: "newSession/update",
  CHANGE_SESSION_LANG_CODE: "newSession/changeSessionLangCode",
  MODIFY_ADDITIONAL_INFO: "newSession/modifyAdditionalInfo",
  MODIFY_LOCATION: "newSession/modifyLocation",
  SWAP_LANGUAGES: "newSession/swapLanguages",
  CLEAN_AND_KEEP_LANG: "newSession/cleanAndKeepLang",
  UPDATE_SCENARIO_ID: "newSession/updateScenarioID"
};

export const clear = payload => {
  return {
    type: ACTIONS.CLEAR,
    payload
  };
};

export const update = payload => {
  return {
    type: ACTIONS.UPDATE,
    payload
  };
};

export const changeSessionLangCode = payload => ({
  type: ACTIONS.CHANGE_SESSION_LANG_CODE,
  payload
});

export const changeSessionScenarioID = payload => ({
  type: ACTIONS.UPDATE_SCENARIO_ID,
  payload
});

export const modifyAdditionalInfo = payload => ({
  type: ACTIONS.MODIFY_ADDITIONAL_INFO,
  payload
});

export const modifyLocation = payload => ({
  type: ACTIONS.MODIFY_LOCATION,
  payload
});

export const swapLanguages = payload => ({
  type: ACTIONS.SWAP_LANGUAGES,
  payload
});

export const cleanAndKeep = payload => ({
  type: ACTIONS.CLEAN_AND_KEEP_LANG,
  payload
});

export const cleanReducerAndKeepLangConfig = payload => (dispatch, getState) => {
  const currentSession = getState().newSessionReducer.session;
  newSession = {
    ...initState().session,
    primaryLangCode: currentSession.primaryLangCode,
    secondaryLangCode: currentSession.secondaryLangCode
  };
  newState = {
    ...initState(),
    session: newSession
  };
  dispatch(cleanAndKeep(newState));
};

export const cleanReducerAndUpdateSession = payload => (dispatch, getState) => {
  newSession = {
    ...initState().session,
    ...payload,
    type: "immediate_virtual",
    matchMethod: "first_available"
  };
  newState = {
    ...initState(),
    session: newSession
  };
  dispatch(cleanAndKeep(newState));
};

export const modifyAdditionalDetails = payload => (dispatch, getState) => {
  currentSessionState = {
    ...getState().newSessionReducer.session,
    customScenarioNote: payload.customScenarioNote
  };

  dispatch(modifyAdditionalInfo(currentSessionState));
};

export const modifyAVModePreference = payload => (dispatch, getState) => {
  currentSessionState = {
    ...getState().newSessionReducer.session,
    avModePreference: payload.avModePreference
  };

  currentState = {
    ...getState().newSessionReducer,
    session: currentSessionState
  };

  dispatch(update(currentState));
};

const guessPrimaryLangCode = (primaryLangCode, nativeLangCode, settings) => {
  if (primaryLangCode) {
    return primaryLangCode;
  }
  if(settings)
    if(settings.userLocaleSet)
      return LocaleLangMap[settings.interfaceLocale["1"]] || "eng";
  if (nativeLangCode) {
    return LocaleLangMap[nativeLangCode] || "eng";
  }
  return "eng";
};

export const ensureSessionDefaults = payload => (dispatch, getState) => {
  const currentSession = getState().newSessionReducer.session;
  const settings = getState().settings;
  const currentSessionState = {
    ...getState().newSessionReducer.session,
    primaryLangCode: guessPrimaryLangCode(currentSession.primaryLangCode, currentSession.nativeLangCode, settings),
    type: "immediate_virtual",
    matchMethod: "first_available"
  };

  dispatch(guessSecondaryLangCode());
  dispatch(changeSessionLangCode(currentSessionState));
};

export const changeLangCode = payload => (dispatch, getState) => {
  if (getState().LogicReducer.selection === "secondaryLang") {
    currentSessionState = {
      ...getState().newSessionReducer.session,
      secondaryLangCode: payload.langCode
    };
  } else if (getState().LogicReducer.selection === "primaryLang") {
    currentSessionState = {
      ...getState().newSessionReducer.session,
      primaryLangCode: payload.langCode,
      secondaryLangCode: ""
    };
  }
  dispatch(changeSessionLangCode(currentSessionState));
};

export const updateSelectedScenario = payload => (dispatch, getState) => {
  if (payload.scenarioID === "custom") {
    currentSessionState = {
      ...getState().newSessionReducer.session,
      scenarioID: payload.scenarioID,
      customScenarioSelected: "custom"
    };
  } else {
    currentSessionState = {
      ...getState().newSessionReducer.session,
      scenarioID: payload.scenarioID,
      customScenarioSelected: "notCustom"
    };
  }

  dispatch(changeSessionScenarioID(currentSessionState));
};
export const updateLocation = payload => (dispatch, getState) => {
  currentSessionState = {
    ...getState().newSessionReducer.session,
    location: payload.location
  };
  dispatch(modifyLocation(currentSessionState));
};

export const swapCurrentSessionLanguages = () => (dispatch, getState) => {
  const currentState = getState().newSessionReducer.session;
  const currentSessionState = {
    ...currentState,
    primaryLangCode: currentState.secondaryLangCode,
    secondaryLangCode: currentState.primaryLangCode
  };
  dispatch(swapLanguages(currentSessionState));
};

// preselect a secondary language for the session based on the primary language, available
// language config, and the users location, if available
export const guessSecondaryLangCode = () => (dispatch, getState) => {
  const {user} = getState().account;
  const {session} = getState().newSessionReducer;
  const {primaryLangCode} = session;
  let secondaryLangCode = false;

  // can't guess if there's no primary language, or no configuration for the lang pairs
  if (!primaryLangCode || !AllowedLanguagePairs[primaryLangCode]) {
    return;
  }

  // if there's only one supported target language then use it
  if (!!AllowedLanguagePairs[primaryLangCode] && AllowedLanguagePairs[primaryLangCode].length === 1) {
    secondaryLangCode = AllowedLanguagePairs[primaryLangCode][0];
  }

  if(user){
    // maybe we have a recent geo location for the user, so guess based on that
    if (!secondaryLangCode && !!user.lastGeolocation) {
      const code = getLangForCity(user.lastGeolocation);
      if (code !== primaryLangCode && !!AllowedLanguagePairs[primaryLangCode].indexOf(code) !== -1) {
        secondaryLangCode = code;
      }
    }

    // otherwise try to guess from last IP location if available
    if (!secondaryLangCode && !!!user.lastIPLocation) {
      const code = getLangForCity(user.lastIPLocation);
      if (code !== primaryLangCode && !!AllowedLanguagePairs[primaryLangCode].indexOf(code) !== -1) {
        secondaryLangCode = code;
      }
    }
  }

  // if came up with something, update the session
  if (!!secondaryLangCode) {
    dispatch(update({session: {
        ...session,
        secondaryLangCode
      }}));
  }
};

// set the event for the session and enforce any session
// properties defined by the event
export const setEvent = (evt) => (dispatch, getState) => {
  const {session, options} = getState().newSessionReducer;
  let ns = {
    session: { ...session },
    options: { ...options },
    event: evt,
  };

  ns.session.eventID = evt.id;
  if (!!evt.primaryLangCode) {
    ns.session.primaryLangCode = evt.primaryLangCode;
  }
  if (!!evt.secondaryLangCode) {
    ns.session.secondaryLangCode = evt.secondaryLangCode;
  }
  if (!!evt.defaultSecondaryLangCode) {
    ns.session.secondaryLangCode = evt.defaultSecondaryLangCode;
  }
  if (!!evt.defaultScenarioID) {
    ns.session.scenarioID = evt.defaultScenarioID;
  }

  dispatch(update(ns));

  return ns;
};

export const sessionSelector = () => (dispatch, getState) => getState().newSessionReducer.session;

// remove the event, which is basically a reset to the default
// new session properties
export const clearEvent = () => (dispatch, getState) => {
  dispatch(clear());
  dispatch(ensureSessionDefaults());
};

const initState = () => ({
  // this should map exactly to the data structure for `POST /sessions`
  // this is the object you pass to `ActiveSessionReducer.createAndJoinSession()` when the session
  // gets created
  availableLanguages: SupportedLanguages,
  comingSoonLanguages: ComingSoonLanguages,
  languagePair: [],
  session: {
    type: "",
    matchMethod: "",
    primaryLangCode: "",
    secondaryLangCode: "",
    avModePreference: null,
    eventID: null,
    scenarioID: null,
    customScenarioSelected: "",
    customScenarioNote: "",
    location: [null, null]
    /* etc... */
  },

  // parameters for configuring certain parts of the UI - this is NOT meant to be specific to certain screens, it's
  // meant to be general configuration that could apply to multiple screens
  options: {
    hasEvent: false,
    allowPrimaryLanguageSelection: true,
    allowSecondaryLangSelection: true,
    allowCategorySelection: true,
    allowScenarioSelection: true,
    availablePrimaryLangs: [],
    availableSecondaryLangs: [],

    // payment and time settings
    requirePaymentDetails: false,
    maxCallTime: 0
  },

  // the event object from the API as is
  event: null

  /* etc... */
});

const newSessionReducer = (state = null, action = {}) => {
  const { payload, type } = action;
  switch (type) {
    case ACTIONS.CLEAR: {
      return { ...initState() };
    }
    case ACTIONS.UPDATE: {
      return { ...(state || initState()), ...payload };
    }
    case ACTIONS.CHANGE_SESSION_LANG_CODE: {
      return {
        ...state,
        session: payload
      };
    }
    case ACTIONS.MODIFY_ADDITIONAL_INFO: {
      return {
        ...state,
        session: payload
      };
    }
    case ACTIONS.MODIFY_LOCATION: {
      return {
        ...state,
        session: payload
      };
    }
    case ACTIONS.SWAP_LANGUAGES: {
      return {
        ...state,
        session: payload
      };
    }
    case ACTIONS.CLEAN_AND_KEEP_LANG: {
      return { ...initState(), ...payload };
    }
    case ACTIONS.UPDATE_SCENARIO_ID: {
      return {
        ...state,
        session: payload,
        isSlideUpMenuVisible: false
      };
    }
    default: {
      return state || initState();
    }
  }
};

export default newSessionReducer;
