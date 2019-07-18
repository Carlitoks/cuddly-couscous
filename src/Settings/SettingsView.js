import React, { Component } from "react";
import { connect } from "react-redux";

import { Alert, ScrollView, View } from "react-native";
import { Grid } from "react-native-easy-grid";
import { List, ListItem } from "react-native-elements";

import styles from "./styles";
import I18n from "../I18n/I18n";
import ShowMenuButton from "../Components/ShowMenuButton/ShowMenuButton";
import Close from "../Components/Close/Close";
import NavBar from "../Components/NavBar/NavBar";
import { logOut } from "../Ducks/AuthReducer2";

class SettingsView extends Component {

  logout () {
    Alert.alert(I18n.t("logOut"), I18n.t("logOutConfirmation"), [
      {
        text: I18n.t("no")
      },
      {
        text: I18n.t("yes"),
        onPress: () => {
          this.props.logOut().finally(() => {
            this.props.navigation.dispatch({type: "IntroView"});
          });
        }
      }]
    );
  }

  render() {
    const { navigation, user, interfaceLocale, isLinguist } = this.props;

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
              {!!user && !isLinguist && (
                <ListItem
                  containerStyle={styles.listItemContainer}
                  title={I18n.t("paymentDetails")}
                  titleStyle={[styles.titleStyle]}
                  // subtitle={selectedNativeLanguage}
                  subtitleStyle={styles.listSubtitle}
                  onPress={() => {
                    if (!user) {
                      return;
                    }
                    navigation.dispatch({
                      type: "AccountDetailsView",
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
                onPress={() => { this.logout() }}
              />
            </List>
          </Grid>
        </ScrollView>
      </View>
    );
  }
}

const mS = state => ({
  user: state.account.user,
  routes: state.nav.routes[0].routes[0].routes,
  interfaceLocale: state.settings.interfaceLocale,
  isLinguist: !!state.account.linguistProfile
});

const mD = {
  logOut
};

export default connect(
  mS,
  mD
)(SettingsView);
