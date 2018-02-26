import React, { Component } from "react";
import { connect } from "react-redux";

import { GetInfo, updateSessionInfo } from "../../Ducks/SessionInfoReducer";

import Icon from "react-native-vector-icons/Ionicons";
import { Text, View, ScrollView } from "react-native";

import { Button, Avatar, Header } from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";
import StarRating from "react-native-star-rating";

import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import _isUndefined from "lodash/isUndefined";
import moment from "moment";

import I18n from "../../I18n/I18n";
import { styles } from "./styles";
import { Images, Colors } from "../../Themes";
import { IMAGE_STORAGE_URL } from "../../Config/env";
import Languages from "../../Config/Languages";
import LinearGradient from "react-native-linear-gradient";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import HeaderView from "../../Components/HeaderView/HeaderView";

class SessionInfoView extends Component {
  componentWillMount() {
    this.props.updateSessionInfo(this.props.navigation.state.params);
  }

  filterList(langCode) {
    return Languages.filter(lang => {
      return lang["3"] === langCode;
    });
  }

  render() {
    const { sessionInfo } = this.props;
    //console.log(this.props.sessionInfo.primaryLangCode);
    let primaryLang = this.filterList(sessionInfo.primaryLangCode)[0];
    primaryLang = !_isUndefined(primaryLang)
      ? primaryLang.name
      : "this languague not exits";
    let secondLang = this.filterList(sessionInfo.secondaryLangCode)[0];
    secondLang = !_isUndefined(secondLang)
      ? secondLang.name
      : I18n.t("english");

    return (
      <ViewWrapper style={styles.scrollContainer}>
        <HeaderView
          headerLeftComponent={
            <GoBackButton navigation={this.props.navigation} />
          }
          avatarSource={
            sessionInfo.avatarURL
              ? {
                  uri: `${IMAGE_STORAGE_URL}${sessionInfo.avatarURL}`
                }
              : Images.avatar
          }
          avatarHeight={150}
          avatarTitle={sessionInfo.firstName + " " + sessionInfo.lastInitial}
          stars={sessionInfo.rating ? sessionInfo.rating : 0}
        >
          <ScrollView automaticallyAdjustContentInsets={true}>
            {/* Linguist Information */}
            <Grid>
              <Col>
                <Grid style={styles.callContainer}>
                  <Row style={styles.callInformation}>
                    <Col style={styles.alignIcon}>
                      <Icon
                        color={Colors.iconHistory}
                        style={styles.iconStyle}
                        name="ios-chatbubbles"
                        size={40}
                      />
                    </Col>
                    <Col>
                      <Text style={styles.textLinguist}>
                        {primaryLang} , {secondLang}
                      </Text>
                    </Col>
                  </Row>
                </Grid>

                <Grid>
                  <Row style={styles.callInformation}>
                    <Col style={styles.alignIcon}>
                      <Icon
                        color={Colors.iconHistory}
                        style={styles.iconStyle}
                        name="ios-clock"
                        size={40}
                      />
                    </Col>
                    <Col>
                      <Text style={styles.textLinguist}>
                        {sessionInfo.duration >= 60
                          ? `${moment
                              .utc(sessionInfo.duration * 1000)
                              .format("mm:ss")} mins`
                          : `${moment
                              .utc(sessionInfo.duration * 1000)
                              .format("mm:ss")} seconds`}
                      </Text>
                    </Col>
                  </Row>
                </Grid>
                {sessionInfo.scenario ? (
                  <Grid>
                    <Row style={styles.callInformation}>
                      <Col style={styles.alignIcon}>
                        <Text>
                          <Icon
                            color={Colors.iconHistory}
                            style={styles.iconStyle}
                            name="md-help-circle"
                            size={40}
                          />
                        </Text>
                      </Col>
                      <Col>
                        <Text style={styles.textLinguist}>
                          {sessionInfo.scenario}
                        </Text>
                      </Col>
                    </Row>
                  </Grid>
                ) : null}
              </Col>
            </Grid>
          </ScrollView>
        </HeaderView>
      </ViewWrapper>
    );
  }
}

// to be used when we have the Endpoint
const mS = state => ({
  sessionId: state.tokbox.sessionID,
  token: state.auth.token,
  sessionInfo: state.sessionInfo.info
});

const mD = {
  GetInfo,
  updateSessionInfo
};

export default connect(mS, mD)(SessionInfoView);
