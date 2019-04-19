import React, {Component} from "react";
import {Text, StyleSheet, View} from "react-native";
import { formatTimerNumber } from "../../../Util/Format";
import { moderateScale } from "../../../Util/Scaling";

export class CallTimer extends Component {
  constructor(props) {
    super(props);

    // timer values to render
    this.state = {
      minutes: 0,
      seconds: 0
    };

    // timestamp when the timer last started
    this.startedAt = null;
    // how much time elapsed from previous timer events
    this.previouslyElapsed = 0;

    this.mounted = true;
    this.intervalID = null;
  }

  componentDidMount () {
    this.start();
  }

  componentWillUnmount () {
    this.cleanup();
  }

  componentDidUpdate (prevProps) {
    if (!this.mounted) {
      return;
    }
    const ct = this.props.timer;
    const pt = prevProps.timer;
    if (!pt.running && ct.running) {
      this.start();
    }
    if (pt.running && !ct.running) {
      this.stop();
    }
  }

  start () {
    // calculate previously elapsed time from history
    let elapsed = 0;
    let startedAt = null;
    for (e of this.props.timer.events) {
      switch (e.action) {
        case 'start': startedAt = e.time; break;
        case 'stop': elapsed += e.time - startedAt; break;
        case 'reset': elapsed = e.elapsed; break;
      }
    }
  
    this.previouslyElapsed = elapsed;
    this.startedAt = startedAt;

    this.intervalID = setInterval(() => {
      this.handleInterval();
    }, 300);
  }

  stop () {
    if (!!this.intervalID) {
      clearInterval(this.intervalID);
    }
  }

  cleanup () {
    this.mounted = false;
    this.stop();
  }

  handleInterval () {
    if (!this.mounted || !this.props.timer.running) {
      return;
    }

    const now = new Date().getTime();
    let total = this.previouslyElapsed + (now - this.startedAt);
    let seconds = total / 1000;
    let minutes = parseInt(seconds / 60, 10);
    let s = parseInt(seconds % 60 , 10);

    this.setState({
      minutes: minutes,
      seconds: s
    });
  }

  render() {
    const {minutes, seconds} = this.state;
    return (
      <View style = {styles.container}>
        <Text style = {styles.text}>{formatTimerNumber(minutes)}:{formatTimerNumber(seconds)}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.33)",
    alignItems: "center",
    marginBottom: 1
  },
  text: {
    fontSize: moderateScale(20, 0),
    color: "#fff"
  }
});