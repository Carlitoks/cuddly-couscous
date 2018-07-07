import React, { Component } from "react";
import { connect } from "react-redux";

import { Text, View } from "react-native";

import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import Close from "../../Components/Close/Close";
import BottomButton from "../../Components/BottomButton/BottomButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import HeaderView from "../../Components/HeaderView/HeaderView";
import { previousView } from "../../Util/Helpers";

import styles from "./styles";
import I18n from "../../I18n/I18n";

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
            <Text style={styles.title}>{I18n.t("celebrateAndEnjoy")}</Text>

            <View style={styles.futurePricingContainer}>
              <View style={styles.futurePricingTitleContainer}>
                <Text style={styles.futurePricingTitle}>
                  {I18n.t("futurePricing")}
                </Text>
              </View>
              <View style={styles.futurePricingBox}>
                <Text style={styles.futurePricingBoxTitle}>
                  {I18n.t("payAsYouGoPricing")}
                </Text>
                <Text style={styles.futurePricingBoxAnd}>
                  {`- ${I18n.t("and").toUpperCase()} -`}
                </Text>
                <Text style={styles.futurePricingBoxBody}>
                  {I18n.t("discountsOffered")}
                </Text>
                <Text style={styles.futurePricingBoxEnd}>
                  {I18n.t("unusedMinutes")}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.buttons}>
            <BottomButton
              title={I18n.t("continueForFree")}
              onPress={() => {
                const { routes, navigation } = this.props;
                const continueScreen =
                  previousView(routes) === "CallConfirmationView"
                    ? "back"
                    : "SessionLanguageView";

                navigation.dispatch({ type: continueScreen });
              }}
              fill
              bold
              whiteDisabled
            />
          </View>
        </HeaderView>
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  routes: state.nav.routes[0].routes[0].routes
});

const mD = {};

export default connect(
  mS,
  mD
)(CallPricingView);
