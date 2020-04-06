import React, {Component} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import ImagensDeCimaTelaLogin from '../imagensDeCimaTelaLogin/ImagensDeCimaTelaLogin'
import TituloGestaoDeAtivos from '../tituloGestaoDeAtivos/TituloGestaoDeAtivos'
import GradeDeDados from '../gradeDeDadosTelaLogin/GradeDeDadosTelaLogin'
import BotoesTelaLogin from '../botoesTelaLogin/BotoesTelaLogin'

export default function TelaLogin() {
  return (
    <View style={Styles.containerPrincipal}>
      <ImagensDeCimaTelaLogin />
      <TituloGestaoDeAtivos />
      <GradeDeDados />
      <BotoesTelaLogin />
      <View style={{flex: 3}}/>
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

