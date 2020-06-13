import React, {useState, useEffect} from 'react';
import { Text, View, ScrollView, StyleSheet, Image, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import firebase from 'firebase'

export default function TelaCadastrarAluno({ navigation }) {
  const db = firebase.database()
  const ref = db.ref('usuarios/')

  const [confirmacaoSenha, setConfirmacaoSenha] = useState('')
  const [usuario, setUsuario] = useState({tipoDeColaborador: 'Aluno', nome: '', email: '', senha: ''})
  const [loading, setLoading] = useState(false)

  return (
    <View style={Styles.containerPrincipal}>
      <Text style={Styles.titulo}>Novo cadastro</Text>
      <ScrollView style={{maxHeight: 250, margin: 30}}>
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
        <TouchableOpacity style={Styles.botaoAcessar} onPress={()=>navigation.navigate('TelaLogin')}>
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
    try {
      await ref.orderByChild('email').equalTo(`${usuario.email}`).limitToFirst(1).once("value", function(snapshot) {
        if(snapshot.val()){
          Alert.alert('Atenção', 'Email já cadastrado.')
        }else{
          cadastrarNoFirebaseAuth()
        }
      })
    }catch{
      console.log(error)
      Alert.alert('Falha no sistema', 'Erro ao inserir novo usuário.')
    }
    setLoading(false)
  }

  async function cadastrarNoFirebaseAuth(){
    const {email, senha} = usuario
    let uid = ''
      await firebase.auth().createUserWithEmailAndPassword(`${email}`, `${senha}`)
          .then(function(res){
            uid = res.user.uid
          })
      if(uid==''){
        Alert.alert('Falha no sistema', 'Erro ao inserir novo usuário.')
      }else{
        cadastrarNoRealtimeDatabase(uid)
      }
  }

  async function cadastrarNoRealtimeDatabase(uid){
    const {tipoDeColaborador, nome, email, senha} = usuario
      await ref.child(uid).push({
        tipoDeColaborador: tipoDeColaborador,
        nome: nome,
        email: email,
        senha: senha,
      })
      .then(function(res){
        Alert.alert('Sucesso', 'Cadastro efetuado com sucesso.')
        navigation.navigate('TelaLogin')
      })
      .catch(function(error){
        Alert.alert('Falha no sistema', 'Erro ao inserir novo usuário.')
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

