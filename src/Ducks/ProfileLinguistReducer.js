
// Constants

// Actions
export const ACTIONS = {
  CLEAR: "profileLinguist/clear",
  UPDATE: "profileLinguist/update"
};

// Action Creator
export const updateSettings = payload => ({
  type: ACTIONS.UPDATE,
  payload
});


export const GetOptions = () => dispatch => {
  return [
    { language: "English, Mandarin", translates: 34 },
    { language: "English, Spanish", translates: 12 },
    { language: "English, Russian", translates: 2 }
  ]
};

export const clearSettings = () => ({
  type: ACTIONS.CLEAR
});

// Initial State
const initialState = {
  available: false,
  rating: 4.5,
  NumberOfCalls: 28,
  Amount: 493,
  status: "offline",
  Username: "Adele G"
};

// Reducer
const profileLinguistReducer = (state = initialState, action) => {
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

export default profileLinguistReducer;
