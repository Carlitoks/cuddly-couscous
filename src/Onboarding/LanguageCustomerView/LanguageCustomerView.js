import React, { Component } from "react";
import { connect } from "react-redux";

import { updateSettings } from "../../Ducks/LinguistFormReducer";
import { updateForm } from "../../Ducks/RegistrationCustomerReducer";

import Icon from "react-native-vector-icons/MaterialIcons";
import {
  Text,
  View,
  ScrollView,
  Image,
  Alert,
  KeyboardAvoidingView
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {
  SearchBar,
  List,
  ListItem,
  Button,
  Header
} from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";
import TopViewIOS from "../../Components/TopViewIOS/TopViewIOS";
import SettingsButton from "../../Components/SettingsButton/SettingsButton";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import BottomButton from "../../Components/BottomButton/BottomButton";
import NextButton from "../../Components/NextButton/NextButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import HeaderView from "../../Components/HeaderView/HeaderView";

import I18n from "../../I18n/I18n";
import styles from "./styles";
import { Images, Colors } from "../../Themes";

class LanguageCustomerView extends Component {
  componentWillMount() {
    const selectedNativeLanguage = [
      {
        1: "en",
        2: "eng",
        3: "eng",
        name: "English",
        local: "English",
        "2T": "eng",
        "2B": "eng"
      }
    ];

    this.props.updateSettings({ selectedNativeLanguage });
  }

  render() {
    const navigation = this.props.navigation;
    const { selectedNativeLanguage } = this.props;

    return (
      <ViewWrapper style={styles.scrollContainer}>
        <HeaderView
          headerLeftComponent={
            <GoBackButton navigation={this.props.navigation} />
          }
          title={I18n.t("nativeLanguage")}
        >
          <ScrollView
            automaticallyAdjustContentInsets={true}
            alwaysBounceVertical={false}
          >
            {/* Native Language */}
            <Text style={styles.nativeLanguageTitle}>
              {I18n.t("nativeLanguage")}
            </Text>

            <List containerStyle={styles.marginBottom10}>
              {this.props.selectedNativeLanguage ? (
                <ListItem
                  key={selectedNativeLanguage.code}
                  title={selectedNativeLanguage.name}
                  onPress={() => {
                    this.props.updateSettings({
                      selectionItemType: "languages",
                      selectionItemName: "nativeLanguage"
                    });
                    this.props.navigation.dispatch({ type: "SelectListView" });
                  }}
                />
              ) : (
                <ListItem />
              )}
            </List>
          </ScrollView>
        </HeaderView>
        {/* Next Button */}
        <BottomButton
          title={I18n.t("next")}
          onPress={() => navigation.dispatch({ type: "GenderCustomerView" })}
        />
      </ViewWrapper>
    );
  }
}

// MAP STATE TO PROPS HERE
const mS = state => ({
  selectedNativeLanguage: state.registrationCustomer.selectedNativeLanguage
});

// MAP DISPATCH TO PROPS HERE
const mD = {
  updateSettings,
  updateForm
};

// EXPORT DEFAULT HERE AT THE BOTTOM
export default connect(mS, mD)(LanguageCustomerView);
