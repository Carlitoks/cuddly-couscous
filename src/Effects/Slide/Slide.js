import React, { Component } from "react";
import { Animated } from "react-native";

class Slide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slide: new Animated.Value(props.visible ? props.min : props.max)
    };
  }

  componentWillReceiveProps(nextProps) {
    Animated.timing(this.state.slide, {
      toValue: nextProps.visible ? nextProps.min : nextProps.max,
      duration: 500
    }).start();
  }

  render() {
    const { slide } = this.state;

    return (
      <Animated.View
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          width: "100%",
          transform: [{ translateY: slide }]
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

export default Slide;
