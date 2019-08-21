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
              <View style={{backgroundColor: "#F1F1F1", width: "100%", minHeight: moderateScaleViewports(44), justifyContent: "center"}}>
                <Text style={{ fontSize: moderateScaleViewports(18), color: "#444444", marginLeft: moderateScaleViewports(34), fontFamily: Fonts.BaseFont, fontWeight: "bold" }}>Monthly Summary</Text>
              </View>
              <View style={{ flexDirection: "row", paddingTop: moderateScaleViewports(18), paddingBottom: moderateScaleViewports(12) }}>
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
                <Divider style={{ height: "90%", width: 1, backgroundColor: "#DCDCDC" }} />
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
