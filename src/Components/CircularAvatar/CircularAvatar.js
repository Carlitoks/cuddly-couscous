import React from "react";
import { moderateScaleViewports } from "../../Util/Scaling";
import styles from "./CircularAvatarStyles";
import { Avatar } from "react-native-elements";
import PhotoUpload from "react-native-photo-upload";
import { Image } from "react-native";
import { View } from "react-native-animatable";

const setImageTitle = (firstName, lastInitial, avatarURL) => {
  if(!avatarURL){
    return lastInitial ?
      `${firstName.charAt(0).toUpperCase()}${lastInitial.charAt(0).toUpperCase()}`
      : `${firstName.charAt(0).toUpperCase()}${firstName.charAt(1).toUpperCase()}`;
  }
  return null;
};

const CircularAvatar = ( props ) => {
  const { avatarURL, firstName, lastInitial, photoSelect } = props;

  if(photoSelect){
    return (
      <View>
        <PhotoUpload onPhotoSelect={photoSelect}>
          <Avatar
            titleStyle={styles.historyTitleStyle}
            rounded
            large
            title={ setImageTitle(firstName, lastInitial, avatarURL) }
            source={avatarURL ? { uri: avatarURL } : null }
            height={moderateScaleViewports(56)}
            width={moderateScaleViewports(56)}
          />
        </PhotoUpload>
      </View>
    );
  } else {
    return (
      <Avatar
        titleStyle={styles.historyTitleStyle}
        rounded
        large
        title={ setImageTitle(firstName, lastInitial, avatarURL) }
        source={avatarURL ? { uri: avatarURL } : null }
        height={moderateScaleViewports(56)}
        width={moderateScaleViewports(56)}
      />
    );
  }
};

export default CircularAvatar;
