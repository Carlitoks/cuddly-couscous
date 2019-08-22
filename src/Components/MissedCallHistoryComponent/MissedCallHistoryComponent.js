import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import UserInfo from "../UserInfo/UserInfo";
import styles from "./styles";
import I18n from "../../I18n/I18n";
import { Colors } from "../../Themes";
import CircularAvatar from "../CircularAvatar/CircularAvatar";

export default class MissedCallHistoryComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    };
  }

  renderSeparator = () => {
    return <View style={styles.renderSeparator} />;
  };

  render() {
    return (
      <View containerStyle={styles.containerList}>
        {this.state.data ? (
          this.props.data.length > 0 ? (
            <FlatList
              data={this.props.data}
              renderItem={({ item }) => (
                <ListItem
                  roundAvatar
                  title={
                    <UserInfo
                      text={`${item.firstName} ${item.lastInitial}`}
                      rating={item.rating}
                      missedCall={item.missedTab}
                    />
                  }
                  rightIcon={
                    <Icon
                      name={"chevron-right"}
                      color={"#909090"}
                      containerStyle={{paddingRight: 10}}

                    />}
                  hideChevron={item.chevron}
                  avatar={<CircularAvatar avatarURL={item.avatarURL} firstName={item.firstName} lastInitial={item.lastInitial} />}
                  subtitle={item.createdAt}
                  subtitleStyle={styles.colorStyle}
                  containerStyle={styles.listItem}
                  rightTitleStyle={styles.textColor}
                />
              )}
              keyExtractor={item => item.key.toString()}
              ItemSeparatorComponent={this.renderSeparator}
            />
          ) : (
            <Text style={styles.notFound}>{I18n.t("historyNotFound")}</Text>
          )
        ) : (
          <ActivityIndicator
            style={{ marginTop: 6 }}
            size="large"
            color={Colors.gradientColor.top}
          />
        )}
      </View>
    );
  }
}
