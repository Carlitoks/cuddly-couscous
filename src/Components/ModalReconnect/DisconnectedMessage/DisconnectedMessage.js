import React from "react";
import { Text, View } from "react-native";
import { ListItem } from "react-native-elements";

import { styles } from "./styles";

const DisconnectedMessage = ({ title, subtitle, listItems }) => {
  return (
    <View style={styles.modalWrapper}>
      <View style={styles.disconnectedModalContainer}>
        <View style={styles.disconnectedModalHead}>
          <Text style={styles.disconnectedModalHeadText}>{title}</Text>
          <Text style={styles.disconnectedModalHeadText}>{subtitle}</Text>
        </View>

        {listItems.map((item, index) => (
          <ListItem
            key={index}
            title={item.title}
            hideChevron
            titleStyle={styles.disconnectedModalListItem}
            onPress={item.onPress}
          />
        ))}
      </View>
    </View>
  );
};

export default DisconnectedMessage;
