import React, { Component } from "react";
import { connect } from "react-redux";

import {
  updateSettings,
  ASSITANCE_LIST,
  getAssistanceList
} from "../../Ducks/ContactLinguistReducer";

import Icon from "react-native-vector-icons/MaterialIcons";
import { Text, View, ScrollView, Image } from "react-native";
import {
  SearchBar,
  List,
  ListItem,
  Button,
  Header
} from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";

import SettingsButton from "../../Components/SettingsButton/SettingsButton";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import TopViewIOS from "../../Components/TopViewIOS/TopViewIOS"

import EN from "../../I18n/en";
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
            as.title.includes("Taxi") ? (
              <Icon size={15} color="gray" name="local-taxi" />
            ) : (
              <Icon size={15} color="gray" name="airplanemode-active" />
            )
          }
          onPress={() => {
            this.props.updateSettings({
              selectedAssistance: as.title,
              selectedScenarioId: as.id
            });
          }}
        />
      ));
  };

  render() {
    const navigation = this.props.navigation;

    return (
      <View style={styles.scrollContainer}>
      
        <ScrollView
          automaticallyAdjustContentInsets={true}
          style={styles.scrollContainer}
        >
          <Grid>
            <Col>
              <Row>
              <TopViewIOS/>
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
                    rightComponent={
                      <SettingsButton navigation={this.props.navigation} />
                    }
                  />

                  {/* Select the Assistance */}
                  <Text style={styles.mainTitle}>
                    {EN["DescribeAssistance"]}
                  </Text>

                  {/* Searchbar */}
                  <SearchBar
                    containerStyle={styles.containerSearch}
                    placeholder="Search"
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
                  {EN["orChooseOneBelow"]}
                </Text>
                <List style={styles.listContainer}>
                  {this.filterList(this.props.searchAssistance)}
                </List>
              </View>
            </Col>
          </Grid>
        </ScrollView>
        {/* Call Button */}
        <Button
          textStyle={styles.textStep}
          buttonStyle={styles.buttonStep}
          icon={{
            name: "video-call",
            size: 25,
            color: Colors.primaryAltFontColor
          }}
          buttonStyle={styles.buttonStep}
          title="Call"
          onPress={() => navigation.dispatch({ type: "ContactingLinguist" })}
        />
      </View>
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
