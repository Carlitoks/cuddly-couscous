import React, { Component } from "react";
import { connect } from "react-redux";
import { updateSettings, getAssistanceList
} from "../../Ducks/ContactLinguistReducer";

import { Text, View, Picker, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Button, Header } from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";

import SettingsButton from "../../Components/SettingsButton/SettingsButton";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import TopViewIOS from "../../Components/TopViewIOS/TopViewIOS"

import { Colors, Fonts } from "../../Themes";
import styles from "./styles";
import EN from "../../I18n/en";

class CallTimeView extends Component {
  loadAssitance() {
    return this.props.getAssistanceList(this.props.token);
  }
  render() {
    const navigation = this.props.navigation;

    pickerOptions = n => {
      return new Array(n).fill(5).map((el, i) => {
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
                  {/* how Long Do You Need help For? */}
                  <Text style={styles.mainTitle}>{EN["howLongNeedHelp"]}</Text>
                </Col>
              </Row>
              <View style={styles.containerContent}>
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
          </Grid>
        </ScrollView>
        {/* Next Button */}
        <View style={styles.containerBottom}>
          <Button
            textStyle={styles.buttonText}
            buttonStyle={styles.button}
            containerViewStyle={styles.buttonAccept}
            title="Accept"
            onPress={() =>
              this.loadAssitance().then(() =>
                navigation.dispatch({ type: "AssistanceView" })
              )
            }
          />
        </View>
      </View>
    );
  }
}

const mS = state => ({
  timeOptions: state.contactLinguist.timeOptions,
  selectedTime: state.contactLinguist.selectedTime,
  cost: state.contactLinguist.cost,
  token: state.auth.token
});

const mD = {
  updateSettings,
  getAssistanceList

};

export default connect(mS, mD)(CallTimeView);
