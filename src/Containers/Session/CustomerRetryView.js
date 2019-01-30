import React, {Component} from "react";
import {View, Text, Button} from "react-native";
import { connect } from "react-redux";

import {createNewSession} from "../../Ducks/CurrentSessionReducer";

export class CustomerRetryView extends Component {

  retry () {
    this.props.createNewSession({
      ...this.props.session
    }).then(() => {
      this.props.navigation.dispatch({type: "SessionView"});
    }).catch((e) => {
      Alert.alert(
        'Unable to connect',
        'There was a problem, try again:' + JSON.stringify(e),
        [
          {text: 'OK'},
        ],
      );
    });
  }

  cancel () {
    this.props.navigation.dispatch({type: "Home"})
  }

  render () {
    return (
      <View style={{paddingTop: 100}}>
        <Text>All busy, or unavailable :(</Text>
        <Button
          title = "Retry"
          onPress = {() => { this.retry() }}
        />
        <Button
          title = "Cancel"
          onPress = {() => { this.cancel() }}
       />
      </View>
    )
  }
}

const mS = (state) => {
  return {
    session: state.newSessionReducer.session
  }
};

const mD = {
  createNewSession
};

export default connect(mS, mD)(CustomerRetryView)