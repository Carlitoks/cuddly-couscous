import React, { Component } from "react";
import { ScrollView, Text, TouchableOpacity, View, Alert } from "react-native";
import { connect } from "react-redux";
import NavBar from "../../Components/NavBar/NavBar";
// Styles
import styles from "./Styles/MissingRequiredPermissionsViewStyles";
import { Icon } from "react-native-elements";

class MissingRequiredPermissionsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  render() {
    const { navigation, user,loading, clearPayments } = this.props;

    return (
      <View style={styles.wrapperContainer}>
          <View style={styles.arrowContainer} >
            <Icon name="chevron-left" type="evilicon" color="#3F1674" size={50} />
          </View>

          <ScrollView
            automaticallyAdjustContentInsets
            alwaysBounceVertical={false}
            contentContainerStyle={styles.scrollViewFlex}
          >
          </ScrollView>
      </View>
    );
  }
}

const mS = state => ({

});

const mD = {
};

export default connect(
  mS,
  mD
)(MissingRequiredPermissionsView);
