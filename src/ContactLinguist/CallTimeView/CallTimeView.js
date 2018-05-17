import React, { Component } from "react";
import { connect } from "react-redux";

import { updateSettings } from "../../Ducks/CallCustomerSettings";
import { updateSettings as updateContactLinguist } from "../../Ducks/ContactLinguistReducer";
import { Text, View, ScrollView } from "react-native";
import { List, ListItem } from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from "react-native-vector-icons/MaterialIcons";

import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import Close from "../../Components/Close/Close";
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
      timeIndex: -1,
      notSureSelected: false
    };
  }

  isSelected = index => {
    return index == this.state.timeIndex ? true : false;
  };

  changeSelected(index) {
    this.setState({ timeIndex: index });
  }

  updateTime({ duration, cost }) {
    const { updateSettings, updateContactLinguist } = this.props;

    updateSettings({ selectedTime: duration });
    updateContactLinguist({ cost });
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
    const { notSureSelected, timeIndex } = this.state;
    const bottomButtonDisabled = timeIndex === -1 && !notSureSelected;

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
            <Text style={[styles.titleCall]}>{I18n.t("callTimeMinutes")}</Text>
          }
          headerRightComponent={
            <Close
              action={() => {
                navigation.dispatch({ type: "Home" });
              }}
            />
          }
          titleComponent={
            <Text style={[styles.bottom, styles.bottomText]}>
              {I18n.t("howMuchTimeDoYouNeed")}
            </Text>
          }
        >
          <ScrollView
            automaticallyAdjustContentInsets={true}
            bounces={false}
            alwaysBounceVertical={false}
            style={styles.scrollContainer}
          >
            <ListComponent
              data={[{ duration: null, cost: null }]}
              selected={notSureSelected ? 0 : -1}
              titleProperty={"duration"}
              complementTitle={I18n.t("iAmNotSure")}
              onPress={index => {
                this.updateTime({ duration: null, cost: null });
              }}
              changeSelected={index => {
                this.changeSelected(-1);
                this.setState({ notSureSelected: true });
              }}
              rightTitle
              leftText
              noFlex
            />
            <ListComponent
              data={TIME_OPTIONS}
              selected={timeIndex}
              titleProperty={"duration"}
              complementTitle={I18n.t("minutes")}
              onPress={index => {
                this.updateTime(TIME_OPTIONS[index]);
              }}
              changeSelected={index => {
                this.setState({ notSureSelected: false });
                this.changeSelected(index);
              }}
              rightTitle
              leftText
              noFlex
            />

            <View style={styles.box}>
              <Text style={[styles.boxText, styles.marginTop19]}>
                {I18n.t("callTimeBoxTextLine1")}
              </Text>
              <Text style={[styles.boxText, styles.marginTop14]}>
                {I18n.t("callTimeBoxTextLine2")}
              </Text>
              <Text style={[styles.boxText, styles.boxPricing]}>
                {`Price = $${this.props.selectedTime ? this.props.cost : 0}`}
              </Text>
            </View>
          </ScrollView>
          {/* Next Button */}
          <BottomButton
            title={I18n.t("continue")}
            onPress={() => this.submit(navigation)}
            disabled={bottomButtonDisabled}
            fill={!bottomButtonDisabled}
            bold={true}
            absolute
            gradient
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
  updateSettings,
  updateContactLinguist
};

export default connect(mS, mD)(CallTimeView);
