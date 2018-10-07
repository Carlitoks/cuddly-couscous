import React, { Component } from "react";
import { FormInput, Icon } from "react-native-elements";
import { View, TouchableOpacity, Platform } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { NavMenu } from "../../Assets/SVG";
import { Colors } from "../../Themes";

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
        { Platform.OS === 'android' ?
          <Icon
            style={styles.Icon}
            name="menu"
            size={moderateScale(40)}
            color={Colors.primaryColor}/> :
          <NavMenu
          width={30}
          height={20}
          /> }
      </TouchableOpacity>
    );
  }
}

export default ShowMenuButton;
