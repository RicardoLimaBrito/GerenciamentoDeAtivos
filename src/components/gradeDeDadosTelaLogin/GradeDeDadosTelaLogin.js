import React, {Component, useState} from 'react';
import { Text, View, StyleSheet, TextInput} from 'react-native';

import {Styles} from './Styles'

export default function GradeDeDados() {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  return (
    <View style={Styles.gradeDeDados}>
      <View style={Styles.containerDosDados}>
        <TextInput
          style={{height: 40}}
          placeholder="  Login"
          onChangeText={login => setLogin(login)}
          defaultValue={login}
        />
      </View>
      <View style={Styles.containerDosDados}>
        <TextInput
          style={{height: 40}}
          placeholder="  Senha"
          onChangeText={senha => setSenha(senha)}
          defaultValue={senha}
        />
      </View>
    </View>
  );
}

