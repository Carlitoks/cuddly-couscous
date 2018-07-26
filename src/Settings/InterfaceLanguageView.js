import React, { Component } from "react";
import { connect } from "react-redux";
import { ScrollView } from "react-native";

import { updateSettings } from "../Ducks/SettingsReducer";

import GoBackButton from "../Components/GoBackButton/GoBackButton";
import BottomButton from "../Components/BottomButton/BottomButton";
import HeaderView from "../Components/HeaderView/HeaderView";
import ListComponent from "../Components/ListComponent/ListComponent";

import ViewWrapper from "../Containers/ViewWrapper/ViewWrapper";
import I18n, { switchLanguage } from "../I18n/I18n";
import styles from "./styles";
import InterfaceLanguagesList from "./InterfaceLanguagesList";
import { InterfaceSupportedLanguages } from "../Config/Languages";

class InterfaceLanguageView extends Component {
  state = {
    indexSelected: this.props.interfaceLocale ? this.updateIndex() : 0
  };

  updateIndex() {
    const { interfaceLocale } = this.props;
    const updateSelectedIndex = InterfaceSupportedLanguages.findIndex(item => {
      return item[1] === interfaceLocale[1];
    });
    return updateSelectedIndex;
  }

  submit(navigation) {
    const { updateSettings } = this.props;
    const { indexSelected } = this.state;

    const interfaceLocale = InterfaceSupportedLanguages[indexSelected];
    updateSettings({ interfaceLocale, userLocaleSet: true });

    switchLanguage(interfaceLocale[1], this);

    navigation.dispatch({ type: "SettingsView" });
  }

  render() {
    const { navigation } = this.props;

    return (
      <ViewWrapper style={styles.scrollContainer}>
        <HeaderView
          headerLeftComponent={
            <GoBackButton navigation={this.props.navigation} />
          }
          navbarTitle={I18n.t("interfaceLocalization")}
          navbarType={"Complete"}
          NoWaves
        >
          <ScrollView style={styles.scrollContainer}>
            <InterfaceLanguagesList
              updateIndex={indexSelected => {
                this.setState({ indexSelected });
              }}
              render={({ languages, indexSelected, changeLanguage }) => {
                return (
                  <ListComponent
                    data={languages}
                    titleProperty={"name"}
                    selected={indexSelected}
                    onPress={changeLanguage}
                    gradient
                    leftText
                    noFlex
                    disableScroll
                  />
                );
              }}
            />
          </ScrollView>

          <BottomButton
            title={I18n.t("save")}
            relative
            onPress={() => this.submit(navigation)}
            fill
            absolute
            gradient
          />
        </HeaderView>
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  interfaceLocale: state.settings.interfaceLocale
});

const mD = { updateSettings };

export default connect(
  mS,
  mD
)(InterfaceLanguageView);
