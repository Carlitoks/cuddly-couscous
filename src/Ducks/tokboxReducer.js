import OpenTok from "react-native-opentok";
import { EndCall } from "./CallCustomerSettings";
import { resetTimerAsync, clearSettings } from "./CallLinguistSettings";

const ACTIONS = {
  CLEAR: "tokbox/clear",
  UPDATE: "tokbox/update",
  ERROR: "tokbox/error",
  TOKEVENT: "tokbox/tokboxevent"
};

const STATUS = {
  DISCONECTED: 0,
  CONECTED: 1,
  ERROR: 2,
  STREAM: 3
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

const initialState = {
  tokboxID: "",
  tokboxToken: "",
  status: STATUS.DISCONECTED,
  error: null,
  tokevent: null
};
export const tokConnect = (id, token) => (dispatch, getState) => {
  const state = getState();
  const isLinguist = !!state.userProfile.linguistProfile;

  OpenTok.connect(id, token)
    .then(response => {
      dispatch(
        update({
          tokboxID: id,
          tokboxToken: token,
          status: STATUS.CONECTED,
          error: null
        })
      );

      if (isLinguist) {
        //console.log("SOY LINGÜISTA");
        //OpenTok.sendSignal(id, "PickedCall", "done");
      }
    })
    .catch(error => {
      dispatch(
        update({
          tokboxID: id,
          tokboxToken: token,
          status: STATUS.ERROR,
          error: null
        })
      );
    });

  OpenTok.on(OpenTok.events.ON_SIGNAL_RECEIVED, e => {
    console.log("ON_SIGNAL_RECEIVED", e);
    dispatch(opentok_event({ status: "ON_SIGNAL_RECEIVED", payload: e }));

    if (isLinguist) {
      //
    } else {
      // Customer receives signal from Linguist

      // switch(signal) {}

      dispatch(
        EndCall(state.callCustomerSettings.sessionID, "done", state.auth.token)
      );
      dispatch(tokDisConnect());
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
      dispatch(
        update({
          status: STATUS.STREAM
        })
      );
    }
  });

  OpenTok.on(OpenTok.events.ON_SESSION_STREAM_DESTROYED, e => {
    console.log("ON_SESSION_STREAM_DESTROYED", e);

    if (isLinguist) {
      OpenTok.disconnect(state.callLinguistSettings.linguistTokboxSessionID);
      console.log("Clear");
      dispatch(resetTimerAsync());
      // dispatch(clearSettings());
      dispatch({ type: "RateCallView" });
    } else {
      //
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
      //
    } else {
      //
    }
  });

  OpenTok.on(OpenTok.events.ON_SESSION_DID_FAIL_WITH_ERROR, e => {
    dispatch(update({ error: e }));
    dispatch(
      opentok_event({
        status: "ON_SESSION_DID_FAIL_WITH_ERROR",
        payload: e
      })
    );

    if (isLinguist) {
      //
    } else {
      //
    }
  });
};

export const tokDisConnect = id => (dispatch, getState) => {
  OpenTok.disconnect(getState().callCustomerSettings.customerTokboxSessionID);
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
      status: STATUS.DISCONECTED
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

    default: {
      return state;
    }
  }
};

export default tokboxReducer;