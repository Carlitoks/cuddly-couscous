import Reactotron from 'reactotron-react-native'

Reactotron
  .configure({
    host: '172.16.20.36',
    port: 9090
  }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect() // let's connect!
