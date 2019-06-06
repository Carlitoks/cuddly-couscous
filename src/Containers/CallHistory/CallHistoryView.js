import React, { Component } from "react";
import { connect } from "react-redux";

import {
  customerCalls,
  getAllCustomerCalls,
  getAllLinguistCalls,
  getMissedLinguistCalls,
  indexOnChange,
  linguistCalls,
  linguistMissedCalls
} from "../../Ducks/CallHistoryReducer";

import { ScrollView, View } from "react-native";
import { Col, Grid } from "react-native-easy-grid";
import _isEmpty from "lodash/isEmpty";
import _isUndefined from "lodash/isUndefined";
import CallHistoryComponent from "../../Components/CallHistory/CallHistory";
import ShowMenuButton from "../../Components/ShowMenuButton/ShowMenuButton";
import Close from "../../Components/Close/Close";
import NavBar from "../../Components/NavBar/NavBar";

import moment from "moment";

import styles from "./style";
import I18n from "../../I18n/I18n";

class CallHistoryView extends Component {
  componentWillMount() {
    if (this.props.linguistProfile) {
      this.getAllLinguistCalls(this.props.userId, this.props.token);
      this.getMissedLinguistCalls(this.props.userId, this.props.token);
    } else {
      this.getAllCustomerCalls(this.props.userId, this.props.token);
    }
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
                    this.props.selectedIndex === 0 ? allCalls : missedCalls
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
  linguistProfile: state.userProfile.linguistProfile,
  token: state.auth2.userJwtToken,
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

export default connect(
  mS,
  mD
)(CallHistoryView);
