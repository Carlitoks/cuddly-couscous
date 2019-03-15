import { Session } from "../Api";
import { networkError } from "./NetworkErrorsReducer";
import {
  SupportedLanguages,
  ComingSoonLanguages,
  AllowedLanguagePairs,
  FilterLangsByCodes, LanguagesRollover
} from "../Config/Languages";
import timer from "react-native-timer";
import { REASON, SOUNDS } from "../Util/Constants";
import { resetCounter, updateSettings as updateContactLinguist } from "./ContactLinguistReducer";
import { BackgroundCleanInterval } from "../Util/Background";
import { cleanNotifications } from "../Util/PushNotification";
import { playSound } from "../Util/SoundManager";
import {
  HandleEndCall,
  resetTimerAsync,
  update as updateActieSessionReducer
} from "./ActiveSessionReducer";

const ACTIONS = {
  CLEAR: "newSession/clear",
  UPDATE: "newSession/update",
  OPEN_SLIDE_MENU: "newSession/openSlideMenu",
  CLOSE_SLIDE_MENU: "newSession/closeSlideMenu",
  CHANGE_SESSION_LANG_CODE: "newSession/changeSessionLangCode",
  MODIFY_ADDITIONAL_INFO: "newSession/modifyAdditionalInfo",
  MODIFY_LOCATION: "newSession/modifyLocation",
  SWAP_LANGUAGES: "newSession/swapLanguages",
  CLEAN_AND_KEEP_LANG: "newSession/cleanAndKeepLang"
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

export const openSlideMenu = payload => {
  return {
    type: ACTIONS.OPEN_SLIDE_MENU,
    payload
  };
};

export const closeSlideMenu = payload => ({
  type: ACTIONS.CLOSE_SLIDE_MENU,
  payload
});

export const changeSessionLangCode = payload => ({
  type: ACTIONS.CHANGE_SESSION_LANG_CODE,
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

export const cleanReducerAndKeepLangConfig = payload => (
  dispatch,
  getState
) => {
  const currentSession = getState().newSessionReducer.session;
  newSession = {
    ...initialState.session,
    primaryLangCode: currentSession.primaryLangCode,
    secondaryLangCode: currentSession.secondaryLangCode
  };
  newState = {
    ...initialState,
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

export const ensureSessionDefaults = payload => (dispatch, getState) => {
  currentSessionState = {
    ...getState().newSessionReducer.session,
    primaryLangCode: payload.primaryLangCode
  };

  dispatch(changeSessionLangCode(currentSessionState));
};

export const changeLangCode = payload => (dispatch, getState) => {
  if (getState().newSessionReducer.langCodeSelection === "secondaryLang") {
    currentSessionState = {
      ...getState().newSessionReducer.session,
      secondaryLangCode: payload.langCode
    };
  } else if (getState().newSessionReducer.langCodeSelection === "primaryLang") {
    currentSessionState = {
      ...getState().newSessionReducer.session,
      primaryLangCode: payload.langCode,
      secondaryLangCode: ""
    };
  }

  dispatch(changeSessionLangCode(currentSessionState));
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

export const switchCallLang = (reason) => (dispatch, getState) => {
  const { contactLinguist, activeSessionReducer, auth } = getState();
  const { primaryLangCode, secondaryLangCode } = getState().newSessionReducer.session;
  try {
    timer.clearInterval("counterId");
    timer.clearInterval("timer");
    timer.clearInterval("verifyCallId");
    dispatch(
      updateContactLinguist({
        modalContact: false
      })
    );
    dispatch(resetCounter());
    BackgroundCleanInterval(activeSessionReducer.timer);
    dispatch(resetTimerAsync());
    cleanNotifications();
    dispatch(updateActieSessionReducer({ modalReconnect: false }));
    const currentSessionState = {
      ...getState().newSessionReducer.session,
      secondaryLangCode: LanguagesRollover[secondaryLangCode] ? LanguagesRollover[secondaryLangCode] : secondaryLangCode,
      primaryLangCode: LanguagesRollover[primaryLangCode] ? LanguagesRollover[primaryLangCode] : primaryLangCode
    };

    dispatch(swapLanguages(currentSessionState));
  } catch (e) {
    console.log(e);
  }
};

const initialState = {
  // this should map exactly to the data structure for `POST /sessions`
  // this is the object you pass to `ActiveSessionReducer.createAndJoinSession()` when the session
  // gets created
  availableLanguages: SupportedLanguages,
  comingSoonLanguages: ComingSoonLanguages,
  languagePair: [],
  langCodeSelection: null,
  isSlideUpMenuVisible: false,
  session: {
    type: "",
    matchMethod: "",
    primaryLangCode: "",
    secondaryLangCode: "",
    avModePreference: null,
    eventID: null,
    scenarioID: null,
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
  }

  /* etc... */
};

const newSessionReducer = (state = initialState, action = {}) => {
  const { payload, type } = action;
  switch (type) {
    case ACTIONS.CLEAR: {
      return { ...initialState };
    }
    case ACTIONS.UPDATE: {
      return { ...state, ...payload };
    }
    case ACTIONS.OPEN_SLIDE_MENU: {
      return {
        ...state,
        isSlideUpMenuVisible: true,
        langCodeSelection: payload.type
      };
    }
    case ACTIONS.CLOSE_SLIDE_MENU: {
      return {
        ...state,
        isSlideUpMenuVisible: false
      };
    }
    case ACTIONS.CHANGE_SESSION_LANG_CODE: {
      return {
        ...state,
        session: payload,
        isSlideUpMenuVisible: false
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
      return { ...initialState, ...payload };
    }
    default: {
      return state;
    }
  }
};

export default newSessionReducer;
