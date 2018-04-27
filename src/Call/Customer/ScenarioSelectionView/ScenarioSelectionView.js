import React, { Component } from "react";
import { connect } from "react-redux";

import {
  View,
  ScrollView,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  Text,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import LinearGradient from "react-native-linear-gradient";

import { updateSettings } from "../../../Ducks/HomeFlowReducer";
import { updateSettings as updateSelectionList } from "../../../Ducks/LinguistFormReducer";

import ViewWrapper from "../../../Containers/ViewWrapper/ViewWrapper";
import GoBackButton from "../../../Components/GoBackButton/GoBackButton";
import InputRegular from "../../../Components/InputRegular/InputRegular";
import BoxedListComponent from "../../../Components/BoxedListComponent/BoxedListComponent";

import HeaderView from "../../../Components/HeaderView/HeaderView";
import BottomButton from "../../../Components/BottomButton/BottomButton";
import QRIcon from "../../../Components/QRIcon/QRIcon";

import styles from "./styles";
import { Colors, Images } from "../../../Themes";
import I18n from "../../../I18n/I18n";
import { moderateScale } from "../../../Util/Scaling";
import { CATEGORIES } from "../../../Util/Constants";
import Waves from "../../../SVG/waves";

class CustomScenario extends Component {
  navigate = this.props.navigation.navigate;

  constructor(props) {
    super(props);

    this.state = {
      scenariosList: null
    };
  }

  componentWillMount() {
    const { scenarios, categorySelected, navigation } = this.props;
    let scenariosFiltered = this.getScenariosByCategory(
      scenarios,
      categorySelected
    );

    let scenariosList = [
      ...scenariosFiltered,
      {
        other: true,
        title: "Something else",
        onPress: () => navigation.dispatch({ type: "CustomScenarioView" })
      }
    ];

    this.setState({ scenariosList });
  }

  getScenariosByCategory = (scenarios, categoryName) => {
    return scenarios.filter(scenario => {
      return scenario.category === categoryName;
    });
  };

  bottomButtonDisabled = () => {
    const { qr, other, indexSelected } = this.state;
    const { selectedScenarioIndex } = this.props;

    return selectedScenarioIndex === -1;
  };

  render() {
    const {
      navigation,
      categorySelected,
      selectedScenarioIndex,
      updateSettings,
      updateSelectionList
    } = this.props;
    const { scenariosList } = this.state;
    const { width, height } = Dimensions.get("window");

    return (
      <ViewWrapper style={styles.wrapperContainer}>
        <HeaderView
          headerLeftComponent={
            <GoBackButton navigation={this.props.navigation} />
          }
          headerRightComponent={<QRIcon navigation={this.props.navigation} />}
          NoWaves
          NoBackground
        >
          <Image style={styles.image} source={Images[categorySelected]} />
          <LinearGradient
            colors={[
              Colors.gradientColor.semiTransparent,
              Colors.gradientColor.bottom
            ]}
            style={styles.linearGradient}
          />
          <ScrollView style={styles.mainContainer}>
            <Text style={styles.title}>{CATEGORIES[categorySelected]}</Text>

            {scenariosList && (
              <BoxedListComponent
                customContainerStyle={styles.listContainer}
                selected={selectedScenarioIndex}
                data={scenariosList}
                titleProperty={"title"}
                onPress={index => {
                  updateSettings({ selectedScenarioIndex: index });
                }}
                multiple={false}
              />
            )}
          </ScrollView>
          <Waves
            width={width}
            height={width * 80 / 750}
            viewBox={"0 0 750 80"}
            style={styles.waves}
          />
          <BottomButton
            title={I18n.t("continue")}
            disabled={this.bottomButtonDisabled()}
            fill={!this.bottomButtonDisabled()}
            onPress={() => {
              updateSelectionList({
                selectedScenarios: [scenariosList[selectedScenarioIndex]]
              });
              navigation.dispatch({ type: "CallTimeView" });
            }}
            whiteDisabled
          />
        </HeaderView>
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  scenarios: state.homeFlow.scenarios,
  categorySelected: state.homeFlow.categorySelected,
  selectedScenarioIndex: state.homeFlow.selectedScenarioIndex
});

const mD = { updateSettings, updateSelectionList };

export default connect(mS, mD)(CustomScenario);
