import React, { Component } from "react";
import { connect } from "react-redux";
import { ScrollView, View } from "react-native";

import { updateSettings } from "../Ducks/SettingsReducer";

import GoBackButton from "../Components/GoBackButton/GoBackButton";
import BottomButton from "../Components/BottomButton/BottomButton";
import ListComponent from "../Components/ListComponent/ListComponent";
import I18n, { switchLanguage } from "../I18n/I18n";
import styles from "./styles";
import InterfaceLanguagesList from "./InterfaceLanguagesList";
import { InterfaceSupportedLanguages } from "../Config/Languages";
import NavBar from "../Containers/CustomerHome/Components/Header";

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
      <View style={styles.scrollContainer}>
        <NavBar
          navigation={this.props.navigation}
          leftComponent={
            <GoBackButton navigation={this.props.navigation}/>
          }
          rightComponent={
            <View style={styles.containerMenu}/>
          }
          navbarTitle={I18n.t("interfaceLocalization")}
        />
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
      </View>
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
