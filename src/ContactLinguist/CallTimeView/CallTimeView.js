import React, { Component } from "react";
import { connect } from "react-redux";

import { updateSettings } from "../../Ducks/ContactLinguistReducer";

import { Text, View, Picker, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Button, Header } from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";

import SettingsButton from "../../Components/SettingsButton/SettingsButton";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";

import styles from "./styles";
import EN from "../../I18n/en";

class CallTimeView extends Component {
  render() {
    const navigation = this.props.navigation;

    pickerOptions = n => {
      return new Array(n).fill(10).map((el, i) => {
        return (
          <Picker.Item
            label={`${el * (i + 1)} Min`}
            value={el * (i + 1)}
            key={i}
          />
        );
      });
    };

    return (
      <View style={styles.scrollContainer}>
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
            <View style={styles.containerContent}>
              {/* how Long Do You Need help For? */}
              <Text style={styles.mainTitle}>{EN["howLongNeedHelp"]}</Text>

              {/* Time Picker */}
              <Picker
                style={styles.picker}
                selectedValue={this.props.selectedTime}
                onValueChange={(itemValue, itemIndex) =>
                  this.props.updateSettings({ selectedTime: itemValue })
                }
              >
                {pickerOptions(this.props.timeOptions)}
              </Picker>

              {/* Cost */}
              <View style={styles.costCallContainer}>
                <Text style={styles.costCall}>{`${EN["costOfCall"]} ${
                  EN["currency"]
                }${this.props.selectedTime * this.props.cost}`}</Text>
              </View>
            </View>
          </Col>
        </ScrollView>
        {/* Next Button */}
        <View style={styles.containerBottom}>
          <Button
            buttonStyle={styles.button}
            containerViewStyle={styles.buttonAccept}
            title="Accept"
            onPress={() => navigation.dispatch({ type: "AssistanceView" })}
          />
        </View>
      </View>
    );
  }
}

const mS = state => ({
  timeOptions: state.contactLinguist.timeOptions,
  selectedTime: state.contactLinguist.selectedTime,
  cost: state.contactLinguist.cost
});

const mD = {
  updateSettings
};

export default connect(mS, mD)(CallTimeView);
