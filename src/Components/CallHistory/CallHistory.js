import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { List, ListItem, Avatar, Icon } from "react-native-elements";
import UserInfo from "../UserInfo/UserInfo";
import { Fonts, Images } from "../../Themes";
import _isUndefined from "lodash/isUndefined";
import styles from "./styles";
import moment from "moment";
import I18n from "../../I18n/I18n";
import { Colors } from "../../Themes";
import { moderateScaleViewports } from "../../Util/Scaling";
import CircularAvatar from "../CircularAvatar/CircularAvatar";

export default class CallHistoryComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.data });
  }

  renderSeparator = () => {
    return <View style={styles.renderSeparator} />;
  };

  render() {
    console.tron.log(this.state.data);
    const navigation = this.props.navigation;
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
                  subtitle={
                    !item.missedTab
                      ? item.duration >= 60
                        ? `${moment
                            .utc(item.duration * 1000)
                            .format("mm")} ${I18n.t('minutes')}, ${item.createdAt}`
                        : `${moment
                            .utc(item.duration * 1000)
                            .format("ss")} ${I18n.t('seconds')}, ${item.createdAt}`
                      : item.createdAt
                  }
                  subtitleStyle={styles.colorStyle}
                  containerStyle={styles.listItem}
                  rightTitleStyle={styles.textColor}
                  onPress={() => {
                    if (!item.chevron)
                      navigation.dispatch({
                        type: "SessionDetails",
                        params: {call: item}
                      });
                  }}
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
