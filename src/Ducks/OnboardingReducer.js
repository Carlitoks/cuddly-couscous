// Actions
export const ACTIONS = {
  UPDATE: "onboarding/update",
  CLEAR: "onboarding/clear"
};

// Action Creators
export const update = payload => ({
  type: ACTIONS.UPDATE,
  payload
});

export const clear = payload => ({
    type: ACTIONS.CLEAR
  });

// Initial State
const initialState = {
  email: null,
  password: null,
  firstName: null,
  errorType: null,
  makingRequest: false,
  isValidEmail: false,
  isValidFirstName: false,
  isValidPassword: false,
};

// Reducer
const onboardingReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case ACTIONS.UPDATE:
      return { ...state, ...payload };
    case ACTIONS.CLEAR:
      return { ...initialState };
    default:
      return state;
  }
};

export default onboardingReducer;
