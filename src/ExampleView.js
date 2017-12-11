// GENERAL TIPS
// Some comments about code style
// Don't Just Copy/Paste this view and leave the comments

// Divide imports:

// Core Libraries
import React, { Component } from "react";
import { connect } from "react-redux";

// Redux Related code
import {
  updateSettings,
  ASSITANCE_LIST
} from "../../Ducks/ContactLinguistReducer";

// UI Libraries
import Icon from "react-native-vector-icons/MaterialIcons";
import { Text, View, ScrollView, Image } from "react-native";
import { SearchBar, List, ListItem, Button } from "react-native-elements";

// Style, I18n, Config, ...
import EN from "../../I18n/en";
import { styles } from "./styles";
import { Images } from "../../Themes";

// DON'T EXPORT HERE, EXPORT CLASS AT THE BOTTOM
class AssistanceView extends Component {
  // Remember that there are stateless functional components, not every component needs to be a class

  // No useless constructors like this:
  constructor(props) {
    super(props);

    state = {
      somethin: true
    };
  }

  // Do this instead
  state = {
    something: true
  };

  // OR JUST DON'T SET STATE AND CONNECT YOUR COMPONENT TO REDUX!!!!

  // Arrow Function for Class Methods (No need to bind these on the constructor)
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

  // Don't update state directly inside render function
  render() {
    const navigation = this.props.navigation;

    // PUT SOME COMMENTS AND SPACES BETWEEN MARKUP ELEMENTS
    // GROUP RELATED THINGS IN BLOCKS
    return (
      <View style={styles.scrollContainer}>
        <ScrollView automaticallyAdjustContentInsets={true}>
          {/* I've seen this same back arrow on like 10 components, maybe convert it into it's own component?? */}
          <View style={styles.container}>
            {/* Back Arrow */}
            <View style={styles.arrowBack}>
              <Icon
                name="arrow-back"
                size={30} /* PUT THING LIKE THIS ON THE THEMES FOLDER */
                color={
                  "#7c7cad"
                } /* DON'T HARDCODE THINGS LIKE COLORS OR DIMENSION */
                onPress={() => navigation.dispatch({ type: "back" })}
              />
            </View>

            {/* Settings */}
            <View style={styles.settings}>
              <Icon
                name="settings"
                size={30} /* PUT THING LIKE THIS ON THE THEMES FOLDER */
                color={
                  "#7c7cad"
                } /* DON'T HARDCODE THINGS LIKE COLORS OR DIMENSION */
                /* color={theme.primary} DO SOMETHING LIKE THIS INSTEAD */
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

// MAP STATE TO PROPS HERE
const mS = state => ({
  searchAssistance: state.contactLinguist.searchAssistance,
  selectedAssistance: state.contactLinguist.selectedAssistance
});

// MAP DISPATCH TO PROPS HERE
const mD = {
  updateSettings
};

// EXPORT DEFAULT HERE AT THE BOTTOM
export default connect(mS, mD)(AssistanceView);
