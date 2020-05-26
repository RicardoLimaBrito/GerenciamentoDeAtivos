import React, {useState} from 'react'
import { View, ScrollView, StyleSheet, Image, TouchableOpacity, Text, ActivityIndicator } from 'react-native'
import Constants from 'expo-constants';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker'

export default function TelaReservarEquipamento(){
    const [reserva, setReserva] = useState({
        dataRetirada: '',
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
        console.log(reserva)
    }

    return(
        <View style={Styles.containerPrincipal}>
            <View style={Styles.imagemContainer}>
                <Image
                style={Styles.redimensionarLogo}
                source={require('../../../assets/logo.png')}
                />
            </View>
            <View style={{alignSelf: 'center'}}>
                <DatePicker
                    style={{width: 300}}
                    date={reserva.dataRetirada}
                    mode="date"
                    placeholder="Selecione a data"
                    format="DD/MM/YYYY"
                    minDate="27/05/2020"
                    maxDate="30/12/2050"
                    confirmBtnText="Confirmar"
                    cancelBtnText="Cancelar"
                    customStyles={{
                    dateInput: {
                        marginLeft: 40
                    }
                    }}
                    onDateChange={texto => setReserva({...reserva, dataRetirada: texto})}
                />
            </View>
            <ScrollView style={{maxHeight: 300, maxWidth: 250, marginLeft: '20%'}}>
                {/* onValueChange={(input) => alterarValor('adaptadorMacbook', input)}
                onValueChange={(input) => alterarValor('adaptadorVGA', input)}
                onValueChange={(input) => alterarValor('caixaDeSom', input)}
                onValueChange={() => alterarValor('datashow')}
                onValueChange={(input) => alterarValor('filtroDeLinha', input)}
                onValueChange={(input) => alterarValor('mouse', input)} */}
            </ScrollView>
            <View style={Styles.botaoContainer}>
                <TouchableOpacity style={Styles.botaoCadastrar} onPress={()=>Actions.push('telaProfessor')}>
                <Text style={Styles.textoBotaoCadastrar}>RETORNAR</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.botaoAcessar} onPress={()=>null}>
                <Text style={Styles.textoBotaoAcessar}>RESERVAR</Text>
                </TouchableOpacity>
            </View>
            {loading && <ActivityIndicator animating={loading} size="large" color="#0000ff" />}
        </View>
    )
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