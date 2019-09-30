import React from "react";
import I18n from "../../I18n/I18n";
import { Text, View } from "react-native";
import styles from "./styles";
import { Card, Divider } from "react-native-elements";
import { moderateScaleViewports } from "../../Util/Scaling";
import { Fonts } from "../../Themes";

const CallNumber =
  ({
     calls,
     amount,
   }) => {
    return (
      <View>
        {calls != null && !!amount != null ? (
          <View>
            <View
              style={{ alignContent: "space-between" }}
            >
              <View style={styles.monthlySummary}>
                <Text style={styles.monthlySummaryText}>{I18n.t('linguistHome.summary')}</Text>
              </View>
              <View style={styles.callNumberContainer}>
                <View style={{ width: "50%" }}>
                  <Text
                    style={[styles.TitleText, styles.center, styles.callsText]}
                  >
                    {I18n.t("calls")}
                  </Text>
                  <Text style={[styles.callNumber, styles.center]}>
                    {calls}
                  </Text>
                </View>
                <Divider style={styles.dividerStyle} />
                <View style={{ width: "50%" }}>
                  <Text
                    style={[styles.TitleText, styles.center, styles.callsText]}
                  >
                    {`${I18n.t("minutes")[0].toUpperCase()}${I18n.t(
                      "minutes"
                    ).slice(1)}`}
                  </Text>
                  <Text style={[styles.callNumber, styles.center]}>
                    {amount}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ) : null}
      </View>
    );
  };

export default CallNumber;
