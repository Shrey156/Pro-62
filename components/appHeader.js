import React, { Component } from 'react';
import { Text, View, Button, TouchableOpacity, StyleSheet } from 'react-native';

class AppHeader extends Component{
  render(){
    return(
      <View>
      <Text style={{backgroundColor:'black',fontSize:30,color:'white',textAlign:"center",padding:20}}>School Attendence</Text>
      </View>
    )    
  }
}

export default AppHeader;