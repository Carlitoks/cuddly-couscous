import { Sessions } from "../Api";
import { updateSettings as updateCallLinguistSettings } from "./CallLinguistSettings";
import { updateSettings as updateProfileLinguist } from "./ProfileLinguistReducer";
import { update as updateTokbox } from "./tokboxReducer";

import { LANG_CODES } from "../Util/Constants";

// Actions
export const ACTIONS = {
  REGISTER: "pushnotification/register"
};

export const remoteNotificationReceived = invitationId => (
  dispatch,
  getState
) => {
  const state = getState();
  const isLinguist = !!state.userProfile.linguistProfile;

  if (
    state.auth.isLoggedIn &&
    invitationId &&
    isLinguist &&
    state.profileLinguist.available
  ) {
    Sessions.linguistFetchesInvite(invitationId, state.auth.token)
      .then(res => {
        const data = res.data;
        dispatch(
          updateCallLinguistSettings({
            invitationID: invitationId
          })
        );
        dispatch(updateTokbox({ sessionID: data.session.id }));
        dispatch(
          updateCallLinguistSettings({
            customerName: data.createdBy
              ? `${data.createdBy.firstName} ${data.createdBy.lastInitial}.`
              : "",
            estimatedMinutes: data.session.estimatedMinutes
              ? `~ ${data.session.estimatedMinutes} mins`
              : data.session.estimatedMinutes,
            languages: `${LANG_CODES.get(
              data.session.primaryLangCode
            )} - ${LANG_CODES.get(data.session.secondaryLangCode)}`
          })
        );
        dispatch({ type: "IncomingCallView" });
      })
      .catch(err => {
        console.log(err);
      });
  }
};

export const registerFCM = payload => ({
  type: ACTIONS.REGISTER,
  payload
});

// Initial State
const initialState = {
  tokenFCM: null
};

// Reducer
const PushNotificationReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case ACTIONS.REGISTER: {
      return {
        ...state,
        ...payload
      };
    }
    default:
      return state;
  }
};

export default PushNotificationReducer;
