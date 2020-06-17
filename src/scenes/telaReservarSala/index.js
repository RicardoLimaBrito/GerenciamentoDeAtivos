import React, {useState, useEffect} from 'react'
import { View, Alert, StyleSheet, TouchableOpacity, FlatList, Text, ActivityIndicator, AsyncStorage, TextInput } from 'react-native'
import Constants from 'expo-constants';
import DatePicker from 'react-native-datepicker'
import firebase from 'firebase'

export default function TelaReservarSalas({ navigation }){
    const db = firebase.database()
    const ref = db.ref('reservas_salas/')
    const refer = db.ref('locais_salas/')

    const [reserva, setReserva] = useState({
        tipoDeReserva: 'Sala',
        situacao: 'Em análise',
        motivo: '',
        solicitante: '',
        dataRetirada: '',
        horaRetirada: '',
        sala: '',
    })
    const [dados, setDados] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() =>{
        getEmail()
    },[])

    return(
        <View style={Styles.containerPrincipal}>
            <Text style={Styles.titulo}>Solicitar sala</Text>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <View style={{margin: 5}}>
                    <DatePicker
                        style={{width: 100}}
                        date={reserva.horaRetirada}
                        mode="time"
                        placeholder="Horário"
                        format="HH:mm"
                        is24Hour={true}
                        showIcon={false}
                        confirmBtnText="Confirmar"
                        cancelBtnText="Cancelar"
                        onDateChange={texto => setReserva({...reserva, horaRetirada: texto})}
                    />
                </View>
                <View style={{margin: 5}}>
                    <DatePicker
                        style={{width: 100}}
                        date={reserva.dataRetirada}
                        mode="date"
                        placeholder="Data"
                        format="DD/MM/YYYY"
                        minDate="01/06/2020"
                        maxDate="30/12/2050"
                        confirmBtnText="Confirmar"
                        cancelBtnText="Cancelar"
                        showIcon={false}
                        onDateChange={texto => setReserva({...reserva, dataRetirada: texto})}
                    />
                </View>
            </View>
            <View style={Styles.containerDosDados}>
                <TextInput
                    style={{height: 40, textAlign: 'center'}}
                    placeholder="Motivo"
                    value={reserva.motivo}
                    onChangeText={texto => setReserva({...reserva, motivo: texto})}
                    autoCapitalize={'sentences'}
                    maxLength={20}
                />
            </View>
            <View style={Styles.containerFlatList}>
                <FlatList
                    data={dados}
                    renderItem={({ item }) => (
                        <View>
                            <TouchableOpacity onPress={() => setReserva({...reserva, sala: item.nomeLocal})} style={Styles.containerBotaoFlatList}>
                                <Text style={Styles.textoDadosFlatList}>Sala: {item.nomeLocal}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={(item, index) => `${index}`}
                />
            </View>
            {reserva.sala!='' && <Text style={Styles.textoDadosFlatList}>Local escolhido: {reserva.sala}</Text>}
            {loading && <ActivityIndicator animating={loading} size="large" color="#0000ff" />}
            <View style={Styles.botaoContainer}>
                <TouchableOpacity style={Styles.botaoCadastrar} onPress={()=>navigation.goBack()}>
                <Text style={Styles.textoBotaoCadastrar}>RETORNAR</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.botaoAcessar} onPress={()=>inserirNovaReserva()}>
                <Text style={Styles.textoBotaoAcessar}>RESERVAR</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

    async function getEmail(){
        let email = ''
            try {
               email = await AsyncStorage.getItem('@usuario')
            } catch (error) {
                console.log(error)
                Alert.alert('Atenção', 'Erro ao pegar o email do colaborador')
                navigation.goBack()
            }
        setReserva({ ...reserva, solicitante: `${email}` })
        getLocal(refer)
    }

    async function getLocal(refer) {
        setLoading(true)
        const ref = db.ref(refer)
          try {
            let res = await ref.orderByChild('nomeLocal').once('value')
              if(res.val()){
                let datalist= []
                res.forEach((e) => {
                  datalist.push({key: e.key, ...e.val()})
                })
                setDados([])
                setDados(datalist)
              }else{
                Alert.alert('Atenção', 'Não existem locais cadastrados.')
              }
          } catch (error) {
            console.log(error)
            Alert.alert('Atenção', 'Erro a carregar o local')
          }
        setLoading(false)
      }

    function inserirNovaReserva() {
        if(reserva.dataRetirada==''){
            Alert.alert('Atenção', 'Você precisa escolher uma data.')
        }else{
            if(reserva.horaRetirada==''){
                Alert.alert('Atenção', 'Você precisa escolher uma data.')
            }else{
                if(reserva.sala==''){
                    Alert.alert('Atenção', 'Você precisa escolher uma sala.')
                }else{
                    metodoInserir()
                }
            }
        }
    }

    async function metodoInserir(){
        setLoading(true)
        const res = await ref.push({
            tipoDeReserva: reserva.tipoDeReserva,
            solicitante: reserva.solicitante,
            situacao: reserva.situacao,
            motivo: reserva.motivo,
            dataRetirada: reserva.dataRetirada,
            horaRetirada: reserva.horaRetirada,
            sala: reserva.sala
        })
        .then((res) => {
            Alert.alert('Sucesso', 'Solicitação para reservar efetuada com sucesso.')
            navigation.goBack()
        })
        .catch((err) => {
            console.log(err)
            Alert.alert('Falha no sistema', 'Erro ao socilitar reserva.')
        })
        .finally(() => {
            setLoading(false)
        })
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
    containerFlatList: {
        margin: 5,
        width:'80%',
        height:'50%',
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
    containerBotaoFlatList: {
        width: 200,
        height: 80,
        borderRadius: 15,
        backgroundColor: '#f6f6f6',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    containerDosDados: {
        marginBottom: 5,
        borderBottomWidth: 2,
        width: 200,
        borderColor: '#000',
        borderRadius: 10,
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
        margin: 10,
    },
    textoBotaoAcessar: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold',
    },
    textoData: {
        textAlign: 'center',
        fontSize: 15,
    },
    textoDadosFlatList: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    textoBotaoCadastrar: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold',
    },
    titulo: {
        margin: 30,
        fontSize: 30,
        color: '#02246c',
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    botaoCadastrar: {
        width: 160,
        height: 50,
        backgroundColor: '#002566',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        margin: 5,
    },
    botaoAcessar: {
        width: 160,
        height: 50,
        backgroundColor: '#acd54a',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        margin: 5,
    },
})