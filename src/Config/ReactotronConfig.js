import Reactotron from 'reactotron-react-native'

Reactotron
  .configure({
    host: '192.168.1.4', // default is localhost (on android don't forget to `adb reverse tcp:9090 tcp:9090`)
    name: 'Jeenie'
  }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect() // let's connect!
