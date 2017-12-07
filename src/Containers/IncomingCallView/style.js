import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width - 20;
const fontFamily = 'Arial';
const fontColor = 'white';
export const styles = StyleSheet.create({
  backgroundImage: {
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: 'black',
    opacity: 0.6
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  topContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40
  },
  centerContainer: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    marginLeft: '30%',
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: width,
  },
  inlineContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  callerNameText: {
    fontSize: 30,
    marginLeft: 10,
    paddingTop: 10,
    fontFamily: fontFamily,
    color: fontColor,
    textAlign: 'center',
    width: width
  },
  notificationText: {
    fontSize: 20,
    paddingTop: 5,
    fontFamily: fontFamily,
    color: fontColor,
    textAlign: 'left',
    width: width
  },
  locationText: {
    fontSize: 15,
    paddingTop: 5,
    fontFamily: fontFamily,
    color: fontColor,
  },
  incomingCallText: {
    fontSize: 20,
    marginLeft: 10,
    paddingTop: 5,
    fontFamily: fontFamily,
    color: fontColor,
    textAlign: 'center',
    width: width
  },
  icon: {
    color: 'white',
    paddingTop: 7,
    paddingRight: 9
  },
  smallAvatar: {
    width: 70,
    height: 70,
    borderRadius: 50 
  }
  
});
