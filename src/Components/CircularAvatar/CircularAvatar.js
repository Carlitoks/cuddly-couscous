import React from "react";
import { moderateScaleViewports } from "../../Util/Scaling";
import styles from "./CircularAvatarStyles";
import { Avatar } from "react-native-elements";

const CircularAvatar = ( props ) => {
  const { avatarURL, firstName, lastInitial } = props.sessionInfo;
    if (avatarURL) {
        return <Avatar
          rounded
          large
          source={{ uri: avatarURL }}
          height={moderateScaleViewports(56)}
          width={moderateScaleViewports(56)}
        />;
         } else {
      return <Avatar
        titleStyle={styles.historyTitleStyle}
        rounded
        large
        title={lastInitial ?
          `${firstName.charAt(0).toUpperCase()}${lastInitial.toUpperCase()}`
          : `${firstName.charAt(0).toUpperCase()}${firstName.charAt(1).toUpperCase()}` }
        height={moderateScaleViewports(56)}
        width={moderateScaleViewports(56)}
      />;
    }
};

export default CircularAvatar;
