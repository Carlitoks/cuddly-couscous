import React from "react";
import I18n from "../../I18n/I18n";
import { Text, View } from "react-native";
import styles from "./styles";
import { Card } from "react-native-elements";

const CallNumber =
  ({
     calls,
     amount,
   }) => {
    return (
      <View>
        {calls != null && !!amount != null ? (
          <View style={{ height: 70 }}>
            <Card
              style={{ alignContent: "space-between", height: 50 }}
              wrapperStyle={{ flex: 1, alignContent: "space-around" }}
              containerStyle={styles.card}
            >
              <View style={{ flexDirection: "row" }}>
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
            </Card>
          </View>
        ) : null}
      </View>
    );
  };

export default CallNumber;
