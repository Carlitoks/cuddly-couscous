import OpenTok from "react-native-opentok";
import { EndCall } from "./CallCustomerSettings";
import { updateSettings } from "./ContactLinguistReducer";
import { clearSettings } from "./CallLinguistSettings";
import { REASON, STATUS_TOKBOX, TOKBOX_EVENTS } from "../Util/Constants";
import { Sessions } from "../Api";
import InCallManager from "react-native-incall-manager";
import _isUndefined from "lodash/isUndefined";
import SoundManager from "../Util/SoundManager";

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
  disabledSubscriber: false
};
export const tokConnect = (id, token) => (dispatch, getState) => {
  const state = getState();
  const isLinguist = !!state.userProfile.linguistProfile;
  const isCustomer = !isLinguist;

  OpenTok.connect(id, token)
    .then(response => {
      dispatch(
        update({
          tokboxID: id,
          tokboxToken: token,
          status: STATUS_TOKBOX.CONECTED,
          error: null
        })
      );
    })
    .catch(error => {
      dispatch(
        update({
          tokboxID: id,
          tokboxToken: token,
          status: STATUS_TOKBOX.ERROR,
          error: null
        })
      );
    });

  OpenTok.on(OpenTok.events.ON_SIGNAL_RECEIVED, event => {
    console.log("ON_SIGNAL_RECEIVED", event);

    const { TOGGLE_VIDEO_LINGUIST, TOGGLE_VIDEO_CUSTOMER } = TOKBOX_EVENTS;

    const eventToggleLinguist = event.type === TOGGLE_VIDEO_LINGUIST;
    const eventToggleCustomer = event.type === TOGGLE_VIDEO_CUSTOMER;

    const eventToggleVideo = eventToggleLinguist || eventToggleCustomer;

    const linguistToggle = eventToggleLinguist && isCustomer;
    const customerToggle = eventToggleCustomer && isLinguist;

    if (eventToggleVideo) {
      if (linguistToggle || customerToggle) {
        console.log("toggle video");

        dispatch(
          update({
            disabledSubscriber: event.data.toLowerCase() === "true"
          })
        );
      }
    } else {
      dispatch(opentok_event({ status: "ON_SIGNAL_RECEIVED", payload: event }));

      if (
        !isLinguist &&
        event.type !== TOGGLE_VIDEO_LINGUIST &&
        event.type !== TOGGLE_VIDEO_CUSTOMER
      ) {
        dispatch(
          EndCall(state.tokbox.sessionID, REASON.DONE, state.auth.token)
        );
        dispatch(tokDisConnect(state.tokbox.tokboxID));
      }
    }
  });

  OpenTok.on(OpenTok.events.ON_SESSION_CONNECTION_CREATED, e => {
    console.log("ON_SESSION_CONNECTION_CREATED", e);

    dispatch(
      opentok_event({
        status: "ON_SESSION_CONNECTION_CREATED",
        payload: e
      })
    );

    if (isLinguist) {
      //
    } else {
      //
    }
  });

  OpenTok.on(OpenTok.events.ON_SESSION_CONNECTION_DESTROYED, e => {
    console.log("ON_SESSION_CONNECTION_DESTROYED", e);
    dispatch(
      opentok_event({
        status: "ON_SESSION_CONNECTION_DESTROYED",
        payload: e
      })
    );

    if (isLinguist) {
      //
    } else {
      //
    }
  });

  OpenTok.on(OpenTok.events.ON_SESSION_STREAM_CREATED, e => {
    console.log("ON_SESSION_STREAM_CREATED", e);

    if (isLinguist) {
      //
    } else {
      InCallManager.start({ media: "audio" });
      InCallManager.setForceSpeakerphoneOn(true);
      dispatch(updateSettings({ modalReconnect: false }));
      dispatch(
        update({
          status: STATUS_TOKBOX.STREAM
        })
      );
    }
  });

  OpenTok.on(OpenTok.events.ON_SESSION_STREAM_DESTROYED, e => {
    console.log("ON_SESSION_STREAM_DESTROYED", e);

    if (isLinguist) {
      const { callLinguistSettings, auth } = getState();
      Sessions.linguistFetchesInvite(
        callLinguistSettings.invitationID,
        auth.token
      )
        .then(response => {
          const res = response.data;
          if (!res.session.endReason) {
            //
          } else if (res.session.endReason === REASON.DONE) {
            dispatch({ type: "RateView" });
          } else {
            dispatch(clearSettings());
            dispatch(clear());
            dispatch({ type: "Home" });
          }
        })
        .catch(err => {
          console.log(err.response);
        });
    }
  });

  OpenTok.on(OpenTok.events.ON_SESSION_DID_CONNECT, e => {
    console.log("ON_SESSION_DID_CONNECT", e);
    dispatch(
      opentok_event({
        status: "ON_SESSION_DID_CONNECT",
        payload: e
      })
    );

    if (isLinguist) {
      //
    } else {
      //
    }
  });

  OpenTok.on(OpenTok.events.ON_SESSION_DID_DISCONNECT, e => {
    console.log("ON_SESSION_DID_DISCONNECT", e);
    dispatch(
      opentok_event({
        status: "ON_SESSION_DID_DISCONNECT",
        payload: e
      })
    );

    if (isLinguist) {
      // linguist
    }
  });

  OpenTok.on(OpenTok.events.ON_SESSION_DID_FAIL_WITH_ERROR, e => {
    console.log("ON_SESSION_DID_FAIL_WITH_ERROR", e);
    dispatch(update({ error: e }));
    dispatch(
      opentok_event({
        status: "ON_SESSION_DID_FAIL_WITH_ERROR",
        payload: e
      })
    );
  });
};

export const tokDisConnect = id => (dispatch, getState) => {
  OpenTok.disconnect(id);
  OpenTok.removeListener(OpenTok.events.ON_SIGNAL_RECEIVED);
  OpenTok.removeListener(OpenTok.events.ON_SESSION_CONNECTION_CREATED);
  OpenTok.removeListener(OpenTok.events.ON_SESSION_CONNECTION_DESTROYED);
  OpenTok.removeListener(OpenTok.events.ON_SESSION_STREAM_CREATED);
  OpenTok.removeListener(OpenTok.events.ON_SESSION_STREAM_DESTROYED);
  OpenTok.removeListener(OpenTok.events.ON_SESSION_DID_CONNECT);
  OpenTok.removeListener(OpenTok.events.ON_SESSION_DID_DISCONNECT);
  OpenTok.removeListener(OpenTok.events.ON_SESSION_DID_FAIL_WITH_ERROR);

  dispatch(
    update({
      tokboxID: null,
      tokboxToken: null,
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
