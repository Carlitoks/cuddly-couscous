import React, { Component } from "react";
import { connect } from "react-redux";

import { ScrollView, Alert } from "react-native";
import { Grid } from "react-native-easy-grid";
import { List, ListItem } from "react-native-elements";
import DeviceInfo from "react-native-device-info";

import ViewWrapper from "../Containers/ViewWrapper/ViewWrapper";
import HeaderView from "../Components/HeaderView/HeaderView";

import styles from "./styles";
import I18n from "../I18n/I18n";
import ShowMenuButton from "../Components/ShowMenuButton/ShowMenuButton";

import { logOutAsync } from "../Ducks/AuthReducer";

class SettingsView extends Component {
  render() {
    const { navigation, logOutAsync, interfaceLocale, isLinguist } = this.props;

    return (
      <ViewWrapper style={styles.scrollContainer}>
        <HeaderView
          headerLeftComponent={<ShowMenuButton navigation={navigation} />}
          navbarTitle={I18n.t("settings")}
          navbarType={"Complete"}
          NoWaves
        >
          <ScrollView
            automaticallyAdjustContentInsets={true}
            style={styles.scrollContainer}
            alwaysBounceVertical={false}
            contentContainerStyle={styles.contentScrollContainer}
          >
            <Grid style={styles.summaryContainer}>
              <List containerStyle={styles.listContainer}>
                {/* Change interface localization */}
                {isLinguist ? null : (
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
                )}
                {/* Payment details */}
                {/* <ListItem
                  containerStyle={styles.listItemContainer}
                  title={I18n.t("paymentDetails")}
                  titleStyle={styles.titleStyle}
                  onPress={() => {
                    navigation.dispatch({
                      type: "EditGenderView"
                    });
                  }}
                /> */}
                {/* Log out */}
                <ListItem
                  containerStyle={styles.listItemContainer}
                  title={I18n.t("logOut")}
                  titleStyle={[styles.titleStyle, styles.logout]}
                  // subtitle={selectedNativeLanguage}
                  subtitleStyle={styles.listSubtitle}
                  onPress={() => {
                    Alert.alert(
                      I18n.t("logOut"),
                      I18n.t("logOutConfirmation"),
                      [
                        {
                          text: I18n.t("no")
                        },
                        {
                          text: I18n.t("yes"),
                          onPress: logOutAsync
                        }
                      ]
                    );
                  }}
                />
              </List>
            </Grid>
          </ScrollView>
        </HeaderView>
      </ViewWrapper>
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
