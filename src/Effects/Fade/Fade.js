import React, { Component } from "react";
import { Animated } from "react-native";

class Fade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fade: new Animated.Value(props.visible ? 1 : 0)
    };
  }

  componentWillReceiveProps(nextProps) {
    Animated.timing(this.state.fade, {
      toValue: nextProps.visible ? 1 : 0,
      duration: 850
    }).start();
  }

  render() {
    const { fade } = this.state;

    return (
      <Animated.View style={{ ...this.props.style, opacity: fade }}>
        {this.props.children}
      </Animated.View>
    );
  }
}

export { Fade };
