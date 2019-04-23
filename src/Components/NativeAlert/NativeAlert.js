import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { PropTypes } from "prop-types";

import { styles } from "./styles";

const renderListItems = listItems => (
  <View
    style={[
      listItems.length === 2 ? styles.twoButtonsListWrapper : styles.listWrapper
    ]}
  >
    listItems.map((item, index) => (
    <TouchableOpacity
      activeOpacity={1}
      key={index}
      onPress={item.onPress}
      style={[
        styles.listItem,
        listItems.length === 2 ? styles.twoButtonsListItem : null
      ]}
    >
      <Text style={styles.listItemText}>{item.title}</Text>
    </TouchableOpacity>
    )
  </View>
);

const NativeAlert = ({ title, subtitle, listItems, visible }) => {
  return visible ? (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.head}>
          <Text style={styles.headTitle}>{title}</Text>
          <Text style={styles.headSubtitle}>{subtitle}</Text>
        </View>
        {renderListItems(listItems)}
      </View>
    </View>
  ) : null;
};

NativeAlert.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  listItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      onPress: PropTypes.func.isRequired
    })
  ).isRequired,
  visible: PropTypes.bool.isRequired
};

export default NativeAlert;
