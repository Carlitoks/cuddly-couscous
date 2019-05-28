import React, { Component } from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
// Styles
import styles from "./Styles/TermsAndConditionsStyles";
import I18n from "../../../I18n/I18n";
import { PrivacyPolicyURI, TermsConditionsURI } from "../../../Config/StaticViewsURIS";

class TermsAndConditions extends Component {
  renderPrivacyPolicyText = () => {
    const privacyPolicyAndTermsText = I18n.t("newCustomerOnboarding.register.termsAndPrivacyNotice");
    const privacyPolicyText = I18n.t("newCustomerOnboarding.register.privacyPolicy");
    const TermsText = I18n.t("newCustomerOnboarding.register.terms");
    const continueText = privacyPolicyAndTermsText.split(TermsText)[0];
    const AndText = privacyPolicyAndTermsText.split(TermsText)[1].split(privacyPolicyText)[0];
    return (
      <View style={styles.termsAndConditionsViewContainer}>
        <Text style={styles.termsAndConditionsText}>{continueText}</Text>
        <TouchableOpacity
          style={styles.touchableLink}
          onPress={() => {
            /* Linking.openURL(TermsConditionsURI).catch(err =>
              console.error("An error occurred", err)
            ); */
            Linking.canOpenURL(TermsConditionsURI)
              .then(supported => {
                if (!supported) {
                  console.log(`Can't handle url: ${TermsConditionsURI}`);
                } else {
                  return Linking.openURL(TermsConditionsURI);
                }
                return null;
              })
              .catch(err => console.error("An error occurred", err));
          }}
        >
          <Text style={styles.termsAndConditionsTextLink}>{`${TermsText}`}</Text>
        </TouchableOpacity>

        <Text style={styles.termsAndConditionsText}>{AndText}</Text>
        <TouchableOpacity
          style={styles.touchableLink}
          onPress={
            () => {
              Linking.canOpenURL(PrivacyPolicyURI)
                .then(supported => {
                  if (!supported) {
                    console.log(`Can't handle url: ${PrivacyPolicyURI}`);
                  } else {
                    return Linking.openURL(PrivacyPolicyURI);
                  }
                  return null;
                })
                .catch(err => console.error("An error occurred", err));
            }
            /* Linking.openURL(PrivacyPolicyURI).catch(err =>
              console.error("An error occurred", err)
            ) */
          }
        >
          <Text style={styles.termsAndConditionsTextLink}>{` ${privacyPolicyText}`}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return this.renderPrivacyPolicyText();
  }
}

const mS = state => ({

});

const mD = {
};

export default connect(
  mS,
  mD,
)(TermsAndConditions);
