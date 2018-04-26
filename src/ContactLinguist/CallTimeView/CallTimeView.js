import React, { Component } from "react";
import { connect } from "react-redux";

import { updateSettings } from "../../Ducks/CallCustomerSettings";
import { Text, View, ScrollView } from "react-native";
import { List, ListItem } from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from "react-native-vector-icons/MaterialIcons";

import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import BottomButton from "../../Components/BottomButton/BottomButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import HeaderView from "../../Components/HeaderView/HeaderView";
import ListComponent from "../../Components/ListComponent/ListComponent";

import { Colors, Fonts } from "../../Themes";
import { moderateScale } from "../../Util/Scaling";
import { TIME_OPTIONS } from "../../Util/Constants";
import { previousView } from "../../Util/Helpers";
import { findIndex } from "lodash";
import styles from "./styles";
import I18n from "../../I18n/I18n";

class CallTimeView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timeIndex: -1
    };
  }

  componentWillMount() {
    this.setState({
      timeIndex: findIndex(TIME_OPTIONS, { duration: this.props.selectedTime })
    });
  }

  isSelected = index => {
    return index == this.state.timeIndex ? true : false;
  };

  changeSelected(index) {
    this.setState({ timeIndex: index });
  }

  updateTime(duration) {
    this.props.updateSettings({
      selectedTime: duration
    });
  }

  submit(navigation) {
    const { routes } = this.props;
    if (previousView(routes) === "CallConfirmationView") {
      navigation.dispatch({ type: "back" });
    } else {
      navigation.dispatch({ type: "SessionLanguageView" });
    }
  }

  render() {
    const { navigation, routes } = this.props;
    setIndex = index => {
      this.setState({
        timeIndex: index
      });
    };

    return (
      <ViewWrapper style={styles.scrollContainer}>
        <HeaderView
          headerLeftComponent={
            <GoBackButton navigation={this.props.navigation} />
          }
          headerCenterComponent={
            <View>
              <Text style={[styles.titleCall]}>
                {`${I18n.t("callTimeMinutes")} ${
                  this.props.selectedTime
                } ${I18n.t("minutes")}`}
              </Text>
            </View>
          }
          headerRightComponent={
            <Text
              style={styles.headerButtonCancel}
              onPress={() => {
                navigation.dispatch({ type: "Home" });
              }}
            >
              {I18n.t("cancel")}
            </Text>
          }
          titleComponent={
            <View style={styles.bottom}>
              <Text style={styles.bottomText}>{I18n.t("callTimeTitle")}</Text>
              <Text style={styles.bottomText}>
                {I18n.t("callTimeSubtitle")}
              </Text>
            </View>
          }
        >
          <ScrollView
            automaticallyAdjustContentInsets={true}
            alwaysBounceVertical={false}
            style={styles.scrollContainer}
          >
            <ListComponent
              data={TIME_OPTIONS}
              selected={this.state.timeIndex}
              titleProperty={"duration"}
              subtitleProperty={"cost"}
              complementTitle={I18n.t("minutes")}
              complementSubtitle={"US $"}
              onPress={index => {
                this.updateTime(TIME_OPTIONS[index].duration);
              }}
              changeSelected={index => {
                this.changeSelected(index);
              }}
              rightTitle
              leftText
              noFlex
            />
          </ScrollView>
          {/* Next Button */}
          <View>
            <Text
              style={[styles.mainTitle, styles.smallFont, styles.buttonText]}
            >
              {`${this.props.selectedTime} ${I18n.t("callTimeButtonText")}`}
            </Text>
            <Text
              style={[
                styles.mainTitle,
                styles.smallFont,
                styles.buttonText,
                styles.buttonTextSubtitle
              ]}
            >
              {I18n.t("callTimeButtonSubtitle")}
            </Text>
          </View>
          <BottomButton
            title={I18n.t("accept")}
            onPress={() => this.submit(navigation)}
            fill
            bold={true}
          />
        </HeaderView>
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  selectedTime: state.callCustomerSettings.selectedTime,
  cost: state.contactLinguist.cost,
  token: state.auth.token,
  routes: state.nav.routes[0].routes[0].routes
});

const mD = {
  updateSettings
};

export default connect(mS, mD)(CallTimeView);
