import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import EN from "../../I18n/en";
import { Images } from "../../Themes";

import { FormInput, Avatar, Card, Button } from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";

import { styles } from "./styles";
//import Avatar from "react-native-interactive-avatar";
import Icon from "react-native-vector-icons/MaterialIcons";

import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import NextButton from "../../Components/NextButton/NextButton";

export default class CustomerAccount extends Component {
  render() {
    const navigation = this.props.navigation;

    return (
      <ScrollView
        automaticallyAdjustContentInsets={true}
        style={styles.scrollContainer}
      >
        <Grid>
          <Row>
            <GoBackButton navigation={this.props.navigation} />
            <NextButton navigation={this.props.navigation} />
          </Row>
          <Col style={styles.col}>
            {/* Avatar */}
            <Avatar
              xlarge
              rounded
              style={styles.avatar}
              source={require("../../Images/perfil.jpg")}
              activeOpacity={0.7}
            />

            {/* Title */}
            <Text style={styles.personalInformation}>
              {EN["PersonalInformation"]}
            </Text>

            <FormInput placeholder={EN["Firstname"]} autoCorrect={false} />
            <FormInput placeholder={EN["Lastname"]} autoCorrect={false} />
          </Col>
        </Grid>
      </ScrollView>
    );
  }
}
