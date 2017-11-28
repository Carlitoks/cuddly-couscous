import React, { Component } from "react";
import { ScrollView, Text, View, Button, StyleSheet } from "react-native";

import OpenTok, { Publisher, Subscriber } from "react-native-opentok";

import { Images } from "../Themes";

// Styles
import styles from "./Styles/TokBoxTest";

const sessionId =
  "2_MX40NjAwODExMn5-MTUxMTg3NzYzOTgxMn5QRlB4YkZ0Rk5PZlpWN3JjZ0VwUm9ucHJ-UH4";
const token =
  "T1==cGFydG5lcl9pZD00NjAwODExMiZzaWc9YTY1MDliYjM4ZjM0MjU4MGM4MzgyZjBiNzYzNjVmZjg5M2VkM2I3NTpzZXNzaW9uX2lkPTJfTVg0ME5qQXdPREV4TW41LU1UVXhNVGczTnpZek9UZ3hNbjVRUmxCNFlrWjBSazVQWmxwV04zSmpaMFZ3VW05dWNISi1VSDQmY3JlYXRlX3RpbWU9MTUxMTg3ODkwMSZub25jZT0wLjQ3MzU5MDY1NDkyMzcyMSZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTE0NDcwOTAwJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9";

export default class TokBoxTest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 300,
      width: 225,
      mute: false,
      video: true
    };
  }

  async componentWillMount() {
    await OpenTok.connect(sessionId, token);
    OpenTok.on(OpenTok.events.ON_SIGNAL_RECEIVED, e => console.log(e));
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Button
          onPress={() => {
            this.setState(prevState => {
              return { mute: !prevState.mute };
            });
          }}
          title="Mute"
        />

        <Button
          onPress={() => {
            this.setState(prevState => {
              return { video: !prevState.video };
            });
          }}
          title="Video"
        />

        <Button
          onPress={() => {
            if (typeof this.ref !== "string") this.ref.switchCamera();
          }}
          title="Switch camera"
        />

        <Text>Mute: {this.state.mute ? "true" : "false"}</Text>
        <Text>Video: {this.state.video ? "true" : "false"}</Text>

        <Publisher
          sessionId={sessionId}
          style={{
            height: this.state.height,
            width: this.state.width,
            backgroundColor: "black"
          }}
          ref={ref => {
            /* $FlowFixMe */
            this.ref = ref;
          }}
          mute={this.state.mute}
          video={this.state.video}
        />

        <Subscriber
          style={{
            height: this.state.height / 2,
            width: this.state.width / 2,
            backgroundColor: "white"
          }}
          sessionId={sessionId}
          onSubscribeStart={() => {
            console.log("started");
          }}
        />
      </View>
    );
  }
}
