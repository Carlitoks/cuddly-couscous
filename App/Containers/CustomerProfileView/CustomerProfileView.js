import React, { Component } from "react";
import { Text, Button, View, ScrollView, Alert, Image } from "react-native";
import I18n, { getLanguages } from "react-native-i18n";
import {
  RkButton,
  RkTextInput,
  RkText,
  rkType,
  RkCardImg
} from "react-native-ui-kitten";

import { styles } from "./style";
import Avatar from "react-native-interactive-avatar";
import Icon from "react-native-vector-icons/MaterialIcons";
import { LaunchScreen } from "../LaunchScreen";

export default class CustomerAccount extends Component {
  constructor(props) {
    super(props);
  }

  state = { languages: [] };
  componentWillMount() {
    getLanguages().then(languages => {
      this.setState({ languages });
    });
  }

  render() {
    const navigate = this.props.navigation.navigate;

    return (
      <ScrollView
        automaticallyAdjustContentInsets={true}
        style={styles.scrollContainer}
      >
        <View style={styles.formContainer}>
          <Icon
            style={styles.Icon}
            name="arrow-back"
            size={30}
            color={"#03a6a7"}
            onPress={() => navigate("LaunchScreen")}
          />
          <Avatar
            style={{ paddingTop: 40 }}
            size={"default"}
            source={require("../../Images/profile-icon.png")}
          />
          <View style={styles.personalInformation}>
            <RkText>{I18n.t("PersonalInformation")}</RkText>
          </View>

          <RkTextInput placeholder={I18n.t("Firstname")} autoCorrect={false} />
          <RkTextInput placeholder={I18n.t("Lastname")} autoCorrect={false} />
        </View>
      </ScrollView>
    );
  }
}
