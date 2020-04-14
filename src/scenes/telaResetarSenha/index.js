import React, {Component, useState} from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { Actions } from 'react-native-router-flux';

export default function TelaResetarSenha() {
  const [email, setEmail] = useState('');


  return (
    <View style={Styles.containerPrincipal}>
      <Image
        style={Styles.redimensionarLogo}
        source={require('../../../assets/logo.png')}
      />
  
      <Text style={Styles.titulo}>{"Reiniciar senha"}</Text>

      <Text style={Styles.textoCorpo}>{"Lhe enviaremos um email com mais informações sobre como redefinir sua senha"}</Text>

      <View style={Styles.containerDosDados}>
        <TextInput
          style={{height: 40}}
          placeholder="  Email"
          onChangeText={email => setEmail(email)}
          defaultValue={email}
        />
      </View>

      <View style={Styles.botaoContainer}>
        <TouchableOpacity style={Styles.botoesBotaoAcessar} onPress={()=>null}>
          <Text style={Styles.textoBotaoAcessar}>ACESSAR</Text>
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
    fontSize: 40,
    color: '#02246c',
    fontWeight: 'bold',
  },
  textoCorpo: {
    fontSize: 15,
    color: '#000000',
    fontWeight: 'bold',
    margin: 15,
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
    backgroundColor: '#002566',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    margin: 15,
  },
});

