import React, { Component } from "react";
import { connect } from "react-redux";

import QRCodeScanner from "react-native-qrcode-scanner";
import { StyleSheet, Text, Dimensions, View } from "react-native";

import { Button, Header } from "react-native-elements";
import GoBackButton from "../Components/GoBackButton/GoBackButton";
import { Colors, Fonts } from "../Themes";
import { moderateScale, verticalScale, scale } from "../Util/Scaling";
import I18n from "../I18n/I18n";

const { width, height } = Dimensions.get("window");

class ScanScreenView extends Component {
  state = {
    reactivate: false
  };

  onSuccess = e => {
    try {
      const qrObj = e.data;

      this.setState({
        reactivate: false
      });

      console.log(qrObj);
      console.log(this.props.token);
      if (this.props.token) {
        this.props.navigation.dispatch({
          type: "CustomerView"
        });
      } else {
        this.props.navigation.dispatch({
          type: "LoginView"
        });
      }
    } catch (err) {
      this.setState({
        reactivate: true
      });
    }
  };

  render() {
    const navigation = this.props.navigation;

    const styles = StyleSheet.create({
      containerStyle: {
        backgroundColor: "white"
      },
      bottomView: {
        backgroundColor: "white"
      },
      Button: {
        backgroundColor: Colors.primaryLightFillColor,
        width: moderateScale(150),
        alignSelf: "center",
        marginTop: moderateScale(15),
        marginBottom: moderateScale(15),
        height: moderateScale(90)
      },
      buttonText: {
        color: Colors.primaryAltFontColor,
        fontFamily: Fonts.primaryBoldFont,
        textAlign: "center",
        alignSelf: "center"
      },
      title: {
        fontSize: 20,

        color: Colors.primaryAltFontColor,
        textAlign: "center",
        fontFamily: Fonts.primaryLightFont,
        alignSelf: "center",
        width: "90%"
      }
    });

    return (
      <QRCodeScanner
        // https://github.com/moaazsidat/react-native-qrcode-scanner#props
        onRead={this.onSuccess}
        fadeIn={true}
        reactivate={this.state.reactivate}
        showMarker={true}
        bottomViewStyle={styles.bottomView}
        topViewStyle={styles.containerStyle}
        topContent={<Text style={styles.title}>{I18n.t("holdToScan")}</Text>}
        bottomContent={
          <Button
            borderRadius={15}
            buttonStyle={styles.Button}
            textStyle={styles.buttonText}
            onPress={() => navigation.dispatch({ type: "back" })}
            title={I18n.t("cancel")}
          />
        }
      />
    );
  }
}

const mS = state => ({
  token: state.auth.token
});

export default connect(mS)(ScanScreenView);