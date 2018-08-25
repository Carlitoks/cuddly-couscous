import React, { Component } from "react";

import { Text, View, TextInput } from "react-native";

import ViewWrapper from "../../../Containers/ViewWrapper/ViewWrapper";

import { connect } from "react-redux";
import {
  submitFeedback,
  updateSettings as updateHomeFlow
} from "../../../Ducks/HomeFlowReducer";
import I18n from "../../../I18n/I18n";
import { styles } from "./styles";
import { Colors } from "../../../Themes";
import Close from "../../../Components/Close/Close";
import HeaderView from "../../../Components/HeaderView/HeaderView";
import BottomButton from "../../../Components/BottomButton/BottomButton";

class FeedbackView extends Component {
  state = {
    feedbackText: ""
  };

  componentWillMount() {
    this.props.updateHomeFlow({ displayFeedbackProvided: false });
  }

  render() {
    const { navigation, token, userId, submitFeedback } = this.props;
    const { feedbackText } = this.state;

    return (
      <ViewWrapper style={styles.scrollContainer}>
        <HeaderView
          headerRightComponent={
            <Close
              action={() => {
                navigation.dispatch({ type: "Home" });
              }}
            />
          }
          navbarTitle={I18n.t("provideFeedback")}
          navbarType={"Complete"}
          NoWaves
        >
          <View style={styles.flex}>
            {/* Category / Scenario */}
            <View style={styles.category}>
              <Text style={[styles.titleStyle, styles.regularText]}>
                {I18n.t("provideFeedbackViewTitle")}
              </Text>
              <TextInput
                style={[
                  styles.textInput,
                  { height: Math.max(10, this.inputHeight) }
                ]}
                underlineColorAndroid={Colors.transparent}
                value={feedbackText}
                multiline
                autoFocus={true}
                blurOnSubmit
                allowFontScaling={false}
                returnKeyType={"done"}
                placeholder={I18n.t("provideFeedbackViewPlaceholder")}
                onChangeText={feedbackText => this.setState({ feedbackText })}
                onContentSizeChange={event => {
                  this.inputHeight = event.nativeEvent.contentSize.height;
                }}
                maxLength={350}
              />
            </View>

            <View style={styles.buttons}>
              <BottomButton
                onPress={() => {
                  // Provide feedback submission logic
                  submitFeedback(userId, token, { message: feedbackText });
                }}
                title={I18n.t("submitFeedback")}
                fill
                relative
                absolute
              />
            </View>
          </View>
        </HeaderView>
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  token: state.auth.token,
  userId: state.userProfile.id
});

const mD = { submitFeedback, updateHomeFlow };

export default connect(
  mS,
  mD
)(FeedbackView);
