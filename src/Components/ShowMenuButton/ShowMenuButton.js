import React, { Component } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { FormInput } from "react-native-elements";
import { View } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";

import styles from "./styles";

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
      <Col style={styles.container}>
        {/* Show Menu Button */}
        <Icon
          style={styles.Icon}
          name="menu"
          size={30}
          onPress={() =>
            this.props.navigation.dispatch({ type: "Home" })
          }
        />
      </Col>
    );
  }
}

export default ShowMenuButton;
