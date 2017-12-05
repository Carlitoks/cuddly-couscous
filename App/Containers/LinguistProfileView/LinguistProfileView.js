import React, { Component } from "react";
import {
  Text,
  Button,
  View,
  ScrollView,
  Alert,
  Image,
  Picker
} from "react-native";
import I18n, { getLanguages } from "react-native-i18n";
import SegmentedControlTab from "react-native-segmented-control-tab";
import {
  RkButton,
  RkTextInput,
  RkText,
  rkType,
  RkCardImg,
  RkTabView
} from "react-native-ui-kitten";

import { styles } from "./style";
import Avatar from "react-native-interactive-avatar";
import Icon from "react-native-vector-icons/MaterialIcons";
import { LaunchScreen } from "../LaunchScreen";

export default class LiguistProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0
    };
  }

  state = { languages: [] };
  componentWillMount() {
    getLanguages().then(languages => {
      this.setState({ languages });
    });
  }

  handleIndexChange = index => {
    this.setState({
      ...this.state,
      selectedIndex: index
    });
  };

  render() {
    const navigate = this.props.navigation.navigate;

    return (
      <ScrollView
        automaticallyAdjustContentInsets={true}
        style={styles.scrollContainer}
      >
        <View style={styles.formContainer}>
          <Icon
            style={styles.Icon}
            name="arrow-back"
            size={30}
            color={"#03a6a7"}
            onPress={() => navigate("LaunchScreen")}
          />
          <Avatar
            style={{ paddingTop: 40 }}
            size={"default"}
            source={require("../../Images/profile-icon.png")}
          />
          <View style={styles.personalInformation}>
            <RkText>{I18n.t("PersonalInformation")}</RkText>
          </View>

          <RkTextInput
            style={styles.inputStyle}
            placeholder={I18n.t("Firstname")}
            autoCorrect={false}
          />
          <RkTextInput
            style={styles.inputStyle}
            placeholder={I18n.t("Lastname")}
            autoCorrect={false}
          />
          <View style={styles.headerOptions}>
            <RkText>
              In which countries are you citizen or hold a passport?
            </RkText>
          </View>
          <View style={styles.picker}>
            <Picker
              selectedValue={this.state.Qcountries}
              placeholder="Choose Countries"
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ Qcountries: itemValue })
              }
            >
              <Picker.Item label="Choose Countries" value="Countries" />
              <Picker.Item label="option 1" value="1" />
              <Picker.Item label="option 2" value="2" />
            </Picker>
          </View>
          <View style={styles.headerOptions}>
            <RkText>Wich countries do you have some familiarity with?</RkText>
          </View>
          <View style={styles.picker}>
            <Picker
              selectedValue={this.state.QFamily}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ QFamily: itemValue })
              }
            >
              <Picker.Item label="Choose Countries" value="countries" />
              <Picker.Item label="option 1" value="1" />
              <Picker.Item label="option 2" value="2" />
            </Picker>
          </View>
          <View style={styles.headerOptions}>
            <RkText>
              Wich cities do you know well enough to help people get around in?
            </RkText>
          </View>
          <View style={styles.picker}>
            <Picker
              selectedValue={this.state.QhelpPeople}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ QhelpPeople: itemValue })
              }
            >
              <Picker.Item label="Choose Countries" value="Countries" />
              <Picker.Item label="option 1" value="1" />
              <Picker.Item label="option 2" value="2" />
            </Picker>
          </View>
          <View style={styles.headerOptions}>
            <RkText>Wich cities did you grow up in?</RkText>
          </View>
          <View style={styles.picker}>
            <Picker
              selectedValue={this.state.QgrowUp}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ QgrowUp: itemValue })
              }
            >
              <Picker.Item label="Choose Countries" value="Countries" />
              <Picker.Item label="option 1" value="1" />
              <Picker.Item label="option 2" value="2" />
            </Picker>
          </View>
          <View style={styles.headerOptions}>
            <RkText>Gender</RkText>
          </View>
          <SegmentedControlTab
            values={["Female", "Male", "Other", "Not set"]}
            selectedIndex={this.state.selectedIndex}
            tabStyle={styles.tabStyle}
            tabTextStyle={styles.tabTextStyle}
            activeTabStyle={styles.activeTabStyle}
            activeTabTextStyle={styles.activeTabTextStyle}
            onTabPress={this.handleIndexChange}
          />
          <View style={styles.headerOptions}>
            <RkText>
              If you do not specify, you won't receive calls from customers who
              have specified a preference
            </RkText>
          </View>
        </View>
      </ScrollView>
    );
  }
}
