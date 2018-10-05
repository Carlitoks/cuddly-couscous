import React, { Component } from "react";
import { View, Modal, Text, TouchableWithoutFeedback } from "react-native";
import { Button } from "react-native-elements";

import styles from "./styles";
import I18n from "../../../I18n/I18n";

import PillButton from "../../../Components/PillButton/PillButton";

import { Colors } from "../../../Themes";
import { updateSettings as updateHomeFlow } from "../../../Ducks/HomeFlowReducer";
import { connect } from "react-redux";

class PaymentModal extends Component {
  constructor(props) {
    super(props);
  }

  setContent() {
    if (this.props.availableMinutes == 0 && !this.props.stripePaymentToken) {
      return I18n.t("payments.enterPaymentToTalk");
    }
    if (!!this.props.stripePaymentToken) {
      return I18n.t("payments.currentRateDescription");
    }
    if (this.props.availableMinutes > 0) {
      return I18n.t("fallPromotionModal");
    }
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
              color={"red"}
            />
            <View style={styles.modalWrapper}>
              <Text style={styles.modalTitle}>
                {I18n.t("provideFeedbackModalTitle")}
              </Text>
              <Text style={styles.modalText}>{this.setContent()}</Text>
              <Button
                borderRadius={27}
                textStyle={styles.text}
                title={
                  this.props.availableMinutes < 5 &&
                  !this.props.stripePaymentToken
                    ? I18n.t("enterPayment")
                    : I18n.t("gotIt")
                }
                onPress={() => {
                  if (
                    this.props.availableMinutes < 5 &&
                    !this.props.stripePaymentToken
                  ) {
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
                    this.props.updateHomeFlow({ displayPaymentModal: false });
                  } else {
                    this.props.updateHomeFlow({ displayPaymentModal: false });
                  }
                }}
                backgroundColor={Colors.gradientColor.bottom}
                buttonStyle={styles.modalButton}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const mS = state => ({
  stripeCustomerID: state.userProfile.stripeCustomerID,
  stripePaymentToken: state.userProfile.stripePaymentToken,
  availableMinutes: state.userProfile.availableMinutes
});

const mD = { updateHomeFlow };

export default connect(
  mS,
  mD
)(PaymentModal);
