import React, { Component } from "react";
import { connect } from "react-redux";
import UpdateEmailForm from "./UpdateEmailForm";

class UpdateEmail extends Component {
  render() {
      const { navigation } = this.props;
      return <UpdateEmailForm navigation={navigation} emailBounced={this.props.emailBounced}/>;
  }
};

const mS = state => ({});

const mD = {};

export default connect(
  mS,
  mD
)(UpdateEmail);
