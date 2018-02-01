import DeviceInfo from "react-native-device-info"

const IphoneX = DeviceInfo.getModel() == "iPhone X";
let top;
export const topIOS = () => {
    if(IphoneX){
        top=40;
    }
    else{
        top=20;
    }
    return top;
  };

