import React,{Component} from 'react';
import HomeScreen from './screens/homeScreen'
import SummaryScreen from './screens/summaryScreen'
import AppHeader from './components/appHeader'
import { Text, View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import {createAppContainer,createSwitchNavigator} from  'react-navigation';


export default class App extends Component {
  render() {
    return (
      <View>
      <AppHeader/>
         <AppContainer />

      </View>
    );
  }
}

var AppNavigator = createSwitchNavigator({
 HomeScreen:HomeScreen,
 SummaryScreen:SummaryScreen
});

const AppContainer = createAppContainer(AppNavigator);