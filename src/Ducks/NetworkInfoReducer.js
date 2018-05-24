import { NetInfo } from "react-native";
import I18n from "../I18n/I18n";
import { Alert } from "react-native";

const ACTIONS = {
  UPDATE: "networkInfo/update"
};

export const updateNetworkInfo = payload => ({
  type: ACTIONS.UPDATE,
  payload
});

export const delayUpdateInfo = connectionInfo => (dispatch, getState) => {
  if (connectionInfo.type == "none") {
    setTimeout(() => {
      NetInfo.getConnectionInfo().then(connectionInfo => {
        dispatch(updateNetworkInfo(connectionInfo));
      });
    }, 2 * 1000);
  } else {
    dispatch(updateNetworkInfo(connectionInfo));
  }
};

export const displayNetworkAlert = () => (dispatch, getState) => {
  const { networkInfo, networkErrors } = getState();
  if (networkInfo.type == "none" && !networkInfo.networkModal) {
    dispatch(
      updateNetworkInfo({
        networkModal: true
      })
    );
    Alert.alert(
      // This is Alert Dialog Title
      I18n.t("thereNoInternetConnection"),

      // This is Alert Dialog Message.
      I18n.t("checkYourConnection"),
      [
        // First Text Button in Alert Dialog.
        {
          text: I18n.t("ok"),
          onPress: () => {
            dispatch(
              updateNetworkInfo({
                networkModal: false
              })
            );
          }
        }
      ]
    );
  }
};

const initialState = {
  type: null,
  effectiveType: null,
  networkModal: false
};

const networkInfo = (state = initialState, action = {}) => {
  const { payload, type } = action;

  switch (type) {
    case ACTIONS.UPDATE: {
      return {
        ...state,
        ...payload
      };
    }

    default: {
      return state;
    }
  }
};

export default networkInfo;
