import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator, Alert, TextInput } from 'react-native';
import Constants from 'expo-constants';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase'
import { FontAwesome } from '@expo/vector-icons'; 


export default function TelaConfigurarSalas() {
  const db = firebase.database()
  const ref = db.ref(`/salas/`)

  const [buscarSala, setBuscarSala] = useState(null)
  const [dados, setDados] = useState([])
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    getSalas()
  }, [])

  
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

      <Text style={Styles.titulo}>{"Configurando salas"}</Text>
      <View style={Styles.containerDeDados}>
        <View style={{flexDirection: 'row'}}>
          <View style={Styles.containerDosDados}>
            <TextInput
              style={{height: 40}}
              value={buscarSala}
              placeholder="Digite a letra do bloco"
              onChangeText={texto => setBuscarSala(texto)}
              maxLength={1}
            />
          </View>
          <TouchableOpacity style={Styles.containerBotaoPesquisar} onPress={()=>null}>
            <FontAwesome name="search" size={35} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity style={Styles.containerBotaoAdicionar} onPress={()=>Actions.push('telaCadastrarSalas')}>
            <FontAwesome name="plus" size={35} color="#337861" />
          </TouchableOpacity>
        </View>
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        <FlatList
          data={dados}
          renderItem={({ item }) => (
            <View style={Styles.containerSalas}>
              <View style={{flex: 3}}>
                <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 10}}>
                  Sala: {item.bloco} - {item.sala}
                </Text>
                <Text style={{fontSize: 15, marginLeft: 10}}>
                  Andar: {item.andar}
                </Text>
                <Text style={{fontSize: 15, marginLeft: 10}}>
                  Orientação: {item.orientacao}
                </Text>
                <Text style={{fontSize: 15, marginLeft: 10}}>
                  Capacidade: {item.capacidade}
                </Text>
                <Text style={{fontSize: 15, marginLeft: 10}}>
                  Disciplina atual: {item.disciplinaAtual || 'Sala livre'}
                </Text>
              </View>
              <View>
                <TouchableOpacity style={{margin: 10}} onPress={()=>delSala(item.id)}>
                  <FontAwesome name="trash" size={25} color="#FF0000" />
                </TouchableOpacity>
                <TouchableOpacity style={{margin: 10}} onPress={()=>catchSala(item.id)}>
                  <FontAwesome name="pencil" size={25} color="#39D716" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => `${index}`}
        />
      </View>
      <View>
        <TouchableOpacity style={Styles.botaoDeSair} onPress={()=>Actions.push('telaSGP')}>
          <Text style={Styles.textoBotaoSair}>Retornar</Text>
        </TouchableOpacity>
      </View>

    </View>
  );

  async function getSalas() {
    setLoading(true)
    let res = await ref.once('value')
      if(res.val()){
        const datalist = Object.entries(res.val()).map((e) => {
          return { ...e[1], id: e[0] }
        })
        setDados([])
        setDados(datalist)
      }else{
        setDados([])
        Alert.alert('Atenção', 'Não existem salas cadastradas.')
      }
    setLoading(false)
  }

  async function delSala(id){
    setLoading(true)
    Alert.alert('Atenção','Deseja realmente excluir esta sala?',
      [
        { text: 'Cancelar' },
        {
          text: 'Sim',
          onPress: () => {
            ref.child(`${id}`).remove()
            getSalas()
          },
        },
      ],
      { cancelable: true }
    )
    setLoading(false)
  }

  async function atualizarSala(id, sala){
    setLoading(true)
    Alert.alert('Atenção','Deseja atualizar esta sala?',
      [
        { text: 'Cancelar' },
        {
          text: 'Sim',
          onPress: () => {
            ref.child(`${id}`).update({bloco: 'A', andar: '1º andar', sala: '101'})
            getSalas()
          },
        },
      ],
      { cancelable: true }
    )
    setLoading(false)
  }

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
  containerBotaoPesquisar: {
    width: 50,
    height: 50,
    backgroundColor: '#dae6c2',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderColor: '#284474',
    borderWidth: 1,
    margin: 5,
    marginRight: 20,
  },
  containerBotaoAdicionar: {
    width: 50,
    height: 50,
    backgroundColor: '#dae6c2',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderColor: '#284474',
    borderWidth: 1,
    margin: 5,
  },
  containerDosDados:{
    margin: 10,
    borderBottomWidth: 2,
    width: 140,
    borderColor: '#e0ebeb',
    borderRadius: 10,
    alignSelf: 'center',
  },
  containerDeDados:{
    margin: 15,
    width: '95%',
    height: '55%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',

  },
  containerSalas:{
    flexDirection: 'row',
    margin: 5,
    backgroundColor: '#f5f5f5',
    width: 300,
    height: 200,
    justifyContent: 'center',
    borderRadius: 15,
    borderColor: 'black',
    borderWidth: 3,
    alignItems: 'center',
  },
  botaoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  imagens: {
    width: 70,
    height: 70,
  },
  redimensionarLogo: {
      width: 120,
      height: 120,
      resizeMode: 'contain',
      margin: 5,
  },
  titulo: {
    fontSize: 30,
    color: '#02246c',
    fontWeight: 'bold',
  },
  textoBotoesSuperiores: {
    fontSize: 15,
    color: '#02246c',
    fontWeight: 'bold',
  },
  textoBotaoSair: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
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

