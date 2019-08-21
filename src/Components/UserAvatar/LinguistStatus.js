import React from "react";
import I18n from "../../I18n/I18n";
import { ActivityIndicator, Switch, Text, View } from "react-native";
import { Colors } from "../../Themes";
import styles from "./styles";


const LinguistStatus =
  ({
     navigation,
     children,
     status,
     loading,
     switchOnChange,
     switchValue
   }) => {
    return (
      <View>
        {switchValue != null && !!switchOnChange && switchValue != null ? (
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>
              {status ? I18n.t("online")
                : I18n.t("offline")
              }
            </Text>
            <Switch
              onValueChange={switchOnChange}
              disabled={loading}
              style={styles.switchContainer}
              value={switchValue}
              thumbColor={Colors.thumbTintColor}
              trackColor={{
                true: "#F39100",
                false: Colors.tintColor
              }}
            />
          </View>
        ) : null}
      </View>
    );
  };

export default LinguistStatus;
