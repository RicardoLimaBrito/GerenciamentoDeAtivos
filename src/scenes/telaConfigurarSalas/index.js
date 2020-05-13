import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator, Alert, TextInput } from 'react-native';
import Constants from 'expo-constants';
import { Actions } from 'react-native-router-flux';
import axios from 'axios'


export default function TelaConfigurarSalas() {
  const [buscarSala, setBuscarSala] = useState('')
  const [dados, setDados] = useState([])
  const [loading, setLoading] = useState(false)

  function getSalas() {
    setLoading(true)
    axios
      .get(`https://gerenciamentodeativosestacio.firebaseio.com/salas.json`)
      .then((res) => {
        if (res.data) {
          const datalist = Object.entries(res.data).map((e) => {
            return { ...e[1], id: e[0] }
          })
          setDados(datalist)
        } else{
          setDados([])
          Alert.alert('Falha ao carregar', 'Nenhuma sala foi inserida.')
        }
      })
      .catch((err) => {
        console.log(err)
        Alert.alert('Falha no sistema', 'Erro ao carregar as informações.')
      })
      .finally(() => setLoading(false))
  }
  
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
          <TouchableOpacity style={Styles.botoesSuperiores} onPress={()=>Actions.push('telaCadastrarSalas')}>
            <Text style={Styles.textoBotoesSuperiores}>Pesquisar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.botoesSuperiores} onPress={()=>Actions.push('telaCadastrarSalas')}>
            <Text style={Styles.textoBotoesSuperiores}>Adicionar</Text>
          </TouchableOpacity>
          {loading && <ActivityIndicator size="large" color="#0000ff" />}
        </View>
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
                Orientação: {item.orientacao?'esquerda':'direita'}
              </Text>
              <Text style={{fontSize: 15, marginLeft: 10}}>
                Disciplina atual: {item.disciplinaAtual || 'Sala livre'}
              </Text>
              <Text style={{fontSize: 15, marginLeft: 10}}>
                Período: {item.periodo}.
              </Text>
            </View>
          )}
        />
      </View>
      <View>
        <TouchableOpacity style={Styles.botaoDeSair} onPress={()=>Actions.push('telaSGP')}>
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

