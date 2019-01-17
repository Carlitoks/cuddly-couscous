import React, { Component } from 'react';
import { Text, View } from 'react-native';
import I18n from '../../../../I18n/I18n';
import ScrollVertical from '../../../../Util/ScrollText';

// Styles
import styles from './Styles/QuestionStyles';

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
    const scenarios = Object.keys(I18n.t('customerHome.scenarios')).sort(
      (a, b) => Math.random() - 0.5
    );
    this.setState({ scenarios });
  };

  renderItem = (item, index) => {
    const { home } = this.props;
    return (
      <View key={index} style={home ? styles.questionsContainerHome : styles.questionsContainer}>
        <Text style={styles.questionText}>{`${I18n.t(`customerHome.scenarios.${item}`)}`}</Text>
      </View>
    );
  };

  render() {
    const { firstName, home } = this.props;
    const { scenarios } = this.state;

    return (
      <React.Fragment>
        <Text style={styles.questionHelpText}>
          {home
            ? I18n.t('customerOnboarding.homeCanIhelpYou', { name: firstName })
            : I18n.t(`customerOnboarding.canIHelpYou`)}
        </Text>
        <View style={styles.scrollContainer}>
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
            scrollHeight={55}
          >
            {scenarios.map((scenario, index) => this.renderItem(scenario, index))}
          </ScrollVertical>
        </View>
      </React.Fragment>
    );
  }
}
