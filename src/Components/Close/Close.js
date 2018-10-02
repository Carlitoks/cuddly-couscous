import React from "react";
import { func } from "prop-types";

import { TouchableOpacity, Platform, View } from "react-native";
import { Icon } from 'react-native-elements';
import { CloseIcon } from "../../Assets/SVG";
import { moderateScale } from "../../Util/Scaling";

import { styles} from "./styles"
import {Colors} from "../../Themes";

renderButton = () => {
  if(Platform.OS === 'android'){
    return  <Icon
      style={styles.Icon}
      name="cross"
      type='entypo'
      size={moderateScale(40)}
      color={Colors.primaryColor}/>;
  }else{
    return <CloseIcon
      width={moderateScale(20)}
      height={moderateScale(20)} />
  }
};

const Close =({ action }) => {
    return (
        <TouchableOpacity
        activeOpacity={1}
        style={styles.headerButtonCancel}
        onPress={() => action()}
      >
          {
            this.renderButton()
          }
      </TouchableOpacity>
    );
  };

  export default Close;

  Close.propTypes = {
    action: func.isRequired
  };