// Actions
export const ACTIONS = {
  UPDATE: "onboarding/update",
  CLEAR: "onboarding/clear",
  CLEAR_ONBOARDING: "onboarding/clearOnboarding"
};

// Action Creators
export const update = payload => ({
  type: ACTIONS.UPDATE,
  payload
});

export const clear = payload => ({
    type: ACTIONS.CLEAR
  });

export const clearOnboarding = () => ({
  type: ACTIONS.CLEAR_ONBOARDING,
  payload: {
    email: null,
    password: null,
    firstName: null,
    errorType: null,
    makingRequest: false,
    isValidEmail: false,
    isValidFirstName: false,
    isValidPassword: false,
  }
});

export const noOnboarding = () => ({
  type: ACTIONS.UPDATE,
  payload: {
    completedLocation: true,
    completedNotification: true,
    completedMicAndCamera: true,
  }
});

// Initial State
const initialState = {
  email: null,
  password: null,
  firstName: null,
  errorType: null,
  nativeLangCode: "",
  makingRequest: false,
  isValidEmail: false,
  isValidFirstName: false,
  isValidPassword: false,
  completedLocation: false,
  completedNotification: false,
  completedMicAndCamera: false,
};

// Reducer
const onboardingReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case ACTIONS.UPDATE:
      return { ...state, ...payload };
    case ACTIONS.CLEAR:
      return { ...initialState };
    case ACTIONS.CLEAR_ONBOARDING:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default onboardingReducer;
