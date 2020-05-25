import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import { Actions } from 'react-native-router-flux';
import { Dropdown } from 'react-native-material-dropdown';
import firebase from 'firebase'


export default function TelaCadastrarSalas() {
  const db = firebase.database()
  const ref = db.ref(`salas/`)

  const [sala, setSala] = useState({bloco: '', numAndar: '', numSala: '', orientacao: '', disciplinaAtual: ''})
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
  const [dadosDropDownOrientacao, setDadosDropDownOrientacao] = useState([
    {value: 'Esquerda'},
    {value: 'Direita'},
  ])

  return (
    <View style={Styles.containerPrincipal}>
      <View style={Styles.imagemContainer}>
        <Image
          style={Styles.redimensionarLogo}
          source={require('../../../assets/logo.png')}
        />
      </View>
      <Text style={Styles.titulo}>{"Cadastro de sala"}</Text>
      <View style={Styles.containerDropDown}>
        <Dropdown
          label='Letra do bloco'
          data={dadosDropDownBlocos}
          onChangeText={texto => setSala({...sala, bloco: texto})}
        />
      </View>
      <View style={Styles.containerDosDados}>
        <TextInput
          style={{height: 40}}
          value={sala.numAndar}
          placeholder="Digite o número do andar"
          onChangeText={texto => setSala({...sala, numAndar: texto})}
          maxLength={3}
          keyboardType={'decimal-pad'}
        />
      </View>
      <View style={Styles.containerDosDados}>
        <TextInput
          style={{height: 40}}
          value={sala.numSala}
          placeholder="Digite o número da sala"
          onChangeText={texto => setSala({...sala, numSala: texto})}
          maxLength={4}
          keyboardType={'decimal-pad'}
        />
      </View>
      <View style={Styles.containerDropDown}>
        <Dropdown
          label='Orientação dos corredores'
          data={dadosDropDownOrientacao}
          onChangeText={texto => setSala({...sala, orientacao: texto})}
        />
      </View>
      <View style={Styles.containerDosDados}>
        <TextInput
          style={{height: 40}}
          value={sala.disciplinaAtual}
          placeholder="Digite a disciplina atual ou deixe em branco"
          onChangeText={texto => setSala({...sala, disciplinaAtual: texto})}
        />
      </View>
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

  function inserirNovoUsuario() {
    if(sala.bloco=='' || sala.numAndar=='' || sala.numSala=='' || sala.orientacao==''){
      Alert.alert('Atenção', 'Você precisa preencher todos os campos.')
    }else{
      metodoInserir()
    }
  }

  async function metodoInserir(){
    setLoading(true)
    const res = await ref.push({
          bloco: sala.bloco,
          numAndar: sala.numAndar,
          numSala: sala.numSala,
          orientacao: sala.orientacao,
          disciplinaAtual: sala.disciplinaAtual,
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

