import React, {useState, useEffect} from 'react';
import { Text, View, ScrollView, StyleSheet, Geolocation, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import { Dropdown } from 'react-native-material-dropdown';
import firebase from 'firebase'
import { FontAwesome } from '@expo/vector-icons'; 


export default function TelaEditarLocal({ navigation, route }) {
  const db = firebase.database()
  const { tipoLocal, key } = route.params;

  const [local, setLocal] = useState({
    capacidade: '',
    bloco: '',
    andar: '',
    nomeLocal: '',
    descricao: '',
    latitude: '',
    longitude: '',
    corDoMarkador: '',
  })
  const [loading, setLoading] = useState(false)
  const [dadosDropDownBlocos, setDadosDropDownBlocos] = useState([
    {value: 'A'},
    {value: 'B'},
    {value: 'C'},
    {value: 'D'},
    {value: 'E'},
    {value: 'F'},
    {value: 'G'},
  ])
  const [dadosDropDownAndares, setDadosDropDownAndares] = useState([
    {value: 'Súbsolo'},
    {value: 'Térreo'},
    {value: '1º andar'},
    {value: '2º andar'},
    {value: '3º andar'},
    {value: '4º andar'},
  ])

  useEffect(() => {
    getLocal()
  }, [])

  return (
    <View style={Styles.containerPrincipal}>
      <Text style={Styles.titulo}>Editar local</Text>
      <ScrollView style={{maxHeight: '60%',  marginTop: 20, marginBottom: 15}}>
      <View style={Styles.containerDosDados}>
          <TextInput
            style={{height: 40}}
            value={local.capacidade}
            placeholder="Capacidade"
            onChangeText={texto => setLocal({...local, capacidade: texto})}
            maxLength={4}
            keyboardType={'number-pad'}
          />
        </View>
        <View style={Styles.containerDropDown}>
          <Dropdown
            label='Letra do bloco *'
            value={local.bloco}
            data={dadosDropDownBlocos}
            onChangeText={texto => setLocal({...local, bloco: texto})}
          />
        </View>
        <View style={Styles.containerDropDown}>
          <Dropdown
            label='Andar da local *'
            value={local.andar}
            data={dadosDropDownAndares}
            onChangeText={texto => setLocal({...local, andar: texto})}
          />
        </View>
        <View style={Styles.containerDosDados}>
          <TextInput
            style={{height: 40}}
            value={local.nomeLocal}
            placeholder="Nome do local *"
            onChangeText={texto => setLocal({...local, nomeLocal: texto})}
            maxLength={50}
          />
        </View>
        <View style={Styles.containerDosDados}>
          <TextInput
            value={local.descricao}
            placeholder="Descrição"
            onChangeText={texto => setLocal({...local, descricao: texto})}
            maxLength={115}
            multiline={true}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity style={Styles.containerBotaoLocalizacao} onPress={()=>getLatitude()}>
            <FontAwesome name="map-marker" size={25} color="#f21111" />
          </TouchableOpacity>
          <View style={Styles.containerDosDadosMetade}>
            <TextInput
              style={{height: 40, textAlign: 'center'}}
              value={local.latitude}
              placeholder="Latitude *"
              keyboardType={'number-pad'}
              maxLength={15}
              onChangeText={texto => setLocal({...local, latitude: texto})}
            />
          </View>
          <View style={Styles.containerDosDadosMetade}>
            <TextInput
              style={{height: 40, textAlign: 'center'}}
              value={local.longitude}
              placeholder="Longitude *"
              maxLength={15}
              onChangeText={texto => setLocal({...local, longitude: texto})}
              keyboardType={'number-pad'}
            />
          </View>
          <TouchableOpacity style={Styles.containerBotaoLocalizacao} onPress={()=>getLongitude()}>
            <FontAwesome name="map-marker" size={25} color="#f21111" />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={Styles.botaoContainer}>
        <TouchableOpacity style={Styles.botaoAcessar} onPress={()=>navigation.goBack()}>
          <Text style={Styles.textoBotaoAcessar}>Retornar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.botaoCadastrar} onPress={()=>atualizarLocal()}>
          <Text style={Styles.textoBotaoCadastrar}>Editar</Text>
        </TouchableOpacity>
      </View>
      {loading && <ActivityIndicator animating={loading} size="large" color="#0000ff" />}
    </View>
  );

  async function getLocal() {
    let ref
      if(tipoLocal=='Sala multiuso'){
        ref = db.ref(`locais_salas/`)
      }else if(tipoLocal=='Serviços'){
        ref = db.ref(`locais_servicos/`)
      }else if(tipoLocal=='Entradas'){
        ref = db.ref(`locais_entradas/`)
      }else if(tipoLocal=='Estacionamento'){
        ref = db.ref(`locais_estacionamentos/`)
      }else{
        ref = db.ref(`locais_salas/`)
      }
    try {
      let res = await ref.child(`${key}`).once('value')
      setLocal({
        capacidade: `${res.val().capacidade || ''}`,
        bloco: `${res.val().bloco}`,
        andar: `${res.val().andar}`,
        nomeLocal: `${res.val().nomeLocal}`,
        descricao: `${res.val().descricao || ''}`,
        latitude: `${res.val().latitude}`,
        longitude: `${res.val().longitude}`,
        corDoMarkador: `${res.val().corDoMarkador}`,
      })
    } catch (error) {
      Alert.alert('Atenção', `${error}`)
    }
  }


  async function getLatitude() {
    navigator.geolocation.getCurrentPosition(
        position => {
          let region = {
            latitude: parseFloat(position.coords.latitude),
          };
          setLocal({...local, latitude: JSON.stringify(region.latitude)})
        },
        error => console.log(error),
        {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000
        }
    );
  }

  async function getLongitude() {
    navigator.geolocation.getCurrentPosition(
        position => {
          let region = {
            longitude: parseFloat(position.coords.longitude),
          };
          setLocal({...local, longitude: JSON.stringify(region.longitude)})
        },
        error => console.log(error),
        {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000
        }
    );
  }

  function atualizarLocal() {
    if(local.bloco=='' || local.andar=='' || local.nomeLocal=='' || local.latitude=='' || local.longitude==''){
      Alert.alert('Atenção', 'Você precisa preencher todos os campos.')
    }else{
      if(local.capacidade==''){
        if(tipoLocal=='Sala multiuso'){
          metodoEditarLocal('locais_salas')
        }else if(tipoLocal=='Serviços'){
          metodoEditarLocal('locais_servicos')
        }else if(tipoLocal=='Estacionamento'){
          metodoEditarLocal('locais_estacionamentos')
        }else if(tipoLocal=='Entradas'){
          metodoEditarLocal('locais_entradas')
        }else{
          Alert.alert('Atenção', 'Tipo não reconhecido.')
        }
      }else{
        if(local.capacidade<=0){
          Alert.alert('Atenção', 'A capacidade tem que ser maior de 1.')
        }else{
          if(tipoLocal=='Sala multiuso'){
            metodoEditarLocal('locais_salas')
          }else if(tipoLocal=='Serviços'){
            metodoEditarLocal('locais_servicos')
          }else if(tipoLocal=='Estacionamento'){
            metodoEditarLocal('locais_estacionamentos')
          }else if(tipoLocal=='Entradas'){
            metodoEditarLocal('locais_entradas')
          }else{
            Alert.alert('Atenção', 'Tipo não reconhecido.')
          }
        }
      }
    }
  }

  async function metodoEditarLocal(referencia){
    setLoading(true)
    let ref = db.ref(`${referencia}`)
    const res = await ref.child(key).update({
          capacidade: local.capacidade,
          bloco: local.bloco,
          andar: local.andar,
          nomeLocal: local.nomeLocal,
          descricao: local.descricao,
          longitude: local.longitude,
          latitude: local.latitude,
        })
        .then((res) => {
          Alert.alert('Sucesso', `Editado com sucesso`)
          navigation.goBack()
        })
        .catch((err) => {
          console.log(err)
          Alert.alert('Falha no sistema', 'Erro ao editar local.')
        })
        .finally(() => setLoading(false))
  }

}

const Styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerBotaoLocalizacao: {
    width: 40,
    height: 40,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerDropDown: {
    width: 300,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  botaoContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    margin: 8,
  },
  redimensionarLogo: {
      width: 120,
      height: 120,
      resizeMode: 'contain',
      alignSelf: 'center',
  },
  titulo: {
    fontSize: 30,
    color: '#02246c',
    fontWeight: 'bold',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  containerDosDados: {
    margin: 10,
    borderBottomWidth: 2,
    width: 300,
    borderColor: '#e0ebeb',
    borderRadius: 10,
    alignSelf: 'center',
  },
  containerDosDadosMetade: {
    marginTop: 5,
    borderBottomWidth: 2,
    width: 120,
    borderColor: '#e0ebeb',
    borderRadius: 10,
    alignSelf: 'center',
  },
  containerDoDropDown: {
    margin: 10,
    width: 300,
    alignSelf: 'center',
  },
  textoBotaoAcessar: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  textoBotaoCadastrar: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  botaoCadastrar: {
    width: 160,
    height: 50,
    backgroundColor: '#337861',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    margin: 5,
  },
  botaoAcessar: {
    width: 160,
    height: 50,
    backgroundColor: '#002566',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    margin: 5,
  },
});

