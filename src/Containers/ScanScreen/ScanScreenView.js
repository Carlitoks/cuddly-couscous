import React, { Component } from "react";
import { connect } from "react-redux";

import QRCodeScanner from "react-native-qrcode-scanner";

import { Text, View, Alert } from "react-native";
import { findIndex } from "lodash";
import TopViewIOS from "../../Components/TopViewIOS/TopViewIOS";
import { Header } from "react-native-elements";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import I18n, {
  translateLanguage,
  translateApiErrorString,
  translateApiError
} from "../../I18n/I18n";
import { asyncScanQR } from "../../Ducks/EventsReducer";
import { updateSettings as updateHomeFlow } from "../../Ducks/HomeFlowReducer";
import styles from "./styles";
import { setPermission, displayOpenSettingsAlert } from "../../Util/Permission";

class ScanScreenView extends Component {
  state = {
    reactivate: false
  };

  componentWillMount() {

    setPermission("camera").then(response => {
      if (response == "denied" || response == "restricted") {
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

  onSuccess = e => {
    this.props.updateHomeFlow({
      categorySelected: ""
    });
    const { navigation } = this.props;
    try {
      const eventId = this.getEventID(e.data);
      if (
        navigation.state.routeName === "ScanScreenView" &&
        !!this.checkValidID(eventId)
      ) {
        this.props
          .asyncScanQR(eventId, this.props.token)
          .then(response => {
            const {
              addMinutesToUser,
              usageError,
              maxMinutesPerUser,
              organization
            } = response.payload;

            // if an error, handle that first
            if (usageError) {
              this.props.navigation.dispatch({
                type: "Home",
                params: {
                  usageError: translateApiErrorString(
                    usageError,
                    "api.errEventUnavailable"
                  )
                }
              });
              return;
            }

            // otherwise, for now we only support codes that add
            // minutes to the user account
            if (addMinutesToUser) {
              this.props.navigation.dispatch({
                type: "Home",
                params: {
                  minutesGranted: true,
                  maxMinutesPerUser,
                  organization: organization.name
                }
              });
              return;
            }
            
            // otherwise... unexpected code
            this.props.navigation.dispatch({ type: "Home" });

          })
          .catch(error => {
            Alert.alert(I18n.t('error'), translateApiError(error))
            this.props.navigation.dispatch({ type: "Home" });
          });

        this.setState({
          reactivate: false
        });
      } else {
        if (navigation.state.routeName === "ScanScreenView") {
          this.setState({
            reactivate: false
          });
          Alert.alert("Error", "QR invalid, try again", [
            {
              text: "OK",
              onPress: () => {
                this.scanner.reactivate();
                this.setState({
                  reactivate: true
                });
              }
            }
          ]);
        }
      }
    } catch (err) {
      this.setState({
        reactivate: true
      });
    }
  };

  render() {
    const navigation = this.props.navigation;

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
          onRead={this.onSuccess}
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
  token: state.auth.token,
  categories: state.homeFlow.categories
});

const mD = {
  asyncScanQR,
  updateHomeFlow,
};

export default connect(
  mS,
  mD
)(ScanScreenView);
