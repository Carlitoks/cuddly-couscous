import React, { Component } from "react";
import { connect } from "react-redux";

import { ScrollView, Text, View } from "react-native";

import { List, ListItem } from "react-native-elements";
import { Col, Grid } from "react-native-easy-grid";

import moment from "moment";

import I18n, { translateLanguage } from "../../I18n/I18n";
import { styles } from "./styles";
import { Images } from "../../Themes";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import NavBar from "../../Components/NavBar/NavBar";
import UserAvatar from "../../Components/UserAvatar/UserAvatar";
import WavesBackground from "../../Components/UserAvatar/WavesBackground";

class SessionInfoView extends Component {

  addrating(){

    const params = {
      session: this.props.navigation.state.params.call,
      user: this.props.remoteUser,
      isLinguist: true,
      token: this.props.token,
      navigation: this.props.navigation
    }

    this.props.navigation.dispatch({type: "RatingsScreen", params});
  }

  render() {
    const sessionInfo = this.props.navigation.state.params.call;
    let primaryLang = translateLanguage(sessionInfo.primaryLangCode);
    let secondLang = translateLanguage(sessionInfo.secondaryLangCode);

    console.log(sessionInfo,this.props.token)

    
    
    return (
      <View style={styles.scrollContainer}>
        <NavBar
          leftComponent={<GoBackButton navigation={this.props.navigation} />}
        />
        <WavesBackground>
          <UserAvatar
            avatarSource={
              sessionInfo.avatarURL
                ? {
                  uri: sessionInfo.avatarURL
                }
                : Images.avatar
            }
            avatarHeight={150}
            avatarTitle={sessionInfo.firstName + " " + (sessionInfo.lastInitial ? sessionInfo.lastInitial : '')}
            stars={sessionInfo.rating ? sessionInfo.rating : 0}
            addratings={()=> this.addrating()}
          />
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
                      title={I18n.t("duration")}
                      titleStyle={styles.titleStyle}
                      subtitle={
                        <View style={styles.languagesContainer}>
                          <Text style={styles.languagesText}>
                            {I18n.t("history.durationTime",{num: sessionInfo.duration})}
                          </Text>
                        </View>
                      }
                    />
                    {/* Scenario */}
                    <ListItem
                      containerStyle={styles.listItemContainer}
                      hideChevron
                      title={I18n.t("history.scenario")}
                      titleStyle={styles.titleStyle}
                      subtitle={
                        <View style={styles.languagesContainer}>
                          <Text style={styles.languagesText}>
                            {sessionInfo.title}
                          </Text>
                        </View>
                      }
                    />
                    {/* Optional Note */}
                    <ListItem
                      containerStyle={styles.listItemContainer}
                      hideChevron
                      title={I18n.t("history.scenarioNote")}
                      titleStyle={styles.titleStyle}
                      subtitle={
                        <View style={styles.languagesContainer}>
                          <Text style={styles.languagesText}>
                            {sessionInfo.customScenarioNote}
                          </Text>
                        </View>
                      }
                    />

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
