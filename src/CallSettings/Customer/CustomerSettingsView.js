import React, { Component } from "react";
import { Text, View, ScrollView, Picker } from "react-native";
import { connect } from "react-redux";

import {
  clearSettings,
  updateSettings
} from "../../Ducks/CallCustomerSettings";

import {
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
import I18n from "../../I18n/I18n";
import { Images, Colors, Fonts } from "../../Themes";
import { USER_NAME } from "../../Util/Constants";

class CustomerSettingsView extends Component {
  render() {
    const navigation = this.props.navigation;

    const { video, mute, customerPreferredSex } = this.props;

    const listCallPreference = [
      {
        title: I18n.t("video"),
        slug: "video",
        icon: "videocam",
        enable: video
      },
      {
        title: I18n.t("audio"),
        slug: "mute",
        icon: "call",
        enable: !mute
      }
    ];

    const listSexPreference = [
      {
        title: I18n.t("female"),
        icon: "female",
        customerPreferredSex
      },
      {
        title: I18n.t("male"),
        icon: "male",
        customerPreferredSex
      },
      {
        title: I18n.t("any"),
        icon: "venus-mars",
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
          alwaysBounceVertical={false} 
          style={styles.scrollContainer}
          contentContainerStyle={styles.contentScrollContainer}
        >
          <Grid>
            <Col>
              <View>
                <Col>
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
                    backgroundColor={Colors.transparent}
                    leftComponent={
                      <GoBackButton navigation={this.props.navigation} />
                    }
                    centerComponent={{
                      text: I18n.t("callSettings"),
                      style: styles.title
                    }}
                  />
                </Col>
              </View>

              <View>
                <FormLabel
                  labelStyle={styles.listSelectionTitle}
                  fontFamily={Fonts.BaseFont}
                >
                  {I18n.t("videoAssistance")}
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
                    title={I18n.t("video")}
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
                    title={I18n.t("audio")}
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
                  fontFamily={Fonts.BaseFont}
                >
                  {I18n.t("genderPreferenceLinguist")}
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

export default connect(mS, mD)(CustomerSettingsView);
