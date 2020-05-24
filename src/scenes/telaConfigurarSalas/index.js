import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator, Alert, TextInput } from 'react-native';
import Constants from 'expo-constants';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase'


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
          <TouchableOpacity style={Styles.botoesSuperiores} onPress={()=>null}>
              <Image
                style={Styles.imagens}
                source={{
                uri: 'https://images.vexels.com/media/users/3/128198/isolated/preview/f7d19e11011fb8ddfe0d533909dc8ace---cone-de-acampamento-de-lupa-by-vexels.png'
                }}
              />
          </TouchableOpacity>
          <TouchableOpacity style={Styles.botoesSuperiores} onPress={()=>Actions.push('telaCadastrarSalas')}>
            <Text style={Styles.textoBotoesSuperiores}>Adicionar</Text>
            <Text style={Styles.textoBotoesSuperiores}>salas</Text>
          </TouchableOpacity>
        </View>
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        <FlatList
          data={dados}
          renderItem={({ item }) => (
            <View style={Styles.containerSalas}>
              <Text style={{fontSize: 20, alignSelf:'center', fontWeight: 'bold'}}>
                Sala: {item.bloco} - {item.numSala}
              </Text>
              <Text style={{fontSize: 15, marginLeft: 10}}>
                Bloco {item.bloco}
              </Text>
              <Text style={{fontSize: 15, marginLeft: 10}}>
                Andar: {item.numAndar}º andar
              </Text>
              <Text style={{fontSize: 15, marginLeft: 10}}>
                Sala: {item.numSala}
              </Text>
              <Text style={{fontSize: 15, marginLeft: 10}}>
                Orientação: {item.orientacao}
              </Text>
              <Text style={{fontSize: 15, marginLeft: 10}}>
                Disciplina atual: {item.disciplinaAtual || 'Sala livre'}
              </Text>
              <Text style={{fontSize: 15, marginLeft: 10}}>
                Período: {item.periodo}.
              </Text>
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
    const datalist = Object.entries(res.val()).map((e) => {
      return { ...e[1], id: e[0] }
    })
    setDados(datalist)
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
    margin: 5,
    backgroundColor: '#f5f5f5',
    width: 300,
    height: 200,
    justifyContent: 'center',
    borderRadius: 15,
    borderColor: 'black',
    borderWidth: 3,
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
  botoesSuperiores: {
    width: 80,
    height: 50,
    backgroundColor: '#dae6c2',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderColor: '#284474',
    borderWidth: 1,
    margin: 5,
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

