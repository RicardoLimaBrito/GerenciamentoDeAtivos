import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { Dropdown } from 'react-native-material-dropdown';


export default function TelaCadastrar() {
  const [confirmacaoSenha, setConfirmacaoSenha] = useState('')
  const [usuario, setUsuario] = useState({tipoDeColaborador: 'Aluno', matricula: '', nome: '', email: '', senha: ''})
  const [dadosDoDropDown] = useState(['Alnuo', 'Professor', 'SGP'])
  const [loading, setLoading] = useState(false)

  function inserirNovoUsuario() {
    if(usuario.matricula!='' || usuario.nome!='' || usuario.email!='' || usuario.senha!=''){
      if(usuario.senha==confirmacaoSenha){
        setLoading(true)
        axios.post('https://gerenciamentodeativosestacio.firebaseio.com/usuarios.json', {
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
        .finally(() => setLoading(false))
      }else{
        Alert.alert('Atenção', 'As senhas digitadas não são as mesmas.')
      }
    }else{
      Alert.alert('Atenção', 'Você precisa preencher todos os campos.')
    }
  }

  function criarNovaMatricula(){
    let matricula
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
      
      <View style={Styles.containerDoDropDown}>
        <Dropdown
          label='Tipo de colaborador'
          data={dadosDoDropDown}
          onChangeText={tipoDeColaborador => setUsuario({...usuario, tipoDeColaborador: tipoDeColaborador})}
        />
      </View>
      <View style={Styles.containerDosDados}>
        <TextInput
          style={{height: 40}}
          value={usuario.nome}
          placeholder="Digite seu nome"
          onChangeText={nome => setUsuario({...usuario, nome: nome})}
          autoCapitalize={'none'}
          keyboardType={'default'}
        />
      </View>
      <View style={Styles.containerDosDados}>
        <TextInput
          style={{height: 40}}
          value={usuario.email}
          placeholder="Digite seu email"
          onChangeText={email => setUsuario({...usuario, email: email})}
          autoCapitalize={'none'}
          keyboardType={'default'}
        />
      </View>
      <View style={Styles.containerDosDados}>
        <TextInput
          style={{height: 40}}
          value={usuario.senha}
          placeholder="Digite sua senha"
          onChangeText={senha => setUsuario({...usuario, senha: senha})}
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
          onChangeText={confirmacaoSenha => setConfirmacaoSenha(confirmacaoSenha)}
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

