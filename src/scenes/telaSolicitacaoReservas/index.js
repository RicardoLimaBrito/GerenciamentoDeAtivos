import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Switch, TouchableOpacity, FlatList, ActivityIndicator, Alert, TextInput } from 'react-native';
import Constants from 'expo-constants';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase'
import { FontAwesome } from '@expo/vector-icons'; 


export default function TelaSolicitacaoReservas() {
  const db = firebase.database()
  const ref = db.ref(`reserva/`)

  const [dados, setDados] = useState([])
  const [loading, setLoading] = useState(false)
    
  useEffect(() => {
    getReservas()
  }, [])

  return (
    <View style={Styles.containerPrincipal}>
      <Text style={Styles.titulo}>Reservas</Text>
      <View style={Styles.containerDeDados}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={Styles.containerBotaoAdicionar} onPress={()=>null}>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <FontAwesome name="building" size={35} color="#000000" />
              <Text style ={{margin: 5}}>Ir para salas</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.containerBotaoAdicionar} onPress={()=>Actions.push('telaReservarEquipamento')}>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <FontAwesome name="plus" size={35} color="#337861" />
              <Text style ={{margin: 5}}>Equipamento</Text>
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
                <Text style={{fontSize: 17, marginLeft: 10, marginBottom: 5}}>
                  Situação: {item.situacao}
                </Text>
                <Text style={{fontSize: 17, marginLeft: 10}}>
                  Para o dia {item.dataRetirada} às {item.horaRetirada}
                </Text>
                <Text style={{fontSize: 17, marginLeft: 10}}>
                  Solicitações:
                </Text>
                <View style={{maxHeight: 300, maxWidth: 300, margin: 10}}>
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
        <TouchableOpacity style={Styles.botaoDeSair} onPress={()=>Actions.replace('telaProfessor')}>
          <Text style={Styles.textoBotaoSair}>Retornar</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
  
  async function getReservas() {
    setLoading(true)
      try {
        let res = await ref.once('value')
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
  containerBotaoAdicionar: {
    width: 130,
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
    maxWidth: '90%',
    maxHeight: '70%'
  },
  containerSalas:{
    flexDirection: 'row',
    margin: 5,
    backgroundColor: '#ffffff',
    width: 300,
    height: 460,
    justifyContent: 'center',
    borderRadius: 15,
    borderColor: 'black',
    borderWidth: 3,
    alignItems: 'center',
  },
  containerSwitch: {
    flexDirection: 'row',
    margin: 10,
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

