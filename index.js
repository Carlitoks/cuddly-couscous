/**
 * @format
 */

import {AppRegistry, Text, TextInput} from 'react-native';

import App from "./src/App";


if (Text.defaultProps == null) Text.defaultProps = {};
Text.defaultProps.maxFontSizeMultiplier = 2;

if (TextInput.defaultProps == null) TextInput.defaultProps = {};
TextInput.defaultProps.maxFontSizeMultiplier = 2;


AppRegistry.registerComponent("NewSolo", () => App);