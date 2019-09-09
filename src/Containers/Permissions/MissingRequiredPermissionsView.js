import React, { Component } from "react";
import { ScrollView, Text, TouchableOpacity, View, Alert } from "react-native";
import { connect } from "react-redux";
import NavBar from "../../Components/NavBar/NavBar";
// Styles
import styles from "./Styles/MissingRequiredPermissionsViewStyles";
import { Icon } from "react-native-elements";
import I18n from "../../I18n/I18n";
import TextBlockButton from "../../Components/Widgets/TextBlockButton";
import OpenAppSettings from 'react-native-app-settings'

class MissingRequiredPermissionsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }
  goSettings(){
    OpenAppSettings.open();

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

            <Text style={styles.permissionTitle}>{I18n.t("permissions.missing")}</Text>
            <View style={styles.creditCardContainer}>  
                <View style={styles.row}>  
                <Icon name="camera" type="font-awesome" color="#401674" size={25} />
                  <View style={styles.column}>  
                    <Text style={styles.permissionTitle}>{I18n.t("permissions.name.camera")}</Text>
                    <Text style={styles.permissionDescription}>{I18n.t("permissions.description.customer.camera")}</Text>
                  </View>


                </View>
              </View>
              <View style={styles.creditCardContainer}>  
                <View style={styles.row}>  
                  <Icon name="microphone" type="font-awesome" color="#401674" size={25} />
                  <View style={styles.column}>  
                    <Text style={styles.permissionTitle}>{I18n.t("permissions.name.mic")}</Text>
                    <Text style={styles.permissionDescription}>{I18n.t("permissions.description.customer.mic")}</Text>
                  </View>

                </View>
              </View>

              <View style={styles.creditCardContainer}>  
              <Text style={styles.permissionsDescription}>{I18n.t("permissions.missingDescription")}</Text>
              <TextBlockButton
                text = {I18n.t("permissions.gotoSettings")} // the text in the button
                disabled = {false} // boolean if disabled, prevents taps and show disabled button styles
                loading = {this.state.loading} // boolean for "loading" state, in the loading state, display an ActivitySpinner instead of the button text
                style = {styles.buttonContainer} // main container style, component should provide some defaults, like width at 100%
                disabledStyle = {styles.buttonDisable} // container style object when disabled, component should provide defaults
                buttonStyle={ styles.enabledButton }
                textStyle = {styles.buttonText} // optional text styles, component should provide defaults
                onPress = {this.goSettings} // function to call when pressed
            />
              </View>


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
