import React, {useState, useEffect} from 'react';
import { Text, View, ScrollView, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator, AsyncStorage } from 'react-native';
import Constants from 'expo-constants';
import DatePicker from 'react-native-datepicker'
import { Dropdown } from 'react-native-material-dropdown';
import firebase from 'firebase'


export default function TelaEditarAgendaAluno({ navigation, route }) {
  const db = firebase.database()
  const ref = db.ref('agendas')
  const { key } = route.params;

  const [agenda, setAgenda] = useState({dono: '', disciplina: '', sala: '', dias: '', horario: ''})
  const [loading, setLoading] = useState(false)
  const [dadosDropDownSalas, setDadosDropDownSalas] = useState([])

  useEffect(()=> {
    getSalas()
    getAgenda()
  }, [])

  return (
    <View style={Styles.containerPrincipal}>
      <Text style={Styles.titulo}>Editar anotação</Text>
      <ScrollView style={{maxHeight: 250, margin:30}}>
      <View style={{margin: 5, alignSelf: 'center'}}>
            <DatePicker
                style={{width: 200}}
                date={agenda.horario}
                mode="time"
                placeholder="Horário"
                format="HH:mm"
                is24Hour={true}
                showIcon={false}
                confirmBtnText="Confirmar"
                cancelBtnText="Cancelar"
                onDateChange={texto => setAgenda({...agenda, horario: texto})}
            />
        </View>
        <View style={Styles.containerDosDados}>
          <TextInput
            style={{height: 40}}
            value={agenda.dias}
            placeholder="Dias da semana"
            onChangeText={texto => setAgenda({...agenda, dias: texto})}
            autoCapitalize={'sentences'}
            maxLength={50}
          />
        </View>
        <View style={Styles.containerDosDados}>
          <TextInput
            style={{height: 40}}
            value={agenda.disciplina}
            placeholder="Disciplina"
            onChangeText={texto => setAgenda({...agenda, disciplina: texto})}
            autoCapitalize={'sentences'}
            maxLength={50}
          />
        </View>
        <View style={Styles.containerDropDown}>
          <Dropdown
            label='Sala'
            data={dadosDropDownSalas}
            onChangeText={texto => setAgenda({...agenda, sala: texto})}
          />
        </View>
      </ScrollView>
      <View style={Styles.botaoContainer}>
        <TouchableOpacity style={Styles.botaoAcessar} onPress={()=>navigation.goBack()}>
          <Text style={Styles.textoBotaoAcessar}>Retornar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.botaoCadastrar} onPress={()=>editarAnotacao()}>
          <Text style={Styles.textoBotaoCadastrar}>Editar</Text>
        </TouchableOpacity>
      </View>
      {loading && <ActivityIndicator animating={loading} size="large" color="#0000ff" />}
    </View>
  )

  async function getSalas(){
    const ref = db.ref('locais_salas')
    let ordem = 'nomeLocal'
      try {
        let res = await ref.orderByChild(ordem).once('value')
          if(res.val()){
            let datalist= []
            res.forEach((e) => {
              datalist.push({value: e.val().nomeLocal})
            })
            setDadosDropDownSalas([])
            setDadosDropDownSalas(datalist)
          }else{
            Alert.alert('Atenção', 'Não existem salas cadastradas.')
            navigation.goBack()
          }
      } catch (error) {
        console.log(error)
        Alert.alert('Atenção', 'Erro a carregar as salas')
        navigation.goBack()
      }
  }

  async function getAgenda(){
    let res = await ref.child(key).once('value')
    let dono = res.val().dono
    let disciplina = res.val().disciplina
    let sala = res.val().sala
    let dias = res.val().dias
    let horario = res.val().horario
      setAgenda({
        ...agenda, 
        dono: dono,
        disciplina: disciplina,
        sala: sala,
        dias: dias,
        horario: horario,
      })
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
    setAgenda({...agenda, dono: email})
  }

  function editarAnotacao() {
    const {dono, disciplina, sala, horario, dias} = agenda
    if(dono==''){
      getEmail()
      editarAnotacao()
    }else{
      if(disciplina=='' || sala==''|| horario=='', dias==''){
        Alert.alert('Atenção', 'Você precisa preencher todos os campos.')
      }else{
        metodoEditar()
      } 
    }
  }

  async function metodoEditar(){
    setLoading(true)
    const {dono, disciplina, sala, horario, dias} = agenda
      await ref.child(key).update({
        dono: dono,
        disciplina: disciplina,
        sala: sala,
        horario: horario,
        dias: dias,
      })
      .then(function(res){
        Alert.alert('Sucesso', 'Editado com sucesso.')
        navigation.goBack()
      })
      .catch(function(error){
        Alert.alert('Falha no sistema', 'Erro ao editar anotação.')
      })
      .finally(setLoading(false))
  }

}

const Styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
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
    alignSelf: 'center',
    justifyContent: 'center',
    margin: 8,
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
    justifyContent: 'center',
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

