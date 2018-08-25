import React from "react";
import { View, Modal, Text, TouchableWithoutFeedback } from "react-native";

import styles from "./styles";
import I18n from "../../../I18n/I18n";

import PillButton from "../../../Components/PillButton/PillButton";

const FeedbackProvidedModal = ({ visible, closeModal, availableMinutes }) => {
  return (
    <Modal
      visible={visible}
      animationType={"fade"}
      onRequestClose={() => false}
      transparent={true}
    >
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.modalContainer}>
          <PillButton
            containerCustomStyle={[styles.modalTopButton]}
            title={`${I18n.t("minutesAbbreviation", {
              minutes: availableMinutes
            })}`}
            icon={"ios-time"}
            alignButton={"Center"}
            color={"orange"}
          />
          <View style={styles.modalWrapper}>
            <Text style={styles.modalTitle}>{I18n.t("thankYouFeedback")}</Text>
            <Text style={styles.modalText}>
              {I18n.t("thankYouFeedbackModalText")}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default FeedbackProvidedModal;
