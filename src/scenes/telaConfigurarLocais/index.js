import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Alert, TextInput } from 'react-native';
import Constants from 'expo-constants';
import MapView, { Marker, Polyline } from 'react-native-maps'
import { Dropdown } from 'react-native-material-dropdown';
import firebase from 'firebase'
import { FontAwesome, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'; 


export default function TelaConfigurarLocais({ navigation }) {
  const db = firebase.database()

  const [local, setLocal] = useState({titulo: 'Salas multiuso', tipoLocal: 'Sala multiuso', referencia: 'locais_salas'})
  const [bloco, setBloco] = useState('')
  const [dados, setDados] = useState([])
  const [dadosDropDownBlocos, setDadosDropDownBlocos] = useState([
    {value: 'A'},
    {value: 'B'},
    {value: 'C'},
    {value: 'D'},
    {value: 'E'},
    {value: 'F'},
    {value: 'G'},
  ])
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    getLocalInitial()
  }, [])

  
  return (
    <View style={Styles.containerPrincipal}>
      <Text style={Styles.titulo}>{local.titulo}</Text>
      <View style={Styles.containerDeDados}>
        <View style={{flexDirection: 'row'}}>
          <View style={Styles.containerDosDados}>
            <View style={Styles.containerDropDown}>
              <Dropdown
                label='Bloco *'
                value={bloco}
                data={dadosDropDownBlocos}
                onChangeText={texto => setBloco(texto)}
              />
            </View>
          </View>
          <TouchableOpacity style={Styles.containerBotaoPesquisar} onPress={()=>pesquisarPorBloco(`${bloco}`)}>
            <FontAwesome name="search" size={35} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity style={Styles.containerBotaoRefresh} onPress={()=>refresh()}>
            <FontAwesome name="refresh" size={35} color="#0d0da3" />
          </TouchableOpacity>
          <TouchableOpacity style={Styles.containerBotaoAdicionar} onPress={()=>navigation.navigate('TelaCadastrarLocal')}>
            <FontAwesome name="plus" size={35} color="#1d8238" />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={()=>mudarReferencia('Estacionamentos', 'Estacionamento', 'locais_estacionamentos')} style={Styles.containerBotoesLocais}>
            <FontAwesome5 name="parking" size={35} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>mudarReferencia('Serviços', 'Serviços', 'locais_servicos')} style={Styles.containerBotoesLocais}>
            <FontAwesome name="bullhorn" size={35} color="#919492" />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>mudarReferencia('Entradas', 'Entradas', 'locais_entradas')} style={Styles.containerBotoesLocais}>
            <FontAwesome name="arrow-circle-up" size={35} color="#6cb7f5" />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>mudarReferencia('Salas multiuso', 'Sala multiuso', 'locais_salas')} style={Styles.containerBotoesLocais}>
            <MaterialCommunityIcons name="google-classroom" size={35} color="#edc453" />
          </TouchableOpacity>
        </View>
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        <FlatList
          data={dados}
          renderItem={({ item }) => (
            <View style={Styles.containerSalas}>
              <View style={{flex: 3}}>
                <Text style={{fontSize: 20, fontWeight: 'bold', margin: 10}}>
                  Nome: {item.nomeLocal}
                </Text>
                <Text style={{fontSize: 15, marginLeft: 10}}>
                  Local: bloco {item.bloco} - {item.andar}
                </Text>
                <Text style={{fontSize: 15, marginLeft: 10}}>
                  Capacidade: {item.capacidade}
                </Text>
                <Text style={{fontSize: 15, marginLeft: 10}}>
                  Descrição: {item.descricao || 'Sem descrição'}
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
                <TouchableOpacity style={{margin: 10}} onPress={()=>delLocal(item.key)}>
                  <FontAwesome name="trash" size={25} color="#FF0000" />
                </TouchableOpacity>
                <TouchableOpacity style={{margin: 10}} onPress={()=>navigation.navigate('TelaEditarLocal', {tipoLocal: `${local.tipoLocal}`, key: item.key})}>
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

  function refresh(){
    getLocalInitial()
    setBloco('')
  }

  function pesquisarPorBloco(blocoParaPesquisa){
    setLoading(true)
      if(blocoParaPesquisa==''){
        Alert.alert('Atenção', 'Selecione algum bloco.')
      }else{
        setDados([])
        const ref = db.ref(`${local.referencia}`)
          try {
            ref.orderByChild('bloco').equalTo(`${blocoParaPesquisa}`).once("value", function(snapshot) {
              if(snapshot.val()){
                let datalist= []
                snapshot.forEach((e) => {
                  datalist.push({key: e.key, ...e.val()})
                })
                setDados(datalist)
              }else{
                Alert.alert('Atenção', 'Não existem locais cadastrados nesse bloco.')
              }
            })
          } catch (error) {
            console.log(error)
            Alert.alert('Atenção', 'Erro a carregar o local')
          }
      }
    setBloco('')
    setLoading(false)
  }

  function mudarReferencia(titulo, tipo, refer){
    setLocal({})  
      try {
        setLocal({titulo: titulo, tipoLocal: tipo, referencia: refer})
      } catch (error) {
        console.log(error)
        Alert.alert('Atenção', 'Erro a carregar o local')
      }
    getLocalAfter(refer)
  }

  async function getLocalAfter(refer) {
    setLoading(true)
    setDados([])
    const ref = db.ref(`${refer}`)
      try {
        let res = await ref.orderByChild('bloco').once('value')
          if(res.val()){
            let datalist= []
            res.forEach((e) => {
              datalist.push({key: e.key, ...e.val()})
            })
            setDados(datalist)
          }else{
            Alert.alert('Atenção', 'Não existem locais cadastrados.')
          }
      } catch (error) {
        Alert.alert('Atenção', `${error}`)
      }
    setLoading(false)
  }

  async function getLocalInitial() {
    setLoading(true)
    setDados([])
    const ref = db.ref(`${local.referencia}`)
      try {
        let res = await ref.orderByChild('bloco').once('value')
          if(res.val()){
            let datalist= []
            res.forEach((e) => {
              datalist.push({key: e.key, ...e.val()})
            })
            setDados(datalist)
          }else{
            Alert.alert('Atenção', 'Não existem locais cadastrados.')
          }
      } catch (error) {
        Alert.alert('Atenção', `${error}`)
      }
    setLoading(false)
  }

  async function delLocal(id){
    setLoading(true)
    let referencia = 'locais_salas'
      if(local.tipoLocal=='Sala multiuso'){
        referencia = 'locais_salas'
      }else if(local.tipoLocal=='Serviços'){
        referencia = 'locais_servicos'
      }else if(local.tipoLocal=='Estacionamento'){
        referencia = 'locais_estacionamentos'
      }else if(local.tipoLocal=='Entradas'){
        referencia = 'locais_entradas'
      }else{
        Alert.alert('Atenção', 'Tipo não reconhecido.')
      }
    let ref = db.ref(`${referencia}`)
      try {
        Alert.alert('Atenção','Deseja realmente excluir este local?',
          [
            { text: 'Cancelar' },
            {
              text: 'Sim',
              onPress: () => {
                ref.child(`${id}`).remove()
                getLocalInitial()
              },
            },
          ],
          { cancelable: true }
        )
      } catch (error) {
        Alert.alert('Atenção', `${error}`)
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
    marginTop: 15,
  },
  containerDropDown: {
    width: 70,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  containerDosDados:{
    borderBottomWidth: 2,
    width: 70,
    borderColor: '#e0ebeb',
    borderRadius: 10,
    alignSelf: 'center',
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
    marginLeft: 8,
    marginTop: 15,
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
    marginTop: 15,
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

