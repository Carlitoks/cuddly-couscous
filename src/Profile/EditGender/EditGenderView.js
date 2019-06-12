import React, { Component } from "react";
import { connect } from "react-redux";

import {
  View,
  Text,
  ScrollView,
  Alert,
  TouchableWithoutFeedback
} from "react-native";

import ListComponent from "../../Components/ListComponent/ListComponent";

import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import BottomButton from "../../Components/BottomButton/BottomButton";
import styles from "./styles";
import NavBar from "../../Components/NavBar/NavBar";
import {updateUser} from "../../Ducks/AccountReducer";
import I18n, { translateApiError } from "../../I18n/I18n";

class EditGenderView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      genderIndex: -1,
      selectedGender: props.gender,
      options: [
        {
          label: I18n.t("male"),
          value: "male"
        },
        {
          label: I18n.t("female"),
          value: "female"
        },
        {
          label: I18n.t("preferNotToDisclose"),
          value: "decline"
        }
      ]
    };

    if (!props.gender) {
      this.state.genderIndex = 2;
      this.state.selectedGender = 'decline';
    } else {
      for (let i in this.state.options) {
        if (this.state.options[i].value == this.state.selectedGender) {
          this.state.genderIndex = i;
        }
      }
    }
  }

  changeSelected(index) {
    this.setState({ genderIndex: index });
  }

  updateGender(item) {
    this.setState({selectedGender: item.value});
  }

  submit() {
    const { selectedGender } = this.state;
    if (!!selectedGender) {
      this.props.updateUser({ gender: selectedGender })
      .then(() => {
        this.props.navigation.dispatch({type: "back"});
      })
      .catch((e) => {
        Alert.alert(I18n.t("error"), translateApiError(e));
      });
    } else {
      // TODO: what to do in this case?  It shouldn't actually be possible...
    }
  }

  render() {
    const genders = this.state.options;

    return (
      <View style={styles.scrollContainer}>
        <NavBar
          leftComponent={
            <GoBackButton navigation={this.props.navigation}/>
          }
          navbarTitle={I18n.t("genderName")}
        />
        <ScrollView
          automaticallyAdjustContentInsets={true}
          style={styles.scrollContainer}
          alwaysBounceVertical={false}
        >
          <ListComponent
            data={genders}
            selected={this.state.genderIndex}
            onPress={index => {
              this.updateGender(genders[index]);
            }}
            titleProperty={"label"}
            changeSelected={index => {
              this.changeSelected(index);
            }}
            leftText
            noFlex
          />
          <TouchableWithoutFeedback
            onPress={() => {
              Alert.alert("", I18n.t("genderAlert"));
            }}
          >
            <View style={styles.mainContainterText}>
              <Text style={[styles.textCenter, styles.spaceBetween]}>
                {I18n.t("genderNotice")}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
        {/* Save Button */}
        <BottomButton
          bold={false}
          title={I18n.t("save")}
          onPress={() => this.submit()}
          fill
        />
      </View>
    );
  }
}

const mS = state => ({
  gender: state.account.user.gender,
});

const mD = {
  updateUser,
};

export default connect(
  mS,
  mD
)(EditGenderView);
