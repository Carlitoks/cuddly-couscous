import { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { findIndex } from "lodash";

import { SupportedLanguages } from "../../../Config/Languages";

import { updateSettings } from "../../../Ducks/ContactLinguistReducer";
import { translateLanguage } from "../../../I18n/I18n";

class SupportedLanguagesList extends Component {
  state = { filteredLanguages: [], indexSelected: -1 };

  componentWillMount() {
    const { primaryLangCode } = this.props;

    const filteredLanguages = SupportedLanguages.filter(
      language => language[3] !== primaryLangCode
    );

    const indexSelected = findIndex(
      filteredLanguages,
      language => language[3] === this.props.secundaryLangCode
    );

    this.setState({
      filteredLanguages,
      indexSelected: indexSelected > 0 ? indexSelected : 0
    }); //Ternary part of the ticket 1411
  }

  changeLanguage = index => {
    const { updateSettings } = this.props;
    const { indexSelected, filteredLanguages } = this.state;
    const selectedLanguage = filteredLanguages[index];

    if (index !== indexSelected) {
      updateSettings({
        secundaryLangCode: selectedLanguage[3],
        selectedLanguage: translateLanguage(
          selectedLanguage[3],
          selectedLanguage["name"]
        )
      });

      this.setState({ indexSelected: index });
    }
  };

  render() {
    const { render } = this.props;
    const { filteredLanguages: languages, indexSelected } = this.state;

    return render({
      languages,
      indexSelected,
      changeSelected: this.changeSelected,
      changeLanguage: this.changeLanguage
    });
  }
}

SupportedLanguagesList.propTypes = {
  render: PropTypes.func.isRequired
};

// MAP STATE TO PROPS HERE
const mS = state => ({
  primaryLangCode: state.contactLinguist.primaryLangCode,
  secundaryLangCode: state.contactLinguist.secundaryLangCode
});

// MAP DISPATCH TO PROPS HERE
const mD = { updateSettings };

export default connect(
  mS,
  mD
)(SupportedLanguagesList);
