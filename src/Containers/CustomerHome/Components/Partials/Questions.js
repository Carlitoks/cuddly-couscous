import React, { Component } from "react";
import { Text, View } from "react-native";
import Carousel from "react-native-snap-carousel";
import I18n from "./../../../../I18n/I18n";
import ScrollVertical from "../../../../Util/ScrollText";

// Styles
import styles from "./Styles/QuestionStyles";
import { Metrics } from "../../../../Themes";

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
      <View
        key={index}
        style={
          this.props.home
            ? styles.questionsContainerHome
            : styles.questionsContainer
        }
      >
        <Text style={styles.questionText}>{`${I18n.t(
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
            ? I18n.t("customerOnboarding.homeCanIhelpYou", { name: firstName })
            : I18n.t(`customerOnboarding.canIHelpYou`)}
        </Text>
        <View style={{top: 10, maxWidth: Metrics.width * 0.88}}>
          <ScrollVertical
            onChange={index => {
              this.index = index;
            }}
            onLoad={() => {
              this.forceUpdate();
            }}
            enableAnimation
            enableTouchable={false}
            delay={8000}
            duration={0}
            scrollHeight={Metrics.height * 0.08}
          >
            {this.state.scenarios.map((scenario, index) => {
              return this._renderItem(scenario, index);
            })}
          </ScrollVertical>
        </View>
      </React.Fragment>
    );
  }
}
