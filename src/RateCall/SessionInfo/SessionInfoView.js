import React, { Component } from "react";
import { connect } from "react-redux";

import { GetInfo, updateSessionInfo } from "../../Ducks/SessionInfoReducer";

import Icon from "react-native-vector-icons/Ionicons";
import { Text, View, ScrollView } from "react-native";

import { Button, Avatar, Header, List, ListItem } from "react-native-elements";
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
                  uri: sessionInfo.avatarURL
                }
              : Images.avatar
          }
          avatarHeight={150}
          avatarTitle={sessionInfo.firstName + " " + sessionInfo.lastInitial}
          stars={sessionInfo.rating ? sessionInfo.rating : 0}
        >
          <ScrollView
            automaticallyAdjustContentInsets={true}
            style={{ flex: 1 }}
          >
            <Grid>
              <Col>
                <Grid style={styles.summaryContainer}>
                  <List containerStyle={{ borderTopWidth: 0 }}>
                    {/* Type of Assistance*/}
                    {sessionInfo.scenario ? (
                      <ListItem
                        containerStyle={styles.listItemContainer}
                        hideChevron
                        title={I18n.t("generalAssistance").toUpperCase()}
                        titleStyle={styles.titleStyle}
                        subtitle={
                          sessionInfo.scenario.charAt(0).toUpperCase() +
                          sessionInfo.scenario.slice(1)
                        }
                        subtitleStyle={styles.listSubtitle}
                      />
                    ) : null}
                    {/* Languages */}
                    <ListItem
                      hideChevron
                      containerStyle={styles.listItemContainer}
                      title={I18n.t("languages").toUpperCase()}
                      titleStyle={styles.titleStyle}
                      subtitle={
                        <View style={styles.languagesContainer}>
                          <Text style={styles.languagesText}>
                            {primaryLang}, {secondLang}
                          </Text>
                        </View>
                      }
                    />

                    <ListItem
                      containerStyle={styles.listItemContainer}
                      hideChevron
                      subtitle={I18n.t("duration").toUpperCase()}
                      subtitleStyle={styles.titleStyle}
                      rightTitle={`${moment
                        .utc(sessionInfo.duration * 1000)
                        .format("mm:ss")}`}
                      rightTitleContainerStyle={styles.listRightTitleContainer}
                      rightTitleStyle={styles.listRightTitle}
                    />

                    {/* Cost */}
                    <ListItem
                      containerStyle={styles.listItemContainer}
                      hideChevron
                      subtitle={I18n.t("cost").toUpperCase()}
                      subtitleStyle={styles.titleStyle}
                      rightTitle={"$ 0.00"}
                      rightTitleContainerStyle={styles.listRightTitleContainer}
                      rightTitleStyle={styles.listRightTitle}
                    />
                  </List>
                </Grid>
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
