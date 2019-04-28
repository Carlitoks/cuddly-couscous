import React, {Component} from "react";
import {Alert, Text, StyleSheet, View} from "react-native";
import { formatTimerNumber } from "../../../Util/Format";
import { moderateScale } from "../../../Util/Scaling";
import { DURATION, SESSION } from "../../../Util/Constants";
import I18n from "../../../I18n/I18n";

export class CallTimer extends Component {
  constructor(props) {
    super(props);

    // timer values to render
    this.state = {
      minutes: 0,
      seconds: 0,
      timeIsLow: false
    };

    this.warnAfter = null;
    this.endAfter = null;
    this.triggerEnd = false;
    this.triggerEndFunc = null;
    this.warningShown = false;

    // check for time or balance limits
    if (!!props.session.durationBalanceLimit || !!props.session.durationTimeLimit) {
      if (props.isCustomer) {
        this.triggerEnd = true;
      }
      balanceLimit = props.session.durationBalanceLimit || false;
      timeLimit = props.session.durationTimeLimit || false;
      if (balanceLimit && timeLimit) {
        this.endAfter = balanceLimit >= timeLimit ? timeLimit*DURATION.MINUTES : balanceLimit*DURATION.MINUTES;
        this.triggerEndFunc = balanceLimit >= timeLimit ? props.onTimeExceeded : props.onBalanceExceeded;
      } else if (balanceLimit) {
        this.endAfter = balanceLimit * DURATION.MINUTES;
        this.triggerEndFunc = props.onBalanceExceeded;
      } else if (timeLimit) {
        this.endAfter = balanceLimit * DURATION.MINUTES;
        this.triggerEndFunc = props.onBalanceExceeded;
      }
      this.warnAfter = this.endAfter - (SESSION.TIME.END_SOON_WARNING);
    }

    // timestamp when the timer last started
    this.startedAt = null;
    // how much time in ms elapsed from previous timer events
    this.previouslyElapsed = 0;
    // how much time in ms is currently on the clock
    this.currentlyElapsed = 0;

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
    let elapsed = this.previouslyElapsed + (now - this.startedAt);
    this.currentlyElapsed = elapsed;
    timeIsLow = !!this.warnAfter && elapsed > this.warnAfter;
    let minutes = 0;
    let seconds = 0;

    // if time is low, we count down instead of up so the users know
    // how much time is remaining
    if (timeIsLow) {
      let endAfterSeconds = (this.endAfter - elapsed) / DURATION.SECONDS;
      minutes = parseInt(endAfterSeconds / 60, 10);
      seconds = parseInt(endAfterSeconds % 60 , 10);
    } else {
      let elapsedSeconds = elapsed / DURATION.SECONDS;
      minutes = parseInt(elapsedSeconds / 60, 10);
      seconds = parseInt(elapsedSeconds % 60 , 10);
    }
    
    this.setState({
      minutes: minutes >= 0 ? minutes : 0,
      seconds: seconds >= 0 ? seconds : 0,
      timeIsLow
    });

    // show alert?
    if (timeIsLow && !this.warningShown) {
      this.warningShown = true;
      Alert.alert(I18n.t('notification'), I18n.t('session.callEndingSoon'), [{text: I18n.t('actions.ok')}]);
    }

    // have we exceeded a limit and should end?
    if (this.triggerEnd && elapsed >= this.endAfter) {
      this.triggerEndFunc();
    }
  }

  render() {
    const {minutes, seconds, timeIsLow} = this.state;
    return (
      <View style = {timeIsLow ? styles.containerWarning : styles.container}>
        <Text style = {styles.text}>{formatTimerNumber(minutes)}:{formatTimerNumber(seconds)}</Text>
      </View>
    )
  }
}

const container = {
  width: "100%",
  padding: 10,
  alignItems: "center",
  marginBottom: 1
};

const styles = StyleSheet.create({
  container: {
    ...container,
    backgroundColor: "rgba(0, 0, 0, 0.33)",
  },
  containerWarning: {
    ...container,
    backgroundColor: "rgba(255, 0, 0, 0.5)",
  },
  text: {
    fontSize: moderateScale(20, 0),
    color: "#fff"
  }
});