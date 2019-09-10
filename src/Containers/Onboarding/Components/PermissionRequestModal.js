import React, { Component } from "react";
import { Text, TouchableHighlight, View, Alert, ScrollView, TouchableOpacity} from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import { connect } from "react-redux";
import I18n from "../../../I18n/I18n";
import Modal from 'react-native-modal';


import { moderateScale } from "../../../Util/Scaling";

import { requestPermissions } from "../../../Ducks/AppStateReducer";

// Styles
import styles from "./Styles/PermissionRequestModalStyles";

class PermissionRequestModal extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: true,
    };
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  requestPerms(){
    this.setModalVisible(!this.state.modalVisible);
    const { perms } = this.props;
    requestPermissions(perms)
    .then(res => console.log(res))
    .catch(error => console.log(res))
    
    
  }

  renderIcon(key)
  {
    switch(key) { 
      case 'camera': { 
        return<IconSimpleLineIcons style={styles.icon} name={'camera'} size={moderateScale(40)} color={ 'purple' } />
      } 
      case 'mic': { 
        return<IconSimpleLineIcons style={styles.icon} name={'microphone'} size={moderateScale(40)} color={ 'purple' } />         
      }
      case 'notifications': { 
        return<IconMaterialIcons style={styles.icon} name={'notifications-active'} size={moderateScale(40)} color={ 'purple' } />         
      } 
      case 'location': { 
        return<IconSimpleLineIcons style={styles.icon} name={'location-pin'} size={moderateScale(40)} color={ 'purple' } />         
      } 
      case 'photos': { 
        return<IconIonicons style={styles.icon} name={'md-photos'} size={moderateScale(40)} color={ 'purple' } />         
      } 
      default: { 
         //statements; 
         break; 
      } 
   } 
  }

  renderContent(){
    const { perms, role } = this.props;
    return perms.map( perm => 
      <View key={perm} style={styles.perms}>
        {this.renderIcon(perm)}
        <View style={styles.permsContent}>
          <Text style= {styles.permsTitle}>{I18n.t(`permissions.name.${perm}`)}</Text>
          <Text style= {styles.permsDescription}>{I18n.t(`permissions.description.${role}.${perm}`)}</Text>
        </View>
      </View>
    );
 
  }

  render() {
    return (
        <Modal
          animationType="fade"
          transparent={true}
          isVisible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
          onBackdropPress={() => this.setModalVisible(!this.state.modalVisible)}
          propagateSwipe={true}
        >
          <View style={styles.modalView}>
            <View>
              <Text style= {styles.title}>{I18n.t("permissions.title")}</Text>
              <ScrollView 
                automaticallyAdjustContentInsets
                alwaysBounceVertical={false}
                contentContainerStyle={styles.scrollViewFlex}
              >
                {this.renderContent()}
              </ScrollView>
              <View style={styles.buttonsContainer}>

                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                  <Text style={styles.askLater}>{I18n.t("permissions.later")}</Text>
                </TouchableHighlight>

                <TouchableOpacity
                  onPress={() => {
                    
                    this.requestPerms();
                  }}
                  style={styles.continueButton}
                  >
                  <Text style={styles.continueButtonText}>
                  {I18n.t("actions.continue")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
    );
  }
}

const mS = state => ({});

const mD = {
  requestPermissions
};

export default connect(
  mS,
  mD,
)(PermissionRequestModal);
