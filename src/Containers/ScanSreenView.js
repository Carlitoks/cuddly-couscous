import React, { Component } from "react";
import { connect } from "react-redux";

import QRCodeScanner from "react-native-qrcode-scanner";
import { StyleSheet } from "react-native";

class ScanScreenView extends Component {
  state = {
    reactivate: true
  };

  onSuccess = e => {
    try {
      const qrObj = e.data;

      this.setState({
        reactivate: false
      });

      if (this.props.token) {
        this.props.navigation.dispatch({
          type: "ContactingLinguist"
        });
      } else {
        this.props.navigation.dispatch({
          type: "LoginView"
        });
      }

      setTimeout(()=>{
        this.setState({
          reactivate: true
        });  
      }, 2000);

    } catch (err) {
      this.setState({
        reactivate: true
      });
    }
  };

  render() {
    const styles = StyleSheet.create({
      containerStyle: {
        backgroundColor: "#000"
      }
    });

    return (
      <QRCodeScanner
        // https://github.com/moaazsidat/react-native-qrcode-scanner#props
        onRead={this.onSuccess}
        fadeIn={true}
        reactivate={this.state.reactivate}
        showMarker={true}
        bottomViewStyle={styles.containerStyle}
        topViewStyle={styles.containerStyle}
      />
    );
  }
}

const mS = state => ({
  token: state.auth.token
});

export default connect(mS)(ScanScreenView);