import React from "react";
import { func } from "prop-types";

import { TouchableOpacity} from "react-native";
import { CloseIcon } from "../../Assets/SVG";
import { moderateScale } from "../../Util/Scaling";

import { styles} from "./styles"

const Close =({ action }) => {
    return (
        <TouchableOpacity
        activeOpacity={1}
        style={styles.headerButtonCancel}
        onPress={() => action()}
      >
        <CloseIcon width={moderateScale(20)} height={moderateScale(20)} />
      </TouchableOpacity>
    );
  };

  export default Close;

  Close.propTypes = {
    action: func.isRequired
  };