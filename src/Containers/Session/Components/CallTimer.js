import React, {Component} from "react";
import {Text, StyleSheet, View} from "react-native";

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
      if ('start' == e.action) {
        startedAt = e.time;
      }
      if ('stop' == e.action) {
        elapsed += e.time - startedAt;
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
    if (!this.mounted) {
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

  renderNumber (num) {
    if (num == 0) {
      return "00";
    }
    if (num < 10) {
      return `0${num}`;
    }
    return num;
  }

  render() {
    const {minutes, seconds} = this.state;
    return (
      <View style = {styles.container}>
        <Text style = {styles.text}>{this.renderNumber(minutes)}:{this.renderNumber(seconds)}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: "center"
  },
  text: {
    color: "#fff"
  }
});