import { Sessions } from "../Api";
import { networkError } from "./NetworkErrorsReducer";
// Actions
export const ACTIONS = {
  CLEAR: "sessionInfo/clear",
  UPDATESESSION: "sessionInfo/updateSessionInfo",
  GET_LINGUIST: "sessionInfo/linguist"
};

// Action Creator
export const updateSessionInfo = payload => ({
  type: ACTIONS.UPDATESESSION,
  payload
});

export const updateLinguist = payload => ({
  type: ACTIONS.GET_LINGUIST,
  payload
});

export const GetInfo = () => dispatch => {
  return [
    { information: "London UK", iconName: "ios-pin" },
    { information: "English, Mandarin", iconName: "ios-chatbubbles" },
    { information: "13:28", iconName: "ios-clock" },
    { information: "Aiport lost and found", iconName: "md-help-circle" },
    { information: "$14.04", iconName: "logo-usd" }
  ];
};

// Method to call the API when this is ready

export const getSessionInfo = (sessionID, token) => dispatch => {
  console.log("here");
  return Sessions.GetSessionInfo(sessionID, token)
    .then(response => {
      console.log(response);
      // return dispatch(
      //   logIn({
      //     token: response.data.token,
      //     uuid: response.data.id
      //   })
      // );
    })
    .catch(error => {
      dispatch(networkError(error));
    });
};

export const GetSessionInfoLinguist = (sessionID, token) => dispatch => {
  return Sessions.GetSessionInfoLinguist(sessionID, token)
    .then(response => {
      return dispatch(updateLinguist(response.data));
    })
    .catch(error => {
      return dispatch(networkError(error));
    });
};

const initialState = {
  // to be use when we have the information of the API
  approxMinutes: 0,
  scenario: "None",
  translate: ["English", "Mandarin"],
  estimatedPrice: 0,
  info: {}
};

// Reducer
const SessionInfoReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case ACTIONS.UPDATESESSION: {
      return { ...state, info: payload };
    }
    case ACTIONS.GET_LINGUIST: {
      return {
        ...state,
        ...payload
      };
    }
    default:
      return state;
  }
};

export default SessionInfoReducer;