import React, { Component } from "react";
import { Text, View, Picker } from "react-native";
import EN from "../../I18n/en";
import { styles } from "./styles";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Button } from "react-native-elements";

export default class CallTimeView extends Component {
  render() {
    const navigation = this.props.navigation;
    return (
      <View style={styles.scrollContainer}>
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
        <View style={styles.containerContent}>
          <Text style={styles.mainTitle}>{EN["howLongNeedHelp"]}</Text>
          <Picker style={styles.picker} selectedValue="10 Min">
            <Picker.Item label="10 Min" value="10" />
            <Picker.Item label="20 Min" value="20" />
            <Picker.Item label="30 Min" value="30" />
            <Picker.Item label="40 Min" value="40" />
            <Picker.Item label="50 Min" value="50" />
            <Picker.Item label="60min" value="60" />
          </Picker>
          <View style={styles.costCallContainer}>
            <Text style={styles.costCall}>{EN["costOfCall"]}</Text>
          </View>
        </View>
        <View style={styles.containerBottom}>
          <Button
            containerViewStyle={styles.buttonAccept}
            backgroundColor="#a3a3df"
            title="Accept"
            onPress={() => navigation.dispatch({ type: "AssistanceView" })}
          />
        </View>
      </View>
    );
  }
}
