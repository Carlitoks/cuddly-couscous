import React, { Component } from "react";
import { FormInput } from "react-native-elements";
import { View, TouchableOpacity } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { NavMenu } from "../../SVG";

import styles from "./styles";
import { moderateScale, verticalScale, scale } from "../../Util/Scaling";

class ShowMenuButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuHidden: true,
      dispatchType: ""
    };
  }

  toggleMenuVisibility = () => {
    let newState;
    if (this.state.menuToggled) {
      newState = {
        menuToggled: false,
        dispatchType: ""
      };
    } else {
      newState = {
        menuToggled: true,
        dispatchType: ""
      };
    }
    this.setState(newState);
  };

  render() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.container}
        onPress={() => this.props.navigation.dispatch({ type: "DrawerOpen" })}>
        {/* Show Menu Button */}
        <NavMenu
          width={30}
          height={20}
        />
      </TouchableOpacity>
    );
  }
}

export default ShowMenuButton;
