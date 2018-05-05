import React, { Component } from "react";
import { connect } from "react-redux";

import { updateForm } from "../../Ducks/LinguistFormReducer";

import {
  View,
  Text,
  ScrollView,
  Alert,
  TextInput,
  Platform,
  KeyboardAvoidingView
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";
import {
  Button,
  FormLabel,
  Header,
  Badge
} from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import { topIOS } from "../../Util/Devices";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import BottomButton from "../../Components/BottomButton/BottomButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import TopViewIOS from "../../Components/TopViewIOS/TopViewIOS";
import styles from "./styles";
import { Images, Colors } from "../../Themes";
import I18n from "../../I18n/I18n";

class VerifyPhoneLinguist extends Component {
  navigate = this.props.navigation.navigate;

  render() {
    return (
      <ViewWrapper style={styles.scrollContainer}>
        <ScrollView
          automaticallyAdjustContentInsets={true}
          alwaysBounceVertical={false} 
          style={styles.scrollContainer}
        >
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
                  {/* Header - Navigation */}
                  <TopViewIOS/> 
                  <Header
                    outerContainerStyles={{ borderBottomWidth: 0, height: 60 }}
                    backgroundColor={Colors.transparent}
                    leftComponent={
                      <GoBackButton navigation={this.props.navigation} />
                    }
                  />
                  {/* Verify your phone */}
                  <Text style={styles.mainTitle}>{I18n.t("verifyNumber")}</Text>
                  {/* subtitle */}
                  <Text style={styles.mainSubtitle}>
                    {I18n.t("verifyNumberText")}
                  </Text>
                </Col>
              </Row>

              {/* 
              We need to complete this logic 
              <View style={styles.numberFields}>
                <TextInput style={styles.containerInput}
                  placeholder="1"
                  maxLength={1}
                />
                <TextInput style={styles.containerInput}
                  placeholder="2"
                  maxLength={1}
                />
                <TextInput style={styles.containerInput}
                  placeholder="3"
                  maxLength={1}
                />
                <TextInput style={styles.containerInput}
                  placeholder="4"
                  maxLength={1}
                />
                <TextInput style={styles.containerInput}
                  placeholder="5"
                  maxLength={1}
                />
                <TextInput style={styles.containerInput}
                  placeholder="6"
                  maxLength={1}
                />
              </View> */}
            </Col>
          </Grid>
        </ScrollView>
        {/* Next Button */}
        <BottomButton
          title={I18n.t("next")}
          onPress={() => this.submit()}
        />
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  VerifyPhoneNumber: state.linguistForm.VerifyPhoneNumber,
  formHasErrors: state.linguistForm.formHasErrors
});

const mD = {
  updateForm
};

export default connect(mS, mD)(VerifyPhoneLinguist);
