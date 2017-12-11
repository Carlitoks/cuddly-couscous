import React, { Component } from "react";
import { connect } from "react-redux";

import {
  updateSettings,
  ASSITANCE_LIST
} from "../../Ducks/ContactLinguistReducer";

import Icon from "react-native-vector-icons/MaterialIcons";
import { Text, View, ScrollView, Image } from "react-native";
import { SearchBar, List, ListItem, Button } from "react-native-elements";

import EN from "../../I18n/en";
import { styles } from "./styles";
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
        <ScrollView automaticallyAdjustContentInsets={true}>
          <View style={styles.container}>
            {/* Back Arrow */}
            <View style={styles.arrowBack}>
              <Icon
                name="arrow-back"
                size={30}
                color={"#7c7cad"}
                onPress={() => navigation.dispatch({ type: "back" })}
              />
            </View>

            {/* Settings */}
            <View style={styles.settings}>
              <Icon
                name="settings"
                size={30}
                color={"#7c7cad"}
                onPress={() => navigation.dispatch({ type: "back" })}
              />
            </View>
          </View>

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
        </ScrollView>

        {/* Call Button */}
        <Button
          textStyle={styles.textStep}
          icon={{ name: "video-call", size: 30 }}
          buttonStyle={styles.buttonStep}
          title="Call"
          onPress={() => navigation.dispatch({ type: "IncomingCallView" })}
        />
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
