import React, { Component } from "react";
import { ScrollView, Text, TouchableOpacity, View, Alert } from "react-native";
import { connect } from "react-redux";
import NavBar from "../../Components/NavBar/NavBar";
// Styles
import styles from "./Styles/MissingRequiredPermissionsViewStyles";
import { Icon } from "react-native-elements";
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { moderateScale } from "../../Util/Scaling";
import I18n from "../../I18n/I18n";
import TextBlockButton from "../../Components/Widgets/TextBlockButton";
import OpenAppSettings from 'react-native-app-settings'
import { detectPermissions } from "../../Ducks/AppStateReducer";
class MissingRequiredPermissionsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }
  componentWillMount() {
    const { detectPermissions } = this.props;
    const { camera, microphone } = this.props.navigation.state.params;
    console.log("microphone", microphone, "camera", camera);

    detectPermissions()
      .then(res => console.log(res))
      .catch(error => console.log(error))
  }
  goSettings() {
    OpenAppSettings.open();
  }

  render() {
    const {
      navigation,
    } = this.props;
    const { camera, microphone, location, notifications, isLinguist } = this.props.navigation.state.params;
    return (
      <View style={styles.wrapperContainer}>
        <TouchableOpacity onPress={() => navigation.dispatch({ type: "back" })} style={styles.arrowContainer} >
          <Icon name="chevron-left" type="evilicon" color="#3F1674" size={50} />
        </TouchableOpacity>
        <Text style={styles.permissionMissingTitle}>{I18n.t("permissions.missing")}</Text>

        <ScrollView
          automaticallyAdjustContentInsets
          alwaysBounceVertical={false}
          contentContainerStyle={styles.scrollViewFlex}
        >

          {camera && <View style={styles.firstCardContainer}>
            <View style={styles.row}>
              <IconSimpleLineIcons name={'camera'} size={moderateScale(30)} color={ 'purple' } />
              <View style={styles.column}>
                <Text style={styles.permissionTitle}>{I18n.t("permissions.name.camera")}</Text>
                <Text style={styles.permissionDescription}> { isLinguist? I18n.t("permissions.description.linguist.camera") :  I18n.t("permissions.description.customer.camera")}</Text>
              </View>


            </View>
          </View>}
          {microphone && <View style={camera ? styles.cardContainer : styles.firstCardContainer}>
            <View style={styles.row}>
            <IconSimpleLineIcons style={styles.icon} name={'microphone'} size={moderateScale(30)} color={ 'purple' } />
              <View style={styles.column}>
                <Text style={styles.permissionTitle}>{I18n.t("permissions.name.mic")}</Text>
                <Text style={styles.permissionDescription}>{isLinguist?  I18n.t("permissions.description.linguist.mic") :  I18n.t("permissions.description.customer.mic")}</Text>
              </View>

            </View>
          </View>}

          {location && <View style={camera || microphone ? styles.cardContainer : styles.firstCardContainer}>
            <View style={styles.row}>
              <IconSimpleLineIcons style={styles.icon} name={'location-pin'} size={moderateScale(30)} color={ "#401674" } />
              <View style={styles.column}>
                <Text style={styles.permissionTitle}>{I18n.t("permissions.name.location")}</Text>
                <Text style={styles.permissionDescription}>{ isLinguist? I18n.t("permissions.description.linguist.location") : I18n.t("permissions.description.customer.location")}</Text>
              </View>

            </View>
          </View>}

          {notifications && <View style={camera || microphone || location ? styles.cardContainer : styles.firstCardContainer}>
            <View style={styles.row}>
            <IconMaterialIcons style={styles.icon} name={'notifications-active'} size={moderateScale(40)} color={ "#401674" } />
              <View style={styles.column}>
                <Text style={styles.permissionTitle}>{I18n.t("permissions.name.notifications")}</Text>
                <Text style={styles.permissionDescription}>{ isLinguist? I18n.t("permissions.description.linguist.notifications") :  I18n.t("permissions.description.customer.notifications")}</Text>
              </View>

            </View>
          </View>}



        </ScrollView>
        <View style={styles.creditCardContainer}>
          <Text style={styles.permissionsDescription}>{I18n.t("permissions.missingDescription")}</Text>
          <TextBlockButton
            text={I18n.t("permissions.gotoSettings")} // the text in the button
            disabled={false} // boolean if disabled, prevents taps and show disabled button styles
            loading={this.state.loading} // boolean for "loading" state, in the loading state, display an ActivitySpinner instead of the button text
            style={styles.buttonContainer} // main container style, component should provide some defaults, like width at 100%
            disabledStyle={styles.buttonDisable} // container style object when disabled, component should provide defaults
            buttonStyle={styles.enabledButton}
            textStyle={styles.buttonText} // optional text styles, component should provide defaults
            onPress={this.goSettings} // function to call when pressed
          />
        </View>
      </View>
    );
  }
}

const mS = state => ({

});

const mD = {
  detectPermissions
};

export default connect(
  mS,
  mD
)(MissingRequiredPermissionsView);
