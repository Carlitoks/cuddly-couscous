import React, { Component } from "react";
import { connect } from "react-redux";

import { Alert, ScrollView, View } from "react-native";
import { Grid } from "react-native-easy-grid";
import { List, ListItem } from "react-native-elements";

import styles from "./styles";
import I18n from "../I18n/I18n";
import ShowMenuButton from "../Components/ShowMenuButton/ShowMenuButton";
import Close from "../Components/Close/Close";
import { logOutAsync } from "../Ducks/AuthReducer";
import NavBar from "../Containers/CustomerHome/Components/Header";

class SettingsView extends Component {
  render() {
    const { navigation, logOutAsync, interfaceLocale, isLinguist } = this.props;

    return (
      <View style={styles.scrollContainer}>
        <NavBar
          navigation={navigation}
          leftComponent={<ShowMenuButton navigation={navigation}/>}
          navbarTitle={I18n.t("settings")}
          rightComponent={
            <Close
              action={() => {
                this.props.navigation.dispatch({ type: "Home" });
              }}
            />
          }
        />
        <ScrollView
          automaticallyAdjustContentInsets={true}
          style={styles.scrollContainer}
          alwaysBounceVertical={false}
          contentContainerStyle={styles.contentScrollContainer}
        >
          <Grid style={styles.summaryContainer}>
            <List containerStyle={styles.listContainer}>
              {/* Change interface localization */}
              <ListItem
                containerStyle={styles.listItemContainer}
                title={I18n.t("interfaceLocalization")}
                titleStyle={styles.titleStyle}
                subtitle={interfaceLocale ? interfaceLocale.name : null}
                subtitleStyle={styles.listSubtitle}
                onPress={() => {
                  navigation.dispatch({
                    type: "InterfaceLanguageView"
                  });
                }}
              />
              {/* Payment details */}
              {isLinguist ? null : (
                <ListItem
                  containerStyle={styles.listItemContainer}
                  title={I18n.t("paymentDetails")}
                  titleStyle={[styles.titleStyle]}
                  // subtitle={selectedNativeLanguage}
                  subtitleStyle={styles.listSubtitle}
                  onPress={() => {
                    navigation.dispatch({
                      type: "PaymentDetailScreen",
                      params: {
                        title: I18n.t("paymentDetails"),
                        messageText: I18n.t("enterPaymentDetails"),
                        buttonText: I18n.t("save"),
                        buttonTextIfEmpty: I18n.t("save"),
                        optional: true,
                        onSubmit: () => navigation.dispatch({ type: "Home" })
                      }
                    });
                  }}
                />
              )}

              {/* Log out */}
              <ListItem
                containerStyle={styles.listItemContainer}
                title={I18n.t("logOut")}
                titleStyle={[styles.titleStyle, styles.logout]}
                // subtitle={selectedNativeLanguage}
                subtitleStyle={styles.listSubtitle}
                onPress={() => {
                  Alert.alert(I18n.t("logOut"), I18n.t("logOutConfirmation"), [
                    {
                      text: I18n.t("no")
                    },
                    {
                      text: I18n.t("yes"),
                      onPress: logOutAsync
                    }
                  ]);
                }}
              />
            </List>
          </Grid>
        </ScrollView>
      </View>
    );
  }
}

const mS = state => ({
  routes: state.nav.routes[0].routes[0].routes,
  interfaceLocale: state.settings.interfaceLocale,
  isLinguist: !!state.userProfile.linguistProfile
});

const mD = {
  logOutAsync
};

export default connect(
  mS,
  mD
)(SettingsView);
