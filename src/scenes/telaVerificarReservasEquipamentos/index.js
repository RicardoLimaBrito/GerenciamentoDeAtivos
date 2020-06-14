import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Switch, TouchableOpacity, FlatList, ActivityIndicator, Alert, TextInput } from 'react-native';
import Constants from 'expo-constants';
import firebase from 'firebase'
import { FontAwesome } from '@expo/vector-icons'; 


export default function TelaVerificarReservasEquipamentos({ navigation }) {
  const db = firebase.database()
  const ref = db.ref(`reservas_equipamentos/`)

  const [dados, setDados] = useState([])
  const [loading, setLoading] = useState(false)
    
  useEffect(() => {
    getReservas()
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
          <TouchableOpacity style={Styles.containerBotaoEsquerdo} onPress={()=>navigation.navigate('TelaVerificarReservasSalas')}>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <FontAwesome name="building" size={35} color="#000000" />
            <Text style ={{margin: 5, fontSize: 17}}>Solicitações de salas</Text>
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
                <Text style={{fontSize: 15,fontWeight: 'bold', marginLeft: 10}}>
                  Solicitações:
                </Text>
                <View style={{maxHeight: 300, maxWidth: 300, marginLeft: 10}}>
                  <View style={Styles.containerSwitch}>
                      <Switch
                          trackColor={{ false: "#c0c4bc", true: "#799E34" }}
                          thumbColor={item.adaptadorMacbook ? "#6FDE0E" : "#6f706e"}
                          ios_backgroundColor="#3e3e3e"
                          value={item.adaptadorMacbook}
                      />
                      <Text style={{fontSize: 15}}>adaptador para macbook</Text>
                  </View>
                  <View style={Styles.containerSwitch}>
                      <Switch
                          trackColor={{ false: "#c0c4bc", true: "#799E34" }}
                          thumbColor={item.adaptadorVGA ? "#6FDE0E" : "#6f706e"}
                          ios_backgroundColor="#3e3e3e"
                          value={item.adaptadorVGA}
                      />
                      <Text style={{fontSize: 15}}>adaptador VGA</Text>
                  </View>
                  <View style={Styles.containerSwitch}>
                      <Switch
                          trackColor={{ false: "#c0c4bc", true: "#799E34" }}
                          thumbColor={item.caixaDeSom ? "#6FDE0E" : "#6f706e"}
                          ios_backgroundColor="#3e3e3e"
                          value={item.caixaDeSom}
                      />
                      <Text style={{fontSize: 15}}>Caixa de som</Text>
                  </View>
                  <View style={Styles.containerSwitch}>
                      <Switch
                          trackColor={{ false: "#c0c4bc", true: "#799E34" }}
                          thumbColor={item.datashow ? "#6FDE0E" : "#6f706e"}
                          ios_backgroundColor="#3e3e3e"
                          value={item.datashow}
                      />
                      <Text style={{fontSize: 15}}>Datashow</Text>
                  </View>
                  <View style={Styles.containerSwitch}>
                      <Switch
                          trackColor={{ false: "#c0c4bc", true: "#799E34" }}
                          thumbColor={item.filtroDeLinha ? "#6FDE0E" : "#6f706e"}
                          ios_backgroundColor="#3e3e3e"
                          value={item.filtroDeLinha}
                      />
                      <Text style={{fontSize: 15}}>Filtro de linha</Text>
                  </View>
                  <View style={Styles.containerSwitch}>
                      <Switch
                          trackColor={{ false: "#c0c4bc", true: "#799E34" }}
                          thumbColor={item.mouse ? "#6FDE0E" : "#6f706e"}
                          ios_backgroundColor="#3e3e3e"
                          value={item.mouse}
                      />
                      <Text style={{fontSize: 15}}>Mouse</Text>
                  </View>
                  <View style={Styles.containerSwitch}>
                      <Switch
                          trackColor={{ false: "#c0c4bc", true: "#799E34" }}
                          thumbColor={item.notebook ? "#6FDE0E" : "#6f706e"}
                          ios_backgroundColor="#3e3e3e"
                          value={item.notebook}
                      />
                      <Text style={{fontSize: 15}}>Notebook</Text>
                  </View>
              </View>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                  <TouchableOpacity style={Styles.containerBotaoAprovar} onPress={()=>responderSolicitacao(item.key, 'Aprovado')}>
                    <FontAwesome name="check" size={30} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity style={Styles.containerBotaoNegar} onPress={()=>responderSolicitacao(item.key, 'Negado')}>
                    <FontAwesome name="close" size={30} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => `${index}`}
        />
      </View>
      <View>
        <TouchableOpacity style={Styles.botaoDeSair} onPress={()=>navigation.navigate('TelaSGP')}>
          <Text style={Styles.textoBotaoSair}>Retornar</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
  
  async function getReservas() {
    setLoading(true)
    let ordem = 'situacao'
    let tipo = 'Em análise'
      try {
        let res = await ref.orderByChild(ordem).equalTo(tipo).once('value')
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

  async function responderSolicitacao(key, resposta){
    setLoading(true)
    let respostaInput = resposta
    await ref.child(key).update({
      situacao: respostaInput,
    })
    .then((res) => {
      Alert.alert('Sucesso', `${respostaInput} com sucesso`)
      getReservas()
    })
    .catch((err) => {
      console.log(err)
      Alert.alert('Falha no sistema', 'Erro ao editar local.')
    })
    .finally(() => setLoading(false))
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
  containerBotaoAprovar: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#5da37f',
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  containerBotaoNegar: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#f51300',
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    width: '90%',
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
    margin: 10,
    backgroundColor: '#ffffff',
    width: 320,
    height: 520,
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

