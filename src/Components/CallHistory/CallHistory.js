import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { List, ListItem } from "react-native-elements";
import UserInfo from "../UserInfo/UserInfo";
import { Images } from "../../Themes";
import _isUndefined from "lodash/isUndefined";
import styles from "./styles";
import moment from "moment";
import I18n from "../../I18n/I18n";
import { Colors } from "../../Themes";



export default class CallHistoryComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.data })
  }


  renderSeparator = () => {
    return <View style={styles.renderSeparator} />;
  };

  render() {
    const navigation = this.props.navigation;
    return (
      <List containerStyle={styles.containerList}>
        {this.state.data ?
          this.props.data.length > 0 ?
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
                      ? {
                        uri: item.avatarURL
                      }
                      : Images.avatar
                  }
                  subtitle={
                    !item.missedTab
                      ? item.duration >= 60
                        ? `${moment.utc(item.duration * 1000).format("mm:ss")} mins`
                        : `${moment
                          .utc(item.duration * 1000)
                          .format("mm:ss")} seconds`
                      : item.missedCall
                  }
                  subtitleStyle={styles.colorStyle}
                  containerStyle={styles.listItem}
                  rightTitle={item.createdAt}
                  rightTitleStyle={styles.textColor}
                  badge={{
                    value: item.createdAt,
                    textStyle: styles.textColor,
                    containerStyle: { backgroundColor: "transparent" }
                  }}
                  onPress={() => {
                    if (!item.chevron)
                      navigation.dispatch({
                        type: "SessionDetails",
                        params: item
                      });
                  }}
                />
              )
              }
              keyExtractor={item => item.key}
              ItemSeparatorComponent={this.renderSeparator}
            />
            :
            <Text style={styles.notFound}>{I18n.t("historyNotFound")}</Text>
          :
          <ActivityIndicator size="large" color={Colors.gradientColor.top} />
        }
      </List>
    );
  }
}
