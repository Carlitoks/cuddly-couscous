import React, { Component } from "react";
import { connect } from "react-redux";
import {
  camelCase,
  some,
  filter,
  isEqual,
  isUndefined,
  uniqBy,
  findIndex
} from "lodash";
import { updateSettings as updateSelectionList } from "../../Ducks/LinguistFormReducer";

import {
  updateSettings,
  getItems,
  updateForm,
  clearForm
} from "../../Ducks/LinguistFormReducer";

import Icon from "react-native-vector-icons/MaterialIcons";
import {
  Text,
  View,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator
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

import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";

import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import HeaderView from "../../Components/HeaderView/HeaderView";

import I18n from "../../I18n/I18n";
import styles from "./styles";
import { Images, Colors } from "../../Themes";

import ListComponent from "../../Components/ListComponent/ListComponent";

class PromoCodeListView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scenarioIndex: -1
    };
  }

  componentWillMount() {
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
      <ListComponent
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
      />
    );

    return list;
  };

  render() {
    return (
      <ViewWrapper style={styles.scrollContainer}>
        <HeaderView
          headerLeftComponent={
            <GoBackButton navigation={this.props.navigation} />
          }
          headerCenterComponent={
            <Text style={[styles.titleCallSub]}>
              {this.props.organization && this.props.organization.Name
                ? this.props.organization.Name
                : I18n.t("describeAssistance")}
            </Text>
          }
          titleComponent={
            <View style={styles.bottom}>
              <Text style={styles.bottomText}>
                {this.props.eventName ? this.props.eventName : null}
              </Text>
            </View>
          }
        >
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
  updateForm,
  updateSelectionList,
  clearForm
};

export default connect(mS, mD)(PromoCodeListView);
