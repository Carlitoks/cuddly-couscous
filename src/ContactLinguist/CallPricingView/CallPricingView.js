import React, { Component } from "react";
import { connect } from "react-redux";

import { Text, View, ScrollView } from "react-native";

import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import Close from "../../Components/Close/Close";
import BottomButton from "../../Components/BottomButton/BottomButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import HeaderView from "../../Components/HeaderView/HeaderView";
import { previousView } from "../../Util/Helpers";

import styles from "./styles";
import I18n from "../../I18n/I18n";
import CelebrateOurLaunch from "../../Components/CelebrateOurLaunch/CelebrateOurLaunch";

class CallPricingView extends Component {
  render() {
    return (
      <ViewWrapper style={styles.scrollContainer}>
        <HeaderView
          headerLeftComponent={
            <GoBackButton navigation={this.props.navigation} />
          }
          navbarTitle={I18n.t("pricing")}
          navbarType={"Complete"}
          headerRightComponent={
            <Close
              action={() => {
                this.props.navigation.dispatch({ type: "Home" });
              }}
            />
          }
          NoWaves
        >
          <View>
            <CelebrateOurLaunch styles={styles} />
          </View>
          <View style={styles.buttons}>
            <BottomButton
              title={I18n.t("continueForFree")}
              onPress={() => {
                const { routes, navigation } = this.props;
                if (this.props.event.id) {
                  const setLanguage =
                    !this.props.event.allowSecondaryLangSelection &&
                    this.props.event.defaultSecondaryLangCode;
                  if (setLanguage) {
                    navigation.dispatch({ type: "CallConfirmationView" });
                  } else {
                    const continueScreen =
                      previousView(routes) === "CallConfirmationView"
                        ? "back"
                        : "SessionLanguageView";

                    navigation.dispatch({ type: continueScreen });
                  }
                } else {
                  const continueScreen =
                    previousView(routes) === "CallConfirmationView"
                      ? "back"
                      : "SessionLanguageView";

                  navigation.dispatch({ type: continueScreen });
                }
              }}
              fill
              bold
              whiteDisabled
              absolute
            />
          </View>
        </HeaderView>
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  routes: state.nav.routes[0].routes[0].routes,
  promotion: state.promoCode.scanned,
  event: state.events
});

const mD = {};

export default connect(
  mS,
  mD
)(CallPricingView);
