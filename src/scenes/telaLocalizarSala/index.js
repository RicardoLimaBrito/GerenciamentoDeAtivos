import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps'
import Constants from 'expo-constants';
import firebase from 'firebase'

export default function TelaLocalizarSala({ navigation }) {
  const db = firebase.database()

  const [currentlyLocation, setCurrentlyLocation] = useState({
    latitude: -3.817219,
    longitude: -38.6256775,
  })
  const initial = {
    latitude: -3.742147,
    longitude: -38.501906,
    latitudeDelta: 0.002,
    longitudeDelta: 0.001
  }
  const [marcadores, setMarcadores] = useState([])
  const [loading, setLoading] = useState(false)

  async function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
        position => {
          let region = {
            latitude: parseFloat(position.coords.latitude),
            longitude: parseFloat(position.coords.longitude),
          };
          setCurrentlyLocation(region)
          console.log(currentlyLocation)
        },
        error => console.log(error),
        {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000
        }
    );
  }

  useEffect(() => {
    getMarkeres()
  }, []);

  return (
    <View style={Styles.containerPrincipal}>
      <MapView style={{ width: '95%', height: '80%' }}
        initialRegion={initial}
        showsUserLocation={true}
        followUserLocation={true}
      >
        {marcadores.map((e, i) => (
          <Marker
            key={i}
            coordinate={{latitude: parseFloat(e.latitude), longitude: parseFloat(e.longitude)}}
            title={e.nomeLocal}
            description={e.descricao}
            pinColor={e.corDoMarkador || '#ed242a'}
          />
        ))}
        {/* <Polyline
          coordinates={[
            { latitude: -3.742580, longitude: -38.501530 },
            { latitude: -3.742350, longitude: -38.501830 },
          ]}
          strokeColor='#000'
          strokeWidth={3}
        /> */}
      </MapView>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      <TouchableOpacity style={Styles.botaoDeSair} onPress={()=>navigation.goBack()}>
        <Text style={Styles.textoBotaoSair}>Voltar</Text>
      </TouchableOpacity>
    </View>
  )

  function getMarkeres() {
    setMarcadores([])
    getEntradas()
  }

  async function getEntradas(){
    setLoading(true)
    const ref = db.ref('locais_entradas')
      try {
        await ref.orderByChild('bloco').once("value", function(snapshot) {
          if(snapshot.val()){
            let datalist= []
            snapshot.forEach((e) => {
              datalist.push({key: e.key, latitude: parseFloat(e.latitude), longitude: parseFloat(e.longitude), ...e.val()})
            })
            setMarcadores(datalist)
          }
        })
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

