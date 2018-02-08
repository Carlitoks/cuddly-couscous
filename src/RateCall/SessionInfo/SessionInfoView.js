
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

import I18n from "../../I18n/I18n";
import TopViewIOS from "../../Components/TopViewIOS/TopViewIOS";
import { styles } from "./styles";
import { Images, Colors } from "../../Themes";
import { IMAGE_STORAGE_URL } from "../../Config/env";
import Languages from "../../Config/Languages";
import LinearGradient from "react-native-linear-gradient";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";

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
        <ScrollView automaticallyAdjustContentInsets={true} alwaysBounceVertical={false} >
          {/* Linguist Information */}
          <Grid>
            <Col>
              <Row>
                {/* Linear Gradient */}
                <LinearGradient
                  colors={[
                    Colors.gradientColor.top,
                    Colors.gradientColor.middle,
                    Colors.gradientColor.bottom
                  ]}
                  style={styles.linearGradient}
                />
                <Col>
                <TopViewIOS/>
                  <Header
                    outerContainerStyles={{ borderBottomWidth: 0, height: 60 }}
                    backgroundColor="transparent"
                    leftComponent={
                      <GoBackButton navigation={this.props.navigation} />
                    }
                  />
                  <Row style={styles.linguistAvatar}>
                    <Col>
                      <Avatar
                        xlarge
                        containerStyle={styles.avatarContent}
                        rounded
                        source={
                          sessionInfo.avatarURL
                            ? {
                                uri: `${IMAGE_STORAGE_URL}${
                                  sessionInfo.avatarURL
                                }`
                              }
                            : Images.avatar
                        }
                      />
                    </Col>
                    <Col>
                      <Text style={styles.linguistName}>
                        {sessionInfo.firstName} {sessionInfo.lastInitial}
                      </Text>
                      <View style={styles.starContainer}>
                        <StarRating
                          emptyStar={"ios-star"}
                          fullStar={"ios-star"}
                          halfStar={"ios-star-half"}
                          iconSet={"Ionicons"}
                          disabled={false}
                          rating={sessionInfo.rating ? sessionInfo.rating : 0}
                          maxStars={5}
                          starSize={25}
                          emptyStarColor={Colors.emptyStarColor}
                          starColor={Colors.starColor}
                        />
                      </View>
                    </Col>
                  </Row>
                </Col>
              </Row>

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
                      {sessionInfo.duration}
                    </Text>
                  </Col>
                </Row>
              </Grid>
            </Col>
          </Grid>
        </ScrollView>
      </ViewWrapper>
    );
  }
}

// to be used when we have the Endpoint
const mS = state => ({
  sessionId: state.callCustomerSettings.sessionID,
  token: state.auth.token,
  sessionInfo: state.sessionInfo.info
});

const mD = {
  GetInfo,
  updateSessionInfo
};

export default connect(mS, mD)(SessionInfoView);