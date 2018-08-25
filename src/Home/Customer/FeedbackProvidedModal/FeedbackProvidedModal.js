import React from "react";
import { View, Modal, Text, TouchableWithoutFeedback } from "react-native";

import styles from "./styles";
import I18n from "../../../I18n/I18n";

import PillButton from "../../../Components/PillButton/PillButton";
import { Button } from "react-native-elements";
import { Colors } from "../../../Themes";

const FeedbackProvidedModal = ({
  visible,
  closeModal,
  availableMinutes,
  continueUsing
}) => {
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
            <Button
              borderRadius={27}
              textStyle={styles.text}
              title={I18n.t("continueUsingJeenie")}
              onPress={continueUsing}
              backgroundColor={Colors.gradientColor.bottom}
              buttonStyle={styles.modalButton}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default FeedbackProvidedModal;
