import React, { Component } from "react";
import { connect } from "react-redux";

import {
  updateSettings,
  ASSITANCE_LIST
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

import SettingsButton from "../../Components/SettingsButton/SettingsButton";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import TopViewIOS from "../../Components/TopViewIOS/TopViewIOS"

import EN from "../../I18n/en";
import styles from "./styles";
import { Images } from "../../Themes";

class AssistanceView extends Component {
  filterList = assistance => {
    return ASSITANCE_LIST.filter(as =>
      as.toLowerCase().startsWith(assistance.toLowerCase())
    ).map((as, i) => (
      <ListItem
        hideChevron
        key={i}
        title={as}
        onPress={() => {
          this.props.updateSettings({ selectedAssistance: as });
        }}
      />
    ));
  };

  render() {
    const navigation = this.props.navigation;

    return (
      <View style={styles.scrollContainer}>
      <TopViewIOS/>
        <ScrollView automaticallyAdjustContentInsets={true}>
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
            <Text style={styles.mainTitle}>{EN["DescribeAssistance"]}</Text>

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
            <List>{this.filterList(this.props.searchAssistance)}</List>
          </Col>
        </ScrollView>
        <View style={styles.containerBottom}>
          {/* Call Button */}
          <Button
            icon={{ name: "video-call", size: 25 }}
            buttonStyle={styles.buttonStep}
            title="Call"
            onPress={() => navigation.dispatch({ type: "ContactingLinguist" })}
          />
        </View>
      </View>
    );
  }
}

const mS = state => ({
  searchAssistance: state.contactLinguist.searchAssistance,
  selectedAssistance: state.contactLinguist.selectedAssistance
});

const mD = {
  updateSettings
};

export default connect(mS, mD)(AssistanceView);
