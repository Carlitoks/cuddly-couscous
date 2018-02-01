import { Sessions } from "../Api";
import { networkError } from "./NetworkErrorsReducer";
// Actions
export const ACTIONS = {
  CLEAR: "sessionInfo/clear",
  UPDATE: "sessionInfo/update"
};

// Action Creator
export const updateSettings = payload => ({
  type: ACTIONS.UPDATE,
  payload
});

export const GetInfo = () => dispatch => {
  return [
    { information: "London UK", iconName: "ios-pin" },
    { information: "English, Mandarin", iconName: "ios-chatbubbles" },
    { information: "13:28", iconName: "ios-clock" },
    { information: "Aiport lost and found", iconName: "md-help-circle" },
    { information: "$14.04", iconName: "logo-usd" },
  ]
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

const initialState = {
  // to be use when we have the information of the API
  approxMinutes: 0,
  scenario: "None",
  translate: ["English", "Mandarin"],
  estimatedPrice: 0
};

// Reducer
const SessionInfoReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case ACTIONS.UPDATE: {
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