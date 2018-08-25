import React from "react";
import { View, Modal } from "react-native";
import { Button } from "react-native-elements";

import styles from "./styles";
import I18n from "../../../I18n/I18n";

import PillButton from "../../../Components/PillButton/PillButton";
import CelebrateOurLaunch from "../../../Components/CelebrateOurLaunch/CelebrateOurLaunch";

import { Colors } from "../../../Themes";

const SixtyMinutesModal = ({ visible, closeModal, availableMinutes }) => {
  return (
    <Modal
      visible={visible}
      animationType={"fade"}
      onRequestClose={() => false}
      transparent={true}
    >
      <View style={styles.modalContainer}>
        <PillButton
          containerCustomStyle={[styles.modalTopButton]}
          title={`${I18n.t("minutesAbbreviation", {
            minutes: availableMinutes
          })}`}
          icon={"ios-time"}
          alignButton={"Center"}
        />
        <View style={[styles.modalWrapper]}>
          <CelebrateOurLaunch
            styles={styles}
            alternativeTitle
            alternativeDiscountsOffered
          />
          <Button
            borderRadius={27}
            textStyle={styles.text}
            title={I18n.t("gotIt")}
            onPress={closeModal}
            backgroundColor={Colors.gradientColor.bottom}
            buttonStyle={styles.modalButton}
          />
        </View>
      </View>
    </Modal>
  );
};

export default SixtyMinutesModal;
