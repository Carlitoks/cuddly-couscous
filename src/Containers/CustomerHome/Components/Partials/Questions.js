import React, { Component } from "react";
import { Text, View } from "react-native";
import Carousel from "react-native-snap-carousel";
import I18n from "./../../../../I18n/I18n";
import { ScrollVertical } from "react-native-carousel-text";

// Styles
import styles from "./Styles/QuestionStyles";

export default class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scenarios: []
    };
  }

  componentWillMount() {
    this.orderScenarios();
  }

  orderScenarios = () => {
    const scenarios = Object.keys(I18n.t("customerHome.scenarios")).sort(
      function(a, b) {
        return Math.random() - 0.5;
      }
    );
    this.setState({ scenarios });
  };

  _renderItem = (item, index) => {
    return (
      <View style={styles.questionsContainer}>
        <Text style={styles.questionText} key={index}>{`${I18n.t(
          `customerHome.scenarios.${item}`
        )}`}</Text>
      </View>
    );
  };
  render() {
    const { firstName, home } = this.props;

    return (
      <React.Fragment>
        <Text style={styles.questionHelpText}>
          {home
            ? I18n.t("customerOnboarding.homeCanIhelpYou", { firstName })
            : I18n.t(`customerOnboarding.canIHelpYou`)}
        </Text>
        <ScrollVertical
          onChange={index => {
            this.index = index;
          }}
          enableAnimation
          enableTouchable={false}
          delay={8000}
          duration={0}
          scrollHeight={50}
        >
          {this.state.scenarios.length > 0 ? (
            this.state.scenarios.map((scenario, index) => {
              console.log(scenario);
              return this._renderItem(scenario, index);
            })
          ) : (
            <React.Fragment />
          )}
        </ScrollVertical>
      </React.Fragment>
    );
  }
}
