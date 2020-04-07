import React, {Component} from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';


export default function TelaAtualizarTabela() {
  return (
    <View style={Styles.containerPrincipal}>
      <View style={Styles.imagemContainer}>
        <Image
          style={Styles.redimensionarLogo}
          source={require('../../../assets/SGP.png')}
        />
        <Image
          style={Styles.redimensionarLogo}
          source={require('../../../assets/logo.png')}
        />
      </View>

      <Text style={Styles.titulo}>{"Gerenciamento de Ativos"}</Text>

      <View style={Styles.botaoContainer}>
      <TouchableOpacity style={Styles.botoesSuperiores} onPress={()=>atualizarTabelaEquipamentos()}>
          <Text style={Styles.textoBotoesSuperiores}>Equipamentos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.botoesSuperiores} onPress={()=>atualizarSalasELabs()}>
          <Text style={Styles.textoBotoesSuperiores}>Salas e Labs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.botoesSuperiores} onPress={()=>atualizarReservas()}>
          <Text style={Styles.textoBotoesSuperiores}>Reservas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.botaoDeSair} onPress={()=>retornar()}>
          <Text style={Styles.textoBotaoSair}>Retornar</Text>
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
    justifyContent: 'center',
    flexDirection: 'row',
  },
  containerTitulo: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoContainer: {
    flex: 3,
    alignItems: 'center',
  },
  redimensionarLogo: {
      width: 120,
      height: 120,
      resizeMode: 'contain',
      margin: 10,
  },
  titulo: {
    fontSize: 30,
    color: '#02246c',
    fontWeight: 'bold',
  },
  textoBotoesSuperiores: {
    fontSize: 30,
    color: '#02246c',
    fontWeight: 'bold',
  },
  textoBotaoSair: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  botoesSuperiores: {
    width: 320,
    height: 70,
    backgroundColor: '#dae6c2',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderColor: '#284474',
    borderWidth: 1,
    margin: 10,
  },
  botaoDeSair: {
    width: 320,
    height: 70,
    backgroundColor: '#002566',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    margin: 25,
  },
});

