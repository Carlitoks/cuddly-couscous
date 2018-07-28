import InCallManager from "react-native-incall-manager";
import {
  EndCall,
  startTimer as startCustomerTimer,
  updateSettings as updateCustomerSettings
} from "./CallCustomerSettings";
import { GetSessionInfoLinguist } from "./SessionInfoReducer";
import {
  clearSettings,
  startTimer as startLinguistTimer,
  updateSettings as updateLinguistSettings
} from "./CallLinguistSettings";
import { Alert } from "react-native";
import { REASON, STATUS_TOKBOX } from "../Util/Constants";
import { Sessions } from "../Api";

const ACTIONS = {
  CLEAR: "tokbox/clear",
  UPDATE: "tokbox/update",
  ERROR: "tokbox/error",
  TOKEVENT: "tokbox/tokboxevent",
  SET_SESSION: "tokbox/setSession"
};

export const clear = () => ({
  type: ACTIONS.CLEAR
});

export const update = payload => ({
  type: ACTIONS.UPDATE,
  payload
});

export const opentok_event = payload => ({
  type: ACTIONS.TOKEVENT,
  payload
});

export const error = error => ({
  type: ACTIONS.ERROR,
  payload: error
});

export const setSession = payload => ({
  type: ACTIONS.SET_SESSION,
  payload
});

const initialState = {
  sessionID: null,
  tokboxID: null,
  tokboxToken: null,
  status: STATUS_TOKBOX.DISCONECTED,
  error: null,
  tokevent: null,
  signal: { data: "", type: "" },
  disabledSubscriber: false,
  customerIsConnected: false,
  linguistIsConnected: false
};

export const connectionConnectedEvent = () => (dispatch, getState) => {
  dispatch(
    opentok_event({
      status: "SESSION_CONNECTED"
    })
  );
  dispatch(
    update({
      signal: { data: "", type: "" }
    })
  );
};

export const connectionDisconnectEvent = event => dispatch => {
  dispatch(
    opentok_event({
      status: "SESSION_DESTROYED"
    })
  );
};

export const signalEvent = event => (dispatch, getState) => {
  const { userProfile, tokbox, auth } = getState();

  dispatch(opentok_event({ status: "ON_SIGNAL_RECEIVED", payload: event }));
  if (!userProfile.linguistProfile && event.type === REASON.DONE) {
    dispatch(EndCall(tokbox.sessionID, REASON.DONE, auth.token));
  }
};

export const sessionDestroyedEvent = event => dispatch => {
  dispatch(
    opentok_event({
      status: "SESSION_DESTROYED",
      payload: event
    })
  );
};

export const streamCreatedEvent = event => async (dispatch, getState) => {
  const { tokbox, auth, userProfile } = getState();
  dispatch(
    update({
      status: STATUS_TOKBOX.STREAM
    })
  );
  if (!userProfile.linguistProfile) {
    dispatch(GetSessionInfoLinguist(tokbox.sessionID, auth.token));
    console.log("Speaker");
    await InCallManager.start({ media: "audio" });
    await InCallManager.setForceSpeakerphoneOn(true);
  }
};

export const streamDestroyedEvent = event => (dispatch, getState) => {
  const {
    userProfile,
    callLinguistSettings,
    auth,
    callCustomerSettings
  } = getState();
  dispatch(
    update({
      status: STATUS_TOKBOX.DESTROY
    })
  );
  if (!!userProfile.linguistProfile) {
    Sessions.linguistFetchesInvite(
      callLinguistSettings.invitationID,
      auth.token
    )
      .then(response => {
        const res = response.data;
        dispatch({ type: "RateView" });
      })
      .catch(err => {
        console.log(err.response);
        dispatch(clearSettings());
        dispatch(clear());
        dispatch({ type: "Home" });
      });
  } else {
    dispatch({ type: "RateView" });
  }
};

export const errorEvent = event => dispatch => {
  dispatch(
    opentok_event({
      status: "ERROR",
      payload: event
    })
  );
};

//TODO: Publisher events - move to file

export const publisherStart = () => async (dispatch, getState) => {
  const { userProfile } = getState();
  if (userProfile.linguistProfile) {
    console.log("Speaker");
    await InCallManager.start({ media: "audio" });
    await InCallManager.setForceSpeakerphoneOn(true);
  }
};

//TODO: Subscriber events - move to session events

export const subscriberStart = () => async (dispatch, getState) => {
  const { userProfile, contactLinguist } = getState();
  if (userProfile.linguistProfile) {
    dispatch(startLinguistTimer());
  } else {
    clearInterval(contactLinguist.counterId);
    dispatch(startCustomerTimer());
  }
};

export const videoState = state => (dispatch, getState) => {
  const { userProfile } = getState();
  dispatch(update({ disabledSubscriber: state }));
};

export const sendSignal = (reason, data) => dispatch => {
  dispatch(
    update({
      signal: {
        type: reason,
        data: data
      }
    })
  );
};

export const clearTokboxStatus = event => dispatch => {
  dispatch(
    update({
      status: STATUS_TOKBOX.DISCONECTED
    })
  );
};

const tokboxReducer = (state = initialState, action = {}) => {
  const { payload, type } = action;

  switch (type) {
    case ACTIONS.CLEAR: {
      return { ...initialState };
    }

    case ACTIONS.UPDATE: {
      return { ...state, ...payload };
    }

    case ACTIONS.TOKEVENT: {
      return { ...state, tokevent: payload };
    }

    case ACTIONS.SET_SESSION: {
      return {
        ...state,
        tokboxID: payload.tokboxSessionID,
        tokboxToken: payload.tokboxSessionToken,
        sessionID: payload.sessionID
      };
    }

    default: {
      return state;
    }
  }
};

export default tokboxReducer;
