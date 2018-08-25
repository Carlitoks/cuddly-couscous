import React from "react";
import { Text, View } from "react-native";
import I18n from "../../I18n/I18n";

const CelebrateOurLaunch = ({
  styles,
  alternativeTitle,
  alternativeDiscountsOffered
}) => {
  return (
    <View>
      <Text style={styles.COL_title}>
        {alternativeTitle
          ? I18n.t("celebrateAndEnjoyAlternative")
          : I18n.t("celebrateAndEnjoy")}
      </Text>

      <View style={styles.COL_futurePricingContainer}>
        <View style={styles.COL_futurePricingTitleContainer}>
          <Text style={styles.COL_futurePricingTitle}>
            {I18n.t("futurePricing")}
          </Text>
        </View>
        <View style={styles.COL_futurePricingBox}>
          <Text style={styles.COL_futurePricingBoxTitle}>
            {I18n.t("payAsYouGoPricing")}
          </Text>
          <Text style={styles.COL_futurePricingBoxAnd}>
            {`- ${I18n.t("and").toUpperCase()} -`}
          </Text>
          <Text style={styles.COL_futurePricingBoxBody}>
            {alternativeDiscountsOffered
              ? I18n.t("discountsOfferedAlternative")
              : I18n.t("discountsOffered")}
          </Text>
          <Text style={styles.COL_futurePricingBoxEnd}>
            {I18n.t("unusedMinutes")}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CelebrateOurLaunch;
