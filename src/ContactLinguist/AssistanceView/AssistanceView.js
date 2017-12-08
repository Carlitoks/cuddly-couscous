import React, { Component } from "react";
import { Text, View, ScrollView, Alert, Image } from "react-native";
import EN from "../../I18n/en";
import { SearchBar, List, ListItem, Button } from "react-native-elements";
import { Images } from "../../Themes";
import {
  RkButton,
  RkTextInput,
  RkText,
  rkType,
  RkCardImg
} from "react-native-ui-kitten";

import { styles } from "./styles";
import Icon from "react-native-vector-icons/MaterialIcons";

export default class AssistanceView extends Component {
  render() {
    const list = [
      {
        name: "Aiport-Customer Service"
      },
      {
        name: "Airport - Check-In"
      },
      {
        name: "Taxi"
      },
      {
        name: "Taxi"
      },
      {
        name: "Taxi"
      },
      {
        name: "Airport - Check-In"
      },
      {
        name: "Airport - Check-In"
      }
    ];
    const navigation = this.props.navigation;

    handleIndexChange = index => {
      this.setState({ ...this.state, selectedIndex: index });
    };

    return (
      <View style={styles.scrollContainer}>
        <ScrollView automaticallyAdjustContentInsets={true}>
          <View style={styles.container}>
            <View style={styles.arrowBack}>
              <Icon
                name="arrow-back"
                size={30}
                color={"#7c7cad"}
                onPress={() => navigation.dispatch({ type: "back" })}
              />
            </View>
            <View style={styles.settings}>
              <Icon
                name="settings"
                size={30}
                color={"#7c7cad"}
                onPress={() => navigation.dispatch({ type: "back" })}
              />
            </View>
          </View>
          <RkText style={styles.mainTitle}>{EN["DescribeAssistance"]}</RkText>
          <SearchBar
            containerStyle={styles.containerSearch}
            placeholder="Search"
            inputStyle={styles.inputSearch}
            icon={{ name: "search" }}
          />
          <List>
            {list.map((item, i) => (
              <ListItem hideChevron key={i} title={item.name} />
            ))}
          </List>
        </ScrollView>
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
