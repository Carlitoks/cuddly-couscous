import { Component } from "react";
import { connect } from "react-redux";
import { findIndex } from "lodash";

import { PrimaryLanguages } from "../../Config/Languages";

class NativeLanguageSelection extends Component {
  state = { indexSelected: -1, selectedLanguage: null };

  componentWillReceiveProps(nextProps) {
    const { selectedNativeLanguage } = this.props;

    if (nextProps.searchQuery !== this.props.searchQuery) {
      const indexSelected =
        nextProps.searchQuery === ""
          ? findIndex(PrimaryLanguages, this.state.selectedLanguage)
          : findIndex(
              this.filterList(nextProps.searchQuery),
              selectedNativeLanguage
            );

      this.setState({
        indexSelected
      });
    }
  }

  componentWillMount() {
    const { selectedNativeLanguage } = this.props;

    if (selectedNativeLanguage) {
      this.setState({
        indexSelected: findIndex(this.filterList(), selectedNativeLanguage)
      });
    }
  }

  filterList = (searchQuery = "") => {
    const search = searchQuery ? searchQuery : this.props.searchQuery;

    return PrimaryLanguages.filter(language => {
      return language.name.toLowerCase().startsWith(search.toLowerCase());
    });
  };

  changeLanguage = index => {
    const selectedLanguage = this.filterList()[index];

    this.setState({
      selectedLanguage,
      indexSelected: index
    });
  };

  render() {
    const { indexSelected } = this.state;

    return this.props.render({
      indexSelected,
      filterList: this.filterList,
      changeLanguage: this.changeLanguage
    });
  }
}

NativeLanguageSelection.propTypes = {};

// MAP STATE TO PROPS HERE
const mS = state => ({
  selectedNativeLanguage: state.userProfile.selectedNativeLanguage,
});

// EXPORT DEFAULT HERE AT THE BOTTOM
export default connect(mS)(NativeLanguageSelection);
