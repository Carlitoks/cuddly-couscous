import React, { Component } from "react";
import { connect } from "react-redux";

import {
  getAllCustomerCalls,
  getAllLinguistCalls,
  getMissedLinguistCalls,
  customerCalls,
  linguistCalls,
  linguistMissedCalls,
  indexOnChange
} from "../../Ducks/CallHistoryReducer";
import { Col, Row, Grid } from "react-native-easy-grid";
import { StyleSheet, View, FlatList, Text, ScrollView } from "react-native";
import { styles } from "./style";
import { Header } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import SegmentedControlTab from "react-native-segmented-control-tab";
import LinearGradient from "react-native-linear-gradient";
import moment from "moment";
import _isEmpty from "lodash/isEmpty";
import _isUndefined from "lodash/isUndefined";
import { CallHistoryComponent } from "../../Components/CallHistory/CallHistory";
import TopViewIOS from "../../Components/TopViewIOS/TopViewIOS";
import ShowMenuButton from "../../Components/ShowMenuButton/ShowMenuButton";
import { Colors } from "../../Themes";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import I18n from "../../I18n/I18n";

class CallHistory extends Component {
  componentWillMount() {
    if (this.props.linguistProfile) {
      this.getAllLinguistCalls(this.props.userId, this.props.token);
      this.getMissedLinguistCalls(this.props.userId, this.props.token);
    } else {
      this.getAllCustomerCalls(this.props.userId, this.props.token);
    }
  }

  filterAllCalls = (allCalls, userType) => {
    return allCalls
      .map((item, i) => {
        let result = {};
        if (!_isUndefined(item[userType]) && !_isUndefined(item.session)) {
          result = {
            key: i,
            firstName: item[userType].firstName,
            lastInitial: item[userType].lastInitial,
            primaryLangCode: item.session.primaryLangCode,
            secondaryLangCode: item.session.secondaryLangCode,
            duration: !_isUndefined(item.session.duration)
              ? `${moment(item.session.duration / 1000).minutes()} mins`
              : "",
            rating: !_isUndefined(item.rating) ? item.rating.stars : "",
            avatarURL: item[userType].avatarURL,
            chevron: false
          };
        }
        return result;
      })
      .filter(item => {
        return !_isEmpty(item);
      });
  };

  filterMissedCalls = missedCalls => {
    return missedCalls
      .map((item, i) => {
        let result = {};
        if (!_isUndefined(item.createdBy) && !_isUndefined(item.session)) {
          result = {
            key: i,
            firstName: item.createdBy.firstName,
            lastInitial: item.createdBy.lastInitial,
            primaryLangCode: item.session.primaryLangCode,
            secondaryLangCode: item.session.secondaryLangCode,
            avatarURL: item.createdBy.avatarURL,
            createdAt: moment(item.createdAt).format("MM-DD-YYYY"),
            chevron: true
          };
        }
        return result;
      })
      .filter(item => {
        return !_isEmpty(item);
      });
  };

  getAllCustomerCalls = (userId, token) => {
    this.props.getAllCustomerCalls(userId, token).then(response => {
      this.props.customerCalls(response);
    });
  };

  getAllLinguistCalls = (userId, token) => {
    this.props.getAllLinguistCalls(userId, token).then(response => {
      this.props.linguistCalls(response);
    });
  };

  getMissedLinguistCalls = (userId, token) => {
    this.props.getMissedLinguistCalls(userId, token).then(response => {
      this.props.linguistMissedCalls(response);
    });
  };

  handleIndexChange = index => {
    this.props.indexOnChange(index);
  };

  chooseControlTab = () => {
    if (this.props.linguistProfile) {
      return (
        <SegmentedControlTab
          tabsContainerStyle={styles.tabsContainerStyle}
          values={["All", "Missed", "Recent"]}
          tabStyle={styles.tabStyle}
          tabTextStyle={styles.tabTextStyle}
          selectedIndex={this.state.selectedIndex}
          onTabPress={this.handleIndexChange}
          activeTabStyle={{
            backgroundColor: Colors.primarySelectedTabColor
          }}
        />
      );
    } else {
      return (
        <SegmentedControlTab
          tabsContainerStyle={styles.tabsContainerStyle}
          values={["All", "Recent"]}
          tabStyle={styles.tabStyle}
          tabTextStyle={styles.tabTextStyle}
          selectedIndex={this.state.selectedIndex}
          onTabPress={this.handleIndexChange}
          activeTabStyle={{
            backgroundColor: Colors.primarySelectedTabColor
          }}
        />
      );
    }
  };

  render() {
    const {
      linguistProfile,
      userId,
      token,
      allCustomerCalls,
      allLinguistCalls,
      missedCallsLinguist
    } = this.props;

    const navigate = this.props.navigation;

    const tabValues = linguistProfile ? [I18n.t("all"), I18n.t("missed")] : [];

    const userType = linguistProfile ? "createdBy" : "linguist";

    const allCalls = linguistProfile
      ? this.filterAllCalls(allLinguistCalls, userType)
      : this.filterAllCalls(allCustomerCalls, userType);

    const missedCalls = linguistProfile
      ? this.filterMissedCalls(missedCallsLinguist)
      : [];

    return (
      <ViewWrapper style={styles.scrollContainer}>
        <ScrollView
          automaticallyAdjustContentInsets={true}
          alwaysBounceVertical={false}
          style={styles.scrollContainer}
        >
          <Grid>
            <Col>
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
                <Header
                  outerContainerStyles={{ borderBottomWidth: 0, height: 60 }}
                  backgroundColor="transparent"
                  leftComponent={
                    <ShowMenuButton navigation={this.props.navigation} />
                  }
                />
                {/* Call History */}
                <Text style={styles.mainTitle}>{I18n.t("callHistory")}</Text>
                <SegmentedControlTab
                  tabsContainerStyle={styles.tabsContainerStyle}
                  values={tabValues}
                  tabStyle={styles.tabStyle}
                  tabTextStyle={styles.tabTextStyle}
                  selectedIndex={this.props.selectedIndex}
                  onTabPress={this.handleIndexChange}
                  activeTabStyle={{
                    backgroundColor: Colors.primarySelectedTabColor
                  }}
                />
              </Col>
              {this.props.selectedIndex === 0 && (
                <View style={styles.container}>
                  <CallHistoryComponent
                    data={allCalls}
                    navigation={this.props.navigation}
                  />
                </View>
              )}
              {this.props.selectedIndex === 1 && (
                <View style={styles.container}>
                  <CallHistoryComponent
                    data={missedCalls}
                    navigation={this.props.navigation}
                  />
                </View>
              )}
            </Col>
          </Grid>
        </ScrollView>
      </ViewWrapper>
    );
  }
}
const mS = state => ({
  linguistProfile: state.userProfile.linguistProfile,
  token: state.auth.token,
  userId: state.userProfile.id,
  allCustomerCalls: state.callHistory.allCustomerCalls,
  allLinguistCalls: state.callHistory.allLinguistCalls,
  missedCallsLinguist: state.callHistory.linguistMissedCalls,
  selectedIndex: state.callHistory.selectedIndex
});

const mD = {
  getAllCustomerCalls,
  getAllLinguistCalls,
  getMissedLinguistCalls,
  customerCalls,
  linguistCalls,
  linguistMissedCalls,
  indexOnChange
};

export default connect(mS, mD)(CallHistory);
