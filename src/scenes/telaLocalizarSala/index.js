import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Modal, ActivityIndicator, FlatList } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps'
import Constants from 'expo-constants';
import firebase from 'firebase'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

export default function TelaLocalizarSala({ navigation }) {
  const db = firebase.database()

  const [currentlyLocation, setCurrentlyLocation] = useState({
    latitude: -3.742175,
    longitude: -38.501920,
  })
  const initial = {
    latitude: -3.742147,
    longitude: -38.501906,
    latitudeDelta: 0.002,
    longitudeDelta: 0.001
  }
  const [marcadorPesquisado, setMarcadorPesquisado] = useState({
    key: '',
    nomeLocal: '',
    descricao: '',
    latitude: '',
    longitude: '',
    corDoMarkador: '',
  })
  const [dados, setDados] = useState([])
  const [loading, setLoading] = useState(false)
  const [procurando, setProcurando] = useState(false)
  const [referencia, setReferencia] = useState('')
  const [modalPrincipalVisible, setModalPrincipalVisible] = useState(false)
  const [modalDeLocalVisible, setModalDeLocalVisible] = useState(false)

  return (
    <View style={Styles.containerPrincipal}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalPrincipalVisible}>
        <View style={Styles.containerModal}>
          <TouchableOpacity onPress={()=>setModalPrincipalVisible(false)} style={Styles.containerBotaoFecharModal}>
            <MaterialCommunityIcons name="close-circle" size={50} color="#3498DB" />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>getLocal('locais_entradas')} style={Styles.containerBotoesInternosModal}>
            <Text style={Styles.textoBotoesInternos}>Entradas</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>getLocal('locais_salas')} style={Styles.containerBotoesInternosModal}>
            <Text style={Styles.textoBotoesInternos}>Salas</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>getLocal('locais_servicos')} style={Styles.containerBotoesInternosModal}>
            <Text style={Styles.textoBotoesInternos}>Serviços</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>getLocal('locais_estacionamentos')} style={Styles.containerBotoesInternosModal}>
            <Text style={Styles.textoBotoesInternos}>Estacionamentos</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalDeLocalVisible}>
        <View style={Styles.containerModal}>
          <TouchableOpacity onPress={()=>voltarModal()} style={Styles.containerBotaoVoltarModal}>
            <MaterialCommunityIcons name="backspace" size={50} color="#3498DB" />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>setModalDeLocalVisible(false)} style={Styles.containerBotaoFecharModal}>
            <MaterialCommunityIcons name="close-circle" size={50} color="#3498DB" />
          </TouchableOpacity>
          <View style={Styles.containerFlatList}>
            <FlatList
              data={dados}
              renderItem={({ item }) => (
                <View>
                  <TouchableOpacity onPress={()=>marcarNoMapa(item.key)} style={Styles.containerBotaoFlatList}>
                    <Text style={Styles.textoDadosFlatList}>Local: {item.nomeLocal}</Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item, index) => `${index}`}
            />
          </View>
        </View>
      </Modal>

      <MapView style={{ width: '95%', height: '75%' }}
        initialRegion={initial}
        showsUserLocation={true}
        followUserLocation={true}
      >
        <Marker
          key={0}
          coordinate={{latitude: parseFloat(currentlyLocation.latitude), longitude: parseFloat(currentlyLocation.longitude)}}
          title={'Eu'}
          description={'Estou aqui nesse momento'}
          pinColor={'turquoise'}
        />
        {procurando && 
          <Marker
            key={marcadorPesquisado.key}
            coordinate={{latitude: parseFloat(marcadorPesquisado.latitude), longitude: parseFloat(marcadorPesquisado.longitude)}}
            title={marcadorPesquisado.nomeLocal}
            description={marcadorPesquisado.descricao}
            pinColor={marcadorPesquisado.corDoMarkador || '#ed242a'}
          />
        }
        {procurando &&
          <Polyline
            coordinates={[
              {latitude: parseFloat(currentlyLocation.latitude), longitude: parseFloat(currentlyLocation.longitude)},
              {latitude: parseFloat(marcadorPesquisado.latitude), longitude: parseFloat(marcadorPesquisado.longitude)}
            ]}
            strokeColor='#000'
            strokeWidth={3}
          />
        }
      </MapView>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      <TouchableOpacity onPress={()=>setModalPrincipalVisible(true)} style={Styles.containerBotaoProcurarSalas}>
        <MaterialCommunityIcons name="map-search" size={50} color="#3498DB" />
      </TouchableOpacity>
      {procurando && <TouchableOpacity onPress={()=>setProcurando(false)} style={Styles.containerBotaoPararProcura}>
        <MaterialCommunityIcons name="map-minus" size={50} color="#f01818" />
      </TouchableOpacity>}
      <TouchableOpacity style={Styles.botaoDeSair} onPress={()=>navigation.goBack()}>
        <Text style={Styles.textoBotaoSair}>Voltar</Text>
      </TouchableOpacity>
    </View>
  )

  function voltarModal(){
    setModalPrincipalVisible(true)
    setModalDeLocalVisible(false)
  }

  async function marcarNoMapa(key){
    setLoading(true)
    setModalDeLocalVisible(false)
    const ref = db.ref(`${referencia}`)
      try {
        let res = await ref.child(`${key}`).once('value')
        let keyInput = `${key}`
        let nomeLocal = res.val().nomeLocal 
        let descricao = res.val().descricao
        let latitude = parseFloat(res.val().latitude)
        let longitude = parseFloat(res.val().longitude)
        let corDoMarkador = res.val().corDoMarkador
        setMarcadorPesquisado({
          key: keyInput,
          nomeLocal: nomeLocal,
          descricao: descricao,
          latitude: latitude,
          longitude: longitude,
          corDoMarkador: corDoMarkador,
        })
      } catch (error) {
        Alert.alert('Atenção', `${error}`)
      }
    setProcurando(true)
    setLoading(false)
  }

  async function getLocal(refer) {
    setLoading(true)
    setModalPrincipalVisible(false)
    setModalDeLocalVisible(true)
    setReferencia(refer)
    const ref = db.ref(`${refer}`)
      try {
        let res = await ref.orderByChild('nomeLocal').once('value')
          if(res.val()){
            let datalist= []
            res.forEach((e) => {
              datalist.push({key: e.key, ...e.val()})
            })
            setDados([])
            setDados(datalist)
          }else{
            Alert.alert('Atenção', 'Não existem locais cadastrados.')
          }
      } catch (error) {
        console.log(error)
        Alert.alert('Atenção', 'Erro a carregar o local')
      }
    setLoading(false)
  }

  // async function getCurrentLocation() {
  //   navigator.geolocation.getCurrentPosition(
  //       position => {
  //         let region = {
  //           latitude: parseFloat(position.coords.latitude),
  //           longitude: parseFloat(position.coords.longitude),
  //         };
  //         setCurrentlyLocation(region)
  //         console.log(currentlyLocation)
  //       },
  //       error => console.log(error),
  //       {
  //           enableHighAccuracy: true,
  //           timeout: 20000,
  //           maximumAge: 1000
  //       }
  //   );
  // }

}

const Styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
  },
  containerBotaoProcurarSalas: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    bottom: 180,
  },
  containerBotaoPararProcura: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    bottom: 230,
  },
  containerModal: {
    flex:1,
    width:'80%',
    height:'50%',
    backgroundColor: '#f2cecb',
    justifyContent:'center',
    alignItems: 'center',
    alignSelf: 'center',
    margin: 50,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  containerFlatList: {
    width:'80%',
    height:'70%',
    backgroundColor: '#fff',
    justifyContent:'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  containerBotaoFlatList: {
    width: 200,
    height: 80,
    borderRadius: 15,
    backgroundColor: '#f6f6f6',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  containerBotaoFecharModal: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    right: '-35%',
    top: '-8%',
  },
  containerBotaoVoltarModal: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    left: '-35%',
  },
  containerBotoesInternosModal: {
    width: '70%',
    height: 70,
    backgroundColor: '#002566',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    margin: 10,
  },
  textoBotoesInternos: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  textoBotaoSair: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  textoDadosFlatList: {
    fontSize: 15,
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


