import React, { Component } from "react";
import { connect } from "react-redux";
import UpdateEmailForm from "./UpdateEmailForm";
import UpdateEmailSuccess from "./UpdateEmailSuccess";

class UpdateEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
    };
  }

  setSuccessState = () => {
    this.setState({success: true});
  };

  render() {
    if(this.state.success){
      return <UpdateEmailSuccess />;
    }else{
      return <UpdateEmailForm setSuccessState={() => this.setSuccessState() } />;
    }
  }
};

const mS = state => ({});

const mD = {};

export default connect(
  mS,
  mD
)(UpdateEmail);
