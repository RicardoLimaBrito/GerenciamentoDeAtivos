import React, {useState} from 'react';
import { Text, View, ScrollView, StyleSheet, Alert, FlatList, Image, TouchableOpacity, Modal, AsyncStorage, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import firebase from 'firebase'
import { FontAwesome } from '@expo/vector-icons'; 

export default function TelaAluno({ navigation }) {
  const db = firebase.database()
  const ref = db.ref(`agendas`)

  const [modalVisible, setModalVisible] = useState(false);
  const [usuario, setUsuario] = useState({email: ''})
  const [dados, setDados] = useState([])
  const [loading, setLoading] = useState(false)

  return (
    <View style={Styles.containerPrincipal}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}>
        <View style={Styles.containerModal}>
          <TouchableOpacity onPress={()=>setModalVisible(false)} style={Styles.containerBotaoFecharModal}>
            <FontAwesome name="close" size={35} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>adicionarDados()} style={Styles.containerBotaoAdicionar}>
            <FontAwesome name="plus" size={35} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>getAgenda()} style={Styles.containerBotaoAtualizar}>
            <FontAwesome name="refresh" size={35} color="#fff" />
          </TouchableOpacity>
          <View style={{margin: 20}}>
            <Text style={Styles.titulo}>Minha agenda</Text>
          </View>
          <View style={Styles.containerFlatList}>
          {loading && <ActivityIndicator size="large" color="#0000ff" />}
            <FlatList
              data={dados}
              renderItem={({ item }) => (
                <View style={Styles.containerInternoFlatList}>
                  <Text style={{fontSize: 17, fontWeight: 'bold', marginLeft: 10, marginTop: 5}}>
                    Disciplina:
                  </Text>
                  <Text style={{fontSize: 17, marginLeft: 10,}}>
                    {item.disciplina}
                  </Text>
                  <Text style={{fontSize: 15,fontWeight: 'bold', marginLeft: 10}}>
                    Dias:
                  </Text>
                  <Text style={{fontSize: 15, marginLeft: 10, marginBottom: 5}}>
                    {item.dias}
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 15,fontWeight: 'bold', marginLeft: 10}}>
                      Horário:
                    </Text>
                    <Text style={{fontSize: 15, marginLeft: 5, marginBottom: 5}}>
                      {item.horario} hrs.
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 15,fontWeight: 'bold', marginLeft: 10}}>
                      Professor:
                    </Text>
                    <Text style={{fontSize: 15, marginLeft: 5, marginBottom: 5}}>
                      {item.professor}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                      <Text style={{fontSize: 15,fontWeight: 'bold', marginLeft: 10}}>
                        Sala:
                      </Text>
                      <Text style={{fontSize: 15, marginLeft: 5, marginBottom: 5}}>
                        {item.sala}
                      </Text>
                  </View>
                  <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <TouchableOpacity onPress={()=>editarAnotacao(item.key)} style={Styles.containerBotaoEditar}>
                      <FontAwesome name="pencil" size={30} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>delAnotacao(item.key)} style={Styles.containerBotaoRemover}>
                      <FontAwesome name="trash" size={30} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              keyExtractor={(item, index) => `${index}`}
            />
          </View>
        </View>
      </Modal>
      <View style={Styles.imagemContainer}>
        <Image
          style={Styles.redimensionarLogo}
          source={require('../../../assets/estudante.png')}
        />
        <Image
          style={Styles.redimensionarLogo}
          source={require('../../../assets/logo.png')}
        />
      </View>

      <Text style={Styles.titulo}>{"Gestão de Ativos"}</Text>

      <ScrollView style={Styles.botaoContainer}>
        <TouchableOpacity style={Styles.botoesSuperiores} onPress={()=>abrirAgenda()}>
          <Text style={Styles.textoBotoesSuperiores}>Minha agenda</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.botoesSuperiores} onPress={()=>navigation.navigate('TelaLocalizarSala')}>
          <Text style={Styles.textoBotoesSuperiores}>Localizar sala</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.botoesSuperiores} onPress={()=>Alert.alert('Atenção','Em construção, volte mês que vem!')}>
          <Text style={Styles.textoBotoesSuperiores}>Chat</Text>
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity style={Styles.botaoDeSair} onPress={()=>navigation.navigate('TelaLogin')}>
        <Text style={Styles.textoBotaoSair}>Sair</Text>
      </TouchableOpacity>
    
    </View>
  )

  function abrirAgenda(){
    setModalVisible(true)
    getEmail()
  }

  function editarAnotacao(key){
    setModalVisible(false)
    navigation.navigate('TelaEditarAgendaAluno', {key: key})
  }

  function adicionarDados(){
    setModalVisible(false)
    navigation.navigate('TelaCadastrarAgendaAluno')
  }

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
    getAgendaInicial(email)
  }

  async function getAgendaInicial(email) {
    setLoading(true)
    let ordem = 'dono'
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
            Alert.alert('Atenção', 'Você ainda não tem nada cadastrado.')
          }
      } catch (error) {
        Alert.alert('Atenção', error)
      }
    setLoading(false)
  }

  async function getAgenda() {
    setLoading(true)
    const {email} = usuario
    let ordem = 'dono'
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
            Alert.alert('Atenção', 'Você não tem nada cadastrado.')
          }
      } catch (error) {
        Alert.alert('Atenção', error)
      }
    setLoading(false)
  }

  async function delAnotacao(id){
    setLoading(true)
      try {
        Alert.alert('Atenção','Deseja realmente excluir esta anotação?',
          [
            { text: 'Cancelar' },
            {
              text: 'Sim',
              onPress: () => {
                ref.child(`${id}`).remove()
                getAgenda()
              },
            },
          ],
          { cancelable: true }
        )
      } catch (error) {
        Alert.alert('Atenção', `${error}`)
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
  containerBotaoEditar: {
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
  containerBotaoRemover: {
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
  containerInternoFlatList: {
    width: 250,
    height: 300,
    borderRadius: 15,
    backgroundColor: '#f6f6f6',
    justifyContent: 'center',
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  containerFlatList: {
    width:'90%',
    minHeight:'60%',
    maxHeight:'65%',
    backgroundColor: '#fff',
    justifyContent:'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  containerBotaoFecharModal: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    top: 20,
    backgroundColor: '#f52e20',
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  containerBotaoAdicionar: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#30c959',
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  containerBotaoAtualizar: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 20,
    bottom: 20,
    backgroundColor: '#0d0da3',
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  containerModal: {
    flex:1,
    width:'90%',
    height:'50%',
    backgroundColor: '#f2cecb',
    justifyContent:'center',
    alignItems: 'center',
    alignSelf: 'center',
    margin: 50,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imagemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  containerTitulo: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoContainer: {
    margin: 15,
    maxHeight: 270,
  },
  redimensionarLogo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    margin: 10,
  },
  titulo: {
    fontSize: 30,
    color: '#02246c',
    fontWeight: 'bold',
  },
  textoBotoesSuperiores: {
    fontSize: 20,
    color: '#02246c',
    fontWeight: 'bold',
  },
  textoBotaoSair: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  botoesSuperiores: {
    width: 320,
    height: 70,
    backgroundColor: '#dae6c2',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderColor: '#284474',
    borderWidth: 1,
    margin: 10,
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

