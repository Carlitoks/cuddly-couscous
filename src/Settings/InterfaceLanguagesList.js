import { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { findIndex } from "lodash";

import { InterfaceSupportedLanguages } from "../Config/Languages";

class SupportedLanguagesList extends Component {
  state = { indexSelected: -1 };

  componentWillMount() {
    const { interfaceLocale } = this.props;

    const indexSelected = findIndex(
      InterfaceSupportedLanguages,
      interfaceLocale
    );

    this.setState({ indexSelected });
  }

  changeLanguage = index => {
    const { updateIndex } = this.props;
    const { indexSelected } = this.state;

    if (index !== indexSelected) {
      this.setState({ indexSelected: index });
      updateIndex(index);
    }
  };

  render() {
    const { render } = this.props;
    const { indexSelected } = this.state;

    return render({
      languages: InterfaceSupportedLanguages,
      indexSelected,
      changeLanguage: this.changeLanguage
    });
  }
}

SupportedLanguagesList.propTypes = {
  render: PropTypes.func.isRequired
};

// MAP STATE TO PROPS HERE
const mS = state => ({
  interfaceLocale: state.settings.interfaceLocale
});

// MAP DISPATCH TO PROPS HERE
const mD = {};

export default connect(
  mS,
  mD
)(SupportedLanguagesList);
