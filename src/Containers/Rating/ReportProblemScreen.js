import React, { Component } from "react";
import { TouchableOpacity, View, TextInput, Alert } from "react-native";
import { connect } from "react-redux";
import { Icon } from "react-native-elements";
import NavBar from "../../Components/NavBar/NavBar";
import TextBlockButton from "../../Components/Widgets/TextBlockButton";
import { submitSessionAbuseReport } from "../../Ducks/AccountReducer";

// Styles
import styles from "./Styles/ReportProblemScreenStyles";

import I18n, { translateApiError } from "../../I18n/I18n";

class ReportProblemScreen extends Component {
  constructor(props) {
    const { session, user, } = props.navigation.state.params;
    super(props);
    this.state = {
      loading: false,
      comment: '',
      session,
      user
    }
  }

  changeText = (comment ) =>{
    let state = {...this.state};
    this.setState({...state, ...{comment: comment}});
  }

  submitAbuseReport = () => {
    const { navigation, submitSessionAbuseReport } = this.props;
    const {comment, user, session} = this.state;
    this.setState({loading: true});


    submitSessionAbuseReport(comment, "2705b298-e5a5-44de-afb7-442ad352a7e9", session.id)
    .then(asd => navigation.dispatch({ type: "Home" }))
    .catch((e) => {
      console.log(e);
      Alert.alert(I18n.t('error'), translateApiError(e, 'api.errUnexpected'));
      this.setState({loading: false});
    });

  };

  render() {
    const { navigation, user,loading, clearPayments } = this.props;

    return (
      <View style={styles.wrapperContainer}>
        <View style={[styles.backContainer]}>
          <NavBar
            leftComponent={
              <TouchableOpacity activeOpacity={0.8} onPress={() => {
                navigation.dispatch({type: "back"})
              }}>
                <View>
                  <Icon name="chevron-left" type="evilicon" color="white" size={50} />
                </View>
              </TouchableOpacity>
            }
            navbarTitle={I18n.t('session.rating.abuse.title')}
          />
          <View style={styles.aditionalInfoContainer}>
            <View style={styles.additionalInformationContainer}>
              <TextInput
                style={styles.additionalInformationInput}
                returnKeyType="done"
                multiline
                blurOnSubmit
                onChangeText={code =>
                  this.changeText(code)
                }
                placeholder={ I18n.t("session.rating.abuse.placeholder")}
                placeholderTextColor="rgba(0, 0, 0, 0.6);"
              />
            </View>
        </View>
        <TextBlockButton
                text = {I18n.t("actions.submit")} // the text in the button
                disabled = {this.state.loading} // boolean if disabled, prevents taps and show disabled button styles
                loading = {this.state.loading} // boolean for "loading" state, in the loading state, display an ActivitySpinner instead of the button text
                style = {styles.buttonContainer} // main container style, component should provide some defaults, like width at 100%
                disabledStyle = {styles.buttonDisable} // container style object when disabled, component should provide defaults
                textStyle = {styles.buttonText} // optional text styles, component should provide defaults
                onPress = {() => this.submitAbuseReport()} // function to call when pressed
            />
       </View>
      </View>
    );
  }
}

const mS = state => ({

});

const mD = {
  submitSessionAbuseReport
};

export default connect(
  mS,
  mD
)(ReportProblemScreen);
