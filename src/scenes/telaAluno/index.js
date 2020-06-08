import React, {useState} from 'react';
import { Text, View, ScrollView, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import Constants from 'expo-constants';

export default function TelaAluno({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={Styles.containerPrincipal}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}>
        <View style={Styles.containerModal}>
          <TouchableOpacity onPress={()=>setModalVisible(false)}>
            <Text style={Styles.textoBotoesSuperiores}>Fechar tela</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={Styles.imagemContainer}>
        <Image
          style={Styles.redimensionarLogo}
          source={require('../../../assets/estudante.png')}
        />
        <Image
          style={Styles.redimensionarLogo}
          source={require('../../../assets/logo.png')}
        />
      </View>

      <Text style={Styles.titulo}>{"Gestão de Ativos"}</Text>

      <ScrollView style={Styles.botaoContainer}>
        <TouchableOpacity style={Styles.botoesSuperiores} onPress={()=>setModalVisible(true)}>
          <Text style={Styles.textoBotoesSuperiores}>Ver minhas disciplinas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.botoesSuperiores} onPress={()=>navigation.navigate('TelaLocalizarSala')}>
          <Text style={Styles.textoBotoesSuperiores}>Localizar sala</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.botoesSuperiores} onPress={()=>null}>
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
  containerModal: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '95%',
    height: '95%',
    backgroundColor: '#8CC8E8',
    borderRadius: 15,
  },
  imagemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  containerTitulo: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoContainer: {
    margin: 15,
    maxHeight: '35%',
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

