import React, { Component } from "react";
import { connect } from "react-redux";

import {
  updateSettings,
  getAssistanceList
} from "../../Ducks/ContactLinguistReducer";

import Icon from "react-native-vector-icons/MaterialIcons";
import { Text, View, ScrollView, Image, KeyboardAvoidingView } from "react-native";
import {
  SearchBar,
  List,
  ListItem,
  Button,
  Header
} from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";
import { topIOS } from "../../Util/Devices";
import SettingsButton from "../../Components/SettingsButton/SettingsButton";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import BottomButton from "../../Components/BottomButton/BottomButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";

import I18n from "../../I18n/I18n";
import styles from "./styles";
import { Images, Colors } from "../../Themes";
import Fonts from "../../Themes/Fonts";

class AssistanceView extends Component {
  filterList = assistance => {
    return this.props.assistanceList
      .filter(as => as.title.toLowerCase().startsWith(assistance.toLowerCase()))
      .map((as, i) => (
        <ListItem
          wrapperStyle={styles.assitanceListItem}
          hideChevron={
            this.props.selectedAssistance === "" ||
            this.props.selectedAssistance !== as.title
          }
          key={i}
          title={as.title}
          rightIcon={{ name: "check" }}
          leftIcon={
            as.title.includes("Taxi")
              ? { size: 15, color: "gray", name: "local-taxi" }
              : { size: 15, color: "gray", name: "airplanemode-active" }
          }
          onPress={() => {
            const { selectedAssistance, selectedScenarioId } = this.props;
            let selectedAssistanceValue = "";
            let selectedScenarioIdValue = "";

            if (selectedAssistance === as.title) {
              selectedAssistanceValue = "";
              selectedScenarioIdValue = "";
            } else {
              selectedAssistanceValue = as.title;
              selectedScenarioIdValue = as.id;
            }

            this.props.updateSettings({
              selectedAssistance: selectedAssistanceValue,
              selectedScenarioId: selectedScenarioIdValue
            });
          }}
        />
      ));
  };

  render() {
    const navigation = this.props.navigation;

    return (
      <ViewWrapper style={styles.scrollContainer}>
        <ScrollView
          automaticallyAdjustContentInsets={true}
          alwaysBounceVertical={false} 
          style={styles.scrollContainer}
        >
          <Grid>
            <Col>
              <Row>
                {/* Linear Gradient */}
                <LinearGradient
                  colors={[
                    Colors.gradientColor.top,
                    Colors.gradientColor.middle,
                    Colors.gradientColor.bottom
                  ]}
                  style={styles.linearGradient}
                />
                <Col>
                  {/* Header - Navigation */}
                  <Header
                    outerContainerStyles={{ borderBottomWidth: 0, height: 60 }}
                    backgroundColor="transparent"
                    leftComponent={
                      <GoBackButton navigation={this.props.navigation} />
                    }
                    /*
                    rightComponent={
                      <SettingsButton navigation={this.props.navigation} />
                    }
                    */
                  />

                  {/* Select the Assistance */}
                  <Text style={styles.mainTitle}>
                    {I18n.t("describeAssistance")}
                  </Text>

                  {/* Searchbar */}
                  <SearchBar
                    containerStyle={styles.containerSearch}
                    placeholder={I18n.t("search")}
                    inputStyle={styles.inputSearch}
                    icon={{ name: "search" }}
                    onChangeText={text =>
                      this.props.updateSettings({ searchAssistance: text })
                    }
                  />
                </Col>
              </Row>
              <View style={{}}>
                {/* Select the Assistance */}
                <Text style={styles.textChooseBelow}>
                  {I18n.t("orChooseOneBelow")}
                </Text>
                <List style={styles.listContainer}>
                  {this.filterList(this.props.searchAssistance)}
                </List>
              </View>
            </Col>
          </Grid>
        </ScrollView>
        {/* Call Button */}
        <BottomButton
          title={I18n.t("call")}
          onPress={() => navigation.dispatch({ type: "CallConfirmationView" })}
          bold={true}
          icon={{
            name: "video-call",
            size: 25,
            color: Colors.primaryAltFontColor
          }}
        />
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  searchAssistance: state.contactLinguist.searchAssistance,
  selectedAssistance: state.contactLinguist.selectedAssistance,
  assistanceList: state.contactLinguist.assistanceList,
  token: state.auth.token
});

const mD = {
  updateSettings,
  getAssistanceList
};

export default connect(mS, mD)(AssistanceView);