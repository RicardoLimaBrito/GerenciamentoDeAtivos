import React, {Component} from 'react';
import { Text, View, ScrollView, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import Constants from 'expo-constants';


export default function TelaSGP({ navigation }) {
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

      <Text style={Styles.titulo}>{"Gestão de Ativos"}</Text>

      <ScrollView style={Styles.botaoContainer}>
        <TouchableOpacity style={Styles.botoesSuperiores} onPress={()=>navigation.navigate('TelaConfigurarLocais')}>
          <Text style={Styles.textoBotoesSuperiores}>Configurar locais</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.botoesSuperiores} onPress={()=>navigation.navigate('TelaVerificarReservasEquipamentos')}>
          <Text style={Styles.textoBotoesSuperiores}>Verificar reservas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.botoesSuperiores} onPress={()=>navigation.navigate('TelaCadastrarColaborador')}>
          <Text style={Styles.textoBotoesSuperiores}>Cadastrar colaboradores</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.botoesSuperiores} onPress={()=>Alert.alert('Atenção','Em construção, volte mês que vem!')}>
        <Text style={Styles.textoBotoesSuperiores}>Chat</Text>
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity style={Styles.botaoDeSair} onPress={()=>navigation.navigate('TelaLogin')}>
        <Text style={Styles.textoBotaoSair}>Sair</Text>
      </TouchableOpacity>
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
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  botaoContainer: {
    margin: 10,
    maxHeight: 360,
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
    fontSize: 20,
    color: '#02246c',
    fontWeight: 'bold',
  },
  textoBotaoSair: {
    fontSize: 20,
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
    margin: 10,
  },
});

