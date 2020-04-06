import React, {Component} from 'react';
import { View, Text } from 'react-native';

import {Styles} from './Styles'

export default function TituloGestaoDeAtivos() {
  return (
    <View style={Styles.containerTitulo}>
      <Text style={Styles.titulo}>{"Gestão de Ativos"}</Text>
    </View>
  )
}

