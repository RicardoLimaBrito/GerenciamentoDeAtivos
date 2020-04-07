import React, {Component} from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import { Actions } from 'react-native-router-flux';


export default function TelaLogin() {
  return (
    <View style={Styles.containerPrincipal}>
      <Text>Tela de login</Text>
      <Button title="Go to register" onPress={() => Actions.register()}/>
    </View>
  );
}

const Styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
  },
});

