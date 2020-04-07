import React, {Component, useState} from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { Actions } from 'react-native-router-flux';

export default function TelaLogin() {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <View style={Styles.containerPrincipal}>
      <Image
        style={Styles.redimensionarLogo}
        source={require('../../../assets/logo.png')}
      />

      <Text style={Styles.titulo}>{"Gerenciamento de Ativos"}</Text>
      
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

      <View style={Styles.botaoContainer}>
        <TouchableOpacity style={Styles.botoesBotaoAcessar} onPress={()=>Actions.Register}>
          <Text style={Styles.textoBotaoAcessar}>ACESSAR</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>esqueceuASenha()}>
          <Text style={Styles.textoBotaoEsqueceuASenha}>Esqueceu a senha?</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const Styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
  },
  imagemContainer: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    alignItems: 'center',
  },
  containerTitulo: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoContainer: {
    flex: 2,
    alignItems: 'center',
  },
  redimensionarLogo: {
      width: 120,
      height: 120,
      resizeMode: 'contain',
  },
  titulo: {
    fontSize: 30,
    color: '#02246c',
    fontWeight: 'bold',
  },
  containerDosDados: {
    margin: 10,
    borderWidth: 1,
    width: 300,
    borderColor: '#e0ebeb',
    borderRadius: 10,
  },
  textoBotaoAcessar: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  textoBotaoEsqueceuASenha: {
    fontSize: 15,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  botoesBotaoAcessar: {
    width: 320,
    height: 50,
    backgroundColor: '#acd54a',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    margin: 15,
  },
});

