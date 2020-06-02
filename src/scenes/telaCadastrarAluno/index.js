import React, {useState, useEffect} from 'react';
import { Text, View, ScrollView, StyleSheet, Image, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase'

export default function TelaCadastrarAluno() {
  const db = firebase.database()
  const ref = db.ref('usuarios/')

  const [confirmacaoSenha, setConfirmacaoSenha] = useState('')
  const [usuario, setUsuario] = useState({tipoDeColaborador: 'Aluno', nome: '', email: '', senha: ''})
  const [loading, setLoading] = useState(false)

  return (
    <View style={Styles.containerPrincipal}>
      <Text style={Styles.titulo}>Novo cadastro</Text>
      <ScrollView style={{maxHeight: '30%', margin: 30}}>
        <View style={Styles.containerDosDados}>
          <TextInput
            style={{height: 40}}
            value={usuario.nome}
            placeholder="Nome completo"
            onChangeText={texto => setUsuario({...usuario, nome: texto})}
            autoCapitalize={'words'}
            keyboardType={'default'}
          />
        </View>
        <View style={Styles.containerDosDados}>
          <TextInput
            style={{height: 40}}
            value={usuario.email}
            placeholder="Email"
            onChangeText={texto => setUsuario({...usuario, email: texto})}
            autoCapitalize={'none'}
            keyboardType={'default'}
          />
        </View>
        <View style={Styles.containerDosDados}>
          <TextInput
            style={{height: 40}}
            value={usuario.senha}
            placeholder="Senha"
            onChangeText={texto => setUsuario({...usuario, senha: texto})}
            keyboardType={'number-pad'}
            secureTextEntry={true}
          />
        </View>
        <View style={Styles.containerDosDados}>
          <TextInput
            style={{height: 40}}
            value={confirmacaoSenha}
            placeholder="Confirme sua senha"
            onChangeText={texto => setConfirmacaoSenha(texto)}
            keyboardType={'number-pad'}
            secureTextEntry={true}
          />
        </View>
      </ScrollView>
      <View style={Styles.botaoContainer}>
        <TouchableOpacity style={Styles.botaoAcessar} onPress={()=>Actions.push('telaLogin')}>
          <Text style={Styles.textoBotaoAcessar}>Já tem login?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.botaoCadastrar} onPress={()=>inserirNovoUsuario()}>
          <Text style={Styles.textoBotaoCadastrar}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
      {loading && <ActivityIndicator animating={loading} size="large" color="#0000ff" />}
    </View>
  );

  function inserirNovoUsuario() {
    if(usuario.nome=='' || usuario.email=='' || usuario.senha==''){
      Alert.alert('Atenção', 'Você precisa preencher todos os campos.')
    }else{
      if(usuario.senha==confirmacaoSenha){
        metodoInserir()
      }else{
        Alert.alert('Atenção', 'As senhas digitadas não são as mesmas.')
      }
    }
  }

  async function metodoInserir(){
    setLoading(true)
    const res = await ref.push({
        tipoDeColaborador: usuario.tipoDeColaborador,
        nome: usuario.nome,
        email: usuario.email,
        senha: usuario.senha
      })
      .then((res) => {
        Alert.alert('Sucesso', 'Cadastro efetuado com sucesso, Você receberá um email.')
        Actions.replace('telaLogin')
      })
      .catch((err) => {
        console.log(err)
        Alert.alert('Falha no sistema', 'Erro ao inserir novo usuário.')
      })
      .finally(() => {
        setLoading(false)
      })
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
  botaoContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    margin: 8,
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

