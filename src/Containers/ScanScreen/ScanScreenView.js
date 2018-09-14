import React, { Component } from "react";
import { connect } from "react-redux";

import QRCodeScanner from "react-native-qrcode-scanner";

import { Text, View, Alert } from "react-native";
import { findIndex } from "lodash";
import TopViewIOS from "../../Components/TopViewIOS/TopViewIOS";
import { Header } from "react-native-elements";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import I18n from "../../I18n/I18n";
import { asyncScanQR } from "../../Ducks/EventsReducer";
import { updateSettings } from "../../Ducks/LinguistFormReducer";
import { updateSettings as updateContactLinguist } from "../../Ducks/ContactLinguistReducer";
import { updateSettings as updateHomeFlow } from "../../Ducks/HomeFlowReducer";
import { updateSettings as updateCustomerSettings } from "../../Ducks/CallCustomerSettings";
import styles from "./styles";
import { setPermission, displayOpenSettingsAlert } from "../../Util/Permission";

class ScanScreenView extends Component {
  state = {
    reactivate: false
  };

  componentWillMount() {
    this.props.updateContactLinguist({ customScenarioNote: "" });

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
    this.props.updateSettings({
      selectedScenarios: []
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
              requireScenarioSelection,
              restrictEventScenarios,
              scenarios,
              defaultMinutes,
              allowMinuteSelection,
              sessionCreateErr,
              userCanCreateSession,
              initiateCall,
              addMinutesToUser,
              usageError,
              maxMinutesPerUser,
              organization,
            } = response.payload;
            if(initiateCall){
            if (!sessionCreateErr && userCanCreateSession) {
              if (this.props.token) {
                  if (requireScenarioSelection && restrictEventScenarios) {
                    /* Dispatch to SelectListView with the scenarios involveds*/

                    if (scenarios) {
                      let actualCats = this.props.categories;
                      actualCats.includes(scenarios[0].category)
                        ? null
                        : actualCats.push(scenarios[0].category);
                      const catIndex = findIndex(actualCats, scenario => {
                        return scenario === scenarios[0].category;
                      });
                      this.props.updateHomeFlow({
                        categoryIndex: catIndex,
                        categories: actualCats
                      });
                      this.props.updateSettings({
                        selectionItemType: "scenarios",
                        selectionItemName: "scenarios",
                        scenarios
                      });

                      this.props.navigation.dispatch({ type: "PromotionView" });
                    } else {
                      this.props.navigation.dispatch({
                        type: "CustomScenarioView"
                      });
                    }
                    this.props.updateCustomerSettings({
                      selectedTime: defaultMinutes,
                      allowTimeSelection: allowMinuteSelection
                    });
                  } else if (
                    requireScenarioSelection &&
                    !restrictEventScenarios
                  ) {
                    /* Dispatch to Category Selection View (Home) */

                    this.props.updateSettings({
                      selectionItemType: "scenarios",
                      selectionItemName: "scenarios",
                      scenarios: scenarios || []
                    });
                    this.props.navigation.dispatch({ type: "PromoCodeListView" });
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
            }else{
          if(usageError){
            this.props.navigation.dispatch({ type: "Home", params: { usageError } });
          }
          if(addMinutesToUser){
            this.props.navigation.dispatch({ type: "Home", params: { minutesGranted: true, maxMinutesPerUser, organization:  organization.name } });
          }
          this.props.navigation.dispatch({ type: "Home" });
        }
          })
          .catch(error => console.log(error));

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
  updateSettings,
  updateCustomerSettings,
  updateHomeFlow,
  updateContactLinguist
};

export default connect(
  mS,
  mD
)(ScanScreenView);
