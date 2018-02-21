import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { List, ListItem } from "react-native-elements";
import UserInfo from "../UserInfo/UserInfo";
import { Images } from "../../Themes";
import _isUndefined from "lodash/isUndefined";
import styles from "./styles";
import moment from "moment";
import { IMAGE_STORAGE_URL } from "../../Config/env";

export class CallHistoryComponent extends Component {
  renderSeparator = () => {
    return <View style={styles.renderSeparator} />;
  };

  render() {
    const navigation = this.props.navigation;
    return (
      <List containerStyle={styles.containerList}>
        <FlatList
          data={this.props.data}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={
                <UserInfo
                  text={`${item.firstName} ${item.lastInitial}`}
                  rating={item.rating}
                />
              }
              hideChevron={item.chevron}
              subtitle={
                item.duration >= 60
                  ? `${moment.utc(item.duration * 1000).format("mm:ss")} mins`
                  : `${moment
                      .utc(item.duration * 1000)
                      .format("mm:ss")} seconds`
              }
              avatar={
                item.avatarURL
                  ? { uri: `${IMAGE_STORAGE_URL}${item.avatarURL}` }
                  : Images.avatar
              }
              containerStyle={styles.listItem}
              rightTitle={item.createdAt}
              onPress={() => {
                if (!item.chevron)
                  navigation.dispatch({
                    type: "SessionDetails",
                    params: item
                  });
              }}
              subtitleStyle={styles.colorStyle}
            />
          )}
          keyExtractor={item => item.key}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </List>
    );
  }
}
