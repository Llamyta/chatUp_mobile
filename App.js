import 'react-native-gesture-handler';
import {  StatusBar  } from 'react-native'

import {decode, encode} from 'base-64';
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

import React from 'react';
import MainNavigator from './app/navigations/Navigation';
// import { LogBox } from 'react-native';
// LogBox.ignoreLogs(['Warning: ...']);
// LogBox.ignoreAllLogs();
// import MainNavigator from './src/Navigator/MainNavigator';
// import {firebaseApp} from './app/utils/Firebase'
// YellowBox.ignoreWarnings(["Setting a timer", "FlatList", "react-native"]);
const App= () => {
  return (
  <>
   <StatusBar backgroundColor='#1196BA' barStyle="light-content" />
  <MainNavigator />
  </>
  );
};

export default App;
