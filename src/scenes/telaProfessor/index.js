import React, {useState} from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import Constants from 'expo-constants';
import { Actions } from 'react-native-router-flux';


export default function TelaProfessor() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={Styles.containerPrincipal}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={Styles.containerModal}>
          <TouchableOpacity onPress={()=>setModalVisible(false)}>
            <Text style={Styles.textoBotoesSuperiores}>Fechar tela</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={Styles.imagemContainer}>
        <Image
          style={Styles.redimensionarLogo}
          source={require('../../../assets/professor.png')}
        />
        <Image
          style={Styles.redimensionarLogo}
          source={require('../../../assets/logo.png')}
        />
      </View>

      <Text style={Styles.titulo}>{"Gerenciamento de Ativos"}</Text>

      <View style={Styles.botaoContainer}>
        <TouchableOpacity style={Styles.botoesSuperiores} onPress={()=>setModalVisible(true)}>
          <Text style={Styles.textoBotoesSuperiores}>Visualizar minhas salas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.botoesSuperiores} onPress={()=>Actions.push('telaReservarEquipamento')}>
          <Text style={Styles.textoBotoesSuperiores}>Reservar equipamento</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.botoesSuperiores} onPress={()=>null}>
          <Text style={Styles.textoBotoesSuperiores}>Chat online</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.botaoDeSair} onPress={()=>Actions.replace('telaLogin')}>
          <Text style={Styles.textoBotaoSair}>Sair</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  botaoContainer: {
    alignItems: 'center',
    margin: 15,
  },
  containerModal: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 50,
    width: 300,
    height: 550,
    backgroundColor: '#8CC8E8',
    borderRadius: 15,
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
    margin: 25,
  },
});

