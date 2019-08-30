import React, { Component } from "react";
import { connect } from "react-redux";

import { ScrollView, Text, View, TouchableOpacity } from "react-native";

import { Avatar, List, ListItem } from "react-native-elements";
import { Col, Grid } from "react-native-easy-grid";
import Icon from 'react-native-vector-icons/FontAwesome';

import moment from "moment";

import I18n, { translateLanguage, translateProperty } from "../../I18n/I18n";
import { styles } from "./styles";
import { Fonts, Images } from "../../Themes";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import NavBar from "../../Components/NavBar/NavBar";
import UserAvatar from "../../Components/UserAvatar/UserAvatar";
import WavesBackground from "../../Components/UserAvatar/WavesBackground";
import { moderateScaleViewports } from "../../Util/Scaling";
import CircularAvatar from "../../Components/CircularAvatar/CircularAvatar";
import StarRating from "../../Components/StarRating/StarRating";

class SessionInfoView extends Component {
  render() {
    const sessionInfo = this.props.navigation.state.params.call;
    let primaryLang = translateLanguage(sessionInfo.primaryLangCode);
    let secondLang = translateLanguage(sessionInfo.secondaryLangCode);

    return (
      <View style={styles.scrollContainer}>
        <NavBar
          navbarTitle={I18n.t("history.callTitle")}
          leftComponent={<GoBackButton navigation={this.props.navigation} />}
        />
        <WavesBackground>
          <View style={styles.avatarContainer}>
            <CircularAvatar avatarURL={sessionInfo.avatarURL} firstName={sessionInfo.firstName} lastInitial={sessionInfo.lastInitial} />
            <View style={styles.infoContainer}>
              <Text style={styles.clientType}>{ sessionInfo.userType === "linguist" ? I18n.t("session.rating.linguist") : I18n.t("session.rating.customer")}</Text>
              <Text style={styles.displayName}>{`${sessionInfo.firstName} ${sessionInfo.lastInitial ? sessionInfo.lastInitial : ""}`}</Text>
              { sessionInfo.rating !== "" && (
                <StarRating fullStarColor={"#F39100"} rating={sessionInfo.rating} containerStyle={styles.starRatingContainer} /> // rating given to target user for the session
              )}
              { sessionInfo.rating === "" && !sessionInfo.ifAbuseReported && (
                
                <TouchableOpacity style={styles.addRatingButton}
                                  onPress={() => { this.props.navigation.dispatch({type: "RateView", params: { session: sessionInfo.session , user: { firstName: sessionInfo.firstName, avatarURL: sessionInfo.avatarURL }, isLinguist: sessionInfo.isLinguist, token: sessionInfo.token }}) }}>
                  <Icon name={"pencil-square-o"} color={"#ffffff"} size={moderateScaleViewports(19)} /><Text style={styles.addRatingButtonText}>{I18n.t("history.addRating")}</Text>
                </TouchableOpacity>
              )}
              {sessionInfo.ifAbuseReported && (
              <Text style={styles.abuseReportedText}>{I18n.t("history.abuseReported")}</Text>
              )}
            </View>
          </View>
        </WavesBackground>
          <ScrollView
            automaticallyAdjustContentInsets={true}
            style={{ flex: 1 }}
            alwaysBounceVertical={false}
          >
            <Grid>
              <Col>
                <Grid style={styles.summaryContainer}>
                  <List containerStyle={{ borderTopWidth: 0 }}>
                    {/* Type of Assistance*/}
                    {sessionInfo.category && sessionInfo.title ? (
                      <ListItem
                        containerStyle={styles.listItemContainer}
                        hideChevron
                        title={sessionInfo.category.toUpperCase()}
                        titleStyle={styles.titleStyle}
                        subtitle={
                          sessionInfo.title.charAt(0).toUpperCase() +
                          sessionInfo.title.slice(1)
                        }
                        subtitleStyle={styles.listSubtitle}
                      />
                    ) : null}
                    {/* Languages */}
                    <ListItem
                      hideChevron
                      containerStyle={styles.listItemContainer}
                      title={I18n.t("languages")}
                      titleStyle={styles.titleStyle}
                      subtitle={
                        <View style={styles.languagesContainer}>
                          <Text style={styles.languagesText}>
                            {primaryLang}, {secondLang}
                          </Text>
                        </View>
                      }
                    />
                    {/* Duration */}
                    <ListItem
                      containerStyle={styles.listItemContainer}
                      hideChevron
                      title={I18n.t("duration").toUpperCase()}
                      titleStyle={styles.titleStyle}
                      subtitle={!sessionInfo.missedTab
                        ? sessionInfo.duration >= 60
                          ? `${moment
                            .utc(sessionInfo.duration * 1000)
                            .format("mm")} ${I18n.t('minutes')}`
                          : `${moment
                            .utc(sessionInfo.duration * 1000)
                            .format("ss")} ${I18n.t('seconds')}`
                        : sessionInfo.missedCall}
                      subtitleStyle={styles.languagesText}
                    />

                    {/* Scenario */
                      sessionInfo.title ?
                      <ListItem
                        containerStyle={styles.listItemContainer}
                        hideChevron
                        title={I18n.t("history.scenario")}
                        titleStyle={styles.titleStyle}
                        subtitle={translateProperty(sessionInfo, "title")}
                        subtitleStyle={styles.languagesText}
                      /> : null
                    }


                    {/* CustomScenarioNote */
                      sessionInfo.customScenarioNote ?
                      <ListItem
                        containerStyle={styles.listNoteItemContainer}
                        hideChevron
                        title={I18n.t("history.scenarioNote")}
                        titleStyle={styles.titleStyle}
                        subtitle={sessionInfo.customScenarioNote}
                        subtitleStyle={styles.optionalNoteStyle}
                      /> : null
                    }

                  </List>
                </Grid>
              </Col>
            </Grid>
          </ScrollView>
      </View>
    );
  }
}

// to be used when we have the Endpoint
const mS = state => ({
  token: state.auth2.userJwtToken,
});

const mD = {
};

export default connect(
  mS,
  mD
)(SessionInfoView);
