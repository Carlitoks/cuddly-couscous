import React, { Component } from "react";
import { connect } from "react-redux";

import { updateSettings } from "../../Ducks/LinguistFormReducer";
import { updateForm } from "../../Ducks/RegistrationCustomerReducer";
import { asyncUpdateUser } from "../../Ducks/CustomerProfileReducer";

import { filter, findIndex } from "lodash";

import { View, ActivityIndicator, Keyboard } from "react-native";

import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import BottomButton from "../../Components/BottomButton/BottomButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import HeaderView from "../../Components/HeaderView/HeaderView";
import ListComponent from "../../Components/ListComponent/ListComponent";
import SearchBar from "../../Components/SearchBar/SearchBar";

import I18n from "../../I18n/I18n";
import { Colors } from "../../Themes";
import languages from "../../Config/Languages";
import styles from "./styles";

class NativeLanguageView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: -1,
      selectedLanguage: {},
      loading: true
    };
  }

  componentWillUnmount() {
    Keyboard.removeAllListeners("keyboardDidHide");
  }

  componentWillMount() {
    const { selectedNativeLanguage } = this.props;

    this.setState({
      selectedIndex: findIndex(languages, selectedNativeLanguage),
      selectedLanguage: selectedNativeLanguage
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
    this.setState({
      selectedIndex: findIndex(languages, this.filterList()[index])
    });
  }

  changeLanguage(index) {
    const newLanguage = this.filterList()[index];

    this.search.clearText();
    this.props.updateSettings({ searchQuery: "" });
    // new index

    this.setState({
      selectedLanguage: newLanguage,
      selectedIndex: findIndex(languages, newLanguage)
    });
  }

  submit() {
    const { id, asyncUpdateUser, token, navigation } = this.props;

    const selectedLanguage = {
      nativeLangCode: this.state.selectedLanguage["3"]
    };

    const payload = { id, ...selectedLanguage };

    asyncUpdateUser(payload, token)
      .then(response => {
        if (response.type === "networkErrors/error") {
          throw new Error(response.payload.data.errors);
        }
        this.props.updateForm({
          selectedNativeLanguage: this.state.selectedLanguage
        });
        navigation.dispatch({ type: "GenderCustomerView" });
      })
      .catch(error => {
        console.log(error);
        dispatch(networkError(error));
      });
  }

  render() {
    const navigation = this.props.navigation;
    const { selectedNativeLanguage } = this.props;

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
              onPress={index => this.changeLanguage(index)}
              changeSelected={index => this.changeSelected(index)}
              gradient
              scrollable
              initial={this.state.selectedIndex}
            />
          </View>
        </HeaderView>
        {/* Next Button */}
        <BottomButton
          title={I18n.t("next")}
          relative
          onPress={() => this.submit()}
          fill
        />
      </ViewWrapper>
    );
  }
}

// MAP STATE TO PROPS HERE
const mS = state => ({
  id: state.customerProfile.userInfo.id,
  selectedNativeLanguage: state.registrationCustomer.selectedNativeLanguage,
  searchQuery: state.linguistForm.searchQuery,
  token: state.auth.token
});

// MAP DISPATCH TO PROPS HERE
const mD = {
  updateSettings,
  asyncUpdateUser,
  updateForm
};

// EXPORT DEFAULT HERE AT THE BOTTOM
export default connect(mS, mD)(NativeLanguageView);
