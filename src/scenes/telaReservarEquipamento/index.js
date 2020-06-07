import React, {useState} from 'react'
import { View, ScrollView, Alert, Switch, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native'
import Constants from 'expo-constants';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker'
import firebase from 'firebase'

export default function TelaReservarEquipamento(){
    const db = firebase.database()
    const ref = db.ref('reserva/')
    
    const [reserva, setReserva] = useState({
        tipoDeReserva: 'Equipamento',
        situacao: 'Em análise',
        dataRetirada: '',
        horaRetirada: '',
        adaptadorMacbook: false,
        adaptadorVGA: false,
        caixaDeSom: false,
        datashow: false,
        filtroDeLinha: false,
        mouse: false,
        notebook: false
    })
    const [loading, setLoading] = useState(false)

    function alterarValor(nome) {
        setReserva({ ...reserva, [nome]: !reserva[nome] })
    }

    return(
        <View style={Styles.containerPrincipal}>
            <Text style={Styles.titulo}>Solicitar reserva</Text>
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
            <ScrollView style={{maxHeight: 300, maxWidth: 300, margin: 15}}>
                <View style={Styles.containerSwitch}>
                    <Switch
                        trackColor={{ false: "#c0c4bc", true: "#799E34" }}
                        thumbColor={reserva.adaptadorMacbook ? "#6FDE0E" : "#6f706e"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => alterarValor('adaptadorMacbook')}
                        value={reserva.adaptadorMacbook}
                    />
                    <Text style={{fontSize: 15}}>adaptador para macbook</Text>
                </View>
                <View style={Styles.containerSwitch}>
                    <Switch
                        trackColor={{ false: "#c0c4bc", true: "#799E34" }}
                        thumbColor={reserva.adaptadorVGA ? "#6FDE0E" : "#6f706e"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => alterarValor('adaptadorVGA')}
                        value={reserva.adaptadorVGA}
                    />
                    <Text style={{fontSize: 15}}>adaptador VGA</Text>
                </View>
                <View style={Styles.containerSwitch}>
                    <Switch
                        trackColor={{ false: "#c0c4bc", true: "#799E34" }}
                        thumbColor={reserva.caixaDeSom ? "#6FDE0E" : "#6f706e"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => alterarValor('caixaDeSom')}
                        value={reserva.caixaDeSom}
                    />
                    <Text style={{fontSize: 15}}>Caixa de som</Text>
                </View>
                <View style={Styles.containerSwitch}>
                    <Switch
                        trackColor={{ false: "#c0c4bc", true: "#799E34" }}
                        thumbColor={reserva.datashow ? "#6FDE0E" : "#6f706e"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => alterarValor('datashow')}
                        value={reserva.datashow}
                    />
                    <Text style={{fontSize: 15}}>Datashow</Text>
                </View>
                <View style={Styles.containerSwitch}>
                    <Switch
                        trackColor={{ false: "#c0c4bc", true: "#799E34" }}
                        thumbColor={reserva.filtroDeLinha ? "#6FDE0E" : "#6f706e"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => alterarValor('filtroDeLinha')}
                        value={reserva.filtroDeLinha}
                    />
                    <Text style={{fontSize: 15}}>Filtro de linha</Text>
                </View>
                <View style={Styles.containerSwitch}>
                    <Switch
                        trackColor={{ false: "#c0c4bc", true: "#799E34" }}
                        thumbColor={reserva.mouse ? "#6FDE0E" : "#6f706e"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => alterarValor('mouse')}
                        value={reserva.mouse}
                    />
                    <Text style={{fontSize: 15}}>Mouse</Text>
                </View>
                <View style={Styles.containerSwitch}>
                    <Switch
                        trackColor={{ false: "#c0c4bc", true: "#799E34" }}
                        thumbColor={reserva.notebook ? "#6FDE0E" : "#6f706e"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => alterarValor('notebook')}
                        value={reserva.notebook}
                    />
                    <Text style={{fontSize: 15}}>Notebook</Text>
                </View>
            </ScrollView>
            <View style={Styles.botaoContainer}>
                <TouchableOpacity style={Styles.botaoCadastrar} onPress={()=>Actions.push('telaSolicitacaoReservas')}>
                <Text style={Styles.textoBotaoCadastrar}>RETORNAR</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.botaoAcessar} onPress={()=>inserirNovaReserva()}>
                <Text style={Styles.textoBotaoAcessar}>RESERVAR</Text>
                </TouchableOpacity>
            </View>
            {loading && <ActivityIndicator animating={loading} size="large" color="#0000ff" />}
        </View>
    )

    function inserirNovaReserva() {
        if(reserva.dataRetirada==''){
          Alert.alert('Atenção', 'Você precisa escolher uma data.')
        }else{
          if(reserva.adaptadorMacbook==false && reserva.adaptadorVGA==false && reserva.caixaDeSom==false
            && reserva.datashow==false && reserva.filtroDeLinha==false && reserva.mouse==false && reserva.notebook==false){
            Alert.alert('Atenção', 'Você precisa selecionar pelo menos um equipamento.')
          }else{
            metodoInserir()
          }
        }
      }
    
      async function metodoInserir(){
        setLoading(true)
        const res = await ref.push({
            tipoDeReserva: reserva.tipoDeReserva,
            situacao: reserva.situacao,
            dataRetirada: reserva.dataRetirada,
            horaRetirada: reserva.horaRetirada,
            adaptadorMacbook: reserva.adaptadorMacbook,
            adaptadorVGA: reserva.adaptadorVGA,
            caixaDeSom: reserva.caixaDeSom,
            datashow: reserva.datashow,
            filtroDeLinha: reserva.filtroDeLinha,
            mouse: reserva.mouse,
            notebook: reserva.notebook,
          })
          .then((res) => {
            Alert.alert('Sucesso', 'Solicitação para reservar efetuada com sucesso.')
            Actions.push('telaSolicitacaoReservas')
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
    containerSwitch: {
        flexDirection: 'row',
        margin: 10,
        alignItems: 'center',
    },
    imagemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerDosDados: {
        margin: 15,
        borderBottomWidth: 2,
        width: 150,
        borderColor: '#e0ebeb',
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