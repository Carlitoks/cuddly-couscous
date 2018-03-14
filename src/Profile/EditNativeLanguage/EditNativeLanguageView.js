import React, { Component } from "react";
import { connect } from "react-redux";

import { updateSettings, clearForm } from "../../Ducks/LinguistFormReducer";
import {
  clearForm as registrationClearForm,
  updateForm
} from "../../Ducks/RegistrationCustomerReducer";
import {
  updateProfileAsync,
  updateView,
  getNativeLang
} from "../../Ducks/UserProfileReducer";
import { filter, findIndex } from "lodash";

import { View, Alert, ActivityIndicator, Keyboard } from "react-native";

import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import BottomButton from "../../Components/BottomButton/BottomButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import HeaderView from "../../Components/HeaderView/HeaderView";
import ListComponent from "../../Components/ListComponent/ListComponent";
import SearchBar from "../../Components/SearchBar/SearchBar";

import I18n from "../../I18n/I18n";
import languages from "../../Config/Languages";
import styles from "./styles";
import { Colors } from "../../Themes";

class EditNativeLanguageView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: -1,
      formNativeLanguage: {},
      loading: true
    };
  }
  componentWillUnmount() {
    this.props.registrationClearForm();
    Keyboard.removeAllListeners("keyboardDidHide");
  }

  componentWillMount() {
    const selectedNativeLanguage = this.props.selectedNativeLanguage;

    this.props.updateSettings({ selectedNativeLanguage });
    this.setState({
      selectedIndex: findIndex(languages, { 3: selectedNativeLanguage["3"] }),
      formNativeLanguage: selectedNativeLanguage
    });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 700);

    Keyboard.addListener("keyboardDidHide", () => {
      Keyboard.dismiss();
    });
  }

  filterList() {
    return languages.filter(language => {
      return language.name
        .toLowerCase()
        .startsWith(this.props.searchQuery.toLowerCase());
    });
  }

  changeSearch(queryString) {
    this.props.updateSettings({ searchQuery: queryString });
  }

  changeSelected(index) {
    this.setState({ selectedIndex: index });
  }

  changeLanguage(index) {
    const newLanguage = this.filterList()[index];

    this.search.clearText();
    this.props.updateSettings({ searchQuery: "" });
    // new index

    this.setState({
      formNativeLanguage: newLanguage,
      selectedIndex: findIndex(languages, newLanguage)
    });
  }

  submit() {
    const { token, uuid } = this.props;
    const { formNativeLanguage } = this.state;
    const data = {
      nativeLangCode: formNativeLanguage["3"]
    };
    this.props.updateProfileAsync(uuid, data, token).then(response => {
      if (response.type !== "networkErrors/error") {
        this.props.updateView({
          selectedNativeLanguage: getNativeLang(response.payload.nativeLangCode)
        });
        this.props.navigation.dispatch({
          type: "back"
        });
      } else {
        const errorMessage = response.payload.response.data.errors[0];
        Alert.alert("error", errorMessage);
      }
    });
  }

  render() {
    const navigation = this.props.navigation;
    const { formNativeLanguage } = this.props;

    return (
      <ViewWrapper style={styles.mainContainer}>
        <HeaderView
          headerLeftComponent={
            <GoBackButton navigation={this.props.navigation} />
          }
          title={I18n.t("nativeLanguage")}
        >
          <View style={styles.scrollContainer}>
            <SearchBar
              ref={search => (this.search = search)}
              onChangeText={text => this.changeSearch(text)}
              onClearText={text => this.changeSearch("")}
            />

            {this.state.loading ? (
              <View style={styles.loading}>
                <ActivityIndicator
                  size="large"
                  color={Colors.gradientColorButton.top}
                />
              </View>
            ) : (
              <View />
            )}

            <ListComponent
              data={this.filterList()}
              titleProperty={"name"}
              selected={this.state.selectedIndex}
              onPress={index => {
                this.changeLanguage(index);
              }}
              changeSelected={index => this.changeSelected(index)}
              gradient
              scrollable
            />
          </View>
        </HeaderView>
        {/* Save Button */}
        <BottomButton
          title={I18n.t("save")}
          onPress={() => {
            this.props.updateSettings({ searchQuery: "" });
            this.submit();
          }}
          relative
        />
      </ViewWrapper>
    );
  }
}

// MAP STATE TO PROPS HERE
const mS = state => ({
  token: state.auth.token,
  uuid: state.auth.uuid,
  selectedNativeLanguage: state.userProfile.selectedNativeLanguage,
  searchQuery: state.linguistForm.searchQuery,
  formSelectedNativeLanguage: state.registrationCustomer.selectedNativeLanguage
});

// MAP DISPATCH TO PROPS HERE
const mD = {
  updateSettings,
  updateProfileAsync,
  clearForm,
  updateForm,
  registrationClearForm,
  updateView
};

// EXPORT DEFAULT HERE AT THE BOTTOM
export default connect(mS, mD)(EditNativeLanguageView);
