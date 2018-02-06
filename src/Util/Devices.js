import DeviceInfo from "react-native-device-info"

const IphoneX = DeviceInfo.getModel() == "iPhone X";
let top;
export const topIOS = () => {
    if(IphoneX){
        top=0;
    }
    else{
        top=0;
    }
    return top;
  };

