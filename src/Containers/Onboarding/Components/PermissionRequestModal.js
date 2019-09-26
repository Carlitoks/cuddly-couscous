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
  }

  requestPerms(){
    const { perms, requestPermissions, onClose} = this.props;
    requestPermissions(perms)
    .then(res => onClose(perms))
    .catch(error => console.log(error)) 
  }

  renderContent(){
    const { perms, role } = this.props;
    return perms.map( perm =>{
      let icon = null;
      let name = null;
      switch(perm) { 
        case 'camera': { 
          icon = <IconSimpleLineIcons style={styles.icon} name={'camera'} size={moderateScale(40)} color={ 'purple' } />
          break; 
        } 
        case 'microphone': { 
          icon = <IconSimpleLineIcons style={styles.icon} name={'microphone'} size={moderateScale(40)} color={ 'purple' } />
          name  = 'mic';        
          break; 
        }
        case 'notification': { 
          icon = <IconMaterialIcons style={styles.icon} name={'notifications-active'} size={moderateScale(40)} color={ 'purple' } />         
          name =  'notifications';
          break; 
        } 
        case 'location': { 
          icon = <IconSimpleLineIcons style={styles.icon} name={'location-pin'} size={moderateScale(40)} color={ 'purple' } />         
          break; 
        } 
        case 'photo': { 
          icon = <IconIonicons style={styles.icon} name={'md-photos'} size={moderateScale(40)} color={ 'purple' } />
          name =  'photos';
          break; 
        } 
     }

     return <View key={perm} style={styles.perms}>
              {icon}
              <View style={styles.permsContent}>
                <Text style= {styles.permsTitle}>{I18n.t(`permissions.name.${name || perm}`)}</Text>
                <Text style= {styles.permsDescription}>{I18n.t(`permissions.description.${role}.${name || perm}`)}</Text>
              </View>
            </View>
    });
 
  }

  render() {
    const { askLater, visible, onClose } = this.props;
    return (
        <Modal
          animationType="fade"
          transparent={true}
          isVisible={visible}
          onRequestClose={() => Alert.alert('Modal has been closed.') }
          onBackdropPress={() => askLater ? onClose(false) : null}
          propagateSwipe={true}
        >
          <View style={styles.modalView}>
              <Text style= {styles.title}>{I18n.t("permissions.title")}</Text>
              <ScrollView 
                automaticallyAdjustContentInsets
                alwaysBounceVertical={false}
                contentContainerStyle={styles.scrollViewFlex}
              >
                {this.renderContent()}
              </ScrollView>
              <View style={ askLater ? styles.buttonsContainer : styles.buttonsContainerCenter}>
                { askLater &&
                  <TouchableOpacity
                    onPress={() => onClose(false)}>
                    <Text style={styles.askLater}>{I18n.t("permissions.later")}</Text>
                  </TouchableOpacity>
                }
                <TouchableOpacity
                  onPress={() => this.requestPerms()}
                  style={ askLater ? styles.continueButton : styles.continueButtonCenter}
                  >
                  <Text style={styles.continueButtonText}>
                  {I18n.t("actions.continue")}
                  </Text>
                </TouchableOpacity>
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
