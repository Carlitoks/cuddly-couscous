import React, { Component } from "react";
import { connect } from "react-redux";

import QRCodeScanner from "react-native-qrcode-scanner";
import { Text, Dimensions, View } from "react-native";
import TopViewIOS from "../../Components/TopViewIOS/TopViewIOS";
import { Button, Header } from "react-native-elements";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import { Colors, Fonts } from "../../Themes";
import { moderateScale, verticalScale, scale } from "../../Util/Scaling";
import I18n from "../../I18n/I18n";
import { asyncScanQR } from "../../Ducks/EventsReducer";
import { updateSettings } from "../../Ducks/LinguistFormReducer";
import styles from "./styles";

import { setPermission, displayOpenSettingsAlert } from "../../Util/Permission";

const { width, height } = Dimensions.get("window");

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

  onSuccess = e => {
    const { navigation } = this.props;
    try {
      if (navigation.state.routeName === "ScanScreenView") {
        const qrURL = e.data;
        this.props
          .asyncScanQR(this.getEventID(qrURL), this.props.token)
          .then(response => {
            const {
              requireScenarioSelection,
              restrictEventScenarios,
              scenarios
            } = response.payload;

            if (this.props.token) {
              if (requireScenarioSelection && restrictEventScenarios) {
                /* Dispatch to SelectListView with the scenarios involveds*/
                if (scenarios) {
                  this.props.updateSettings({
                    selectionItemType: "scenarios",
                    selectionItemName: "scenarios",
                    scenarios
                  });
                  this.props.navigation.dispatch({ type: "PromoCodeListView" });
                } else {
                  this.props.navigation.dispatch({
                    type: "CustomScenarioView"
                  });
                }
              } else if (requireScenarioSelection && !restrictEventScenarios) {
                /* Dispatch to Category Selection View (Home) */
                this.props.updateSettings({
                  selectionItemType: "scenarios",
                  selectionItemName: "scenarios",
                  scenarios: scenarios
                });
                this.props.navigation.dispatch({ type: "PromotionView" });
              } else if (!requireScenarioSelection) {
                /* Dispatch to Call Confirmation view */
                this.props.navigation.dispatch({
                  type: "CallConfirmationView"
                });
              }
            } else {
              this.props.navigation.dispatch({
                type: "LoginView"
              });
            }
          })
          .then(() => {
            this.scanner.reactivate();
          });

        this.setState({
          reactivate: false
        });
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
  token: state.auth.token
});

const mD = {
  asyncScanQR,
  updateSettings
};

export default connect(mS, mD)(ScanScreenView);
