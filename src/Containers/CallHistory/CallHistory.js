import React, { Component } from "react";
import { StyleSheet, View, FlatList, Text, ScrollView } from "react-native";
import { styles } from "./style";
import { Header } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import SegmentedControlTab from "react-native-segmented-control-tab";
import LinearGradient from "react-native-linear-gradient";
import { Col, Row, Grid } from "react-native-easy-grid";
import { CallHistoryComponent } from "../../Components/CallHistory/CallHistory";
import TopViewIOS from "../../Components/TopViewIOS/TopViewIOS"
import ShowMenuButton from "../../Components/ShowMenuButton/ShowMenuButton";
import { Colors } from "../../Themes";

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
          avatar: "https://randomuser.me/api/portraits/thumb/women/54.jpg"
        },
        {
          key: 4,
          title: "Name",
          subtitle: "Duration",
          avatar: "https://randomuser.me/api/portraits/thumb/women/52.jpg"
        },
        {
          key: 5,
          title: "Name",
          subtitle: "Duration",
          avatar: "https://randomuser.me/api/portraits/thumb/women/50.jpg"
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
      <ScrollView
        automaticallyAdjustContentInsets={true}
        style={styles.scrollContainer}
      >
        <Grid>
          <Col>
            <Col>
            <TopViewIOS large/>
              {/* Linear Gradient */}
              <LinearGradient
                colors={[
                  Colors.gradientColor.top,
                  Colors.gradientColor.middle,
                  Colors.gradientColor.bottom
                ]}
                style={styles.linearGradient}
              />
              {/* Header - Navigation */}
              <Header
                outerContainerStyles={{ borderBottomWidth: 0, height: 60 }}
                backgroundColor="transparent"
                leftComponent={
                  <ShowMenuButton navigation={this.props.navigation} />
                }
              />
              <SegmentedControlTab
                tabsContainerStyle={styles.tabsContainerStyle}
                values={["All", "Missed", "Recent"]}
                tabStyle={styles.tabStyle}
                tabTextStyle={styles.tabTextStyle}
                selectedIndex={this.state.selectedIndex}
                onTabPress={this.handleIndexChange}
                activeTabStyle={{
                  backgroundColor: Colors.primarySelectedTabColor
                }}
              />
              {this.state.selectedIndex === 0 && (
                <Text style={styles.title}>{"All Calls"}</Text>
              )}
              {this.state.selectedIndex === 1 && (
                <Text style={styles.title}>{"Missed"}</Text>
              )}
              {this.state.selectedIndex === 2 && (
                <Text style={styles.title}>{"Recent"}</Text>
              )}
            </Col>
            {this.state.selectedIndex === 0 && (
              <View style={styles.container}>
                <CallHistoryComponent
                  data={this.state.AllCalls}
                  navigation={this.props.navigation}
                />
              </View>
            )}
            {this.state.selectedIndex === 1 && (
              <View style={styles.container}>
                <CallHistoryComponent
                  data={this.state.Missed}
                  navigation={this.props.navigation}
                />
              </View>
            )}
            {this.state.selectedIndex === 2 && (
              <View style={styles.container}>
                <CallHistoryComponent
                  data={this.state.AllCalls}
                  navigation={this.props.navigation}
                />
              </View>
            )}
          </Col>
        </Grid>
      </ScrollView>
    );
  }
}
