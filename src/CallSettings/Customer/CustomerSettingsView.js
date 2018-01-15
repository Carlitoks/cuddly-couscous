import React, { Component } from "react";
import { Text, View, ScrollView, Picker } from "react-native";
import { connect } from "react-redux";

import {
  clearSettings,
  updateSettings
} from "../../Ducks/CallCustomerSettings";

import {
  FormInput,
  Avatar,
  Card,
  Button,
  Header,
  FormLabel,
  List,
  ListItem
} from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import TopViewIOS from "../../Components/TopViewIOS/TopViewIOS";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";

import styles from "./styles";
import EN from "../../I18n/en";
import { Images, Colors, Fonts } from "../../Themes";
import { USER_NAME } from "../../Util/Constants";

class CallSettingsView extends Component {
  render() {
    const navigation = this.props.navigation;

    const { video, mute, customerPreferredSex } = this.props;

    const listCallPreference = [
      {
        title: "Video",
        slug: "video",
        icon: "videocam",
        enable: video
      },
      {
        title: "Audio",
        slug: "mute",
        icon: "call",
        enable: !mute
      }
    ];

    const listSexPreference = [
      {
        title: "Female",
        icon: "female",
        customerPreferredSex
      },
      {
        title: "Male",
        icon: "male",
        customerPreferredSex
      }
    ];

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
      <ViewWrapper style={{ flex: 1 }}>
        <ScrollView
          automaticallyAdjustContentInsets={true}
          style={styles.scrollContainer}
          contentContainerStyle={styles.contentScrollContainer}
        >
          <Grid>
            <Col>
              <View>
                <Col style={{ height: 50 }}>
                  {/* Linear Gradient */}
                  <LinearGradient
                    colors={[
                      Colors.gradientColor.top,
                      Colors.gradientColor.middle,
                      Colors.gradientColor.bottom
                    ]}
                    style={styles.linearGradient}
                  />
                  {/* Header - Navigation */}
                  <TopViewIOS/> 
                  <Header
                    outerContainerStyles={{ borderBottomWidth: 0, height: 50 }}
                    backgroundColor="transparent"
                    leftComponent={
                      <GoBackButton navigation={this.props.navigation} />
                    }
                    centerComponent={{
                      text: EN["callSettings"],
                      style: styles.title
                    }}
                  />
                </Col>
              </View>
              <View style={styles.avatarContainer}>
                <Text style={styles.pickerText}> {EN["maxTimeLimit"]}</Text>
                {/* Time Picker */}
                <Picker
                  style={styles.picker}
                  selectedValue={this.props.selectedTime}
                  onValueChange={(itemValue, itemIndex) =>
                    this.props.updateSettings({ selectedTime: itemValue })}
                >
                  {pickerOptions(this.props.timeOptions)}
                </Picker>
              </View>
              <View>
                <FormLabel
                  labelStyle={styles.listSelectionTitle}
                  fontFamily={Fonts.primaryBaseFont}
                >
                  {EN["iPreferAudioOrVideo"]}
                </FormLabel>
                <List
                  containerStyle={{
                    width: "92%",
                    alignSelf: "center",
                    borderTopWidth: 0,
                    marginLeft: "4%",
                    marginRight: "4%"
                  }}
                >
                  <ListItem
                    title="Video"
                    leftIcon={{
                      name: "videocam",
                      color: Colors.primaryAltFontColor
                    }}
                    rightIcon={
                      video ? (
                        <Icon
                          size={15}
                          color={Colors.primaryAltFontColor}
                          name="check"
                        />
                      ) : (
                        <Icon
                          size={15}
                          color={Colors.primaryAltFontColor}
                          name="remove"
                        />
                      )
                    }
                    onPress={() => {
                      this.props.updateSettings({
                        video: !video
                      });
                    }}
                  />
                  <ListItem
                    title="Audio"
                    leftIcon={{
                      name: "call",
                      color: Colors.primaryAltFontColor
                    }}
                    rightIcon={
                      !mute ? (
                        <Icon
                          size={15}
                          color={Colors.primaryAltFontColor}
                          name="check"
                        />
                      ) : (
                        <Icon
                          size={15}
                          color={Colors.primaryAltFontColor}
                          name="remove"
                        />
                      )
                    }
                    onPress={() => {
                      this.props.updateSettings({
                        mute: !mute
                      });
                    }}
                  />
                </List>
              </View>
              <View>
                <FormLabel
                  labelStyle={styles.listSelectionTitle}
                  fontFamily={Fonts.primaryBaseFont}
                >
                  {EN["iPreferFemaleOrMale"]}
                </FormLabel>
                <List
                  containerStyle={{
                    width: "92%",
                    alignSelf: "center",
                    borderTopWidth: 0,
                    marginLeft: "4%",
                    marginRight: "4%"
                  }}
                >
                  {listSexPreference.map((item, i) => (
                    <ListItem
                      key={i}
                      title={item.title}
                      leftIcon={{
                        type: "font-awesome",
                        name: item.icon,
                        color: Colors.primaryAltFontColor
                      }}
                      rightIcon={
                        item.customerPreferredSex ===
                        item.title.toLocaleLowerCase() ? (
                          <Icon
                            size={15}
                            color={Colors.primaryAltFontColor}
                            name="check"
                          />
                        ) : (
                          <Icon
                            size={15}
                            color={Colors.primaryAltFontColor}
                            name="remove"
                          />
                        )
                      }
                      onPress={() => {
                        this.props.updateSettings({
                          customerPreferredSex: item.title.toLocaleLowerCase()
                        });
                      }}
                    />
                  ))}
                </List>
              </View>
            </Col>
          </Grid>
        </ScrollView>
      </ViewWrapper>
    );
  }
}
const mS = state => ({
  timeOptions: state.callCustomerSettings.timeOptions,
  selectedTime: state.callCustomerSettings.selectedTime,
  video: state.callCustomerSettings.video,
  mute: state.callCustomerSettings.mute,
  customerPreferredSex: state.callCustomerSettings.customerPreferredSex
});

const mD = {
  clearSettings,
  updateSettings
};

export default connect(mS, mD)(CallSettingsView);