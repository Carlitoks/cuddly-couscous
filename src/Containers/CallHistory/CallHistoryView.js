import React, { Component } from "react";
import { connect } from "react-redux";
import SegmentedControlTab from "react-native-segmented-control-tab";

import { Alert, View, Text, ScrollView } from "react-native";
import { Col, Grid } from "react-native-easy-grid";
import _isEmpty from "lodash/isEmpty";
import _isUndefined from "lodash/isUndefined";
import CallHistoryComponent from "../../Components/CallHistory/CallHistory";
import ShowMenuButton from "../../Components/ShowMenuButton/ShowMenuButton";
import Close from "../../Components/Close/Close";
import NavBar from "../../Components/NavBar/NavBar";
import { Iphone6, Iphone5 } from "../../Util/Devices";

import moment from "moment";

import styles from "./style";
import Colors from "../../Themes/Colors";
import I18n, { translateApiError } from "../../I18n/I18n";
import {
  loadCustomerCallHistory,
  loadLinguistCallHistory,
  loadLinguistMissedCallHistory,
} from "../../Ducks/AccountReducer";

class CallHistoryView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      selectedIndex: 0,
    };
  }

  componentDidMount() {
    let promise = null;
    if (!!this.props.linguistProfile) {
      promise = Promise.all([
        this.props.loadLinguistCallHistory(true),
        this.props.loadLinguistMissedCallHistory(true),
      ]);
    } else {
      promise = this.props.loadCustomerCallHistory(true);
    }

    promise.catch((e) => {
      Alert.alert(I18n.t('error'), translateApiError(e, 'api.errUnexpected'));
    })
    .finally(() => {
      this.setState({loaded: true});
    });
  }

  filterAllCalls = (allCalls, userType) => {
    if (!_isEmpty(allCalls)) {
      return allCalls
        .map((item, i) => {
          let result = {};
          if (!_isUndefined(item[userType]) && !_isUndefined(item.session)) {
            result = {
              key: i,
              firstName: item[userType].firstName,
              lastInitial: item[userType].lastInitial,
              missedTab: false,
              primaryLangCode: item.session.primaryLangCode,
              secondaryLangCode: item.session.secondaryLangCode,
              duration: !_isUndefined(item.session.duration)
                ? item.session.duration
                : 0,
              rating: !_isUndefined(item.rating) ? item.rating.stars : "",
              createdAt: moment(item.session.createdAt).format(
                "MMM DD, h:mm A"
              ),
              category: !_isUndefined(item.session.scenario)
                ? item.session.scenario.category
                : "",
              title: !_isUndefined(item.session.scenario)
                ? item.session.scenario.title
                : "",
              customScenarioNote: !_isUndefined(item.session.customScenarioNote)
                ? item.session.customScenarioNote
                : "",
              avatarURL: item[userType].avatarURL,
              chevron: false
            };
          }
          return result;
        })
        .filter(item => {
          return !_isEmpty(item);
        });
    } else {
      return [];
    }
  };

  compareCall = (accepted, responded) => {
    if (!responded) {
      return I18n.t("missed");
    } else if (responded && !accepted) {
      return I18n.t("declined");
    }
  };

  filterMissedCalls = missedCalls => {
    if (!_isEmpty(missedCalls)) {
      return missedCalls
        .sort((prev, next) =>
          moment(next.session.createdAt).diff(moment(prev.session.createdAt))
        )
        .map((item, i) => {
          let result = {};
          if (!_isUndefined(item.createdBy) && !_isUndefined(item.session)) {
            result = {
              key: i,
              firstName: item.createdBy.firstName,
              lastInitial: item.createdBy.lastInitial,
              duration: 0,
              missedTab: true,
              primaryLangCode: item.session.primaryLangCode,
              secondaryLangCode: item.session.secondaryLangCode,
              avatarURL: item.createdBy.avatarURL,
              createdAt: moment(item.session.createdAt).format(
                "MMM DD, h:mm A"
              ),
              chevron: true,
              missedCall: this.compareCall(item.accepted, item.responded)
            };
          }
          return result;
        })
        .filter(item => {
          return !_isEmpty(item);
        });
    } else {
      return [];
    }
  };

  handleIndexChange = index => {
    this.setState({selectedIndex: index});
  };

  render() {
    const {
      linguistProfile,
      allCustomerCalls,
      allLinguistCalls,
      missedCallsLinguist
    } = this.props;

    const tabValues = linguistProfile ? [I18n.t("all"), I18n.t("missed")] : [];

    const userType = linguistProfile ? "createdBy" : "linguist";

    const allCalls = linguistProfile
      ? this.filterAllCalls(allLinguistCalls, userType)
      : this.filterAllCalls(allCustomerCalls, userType);

    const missedCalls = linguistProfile
      ? this.filterMissedCalls(missedCallsLinguist)
      : [];

    return (
      <View style={styles.scrollContainer}>
        <NavBar
          navigation={this.props.navigation}
          leftComponent={
            <ShowMenuButton navigation={this.props.navigation}/>
          }
          rightComponent={
            <Close
              action={() => {
                this.props.navigation.dispatch({ type: "Home" });
              }}
            />
          }
          navbarTitle={I18n.t("callHistory")}
        />
        {!!linguistProfile && (
          <View style={styles.tabBackgroundContainer}>
            <SegmentedControlTab
              tabsContainerStyle={styles.tabsContainerStyle}
              values={tabValues}
              tabStyle={
                Iphone6 || Iphone5 ? styles.tabStyleNoBorder : styles.tabStyle
              }
              tabTextStyle={styles.tabTextStyle}
              selectedIndex={this.state.selectedIndex}
              onTabPress={this.handleIndexChange}
              activeTabStyle={{
                backgroundColor: Colors.primarySelectedTabColor
              }}
            />
          </View>
        )}
        <ScrollView
          automaticallyAdjustContentInsets={true}
          style={styles.scrollContainer}
          bounces={false}
          alwaysBounceVertical={false}
        >
          <Grid>
            <Col>
              <View style={styles.container}>
                <CallHistoryComponent
                  data={
                    this.state.selectedIndex === 0 ? allCalls : missedCalls
                  }
                  navigation={this.props.navigation}
                />
              </View>
            </Col>
          </Grid>
        </ScrollView>
      </View>
    );
  }
}

const mS = state => ({
  linguistProfile: state.account.linguistProfile,
  allCustomerCalls: state.account.customerCallHistory,
  allLinguistCalls: state.account.linguistCallHistory,
  missedCallsLinguist: state.account.linguistMissedCallHistory,
});

const mD = {
  loadCustomerCallHistory,
  loadLinguistCallHistory,
  loadLinguistMissedCallHistory,
};

export default connect(
  mS,
  mD
)(CallHistoryView);
