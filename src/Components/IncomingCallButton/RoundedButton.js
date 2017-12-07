import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { RkButton, rkType, RkTheme } from "react-native-ui-kitten";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from './style';

RkTheme.setType('RkButton', 'acceptCall', {
  backgroundColor: '#22c16a'
});

RkTheme.setType('RkButton', 'rejectCall', {
  backgroundColor: '#fb2a48'
});

export default class RoundedButton extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    navigator: PropTypes.object,
    icon: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  }

  render () {
    return (
      <RkButton style={styles.button} rkType={this.props.type} onPress={this.props.onPress}>
        <Icon
            style={styles.buttonIcon}
            size={40}
            name={this.props.icon}
          />
      </RkButton>
    )
  }
}
