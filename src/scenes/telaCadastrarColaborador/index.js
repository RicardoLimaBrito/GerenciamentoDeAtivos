import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { Dropdown } from 'react-native-material-dropdown';


export default function TelaCadastrarColaborador() {
  const [confirmacaoSenha, setConfirmacaoSenha] = useState('')
  const [usuario, setUsuario] = useState({tipoDeColaborador: '', matricula: '', nome: '', email: '', senha: ''})
  const [loading, setLoading] = useState(false)

  async function inserirNovoUsuario() {
    if(usuario.matricula=='' || usuario.nome=='' || usuario.email=='' || usuario.senha=='' || usuario.tipoDeColaborador=='' ){
      Alert.alert('Atenção', 'Você precisa preencher todos os campos.')
    }else{
      if(usuario.tipoDeColaborador<0 || usuario.tipoDeColaborador>2){
        Alert.alert('Atenção', 'Preencha o tipo de colaborador corretamente.')
      }else{
        if(usuario.senha==confirmacaoSenha){
          await metodoInserir()
        }else{
          Alert.alert('Atenção', 'As senhas digitadas não são as mesmas.')
        }
      }
    }
  }

  function metodoInserir(){
    setLoading(true)
    let url
      if(usuario.tipoDeColaborador==0){
        url = 'https://gerenciamentodeativosestacio.firebaseio.com/alunos.json'
      }else if(usuario.tipoDeColaborador==1){
        url = 'https://gerenciamentodeativosestacio.firebaseio.com/professores.json'
      }else{
        url = 'https://gerenciamentodeativosestacio.firebaseio.com/sgp.json'
      }
      axios.post(`${url}`, {
        matricula: usuario.matricula,
        tipoDeColaborador: usuario.tipoDeColaborador,
        nome: usuario.nome,
        email: usuario.email,
        senha: usuario.senha
      })
      .then((res) => {
        Alert.alert('Sucesso', `Cadastro efetudao com sucesso, anote, sua matrícula é ${usuario.matricula}`)
        Actions.push('telaLogin')
      })
      .catch((err) => {
        console.log(err)
        Alert.alert('Falha no sistema', 'Erro ao inserir novo usuário.')
      })
      .finally(() => {
        setLoading(false)
        criarNovaMatricula()
      })
  }

  function criarNovaMatricula(){
    let matricula = ''
      do{
        matricula = Math.floor(Math.random() * 99999999) + 1 ;
      }while(matricula.length<8)
    setUsuario({...usuario, matricula: matricula})
  }

  useEffect(() => {
    criarNovaMatricula()
  }, [])


  return (
    <View style={Styles.containerPrincipal}>
      <Image
        style={Styles.redimensionarLogo}
        source={require('../../../assets/logo.png')}
      />
      <Text style={Styles.titulo}>{"Cadastro de colaborador"}</Text>
      <View style={Styles.containerMatricula}>
        <Text style={Styles.matricula}>Sua matrícula será: {usuario.matricula}</Text>
      </View>
      <View style={Styles.containerDosDados}>
        <TextInput
          style={{height: 40}}
          value={usuario.tipoDeColaborador}
          placeholder="Tipo (0= Aluno, 1= Professor, 2= SGP)"
          onChangeText={texto => setUsuario({...usuario, tipoDeColaborador: texto})}
          keyboardType={'number-pad'}
          maxLength={1}
        />
      </View>
      <View style={Styles.containerDosDados}>
        <TextInput
          style={{height: 40}}
          value={usuario.nome}
          placeholder="Digite seu nome"
          onChangeText={texto => setUsuario({...usuario, nome: texto})}
          autoCapitalize={'none'}
          keyboardType={'default'}
        />
      </View>
      <View style={Styles.containerDosDados}>
        <TextInput
          style={{height: 40}}
          value={usuario.email}
          placeholder="Digite seu email"
          onChangeText={texto => setUsuario({...usuario, email: texto})}
          autoCapitalize={'none'}
          keyboardType={'default'}
        />
      </View>
      <View style={Styles.containerDosDados}>
        <TextInput
          style={{height: 40}}
          value={usuario.senha}
          placeholder="Digite sua senha"
          onChangeText={texto => setUsuario({...usuario, senha: texto})}
          autoCapitalize={'none'}
          keyboardType={'default'}
          secureTextEntry={true}
        />
      </View>
      <View style={Styles.containerDosDados}>
        <TextInput
          style={{height: 40}}
          value={confirmacaoSenha}
          placeholder="Confirme sua senha"
          onChangeText={texto => setConfirmacaoSenha(texto)}
          autoCapitalize={'none'}
          keyboardType={'default'}
          secureTextEntry={true}
        />
      </View>
      <View style={Styles.botaoContainer}>
        <TouchableOpacity style={Styles.botaoCadastrar} onPress={()=>Actions.push('telaLogin')}>
          <Text style={Styles.textoBotaoCadastrar}>JÁ TEM LOGIN?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.botaoAcessar} onPress={()=>inserirNovoUsuario()}>
          <Text style={Styles.textoBotaoAcessar}>CADASTRAR</Text>
        </TouchableOpacity>
      </View>
      <ActivityIndicator animating={loading} size="large" color="#0000ff" />
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
  containerMatricula: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#000000',
    borderWidth: 3,
    borderRadius: 10,
    width: 300,
    backgroundColor: '#424DF4',
    margin: 15,
  },
  botaoContainer: {
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
  matricula: {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: 'bold',
    alignSelf: 'center',
    margin: 5,
  },
  containerDosDados: {
    margin: 10,
    borderBottomWidth: 2,
    width: 300,
    borderColor: '#e0ebeb',
    borderRadius: 10,
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

