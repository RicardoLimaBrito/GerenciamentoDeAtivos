import React, {Component} from 'react';
import { Text, View, TouchableOpacity, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {Styles} from './Styles'

const navigation = useNavigation()

export default function BotoesTelaLogin() {
  return (
    <View style={Styles.botaoContainer}>
      <TouchableOpacity style={Styles.botoesBotaoAcessar} onPress={()=>navigation.push('telaAluno')}>
        <Text style={Styles.textoBotaoAcessar}>ACESSAR</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>esqueceuASenha()}>
        <Text style={Styles.textoBotaoEsqueceuASenha}>Esqueceu a senha?</Text>
      </TouchableOpacity>
    </View>
  ) 
}

function esqueceuASenha(){
  return Alert.alert("Esquecendo..", "Só aguardar alguns minutos...")
}
