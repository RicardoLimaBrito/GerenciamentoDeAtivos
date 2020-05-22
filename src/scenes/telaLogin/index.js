import React, {useState} from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import { Actions } from 'react-native-router-flux';

export default function TelaLogin() {
  const [usuario, setUsuario] = useState({email: '', senha: ''})
  const [loading, setLoading] = useState(false)

  function metodoLogin(){
    setLoading(true)
    const {email, senha} = usuario
      if(tipoDeColaborador==''){
        Alert.alert('Por favor', 'Selecione o tipo de colaborador')
      }else{
        if(email=='' || senha==''){
          Alert.alert('Por favor', 'Digite os dados, por favor')
        }else if(email == '2020' && senha == '1234'){
          Actions.replace('telaAluno')
        }else if(email == '6060' && senha == '1234'){
          Actions.replace('telaProfessor')
        }else if(email == '0000' && senha == '1234'){
          Actions.replace('telaSGP')
        }else{
          Alert.alert('Informação', 'Usuário não identificado')
        }
      }
    setLoading(false)
  }

  return (
    <View style={Styles.containerPrincipal}>
      <View style={Styles.imagemContainer}>
        <Image
          style={Styles.redimensionarLogo}
          source={require('../../../assets/logo.png')}
        />
      </View>
      <Text style={Styles.titulo}>{"Gerenciamento de Ativos"}</Text>
      <View style={Styles.containerDosDados}>
        <TextInput
          style={{height: 40}}
          placeholder="Email"
          onChangeText={texto => setUsuario({...usuario, email: texto})}
          autoCapitalize={'none'}
          keyboardType={'numeric'}
          
        />
      </View>
      <View style={Styles.containerDosDados}>
        <TextInput
          style={{height: 40}}
          placeholder="Senha"
          onChangeText={texto => setUsuario({...usuario, senha: texto})}
          autoCapitalize={'none'}
          keyboardType={'numeric'}
          secureTextEntry={true}
        />
      </View>

      <View style={Styles.botaoContainer}>
        <TouchableOpacity style={Styles.botaoCadastrar} onPress={()=>Actions.push('telaCadastrarAluno')}>
          <Text style={Styles.textoBotaoCadastrar}>CADASTRAR - SE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.botaoAcessar} onPress={()=>metodoLogin()}>
          <Text style={Styles.textoBotaoAcessar}>ACESSAR</Text>
        </TouchableOpacity>
      </View>
      <View style={Styles.botaoContainer}>
        <TouchableOpacity style={Styles.botaoEsqueceuASenha} onPress={()=>Actions.push('telaResetarSenha')}>
          <Text style={Styles.textoBotaoEsqueceuASenha}>Esqueceu a senha?</Text>
        </TouchableOpacity>
      </View>
      {loading && <ActivityIndicator animating={loading} size="large" color="#0000ff" />}
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
    justifyContent: 'center',
    margin: 8,
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
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
  textoBotaoCadastrar: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
  textoBotaoEsqueceuASenha: {
    fontSize: 15,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  botaoCadastrar: {
    width: 160,
    height: 50,
    backgroundColor: '#acd54a',
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
  botaoEsqueceuASenha: {
    margin: 10,
  },
});

