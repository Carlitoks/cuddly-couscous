import React, { Component } from "react";
import {
  View,
  Modal,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native";
import { Button } from "react-native-elements";
import I18n from "../../../../I18n/I18n";
import PillButton from "../../../../Components/PillButton/PillButton";
import { Colors } from "./../../../../Themes";
import { updateSettings as updateHomeFlow } from "../../../../Ducks/HomeFlowReducer";
import { connect } from "react-redux";

import styles from "./Styles/WelcomeModalStyles";

class NewUserWelcomeModal extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Modal
        visible={this.props.visible}
        animationType={"fade"}
        onRequestClose={() => false}
        transparent={true}
      >
        <TouchableWithoutFeedback onPress={this.props.closeModal}>
          <View style={styles.modalContainer}>
            <PillButton
              containerCustomStyle={[styles.modalTopButton]}
              title={`${I18n.t("minutesAbbreviation", {
                minutes: this.props.availableMinutes
              })}`}
              icon={"ios-time"}
              alignButton={"Center"}
              color={"green"}
            />
            <View style={styles.modalWrapper}>
              <View>
                <Text style={styles.modalTitle}>
                  {I18n.t("customerHome.registrationWelcome.title")}
                </Text>
                <Text style={styles.modalText}>
                  {I18n.t("customerHome.registrationWelcome.description")}
                </Text>
              </View>

              <Button
                borderRadius={27}
                textStyle={styles.text}
                title={I18n.t(
                  "customerHome.registrationWelcome.buttons.dismiss"
                )}
                onPress={() => {
                  return this.props.closeModal();
                }}
                backgroundColor={Colors.gradientColor.bottom}
                buttonStyle={styles.modalButton}
              />

              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.dispatch({
                    type: "PaymentsView",
                    params: {
                      title: I18n.t("paymentDetails"),
                      messageText: I18n.t("enterPaymentDetails"),
                      buttonText: I18n.t("save"),
                      buttonTextIfEmpty: I18n.t("save"),
                      optional: true,
                      onSubmit: () =>
                        this.props.navigation.dispatch({ type: "Home" })
                    }
                  });
                  this.props.closeModal();
                }}
              >
                <Text style={styles.addPaymentInformation}>
                  {I18n.t("customerHome.registrationWelcome.buttons.payment")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const mS = state => ({
  availableMinutes: state.userProfile.availableMinutes,
  isNewUser: state.userProfile.isNewUser
});

const mD = { updateHomeFlow };

export default connect(
  mS,
  mD
)(NewUserWelcomeModal);
