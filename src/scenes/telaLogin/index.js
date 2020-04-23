import React, {useState} from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import Constants from 'expo-constants';
import { Actions } from 'react-native-router-flux';

export default function TelaLogin() {
  const [usuario, setUsuario] = useState({matricula: '', senha: ''})

  function metodoLogin(){
    const {matricula, senha} = usuario
    if(matricula=='' && senha==''){
      return Alert.alert('Informação', 'Digite os dados, por favor')
    }else if(matricula == '2020' && senha == '1234'){
      Actions.replace('telaAluno')
      return Alert.alert('Informação', 'Bem - vindo, aluno')
    }else if(matricula == '6060' && senha == '1234'){
      Actions.replace('telaProfessor')
      return Alert.alert('Informação', 'Bem - vindo, professor')
    }else if(matricula == '0000' && senha == '1234'){
      Actions.replace('telaSGP')
      return Alert.alert('Informação', 'Bem - vindo, SGP')
    }else{
      return Alert.alert('Informação', 'Usuário não identificado')
    }
  }

  return (
    <View style={Styles.containerPrincipal}>
      <Image
        style={Styles.redimensionarLogo}
        source={require('../../../assets/logo.png')}
      />

      <Text style={Styles.titulo}>{"Gerenciamento de Ativos"}</Text>
      
      <View style={Styles.containerDosDados}>
        <TextInput
          style={{height: 40}}
          placeholder="Matricula"
          onChangeText={matricula => setUsuario({...usuario, matricula: matricula})}
          autoCapitalize={'none'}
          keyboardType={'numeric'}
        />
      </View>
      <View style={Styles.containerDosDados}>
        <TextInput
          style={{height: 40}}
          placeholder="Senha"
          onChangeText={senha => setUsuario({...usuario, senha: senha})}
          autoCapitalize={'none'}
          keyboardType={'numeric'}
          secureTextEntry={true}
        />
      </View>

      <View style={Styles.botaoContainer}>
        <TouchableOpacity style={Styles.botaoCadastrar} onPress={()=>Actions.push('telaCadastrar')}>
          <Text style={Styles.textoBotaoCadastrar}>CADASTRAR - SE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.botaoAcessar} onPress={()=>metodoLogin()}>
          <Text style={Styles.textoBotaoAcessar}>ACESSAR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.botaoEsqueceuASenha} onPress={()=>Actions.push('telaResetarSenha')}>
          <Text style={Styles.textoBotaoEsqueceuASenha}>Esqueceu a senha?</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const Styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    justifyContent: 'center',
    padding: 8,
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

