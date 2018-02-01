import React, { Component } from "react";
import { connect } from "react-redux";
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
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
class CallHistory extends Component {
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

  chooseControlTab = () => {
    if (this.props.linguistProfile) {
      return <SegmentedControlTab
      tabsContainerStyle={styles.tabsContainerStyle}
      values={["All", "Missed", "Recent"]}
      tabStyle={styles.tabStyle}
      tabTextStyle={styles.tabTextStyle}
      selectedIndex={this.state.selectedIndex}
      onTabPress={this.handleIndexChange}
      activeTabStyle={{
        backgroundColor: Colors.primarySelectedTabColor
      }}
    />;
    } else {
      return <SegmentedControlTab
      tabsContainerStyle={styles.tabsContainerStyle}
      values={["All", "Recent"]}
      tabStyle={styles.tabStyle}
      tabTextStyle={styles.tabTextStyle}
      selectedIndex={this.state.selectedIndex}
      onTabPress={this.handleIndexChange}
      activeTabStyle={{
        backgroundColor: Colors.primarySelectedTabColor
      }}
    />;
    }
  };

  render() {
    const navigate = this.props.navigation;

    return (
      <ViewWrapper style={styles.scrollContainer}>
        <ScrollView
          automaticallyAdjustContentInsets={true}
          alwaysBounceVertical={false} 
          style={styles.scrollContainer}
        >
          <Grid>
            <Col>
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
              <TopViewIOS />
              <Header
                outerContainerStyles={{ borderBottomWidth: 0, height: 60 }}
                backgroundColor="transparent"
                leftComponent={
                  <ShowMenuButton navigation={this.props.navigation} />
                }
              />
              {this.chooseControlTab()}

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
      </ViewWrapper>
    );
  }
}
const mS = state => ({
  linguistProfile: state.userProfile.linguistProfile
});

export default connect(mS)(CallHistory);