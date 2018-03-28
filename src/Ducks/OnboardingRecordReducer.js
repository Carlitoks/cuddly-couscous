import _find from "lodash/find";
import _filter from "lodash/filter";

// Actions
export const ACTIONS = {
  UPDATE: "onboardingRecord/update",
  RECORD: "onboardingRecord/record",
  REPLACE: "onboardingRecord/replace",
  CLEAR: "onboardingRecord/clear"
};

// Action Creators
export const update = payload => ({
  type: ACTIONS.UPDATE,
  payload
});

export const record = payload => ({
  type: ACTIONS.RECORD,
  payload
});

export const replace = payload => ({
  type: ACTIONS.REPLACE,
  payload
});

export const checkRecord = providedEmail => (dispatch, getState) => {
  const { onboardingRecord: { records }, userProfile: { email } } = getState();

  return providedEmail
    ? _find(records, { email: providedEmail.toLowerCase() })
    : _find(records, { email: email.toLowerCase() });
};

export const removeRecord = () => (dispatch, getState) => {
  const { onboardingRecord: { records }, userProfile, auth } = getState();

  const email = userProfile.email.length === 0 ? auth.email : userProfile.email;

  const filteredRecords = _filter(records, record => {
    return record.email.toLowerCase() !== email.toLowerCase();
  });

  dispatch(replace(filteredRecords));
};

// Initial State
const initialState = {
  records: []
};

// Reducer
const onboardingRecordReducer = (state = initialState, action) => {
  const { payload, type } = action;
  let record = undefined;

  switch (type) {
    case ACTIONS.UPDATE:
      // Find record
      record = _find(state.records, { email: payload.email.toLowerCase() });

      // Filter records
      const filteredRecords = _filter(state.records, record => {
        return record.email.toLowerCase() !== payload.email.toLowerCase();
      });

      // Update record
      const newRecord = { ...record, ...payload };

      // Return state with updated records
      return { ...state, records: [...filteredRecords, newRecord] };

    case ACTIONS.REPLACE:
      return { records: payload };

    case ACTIONS.RECORD:
      record = _find(state.records, { email: payload.email.toLowerCase() });

      return payload.email && payload.email.length > 0 && record === undefined
        ? { ...state, records: [...state.records, payload] }
        : { ...state };

    case ACTIONS.CLEAR:
      return { ...initialState };

    default:
      return state;
  }
};

export default onboardingRecordReducer;