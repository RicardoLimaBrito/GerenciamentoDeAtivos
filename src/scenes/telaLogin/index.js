import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, Alert, ActivityIndicator, AsyncStorage } from 'react-native';
import Constants from 'expo-constants';
import firebase from 'firebase'

export default function TelaLogin({ navigation }) {
  const db = firebase.database()
  const ref = db.ref('usuarios/')

  const [usuario, setUsuario] = useState({email: '', senha: ''})
  const [loading, setLoading] = useState(false)
  const [dados, setDados] = useState([])

  useEffect(() => {
    limparDados()
  }, [])

  return (
    <View style={Styles.containerPrincipal}>
      <View style={Styles.imagemContainer}>
        <Image
          style={Styles.redimensionarLogo}
          source={require('../../../assets/logo.png')}
        />
      </View>
      <Text style={Styles.titulo}>{"Gestão de Ativos"}</Text>
      <View style={Styles.containerDosDados}>
        <TextInput
          style={{height: 40}}
          placeholder="Email"
          value={usuario.email}
          onChangeText={texto => setUsuario({...usuario, email: texto})}
          autoCapitalize={'none'}
          keyboardType={'default'}
          
        />
      </View>
      <View style={Styles.containerDosDados}>
        <TextInput
          style={{height: 40}}
          placeholder="Senha"
          value={usuario.senha}
          onChangeText={texto => setUsuario({...usuario, senha: texto})}
          autoCapitalize={'none'}
          keyboardType={'numeric'}
          secureTextEntry={true}
        />
      </View>

      <View style={Styles.containerBotoes}>
        <TouchableOpacity style={Styles.botaoCadastrar} onPress={()=>navigation.navigate('TelaCadastrarAluno')}>
          <Text style={Styles.textoBotaoCadastrar}>Cadastrar-se</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.botaoAcessar} onPress={()=>metodoLogin()}>
          <Text style={Styles.textoBotaoAcessar}>Acessar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.botaoLocalizarSala} onPress={()=>navigation.navigate('TelaLocalizarSala')}>
          <Text style={Styles.textoLocalizarSala}>Localizar sala</Text>
      </TouchableOpacity>
      </View>
      <View style={Styles.containerBotaoEsqueceuSenha}>
        <TouchableOpacity style={Styles.botaoEsqueceuASenha} onPress={()=>navigation.navigate('TelaResetarSenha')}>
          <Text style={Styles.textoBotaoEsqueceuASenha}>Esqueceu a senha?</Text>
        </TouchableOpacity>
      </View>
      {loading && <ActivityIndicator animating={loading} size="large" color="#0000ff" />}
    </View>
  )

  async function metodoLogin(){
    setLoading(true)
    let uid = ''
      const {email, senha} = usuario
      await firebase.auth().signInWithEmailAndPassword(email, senha)
        .then(function(res){
           uid = res.user.uid
        })
        .catch(function(error){
          console.log(error)
          Alert.alert('Atenção', 'Dados inválidos')
        })
      if(uid!=''){
        getTipoDeColaborador(uid)
      }
    setLoading(false)
  }

  async function getTipoDeColaborador(uid){
    await ref.child(uid).once("value")
      .then(function(res){
        let datalist= []
          res.forEach((e) => {
            datalist.push({uid: uid, key: e.key, ...e.val()})
          })
          setDados(datalist)
          console.log(datalist.find('tipoDeColaborador'))
      })
      .catch(function(error){
        console.log(error)
        Alert.alert('Atenção', 'Erro ao capturar o tipo de colaborador')
      })
      .finally(function(){
        console.log(dados)
        //irParaHome(tipo)
      })
    
  }

  function irParaHome(tipoDeColaborador){
    if(tipoDeColaborador=='Aluno'){
      navigation.navigate('TelaAluno')
    }else if(tipoDeColaborador=='Professor'){
      navigation.navigate('TelaProfessor')
    }else if(tipoDeColaborador=='SGP'){
      navigation.navigate('TelaSGP')
    }else{
      limparDados()
      Alert.alert('Atenção', 'Tipo de usuário não identicado')
    }
  }

  function limparDados(){
    setUsuario({email: '', senha: ''})
  }

}

const Styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
  },
  imagemContainer: {
    paddingTop: Constants.statusBarHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerDropDown: {
    width: 300,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  containerBotoes: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  containerBotaoEsqueceuSenha: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  redimensionarLogo: {
      width: 120,
      height: 120,
      resizeMode: 'contain',
  },
  titulo: {
    fontSize: 30,
    color: '#02246c',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  containerDosDados: {
    margin: 15,
    borderBottomWidth: 2,
    width: 300,
    borderColor: '#e0ebeb',
    borderRadius: 10,
  },
  textoBotaoAcessar: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  textoBotaoCadastrar: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  textoBotaoEsqueceuASenha: {
    fontSize: 15,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  textoLocalizarSala: {
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
  botaoLocalizarSala: {
    width: 320,
    height: 50,
    backgroundColor: '#BDA207',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    margin: 5,
  },
  botaoEsqueceuASenha: {
    margin: 10,
  },
});

