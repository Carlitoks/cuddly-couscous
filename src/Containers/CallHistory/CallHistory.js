import React, { Component } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { styles } from "./style";
import Icon from "react-native-vector-icons/MaterialIcons";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { CallHistoryComponent } from "../../Components/CallHistory/CallHistory";

export default class CallHistory extends Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
      AllCalls: [
        {
          key: 1,
          title: "Name",
          subtitle: "Duration",
          avatar: "https://randomuser.me/api/portraits/thumb/men/9.jpg"
        },
        {
          key: 2,
          title: "Name",
          subtitle: "Duration",
          avatar: "https://randomuser.me/api/portraits/thumb/men/64.jpg"
        },
        {
          key: 3,
          title: "Name",
          subtitle: "Duration",
          avatar: "https://randomuser.me/api/portraits/thumb/men/47.jpg"
        }
      ],
      Missed: [
        {
          key: 1,
          title: "Name",
          subtitle: "Duration",
          avatar: "https://randomuser.me/api/portraits/thumb/men/47.jpg"
        },
        {
          key: 2,
          title: "Name",
          subtitle: "Duration",
          avatar: "https://randomuser.me/api/portraits/thumb/women/37.jpg"
        },
        {
          key: 3,
          title: "Name",
          subtitle: "Duration",
          avatar: "https://randomuser.me/api/portraits/thumb/women/55.jpg"
        }
      ]
    };
  }

  handleIndexChange = index => {
    this.setState({ ...this.state, selectedIndex: index });
  };

  render() {
    const navigate = this.props.navigation;

    return (
      <View style={{ flex: 1 }}>
        <Icon
          style={styles.Icon}
          name="arrow-back"
          size={30}
          color={"#1E90FF"}
          onPress={() => navigate.dispatch({ type: "Home" })}
        />
        <SegmentedControlTab
          tabsContainerStyle={styles.tabsContainerStyle}
          values={["All", "Missed", "Recent"]}
          tabStyle={styles.tabStyle}
          tabTextStyle={styles.tabTextStyle}
          selectedIndex={this.state.selectedIndex}
          onTabPress={this.handleIndexChange}
        />
        {this.state.selectedIndex === 0 && (
          <View style={styles.container}>
            <Text style={styles.title}>{"All Calls"}</Text>
            <CallHistoryComponent
              data={this.state.AllCalls}
              navigation={this.props.navigation}
            />
          </View>
        )}
        {this.state.selectedIndex === 1 && (
          <View style={styles.container}>
            <Text style={styles.title}>{"Missed"}</Text>
            <CallHistoryComponent
              data={this.state.Missed}
              navigation={this.props.navigation}
            />
          </View>
        )}
        {this.state.selectedIndex === 2 && (
          <View style={styles.container}>
            <Text style={styles.title}>{"Recent"}</Text>
            <CallHistoryComponent
              data={this.state.AllCalls}
              navigation={this.props.navigation}
            />
          </View>
        )}
      </View>
    );
  }
}
