import React, { Component } from "react";
import { Text, View, ScrollView, Picker } from "react-native";
import { connect } from "react-redux";
import { updateSettings } from "../../Ducks/LinguistFormReducer";
import { logOutAsync } from "../../Ducks/AuthReducer";

import {
  FormInput,
  Avatar,
  Button,
  Header,
  List,
  ListItem
} from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import TopViewIOS from "../../Components/TopViewIOS/TopViewIOS";
import ShowMenuButton from "../../Components/ShowMenuButton/ShowMenuButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";

import styles from "./styles";
import EN from "../../I18n/en";
import { Images, Colors, Fonts } from "../../Themes";

class UserProfileView extends Component {
  componentWillMount() {
    const selectedNativeLanguage = [
      {
        name: "English",
        code: "eng",
        proficiency: "Intermediate"
      }
    ];

    this.props.updateSettings({ selectedNativeLanguage });
  }

  render() {
    const navigation = this.props.navigation;
    const { selectedNativeLanguage } = this.props;

    return (
      <ViewWrapper style={styles.mainContainer}>
        <ScrollView
          automaticallyAdjustContentInsets={true}
          style={styles.scrollContainer}
          contentContainerStyle={styles.contentScrollContainer}
        >
          <Grid>
            <Col>
              <View>
                <Col style={{ height: 50 }}>
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
                  <TopViewIOS/>   
                  <Header
                    outerContainerStyles={{ borderBottomWidth: 0, height: 50 }}
                    backgroundColor="transparent"
                    leftComponent={
                      <ShowMenuButton navigation={this.props.navigation} />
                    }
                    centerComponent={{
                      text: EN["userProfile"],
                      style: styles.title
                    }}
                  />
                </Col>
              </View>
              <View style={styles.containerAvatar}>
                <Avatar
                  containerStyle={{
                    alignSelf: "center"
                  }}
                  avatarStyle={styles.avatar}
                  rounded
                  large
                  source={Images.avatar}
                  activeOpacity={0.7}
                />
              </View>

              <Row style={styles.containerTitles}>
                <Text style={styles.titlesForm}>Name</Text>
              </Row>
              <Row>
                <FormInput
                  containerStyle={styles.containerInput}
                  inputStyle={styles.inputText}
                  placeholder={EN["linguistName"]}
                  onChangeText={text =>
                    this.props.updateForm({ profileName: text })}
                  value={this.props.profileName}
                />
              </Row>
              <Row style={styles.containerTitles}>
                <Text style={styles.titlesForm}>Prefered Name</Text>
              </Row>
              <Row>
                <FormInput
                  containerStyle={styles.containerInput}
                  inputStyle={styles.inputText}
                  placeholder={EN["linguistName"]}
                  onChangeText={text =>
                    this.props.updateForm({ preferredName: text })}
                  value={this.props.preferredName}
                />
              </Row>

              <Row style={styles.containerTitles}>
                <Text style={styles.titlesForm}>{EN["NativeLanguage"]}</Text>
              </Row>
              {/* Native Language */}
              <List containerStyle={styles.marginBottom10}>
                {this.props.selectedNativeLanguage[0] && (
                  <ListItem
                    key={selectedNativeLanguage[0].code}
                    title={selectedNativeLanguage[0].name}
                    onPress={() => {
                      this.props.updateSettings({
                        selectionItemType: "languages",
                        selectionItemName: "nativeLanguage"
                      });
                      this.props.navigation.dispatch({
                        type: "SelectListView"
                      });
                    }}
                  />
                )}
              </List>

              {/* Areas of expertise */}

              <Row style={styles.containerTitles}>
                <Text style={styles.titlesForm}>Areas of Expertise</Text>
              </Row>

              <List>
                <ListItem
                  title={EN["AreasExpertise"]}
                  onPress={() => {
                    this.props.updateSettings({
                      selectionItemType: "areasOfExpertise",
                      selectionItemName: "areasOfExpertise"
                    });
                    this.props.navigation.dispatch({ type: "SelectListView" });
                  }}
                />
              </List>
            </Col>
          </Grid>
        </ScrollView>

        <View style={styles.containerBottom}>
          {/* Next Button */}
          <Button
            buttonStyle={styles.buttonContainer}
            textStyle={styles.buttonText}
            title="Log out"
            onPress={() => {
              this.props.logOutAsync();
            }}
          />
        </View>
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  profileName: state.editProfile.profileName,
  preferredName: state.editProfile.preferredName,
  selectedNativeLanguage: state.linguistForm.selectedNativeLanguage
});

const mD = {
  updateSettings,
  logOutAsync
};

export default connect(mS, mD)(UserProfileView);
