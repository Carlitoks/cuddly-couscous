import { Sessions, Scenarios } from "../Api";
import { networkError } from "./NetworkErrorsReducer";
import { REASON } from "../Util/Constants";
import I18n from "../I18n/I18n";

export const getAssistanceList = token => dispatch => {
  return Scenarios.get(token)
    .then(response => {
      return dispatch(updateSettings({ assistanceList: response.data }));
    })
    .catch(error => dispatch(networkError(error)));
};

// Actions
export const ACTIONS = {
  CLEAR: "contactLinguist/clear",
  UPDATE: "contactLinguist/update",
  ENDSESSION: "contactLinguist/endSession",
  INCREMENT_COUNTER: "contactLinguist/incrementCounter",
  RESET_COUNTER: "contactLinguist/resetCounter",
  INCREMENT_RECONNECT_COUNTER: "contactLinguist/incrementReconnectCounter",
  RESET_RECONNECT_COUNTER: "contactLinguist/resetReconnectCounter"
};

// Action Creator
export const updateSettings = payload => ({
  type: ACTIONS.UPDATE,
  payload
});

export const clearSettings = () => ({
  type: ACTIONS.CLEAR
});

export const incrementCounter = () => ({
  type: ACTIONS.INCREMENT_COUNTER
});

export const incrementReconnectCounter = () => ({
  type: ACTIONS.INCREMENT_RECONNECT_COUNTER
});

export const resetCounter = () => ({
  type: ACTIONS.RESET_COUNTER
});
export const resetReconnectCounter = () => ({
  type: ACTIONS.RESET_RECONNECT_COUNTER
});

// Initial State
const initialState = {
  // Language
  assistanceList: [],
  searchLanguage: "",

  // Time
  timeOptions: 12, // Ammount of options on the Picker
  selectedTime: 10, // Initial time selected: 10 min
  cost: 0, // Per Minute

  // Assistance
  searchAssistance: "",
  selectedAssistance: "",
  selectedScenarioId: "",
  customScenarioNote: "",
  selectedLanguage: "",
  selectedLanguageFrom: "",
  selectedLanguageTo: "",
  selectedLanguageCode: "",
  primaryLangCode: "",
  secundaryLangCode: "",
  modalContact: false,
  // reconnect modal
  counter: 0,
  counterId: null,
  modalReconnect: false,
  modalReconnectCounter: 0,
  modalReconnectCounterId: null,
  messageReconnect: "",

  connectingMessage: I18n.t("contactingLinguist")
};

export const updateConnectingMessage = ({ firstName, lastInitial }) => (
  dispatch,
  getState
) => {
  const connectingMessage = I18n.t("isConnecting", {firstName, lastInitial});

  dispatch(
    updateSettings({
      connectingMessage
    })
  );
};

export const resetConnectingMessage = () => (dispatch, getState) => {
  dispatch(
    updateSettings({
      connectingMessage: I18n.t("contactingLinguist")
    })
  );
};

export const endSession = () => ({ type: ACTIONS.ENDSESSION });

export const EndCall = (sessionID, reason, token) => dispatch => {
  Sessions.EndSession(sessionID, { reason: REASON.DONE }, token)
    .then(response => {
      dispatch(endSession(REASON.DONE));
    })
    .catch(error => dispatch(networkError(error)));
};

// Reducer
const contactLinguistReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case ACTIONS.UPDATE: {
      return {
        ...state,
        ...payload
      };
    }
    case ACTIONS.ENDSESSION: {
      return {
        ...state,
        reason: payload
      };
    }

    case ACTIONS.CLEAR: {
      return {
        ...initialState
      };
    }

    case ACTIONS.INCREMENT_COUNTER: {
      return {
        ...state,
        counter: state.counter + 1
      };
    }

    case ACTIONS.RESET_COUNTER: {
      return {
        ...state,
        counter: 0,
        counterId: null
      };
    }

    case ACTIONS.INCREMENT_RECONNECT_COUNTER: {
      return {
        ...state,
        modalReconnectCounter: state.modalReconnectCounter + 1
      };
    }

    case ACTIONS.RESET_RECONNECT_COUNTER: {
      return {
        ...state,
        modalReconnectCounter: 0,
        modalReconnectCounterId: null
      };
    }

    default:
      return state;
  }
};

export default contactLinguistReducer;
