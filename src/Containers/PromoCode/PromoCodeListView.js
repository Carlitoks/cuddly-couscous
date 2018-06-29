import React, { Component } from "react";
import { connect } from "react-redux";
import { uniqBy } from "lodash";
import { updateSettings as updateSelectionList } from "../../Ducks/LinguistFormReducer";

import {
  updateSettings,
  getItems,
  clearForm
} from "../../Ducks/LinguistFormReducer";

import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  Dimensions
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { List } from "react-native-elements";

import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";

import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import HeaderView from "../../Components/HeaderView/HeaderView";
import { Waves } from "../../Assets/SVG";

import I18n from "../../I18n/I18n";
import styles from "./styles";
import { Images, Colors } from "../../Themes";

import BoxedListComponent from "../../Components/BoxedListComponent/BoxedListComponent";

class PromoCodeListView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scenarioIndex: -1
    };
  }

  componentWillMount() {
    console.log("promocodelistview");
    if (this.props.scenarios < 1) {
      this.props.getItems("scenarios", this.props.navigation.state.params);
    }
    this.props.updateSettings({
      searchQuery: "",
      selectedLanguage: null
    });
  }

  setScenarioIndex(index) {
    this.setState({
      scenarioIndex: index
    });
  }

  componentWillUnmount() {
    this.props.clearForm();
  }

  renderList = () => {
    const { scenarios, listItemSelected } = this.props;

    const list = (
      <BoxedListComponent
        data={uniqBy(scenarios, "title")}
        triangle={false}
        titleProperty={"title"}
        onPress={index => {
          this.setScenarioIndex(index);
          this.props.updateSelectionList({
            selectedScenarios: [uniqBy(scenarios, "title")[index]]
          });

          this.props.navigation.dispatch({ type: "CallConfirmationView" });
        }}
        leftText
        multiple={false}
        selected={this.state.scenarioIndex}
        other={{ other: true, title: "Other" }}
        otherOnPress={() => {
          this.props.navigation.dispatch({ type: "CustomScenarioView" });
        }}
        chevron
      />
    );

    return list;
  };

  render() {
    const { width, height } = Dimensions.get("window");

    return (
      <ViewWrapper style={styles.scrollContainer}>
        <HeaderView
          headerLeftComponent={
            <GoBackButton navigation={this.props.navigation} />
          }
          navbarTitle={
            this.props.organization && this.props.organization.Name
              ? this.props.eventName
              : I18n.t("describeAssistance")
          }
          navbarType={"Basic"}
          NoWaves
        >
          <View style={styles.mainContainer}>
            <LinearGradient
              colors={[Colors.gradientColor.top, Colors.gradientColor.bottom]}
              style={styles.linearGradient}
            />
            <Waves
              width={width}
              height={width * 80 / 750}
              viewBox={"0 0 750 80"}
              style={styles.waves}
            />
            <ScrollView
              automaticallyAdjustContentInsets={true}
              alwaysBounceVertical={false}
            >
              {this.props.scenarios.length < 1 ? (
                <View style={styles.marginSpinner}>
                  <ActivityIndicator
                    size="large"
                    color={Colors.selectedOptionMenu}
                  />
                </View>
              ) : (
                this.renderList()
              )}
            </ScrollView>
          </View>
        </HeaderView>
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  scenarios: state.linguistForm.scenarios,
  selectedScenario: state.linguistForm.selectedScenarios,
  listItemSelected: state.homeFlow.listItemSelected,
  organization: state.events.organization,
  eventName: state.events.name
});

const mD = {
  updateSettings,
  getItems,
  updateSelectionList,
  clearForm
};

export default connect(mS, mD)(PromoCodeListView);
