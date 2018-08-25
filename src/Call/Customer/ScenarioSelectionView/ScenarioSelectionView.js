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

import styles from "./styles";
import { Colors, Images } from "../../../Themes";
import I18n, { translateProperty } from "../../../I18n/I18n";
import { Waves } from "../../../Assets/SVG";
import { getLocalizedCategories } from "../../../Util/Constants";
import Close from "../../../Components/Close/Close";

class CustomScenario extends Component {
  navigate = this.props.navigation.navigate;
  CATEGORIES = getLocalizedCategories(I18n.currentLocale());

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
        title: I18n.t("somethingElse"),
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

  handleScroll = event => {
    const scrolledY = event.nativeEvent.contentOffset.y;

    if (scrolledY > 20) {
      this.setState({ showNavbarTitle: true });
    } else {
      this.setState({ showNavbarTitle: false });
    }
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

    const categoryTitle = this.CATEGORIES[categorySelected];
    return (
      <ViewWrapper style={styles.wrapperContainer}>
        <HeaderView
          headerLeftComponent={
            <GoBackButton navigation={this.props.navigation} />
          }
          headerRightComponent={
            <Close
              action={() => {
                this.props.navigation.dispatch({ type: "Home" });
              }}
            />
          }
          navbarTitle={this.state.showNavbarTitle ? categoryTitle : null}
          navbarType={"Complete"}
          NoWaves
          NoBackground
        >
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={Images[categorySelected]} />
          </View>
          <LinearGradient
            colors={[
              Colors.gradientColor.semiTransparent,
              Colors.gradientColor.top,
              Colors.gradientColor.bottom
            ]}
            style={styles.linearGradient}
          />
          <ScrollView
            style={styles.mainContainer}
            onScroll={this.handleScroll}
            bounces={false}
            alwaysBounceVertical={false}
          >
            <Text style={[styles.title, styles.marginBottom20]}>
              {categoryTitle}
            </Text>

            {scenariosList && (
              <BoxedListComponent
                customContainerStyle={styles.listContainer}
                selected={selectedScenarioIndex}
                data={scenariosList}
                titleFunc={item => translateProperty(item, "title")}
                onPress={index => {
                  updateSettings({
                    selectedScenarioIndex: index
                  });
                }}
                multiple={false}
                chevronIndex={scenariosList.length - 1}
              />
            )}
          </ScrollView>
          <Waves
            width={width}
            height={(width * 129) / 1175.7}
            viewBox={"0 0 1175.7 129"}
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
              navigation.dispatch({ type: "CallPricingView" });
            }}
            whiteDisabled
            absolute
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

export default connect(
  mS,
  mD
)(CustomScenario);
