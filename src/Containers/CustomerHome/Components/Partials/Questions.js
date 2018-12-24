import React, { Component } from "react";
import { Text, View } from "react-native";
import Carousel from "react-native-snap-carousel";
import I18n from "./../../../../I18n/I18n";

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
    const scenarios = I18n.t("customerHome.scenarios");
    this.setState({ scenarios: Object.keys(scenarios) });
  };

  _renderItem = ({ item, index }) => {
    return (
      <View style={styles.questionsContainer} key={index}>
        <Text style={styles.questionText}>{`${I18n.t(
          `customerHome.scenarios.${item}`
        )}`}</Text>
      </View>
    );
  };
  render() {
    return (
      <React.Fragment>
        <Text style={styles.questionHelpText}>
          {I18n.t(`customerHome.help`)}
        </Text>
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          style={{
            alignSelf: "flex-end",
            flexWrap: "wrap",
            flexDirection: "column"
          }}
          data={this.state.scenarios}
          renderItem={this._renderItem}
          vertical={true}
          loop={true}
          autoplay={true}
          enableMomentum={false}
          lockScrollWhileSnapping={false}
          sliderHeight={60}
          sliderWidth={74}
          itemHeight={80}
          itemWidth={114}
          inactiveSlideOpacity={0}
        />
      </React.Fragment>
    );
  }
}