import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import I18n from "../../I18n/I18n";
import ThumbsButton from "../../Components/ThumbsButton/ThumbsButton";
import { updateOptions } from "../../Ducks/RateCallReducer";
import Colors from "../../Themes/Colors";
import { styles } from "./styles";

class RateExperienceThumbs extends Component {
  buttonThumbs(selectedIndex) {
    if (selectedIndex == 0) {
      this.togglethumbsUp();
    } else {
      this.togglethumbsDown();
    }
  }

  togglethumbsUp = () => {
    this.props.updateOptions({
      thumbsUp: true,
      thumbsDown: false
    });
  };

  togglethumbsDown = () => {
    this.props.updateOptions({
      thumbsDown: true,
      thumbsUp: false
    });
  };

  buttonsHandle = (icon, flag) => {
    this.genericToggleFunction(
      icon.IconName,
      icon.IconState,
      this.props[icon.IconState],
      flag,
      icon.OffState
    );
  };

  render() {
    const { linguistProfile } = this.props;
    return (
      <View style={styles.viewContainerThumbs}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.textQuestions}>
            {linguistProfile
              ? I18n.t("customerSatisfied")
              : I18n.t("needsAddress")}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <View style={styles.thumbsUp}>
            <ThumbsButton
              IconName="ios-thumbs-up"
              StateIcon={this.props.thumbsUp}
              onPress={() => this.buttonThumbs(0)}
              color={Colors.gradientColorButton.middle}
            />
          </View>
          <View style={styles.thumbsDown}>
            <ThumbsButton
              IconName="ios-thumbs-down"
              StateIcon={this.props.thumbsDown}
              onPress={() => this.buttonThumbs(1)}
              color={Colors.gradientColorButton.middle}
            />
          </View>
        </View>
      </View>
    );
  }
}

const mS = state => ({
  thumbsUp: state.rateCall.thumbsUp,
  thumbsDown: state.rateCall.thumbsDown,
  linguistProfile: state.userProfile.linguistProfile
});

const mD = { updateOptions };
export default connect(mS, mD)(RateExperienceThumbs);
