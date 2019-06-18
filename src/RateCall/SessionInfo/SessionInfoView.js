import React, { Component } from "react";
import { connect } from "react-redux";

import { GetInfo, updateSessionInfo } from "../../Ducks/SessionInfoReducer";

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
  componentWillMount() {
    this.props.updateSessionInfo(this.props.navigation.state.params);
  }

  render() {
    const { sessionInfo } = this.props;
    let primaryLang = translateLanguage(sessionInfo.primaryLangCode);
    let secondLang = translateLanguage(sessionInfo.secondaryLangCode);

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
                    {/* Duration */}
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
                    {/* {!this.props.linguistProfile ? (
                      <ListItem
                        containerStyle={styles.listItemContainer}
                        hideChevron
                        subtitle={I18n.t("cost").toUpperCase()}
                        subtitleStyle={styles.titleStyle}
                        rightTitle={"$ 0.00"}
                        rightTitleContainerStyle={
                          styles.listRightTitleContainer
                        }
                        rightTitleStyle={styles.listRightTitle}
                      />
                    ) : null} */}

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
  sessionInfo: state.sessionInfo.info,
  linguistProfile: state.account.linguistProfile
});

const mD = {
  GetInfo,
  updateSessionInfo
};

export default connect(
  mS,
  mD
)(SessionInfoView);
