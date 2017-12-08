import React, { Component } from "react";
import { Text, Button, View, ScrollView, Alert, Image } from "react-native";
import EN from "../../I18n/en";
import { Images } from "../../Themes";
import {
  RkButton,
  RkTextInput,
  RkText,
  rkType,
  RkCardImg
} from "react-native-ui-kitten";

import { styles } from "./styles";
import Avatar from "react-native-interactive-avatar";
import Icon from "react-native-vector-icons/MaterialIcons";

export default class CustomerAccount extends Component {
  render() {
    const navigation = this.props.navigation;

    return (
      <ScrollView
        automaticallyAdjustContentInsets={true}
        style={styles.scrollContainer}
      >
        <View style={styles.container}>
          <View style={styles.arrowBack}>
            <Icon
              name="arrow-back"
              size={30}
              color={"#7c7cad"}
              onPress={() => navigation.dispatch({ type: "back" })}
            />
          </View>
          <View style={styles.nextText}>
            <RkText onPress={() => navigation.dispatch({ type: "Home" })}>
              {EN["Next"]}
            </RkText>
          </View>
        </View>
        <View style={styles.formContainer}>
          <Avatar
            style={{ paddingTop: 40 }}
            size={"default"}
            source={Images.profile}
          />
          <View style={styles.personalInformation}>
            <RkText>{EN["PersonalInformation"]}</RkText>
          </View>

          <RkTextInput placeholder={EN["Firstname"]} autoCorrect={false} />
          <RkTextInput placeholder={EN["Lastname"]} autoCorrect={false} />
        </View>
      </ScrollView>
    );
  }
}
