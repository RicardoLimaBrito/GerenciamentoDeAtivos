import React, {Component} from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import { Actions } from 'react-native-router-flux';


export default function TelaDeCadastro() {
  return (
    <View style={Styles.containerPrincipal}>
      <Text>Tela De Cadastro</Text>
      <Button title="Go to login" onPress={() => Actions.login()}/>
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

