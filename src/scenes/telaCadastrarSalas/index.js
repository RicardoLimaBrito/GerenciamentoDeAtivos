import React, {useState, useEffect} from 'react';
import { Text, View, ScrollView, StyleSheet, Geolocation, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import { Actions } from 'react-native-router-flux';
import { Dropdown } from 'react-native-material-dropdown';
import firebase from 'firebase'
import { FontAwesome } from '@expo/vector-icons'; 


export default function TelaCadastrarSalas() {
  const db = firebase.database()
  const ref = db.ref(`salas/`)

  const [sala, setSala] = useState({
    bloco: '',
    andar: '',
    sala: '',
    latitude: '',
    longitude: '',
    disciplinaAtual: '',
    capacidade: ''})
  const [loading, setLoading] = useState(false)
  const [dadosDropDownBlocos, setDadosDropDownBlocos] = useState([
    {value: 'A'},
    {value: 'B'},
    {value: 'C'},
    {value: 'D'},
    {value: 'E'},
    {value: 'F'},
    {value: 'G'},
    {value: 'H'},
    {value: 'I'},
    {value: 'J'},
    {value: 'K'},
    {value: 'L'},
    {value: 'M'},
    {value: 'N'},
    {value: 'O'},
    {value: 'P'},
    {value: 'Q'},
    {value: 'R'},
    {value: 'S'},
    {value: 'T'},
    {value: 'U'},
    {value: 'V'},
    {value: 'W'},
    {value: 'X'},
    {value: 'Y'},
    {value: 'Z'},
  ])
  const [dadosDropDownAndares, setDadosDropDownAndares] = useState([
    {value: 'Súbsolo'},
    {value: 'Térreo'},
    {value: '1º andar'},
    {value: '2º andar'},
    {value: '3º andar'},
    {value: '4º andar'},
  ])
  const [dadosDropDownOrientacao, setDadosDropDownOrientacao] = useState([
    {value: 'Esquerda'},
    {value: 'Direita'},
  ])

  return (
    <View style={Styles.containerPrincipal}>
      <Text style={Styles.titulo}>Cadastrar sala</Text>
      <ScrollView style={{maxHeight: '60%',  marginTop: 20, marginBottom: 15}}>
        <View style={Styles.containerDropDown}>
          <Dropdown
            label='Letra do bloco *'
            data={dadosDropDownBlocos}
            onChangeText={texto => setSala({...sala, bloco: texto})}
          />
        </View>
        <View style={Styles.containerDropDown}>
          <Dropdown
            label='Andar da sala *'
            data={dadosDropDownAndares}
            onChangeText={texto => setSala({...sala, andar: texto})}
          />
        </View>
        <View style={Styles.containerDosDados}>
          <TextInput
            style={{height: 40}}
            value={sala.sala}
            placeholder="Número da sala *"
            onChangeText={texto => setSala({...sala, sala: texto})}
            maxLength={4}
            keyboardType={'number-pad'}
          />
        </View>
        <View style={Styles.containerDosDados}>
          <TextInput
            style={{height: 40}}
            value={sala.capacidade}
            placeholder="Capacidade de estudantes *"
            onChangeText={texto => setSala({...sala, capacidade: texto})}
            maxLength={4}
            keyboardType={'number-pad'}
          />
        </View>
        <View style={Styles.containerDosDados}>
          <TextInput
            style={{height: 40}}
            value={sala.disciplinaAtual}
            placeholder="Disciplina atual"
            onChangeText={texto => setSala({...sala, disciplinaAtual: texto})}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity style={Styles.containerBotaoLocalizacao} onPress={()=>getLatitude()}>
            <FontAwesome name="map-marker" size={25} color="#f21111" />
          </TouchableOpacity>
          <View style={Styles.containerDosDadosMetade}>
            <TextInput
              style={{height: 40, textAlign: 'center'}}
              value={sala.latitude}
              placeholder="Latitude"
              keyboardType={'number-pad'}
              maxLength={15}
              onChangeText={texto => setSala({...sala, latitude: texto})}
            />
          </View>
          <View style={Styles.containerDosDadosMetade}>
            <TextInput
              style={{height: 40, textAlign: 'center'}}
              value={sala.longitude}
              placeholder="Longitude"
              maxLength={15}
              onChangeText={texto => setSala({...sala, longitude: texto})}
              keyboardType={'number-pad'}
            />
          </View>
          <TouchableOpacity style={Styles.containerBotaoLocalizacao} onPress={()=>getLongitude()}>
            <FontAwesome name="map-marker" size={25} color="#f21111" />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={Styles.botaoContainer}>
        <TouchableOpacity style={Styles.botaoAcessar} onPress={()=>Actions.push('telaConfigurarSalas')}>
          <Text style={Styles.textoBotaoAcessar}>Retornar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.botaoCadastrar} onPress={()=>inserirNovoUsuario()}>
          <Text style={Styles.textoBotaoCadastrar}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
      {loading && <ActivityIndicator animating={loading} size="large" color="#0000ff" />}
    </View>
  );

  async function getLatitude() {
    navigator.geolocation.getCurrentPosition(
        position => {
          let region = {
            latitude: parseFloat(position.coords.latitude),
          };
          setSala({...sala, latitude: JSON.stringify(region.latitude)})
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
          setSala({...sala, longitude: JSON.stringify(region.longitude)})
        },
        error => console.log(error),
        {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000
        }
    );
  }

  function inserirNovoUsuario() {
    if(sala.bloco=='' || sala.andar=='' || sala.sala=='' || sala.latitude=='' || sala.longitude=='' || sala.capacidade==''){
      Alert.alert('Atenção', 'Você precisa preencher todos os campos.')
    }else{
      if(sala.capacidade<=0){
        Alert.alert('Atenção', 'A capacidade tem que ser maior de 1.')
      }else{
        metodoInserir()
      }
    }
  }

  async function metodoInserir(){
    setLoading(true)
    const res = await ref.push({
          bloco: sala.bloco,
          andar: sala.andar,
          sala: sala.sala,
          longitude: sala.longitude,
          latitude: sala.latitude,
          disciplinaAtual: sala.disciplinaAtual,
          capacidade: sala.capacidade,
        })
        .then((res) => {
          Alert.alert('Sucesso', `Cadastro efetudao com sucesso`)
          Actions.push('telaConfigurarSalas')
        })
        .catch((err) => {
          console.log(err)
          Alert.alert('Falha no sistema', 'Erro ao inserir nova sala.')
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

