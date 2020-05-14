import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';


export default function TelaCadastrarSalas() {
  const [confirmacaoSenha, setConfirmacaoSenha] = useState('')
  const [sala, setSala] = useState({bloco: '', numAndar: '', numSala: '', orientacao: '', disciplinaAtual: '', periodo: ''})
  const [loading, setLoading] = useState(false)

  function inserirNovoUsuario() {
    if(sala.numAndar=='' || sala.numAndar=='' || sala.numSala=='' || sala.orientacao=='' || sala.periodo!=''){
      Alert.alert('Atenção', 'Você precisa preencher todos os campos.')
    }else{
      if(sala.orientacao>=0 || sala.orientacao<=1){
        Alert.alert('Atenção', 'Digite um 0 ou 1, de acordo com exemplo.')
      }else{
        metodoInserir()
      }
    }
  }

  function metodoInserir(){
    setLoading(true)
        axios.post('https://gerenciamentodeativosestacio.firebaseio.com/salas.json', {
          bloco: sala.bloco,
          numAndar: sala.numAndar,
          numSala: sala.numSala,
          orientacao: sala.orientacao,
          disciplinaAtual: sala.disciplinaAtual,
          periodo: sala.periodo
        })
        .then((res) => {
          Alert.alert('Sucesso', `Cadastro efetudao com sucesso`)
          limparCampos()
        })
        .catch((err) => {
          console.log(err)
          Alert.alert('Falha no sistema', 'Erro ao inserir nova sala.')
        })
        .finally(() => setLoading(false))
  }

  function limparCampos(){
    setSala({bloco: '', numAndar: '', numSala: '', orientacao: '', disciplinaAtual: '', periodo: ''})
  }

  return (
    <View style={Styles.containerPrincipal}>
      <Image
        style={Styles.redimensionarLogo}
        source={require('../../../assets/logo.png')}
      />
      <Text style={Styles.titulo}>{"Cadastro de salas"}</Text>

      <View style={Styles.containerDosDados}>
        <TextInput
          style={{height: 40}}
          value={sala.bloco}
          placeholder="Digite a letra do bloco"
          onChangeText={texto => setSala({...sala, bloco: texto})}
          maxLength={1}
        />
      </View>
      <View style={Styles.containerDosDados}>
        <TextInput
          style={{height: 40}}
          value={sala.numAndar}
          placeholder="Digite o número do andar"
          onChangeText={texto => setSala({...sala, numAndar: texto})}
          maxLength={2}
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
      <View style={Styles.containerDosDados}>
        <TextInput
          style={{height: 40}}
          value={sala.orientacao}
          placeholder="Digite a orientação (0 = Esquerda, 1= Direita)"
          onChangeText={texto => setSala({...sala, orientacao: texto})}
          maxLength={1}
          keyboardType={'decimal-pad'}
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
      <View style={Styles.containerDosDados}>
        <TextInput
          style={{height: 40}}
          value={sala.periodo}
          placeholder="Digite o período (Exemplo: AB - manhã)"
          onChangeText={texto => setSala({...sala, periodo: texto})}
        />
      </View>
      <View style={Styles.botaoContainer}>
        <TouchableOpacity style={Styles.botaoCadastrar} onPress={()=>Actions.push('telaConfigurarSalas')}>
          <Text style={Styles.textoBotaoCadastrar}>RETORNAR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.botaoAcessar} onPress={()=>inserirNovoUsuario()}>
          <Text style={Styles.textoBotaoAcessar}>CADASTRAR</Text>
        </TouchableOpacity>
        <ActivityIndicator animating={loading} size="large" color="#0000ff" />
      </View>

    </View>
  );
}

const Styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
  },
  imagemContainer: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    alignItems: 'center',
  },
  containerTitulo: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoContainer: {
    flex: 2,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 8,
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
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
  textoBotaoCadastrar: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
  botaoCadastrar: {
    width: 160,
    height: 50,
    backgroundColor: '#002566',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    margin: 5,
  },
  botaoAcessar: {
    width: 160,
    height: 50,
    backgroundColor: '#acd54a',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    margin: 5,
  },
});

