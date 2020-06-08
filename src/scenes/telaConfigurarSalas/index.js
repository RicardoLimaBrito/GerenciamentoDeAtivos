import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator, Alert, TextInput } from 'react-native';
import Constants from 'expo-constants';
import MapView, { Marker, Polyline } from 'react-native-maps'
import firebase from 'firebase'
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'; 


export default function TelaConfigurarSalas({ navigation }) {
  const db = firebase.database()
  const ref = db.ref(`locais_salas`)

  const [buscarSala, setBuscarSala] = useState(null)
  const [dados, setDados] = useState([])
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    getSalasMultiuso()
  }, [])

  
  return (
    <View style={Styles.containerPrincipal}>
      <Text style={Styles.titulo}>Salas multiuso</Text>
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
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity style={Styles.containerBotoesLocais} onPress={()=>null}>
            <FontAwesome5 name="parking" size={35} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity style={Styles.containerBotoesLocais} onPress={()=>null}>
            <FontAwesome name="bullhorn" size={35} color="#919492" />
          </TouchableOpacity>
          <TouchableOpacity style={Styles.containerBotoesLocais} onPress={()=>null}>
            <FontAwesome name="arrow-circle-up" size={35} color="#6cb7f5" />
          </TouchableOpacity>
          <TouchableOpacity style={Styles.containerBotaoRefresh} onPress={()=>getSalasMultiuso()}>
            <FontAwesome name="refresh" size={35} color="#edc453" />
          </TouchableOpacity>
          <TouchableOpacity style={Styles.containerBotaoAdicionar} onPress={()=>navigation.navigate('TelaCadastrarLocal')}>
            <FontAwesome name="plus" size={35} color="#edc453" />
          </TouchableOpacity>
        </View>
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        <FlatList
          data={dados}
          renderItem={({ item }) => (
            <View style={Styles.containerSalas}>
              <View style={{flex: 3}}>
                <Text style={{fontSize: 20, fontWeight: 'bold', margin: 10}}>
                  Sala: {item.bloco} - {item.sala}
                </Text>
                <Text style={{fontSize: 15, marginLeft: 10}}>
                  Capacidade: {item.capacidade}
                </Text>
                <Text style={{fontSize: 15, marginLeft: 10}}>
                  Disciplina atual: {item.disciplinaAtual || 'Sala livre'}
                </Text>
                <MapView style={{ margin: 10, width: 200, height: 100 }}
                  initialRegion={{latitude: parseFloat(item.latitude), longitude: parseFloat(item.longitude), latitudeDelta: 0.001,longitudeDelta: 0.001}}
                  liteMode={true}
                >
                  <Marker
                    key={item.key}
                    coordinate={{latitude: parseFloat(item.latitude), longitude: parseFloat(item.longitude)}}
                    pinColor={item.corDoMarkador}
                  />
                </MapView>
              </View>
              <View>
                <TouchableOpacity style={{margin: 10}} onPress={()=>delSala(item.key)}>
                  <FontAwesome name="trash" size={25} color="#FF0000" />
                </TouchableOpacity>
                <TouchableOpacity style={{margin: 10}} onPress={()=>navigation.navigate('TelaEditarLocal', {tipoLocal: 'Sala multiuso', key: item.key})}>
                  <FontAwesome name="pencil" size={25} color="#39D716" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => `${index}`}
        />
      </View>
      <View>
        <TouchableOpacity style={Styles.botaoDeSair} onPress={()=>navigation.navigate('TelaSGP')}>
          <Text style={Styles.textoBotaoSair}>Retornar</Text>
        </TouchableOpacity>
      </View>

    </View>
  );

  async function getSalasMultiuso() {
    setLoading(true)
      try {
        let res = await ref.orderByChild('bloco').once('value')
          if(res.val()){
            let datalist= []
            res.forEach((e) => {
              datalist.push({key: e.key, ...e.val()})
            })
            setDados([])
            setDados(datalist)
          }else{
            setDados([])
            Alert.alert('Atenção', 'Não existem salas cadastradas.')
          }
      } catch (error) {
        Alert.alert('Atenção', error)
      }
    setLoading(false)
  }

  async function delSala(id){
    setLoading(true)
      try {
        Alert.alert('Atenção','Deseja realmente excluir esta sala?',
          [
            { text: 'Cancelar' },
            {
              text: 'Sim',
              onPress: () => {
                ref.child(`${id}`).remove()
                getSalasMultiuso()
              },
            },
          ],
          { cancelable: true }
        )
      } catch (error) {
        Alert.alert('Atenção', error)
      }
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
  containerBotaoPesquisar: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  containerBotaoRefresh: {
    width: 50,
    height: 50,
    backgroundColor: '#dae6c2',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderColor: '#284474',
    borderWidth: 1,
    margin: 5,
    marginLeft: 20,
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
  containerBotoesLocais: {
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
    marginTop: 15,
    marginBottom: 10,
    borderColor: 'black',
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    maxHeight: '70%'
  },
  containerSalas:{
    flexDirection: 'row',
    margin: 5,
    backgroundColor: '#ffffff',
    width: 300,
    height: 280,
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
  titulo: {
    marginTop: 30,
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
    margin: 5,
  },
});

