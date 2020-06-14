import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Alert, AsyncStorage } from 'react-native';
import Constants from 'expo-constants';
import firebase from 'firebase'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'; 


export default function TelaSolicitacaoReservasSalas({ navigation }) {
  const db = firebase.database()
  const ref = db.ref(`reservas_salas/`)

  const [usuario, setUsuario] = useState({email: ''})
  const [dados, setDados] = useState([])
  const [loading, setLoading] = useState(false)
    
  useEffect(() => {
    getEmail()
  }, [])

  return (
    <View style={Styles.containerPrincipal}>
      <View style={{flexDirection: 'row'}}>
        <Text style={Styles.titulo}>Reservas</Text>
        <TouchableOpacity style={Styles.containerBotaoRefresh} onPress={()=>getReservas()}>
          <FontAwesome name="refresh" size={35} color="#0d0da3" />
        </TouchableOpacity>
      </View>
      <View style={Styles.containerDeDados}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={Styles.containerBotaoEsquerdo} onPress={()=>navigation.navigate('TelaSolicitacaoReservasEquipamentos')}>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <MaterialCommunityIcons name="projector" size={35} color="#337861" />
              <Text style ={{margin: 5}}>Equipamentos</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.containerBotaoDireito} onPress={()=>navigation.navigate('TelaReservarSala')}>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <FontAwesome name="plus" size={35} color="#000000" />
              <Text style ={{margin: 5}}>Salas</Text>
            </View>
          </TouchableOpacity>
        </View>
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        <FlatList
          data={dados}
          renderItem={({ item }) => (
            <View style={Styles.containerSalas}>
              <View style={{flex: 3}}>
                <Text style={{fontSize: 17, fontWeight: 'bold', marginLeft: 10, margin: 5}}>
                  Tipo: {item.tipoDeReserva}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize: 15,fontWeight: 'bold', marginLeft: 10}}>
                    Situação:
                  </Text>
                  <Text style={{fontSize: 15, marginLeft: 5, marginBottom: 5}}>
                    {item.situacao}
                  </Text>
                </View>
                <Text style={{fontSize: 15,fontWeight: 'bold', marginLeft: 10}}>
                  Solicitante:
                </Text>
                <Text style={{fontSize: 15, marginLeft: 10, marginBottom: 5}}>
                  {item.solicitante}
                </Text>
                <Text style={{fontSize: 15,fontWeight: 'bold', marginLeft: 10}}>
                  Período:
                </Text>
                <Text style={{fontSize: 15, marginLeft: 10, marginBottom: 5}}>
                  {item.dataRetirada} às {item.horaRetirada}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize: 15,fontWeight: 'bold', marginLeft: 10}}>
                    Sala:
                  </Text>
                  <Text style={{fontSize: 15, marginLeft: 5, marginBottom: 5}}>
                    {item.sala}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize: 15,fontWeight: 'bold', marginLeft: 10}}>
                    Motivo:
                  </Text>
                  <Text style={{fontSize: 15, marginLeft: 5, marginBottom: 5}}>
                    {item.motivo}
                  </Text>
                </View>
              </View>
              <View>
                <TouchableOpacity style={{margin: 10}} onPress={()=>delReserva(item.key)}>
                  <FontAwesome name="trash" size={30} color="#FF0000" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => `${index}`}
        />
      </View>
      <View>
        <TouchableOpacity style={Styles.botaoDeSair} onPress={()=>navigation.navigate('TelaProfessor')}>
          <Text style={Styles.textoBotaoSair}>Retornar</Text>
        </TouchableOpacity>
      </View>

    </View>
  );

  async function getEmail(){
    let email = ''
        try {
           email = await AsyncStorage.getItem('@usuario')
        } catch (error) {
            console.log(error)
            Alert.alert('Atenção', 'Erro ao pegar o email do colaborador')
            navigation.goBack()
        }
    setUsuario({...usuario, email: email})
    getReservasInitial(email)
  }

  async function getReservasInitial(email) {
    setLoading(true)
    let ordem = 'solicitante'
      try {
        let res = await ref.orderByChild(ordem).equalTo(email).once('value')
          if(res.val()){
            let datalist= []
            res.forEach((e) => {
              datalist.push({key: e.key, ...e.val()})
            })
            setDados([])
            setDados(datalist)
          }else{
            setDados([])
            Alert.alert('Atenção', 'Não existem reservas solicitadas.')
          }
      } catch (error) {
        Alert.alert('Atenção', error)
      }
    setLoading(false)
  }

  async function getReservas() {
    setLoading(true)
    const {email} = usuario
    let ordem = 'solicitante'
      try {
        let res = await ref.orderByChild(ordem).equalTo(email).once('value')
          if(res.val()){
            let datalist= []
            res.forEach((e) => {
              datalist.push({key: e.key, ...e.val()})
            })
            setDados([])
            setDados(datalist)
          }else{
            setDados([])
            Alert.alert('Atenção', 'Não existem reservas solicitadas.')
          }
      } catch (error) {
        Alert.alert('Atenção', error)
      }
    setLoading(false)
  }

  async function delReserva(id){
    setLoading(true)
      try {
        Alert.alert('Atenção','Deseja realmente excluir está solicitação?',
          [
            { text: 'Cancelar' },
            {
              text: 'Sim',
              onPress: () => {
                ref.child(`${id}`).remove()
                getReservas()
              },
            },
          ],
          { cancelable: true }
        )
      } catch (error) {
        Alert.alert('Atenção', error)
      }
    setLoading(false)
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
  containerBotaoPesquisar: {
    width: 50,
    height: 50,
    backgroundColor: '#dae6c2',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderColor: '#284474',
    borderWidth: 1,
    margin: 5,
    marginRight: 20,
  },
  containerBotaoRefresh: {
    marginTop: 35,
  },
  containerBotaoEsquerdo: {
    width: 150,
    height: 50,
    backgroundColor: '#dae6c2',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderColor: '#284474',
    borderWidth: 1,
    margin: 5,
  },
  containerBotaoDireito: {
    width: 80,
    height: 50,
    backgroundColor: '#dae6c2',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderColor: '#284474',
    borderWidth: 1,
    margin: 5,
  },
  containerDosDados:{
    margin: 10,
    borderBottomWidth: 2,
    width: 140,
    borderColor: '#e0ebeb',
    borderRadius: 10,
    alignSelf: 'center',
  },
  containerDeDados:{
    margin: 5,
    borderColor: 'black',
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    maxWidth: '95%',
    maxHeight: '70%'
  },
  containerSalas:{
    flexDirection: 'row',
    margin: 5,
    backgroundColor: '#ffffff',
    width: 280,
    height: 280,
    justifyContent: 'center',
    borderRadius: 15,
    borderColor: 'black',
    borderWidth: 3,
    alignItems: 'center',
  },
  containerSwitch: {
    flexDirection: 'row',
    margin: 5,
    alignItems: 'center',
  },
  botaoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  titulo: {
    marginTop: 30,
    margin: 10,
    fontSize: 30,
    color: '#02246c',
    fontWeight: 'bold',
  },
  textoBotoesSuperiores: {
    fontSize: 15,
    color: '#02246c',
    fontWeight: 'bold',
  },
  textoBotaoSair: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  botaoDeSair: {
    width: 320,
    height: 70,
    backgroundColor: '#002566',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    margin: 10,
  },
});

