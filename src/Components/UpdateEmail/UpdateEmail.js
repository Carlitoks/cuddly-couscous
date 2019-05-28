import React, { Component } from "react";
import { connect } from "react-redux";
import UpdateEmailForm from "./UpdateEmailForm";

class UpdateEmail extends Component {
  render() {
      return <UpdateEmailForm emailBounced={this.props.emailBounced}/>;
  }
};

const mS = state => ({});

const mD = {};

export default connect(
  mS,
  mD
)(UpdateEmail);
