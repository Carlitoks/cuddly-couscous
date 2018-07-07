import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { styles } from "./styles";
import I18n from "../../../I18n/I18n";

import ListComponent from "../../../Components/ListComponent/ListComponent";
import { ComingSoonLanguages } from "../../../Config/Languages";

const ComingSoonLanguagesList = () => (
  <View>
    <View style={styles.comingSoonContainer}>
      <Text style={styles.comingSoonText}>{I18n.t("languagesComingSoon")}</Text>
    </View>

    <ListComponent
      data={ComingSoonLanguages}
      titleProperty={"name"}
      leftText
      noFlex
      disableAll
      disableScroll
    />
  </View>
);

export default ComingSoonLanguagesList;
