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
  UPDATE: "contactLinguist/update"
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
  timeOptions: 6, // Ammount of options on the Picker
  selectedTime: 10, // Initial time selected: 10 min
  cost: 7, // Per Minute

  // Assistance
  searchAssistance: "",
  selectedAssistance: ""
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
