import React, { Component } from "react";
import { connect } from "react-redux";

import QRCodeScanner from "react-native-qrcode-scanner";

import { Text, View, Alert } from "react-native";
import TopViewIOS from "../../Components/TopViewIOS/TopViewIOS";
import { Header } from "react-native-elements";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import I18n, {
  translateApiErrorString,
  translateApiError
} from "../../I18n/I18n";
import {loadUser} from "../../Ducks/AccountReducer";
import styles from "./styles";
import { setPermission, displayOpenSettingsAlert } from "../../Util/Permission";
import api from "../../Config/AxiosConfig";
import { handleEvent } from "../../Util/Events";
import { bindActionCreators } from "redux";

class ScanScreenView extends Component {

  constructor (props) {
    super(props);
    this.state = {
      loading: false,
      reactivate: false
    };

    // reference to scanner object
    this.scanner = null;
  }

  componentWillMount() {

    setPermission("camera").then(response => {
      if (response == "denied" || response == "restricted") {
        this.props.navigation.dispatch({ type: "Home" });
        displayOpenSettingsAlert();
      }
    });
  }

  getEventID = URL => {
    const tokens = URL.split("/");
    return tokens[tokens.indexOf("events") + 1];
  };

  checkValidID = id => {
    return /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/.test(
      id
    );
  };

  onScan = (e) => {
    const { dispatch, navigation } = this.props;
    try {
      // get event ID from the scan
      const eventId = this.getEventID(e.data);

      // handle invalid payload or event ID
      if (!this.checkValidID(eventId)) {
        this.setState({ reactivate: false });
        Alert.alert(I18n.t("error"), I18n("api.errEventInvalid"), [
          {
            text: I18n.t("status.ok"),
            onPress: () => {
              this.props.navigation.dispatch({type: "Home"});
            }
          }
        ]);
      }

      // otherwise fetch the event
      this.setState({loading: true});
      api.get(`/events/${eventId}/scan`)
      .then((res) => {
        this.setState({loading: false});
        return handleEvent(res.data, {dispatch, navigation});
      })
      .catch((e) => {
        this.setState({loading: false});
        Alert.alert(I18n.t("error"), translateApiError(e));
        navigation.dispatch({ type: "Home" });
      });

    } catch (e) {
      this.setState({reactivate: false});
      Alert.alert(I18n.t("error"), I18n.t("api.errEventInvalid"), [{
        text: I18n.t("actions.ok"),
        onPress: () => {
          navigation.dispatch({ type: "Home" });
        }
      }]);
    }
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <TopViewIOS scanQR />
          <Header
            backgroundColor="rgba(0, 0, 0, 0.3)"
            leftComponent={<GoBackButton navigation={this.props.navigation} />}
            style={styles.header}
            outerContainerStyles={styles.headerOuterContainer}
          />
        </View>

        <QRCodeScanner
          // https://github.com/moaazsidat/react-native-qrcode-scanner#props
          onRead={this.onScan}
          fadeIn={true}
          cameraStyle={styles.cameraContainer}
          ref={node => {
            this.scanner = node;
          }}
          reactivate={this.state.reactivate}
          showMarker={true}
          style={styles.codeScanner}
          bottomViewStyle={styles.zeroContainer}
          topViewStyle={styles.zeroContainer}
        />

        <View style={styles.textContainer}>
          <Text style={styles.scanText}>{I18n.t("alignQRCode")}</Text>
        </View>
      </View>
    );
  }
}

const mS = state => ({
});

function mD(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({
      loadUser,
    }, dispatch),
  };
}

export default connect(
  mS,
  mD
)(ScanScreenView);
