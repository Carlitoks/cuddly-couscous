import { Sessions } from '../Api';

// EXAMPLE DUCK

// Constants

export const LANGUAGE_LIST = [
  "English",
  "Spanish",
  "Russian",
  "German",
  "Portugal",
  "French",
  "Esperanto"
];

export const ASSITANCE_LIST = [
  "Aiport - Customer Service",
  "Airport - Check-In",
  "Hotel - Customer Service",
  "Hotel - Check-In",
  "Taxi"
];

// Actions
export const ACTIONS = {
  CLEAR: "contactLinguist/clear",
  UPDATE: "contactLinguist/update",
  ENDSESSION: "contactLinguist/endSession"
};

// Action Creator
export const updateSettings = payload => ({
  type: ACTIONS.UPDATE,
  payload
});

export const clearSettings = () => ({
  type: ACTIONS.CLEAR
});

// Initial State
const initialState = {
  // Language
  searchLanguage: "",
  selectedLanguage: "",

  // Time
  timeOptions: 12, // Ammount of options on the Picker
  selectedTime: 10, // Initial time selected: 10 min
  cost: 7, // Per Minute

  // Assistance
  searchAssistance: "",
  selectedAssistance: ""
};

export const endSession = () => ({ type: ACTIONS.ENDSESSION });

export const EndCall = (sessionID, reason, token) => dispatch => {
  Sessions.EndSession(sessionID, { reason: "done" }, token)
    .then(response => {
      dispatch(endSession("done"));
    })
    .catch(error => {
      console.log(error);
    });
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

    default:
      return state;
  }
};

export default contactLinguistReducer;
