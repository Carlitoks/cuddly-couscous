import React, { Component } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { Reactotron } from 'reactotron-react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  textDefault: {
    fontSize: 16,
    color: '#181818',
  },
});

class ScrollVertical extends Component {

  constructor(props) {
    super(props);
    const translateValue = new Animated.ValueXY({ x: 0, y: 0 });
    translateValue.addListener(({ x, y }) => {
    });
    this.state = {
      translateValue,
      scrollHeight: this.props.scrollHeight || 32,
      content: [],
      tempValue: 0,
      contentOffsetY: 0,
      delay: this.props.delay || 1500,
      duration: this.props.duration || 500,
      enableAnimation: true,
      enableTouchable: true,
      fadeAnim: new Animated.Value(1),
    };
  }

  componentDidMount() {
    this.props.onLoad();
    this.startAnimation();
  }

  componentWillReceiveProps(nextProps) {
    const children = this.props.children || [];
    const pages = [];
    if (children && children.length > 1) {
      for (let i = 0; i < children.length; i += 1) {
        pages.push(children[i]);
      }
    } else if (children.length === 1) {
      pages.push(children[0]);
    } else if (children.length === 0) {
    } else if (children) {
      pages.push(children);
    } else {
      return (
        <Text style={{ backgroundColor: 'white' }}>
      You are supposed to add children inside Carousel
      </Text>
    );
    }
    if (pages.length !== 0) {
      const h = (pages.length + 1) * this.state.scrollHeight;
      this.setState({
        content: pages,
        contentOffsetY: h,
      });
    }
    this.setState({ enableAnimation: !!nextProps.enableAnimation }, () => {
      this.startAnimation();
  });
    return null;
  }

  componentWillUnmount() {
    if (this.animation) {
      clearTimeout(this.animation);
    }
    if (this.state.translateValue) {
      this.state.translateValue.removeAllListeners();
    }
  }

  startAnimation() {
    if (this.state.enableAnimation) {
      if (!this.animation) {
        this.animation = setTimeout(() => {
          this.animation = null;
        this.beginAnim();
      }, this.state.delay);
      }
    }
  }

  beginAnim() {
    this.state.tempValue -= this.state.scrollHeight;
    if (this.props.onChange) {
      const index = Math.abs(this.state.tempValue) / (this.state.scrollHeight);
      this.props.onChange(index < this.state.content.length - 1 ? index : 0);
    }
    Animated.sequence([
      Animated.timing(
        this.state.fadeAnim,
      {
        toValue: 0,
        duration: this.state.duration,
      }           
      ),
      Animated.timing(
        this.state.translateValue,
        {
          isInteraction: false,
          easing: Easing.linear,
          duration: this.state.duration,
          toValue: { x: 0, y: this.state.tempValue },
        },       
      ),
      Animated.timing(
        this.state.fadeAnim,
      {
        toValue: 1,
        duration: this.state.duration,
      }           
      ),

    ]).start(() => {
      if (this.state.tempValue - this.state.scrollHeight === -this.state.contentOffsetY) {
      this.state.translateValue.setValue({ x: 0, y: 0 });
      this.state.tempValue = 0;
    }
    this.startAnimation();
    console.log("lel");
  });
  }

  render() {
    let { fadeAnim } = this.state;
    return (
      <View
    style={[styles.container, { maxHeight: this.state.scrollHeight }, this.props.container]}
  >
    {
      this.state.content.length > 1
        ? <Animated.View
      style={[
          {
            flexDirection: 'column',
            transform: [{ translateY: this.state.translateValue.y }],
            opacity: fadeAnim
          }]}
        >
        {this.state.content}
    </Animated.View>
    : this.state.content
    }
  </View>
  );
  }
}

ScrollVertical.defaultProps = {
  enableAnimation: true,
};
export default ScrollVertical;