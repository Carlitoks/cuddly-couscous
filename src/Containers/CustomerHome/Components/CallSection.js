import React, { Component } from 'react';
import InfoInputs from './Partials/InfoInputs';

export default class CallSection extends Component {
  render() {
    const { type, openSlideMenu } = this.props;
    return <InfoInputs type={type} openSlideMenu={openSlideMenu} />;
  }
}
