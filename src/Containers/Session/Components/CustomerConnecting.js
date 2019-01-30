import React, {Component} from "react";
import {Text, View} from "react-native";
import { clear } from "../../../Ducks/ActiveSessionReducer";

export class CustomerConnecting extends Component {
  constructor (props) {
    super(props);
    this.timerID = null;
    this.unmounting = false;
    this.state = {
      seconds: 10
    }
  }

  componentDidMount () {
    this.timerID = setInterval(() => {
      if (this.unmounting) {
        return;
      }

      let s = this.state.seconds - 1;
      this.setState({
        seconds: s
      });
      if (s <= 0) {
        clearInterval(this.timerID);
        this.props.onTimeout();
      }
    }, 1000);

    // TODO: poll session status
  }

  componentDidUpdate (prevProps) {
    // TODO check if user now connecting and reset timer
  }

  componentWillUnmount () {
    this.unmounting = true;
    clearInterval(this.timerID);
  }

  render () {
    return (
      <View>
        <Text>CustomerConnecting: { this.state.seconds } </Text>
      </View>
    );
  }
}
