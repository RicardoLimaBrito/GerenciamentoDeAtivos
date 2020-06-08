import React, {useState, useEffect} from 'react';
import { Text, View, ScrollView, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps'
import Constants from 'expo-constants';

export default function TelaLocalizarSala({ navigation }) {

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
            coordinate={e.coordenada}
            title={e.titulo}
            description={e.descricao}
            pinColor={e.pinColor || '#ed242a'}
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
      <TouchableOpacity style={Styles.botaoDeSair} onPress={()=>navigation.goBack()}>
        <Text style={Styles.textoBotaoSair}>Voltar</Text>
      </TouchableOpacity>
    </View>
  )

  function getMarkeres() {
    let res = [
      //Entradas
      { latitude: -3.742580, longitude: -38.501530, titulo: 'Entrada A', descricao: 'Entrada pela Av. Visconde de Mauá', pinColor: '#bce5f5'},
      { latitude: -3.742089, longitude: -38.502362, titulo: 'Entrada B', descricao: 'Entrada pela R. Osvaldo Cruz', pinColor: '#bce5f5'},
      
      //Bloco G
      { latitude: -3.742310, longitude: -38.501990, titulo: 'Sala: G301', descricao: 'Bloco: G, 3º andar, número 301', pinColor: '#4ed4ae'},
      { latitude: -3.742480, longitude: -38.502060, titulo: 'Sala: G302', descricao: 'Bloco: G, 3º andar, número 302', pinColor: '#4ed4ae'},
      { latitude: -3.742280, longitude: -38.502090, titulo: 'Sala: G303', descricao: 'Bloco: G, 3º andar, número 303', pinColor: '#4ed4ae'},
      { latitude: -3.742440, longitude: -38.502160, titulo: 'Sala: G304', descricao: 'Bloco: G, 3º andar, número 304', pinColor: '#4ed4ae'},
      { latitude: -3.742250, longitude: -38.502190, titulo: 'Sala: G305', descricao: 'Bloco: G, 3º andar, número 305', pinColor: '#4ed4ae'},
      { latitude: -3.742410, longitude: -38.502260, titulo: 'Sala: G306', descricao: 'Bloco: G, 3º andar, número 306', pinColor: '#4ed4ae'},
      

      //Bloco F
      { latitude: -3.742350, longitude: -38.501830, titulo: 'Sala: F301', descricao: 'Bloco: F, 3º andar, número 301', pinColor: '#4ed4ae'},
      { latitude: -3.742520, longitude: -38.501920, titulo: 'Sala: F302', descricao: 'Bloco: F, 3º andar, número 302', pinColor: '#4ed4ae'},
      { latitude: -3.742380, longitude: -38.501730, titulo: 'Sala: F303', descricao: 'Bloco: F, 3º andar, número 303', pinColor: '#4ed4ae'},
      { latitude: -3.742550, longitude: -38.501820, titulo: 'Sala: F304', descricao: 'Bloco: F, 3º andar, número 304', pinColor: '#4ed4ae'},
      { latitude: -3.742420, longitude: -38.501630, titulo: 'Sala: F305', descricao: 'Bloco: F, 3º andar, número 305', pinColor: '#4ed4ae'},
      { latitude: -3.742580, longitude: -38.501720, titulo: 'Sala: F306', descricao: 'Bloco: F, 3º andar, número 306', pinColor: '#4ed4ae'},
    ]
    const result = res.map((e, i) => ({
      coordenada: {
        latitude: e.latitude,
        longitude: e.longitude,
        latitudeDelta: 0.002,
        longitudeDelta: 0.001
      },
      titulo: `${e.titulo}`,
      descricao: `${e.descricao}`,
      pinColor: `${e.pinColor}`
    }))
    setMarcadores(result)
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

