
import React, { Component } from "react";
import { connect } from "react-redux";

import { GetInfo } from "../../Ducks/SessionInfoReducer";

import Icon from "react-native-vector-icons/Ionicons";
import { Text, View, ScrollView } from "react-native";

import { Button, Avatar, Header } from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";
import StarRating from "react-native-star-rating";

import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";

import I18n from "../../I18n/I18n";
import TopViewIOS from "../../Components/TopViewIOS/TopViewIOS";
import { styles } from "./styles";
import { Images, Colors } from "../../Themes";
import LinearGradient from "react-native-linear-gradient";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";

class SessionInfoView extends Component {
  render() {
    const linguistInfo = this.props.GetInfo();

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
                        source={Images.avatar}
                      />
                    </Col>
                    <Col>
                      <Text style={styles.linguistName}>Zhang W.</Text>
                      <Text style={styles.linguistAddress}>
                        <Icon name="ios-pin" size={20} /> San Francisco
                      </Text>
                      <View style={styles.starContainer}>
                        <StarRating
                          emptyStar={"ios-star"}
                          fullStar={"ios-star"}
                          halfStar={"ios-star-half"}
                          iconSet={"Ionicons"}
                          disabled={false}
                          rating={4.5}
                          maxStars={5}
                          starSize={25}
                          emptyStarColor={"#cccccc"}
                          starColor={"#ffcb00"}
                        />
                      </View>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Grid style={styles.callContainer}>
                {linguistInfo.map((item, i) => (
                  <Row style={styles.callInformation} key={i}>
                    <Col style={styles.alignIcon}>
                      <Icon
                        color={"#3b98b7"}
                        style={styles.iconStyle}
                        name={item.iconName}
                        size={40}
                      />
                    </Col>
                    <Col>
                      <Text style={styles.textLinguist}>
                        {item.information}
                      </Text>
                    </Col>
                  </Row>
                ))}
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
  token: state.auth.token
});

const mD = {
  GetInfo
};

export default connect(mS, mD)(SessionInfoView);