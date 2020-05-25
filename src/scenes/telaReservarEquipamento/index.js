import React, {useState} from 'react'
import { View, ScrollView, StyleSheet, Image, TouchableOpacity, Text, ActivityIndicator } from 'react-native'
import { Switch, List } from 'react-native-paper'
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
                    minDate="22/05/2020"
                    maxDate="22/05/2030"
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
            <ScrollView style={{width: 300, height: 300, alignSelf: 'center'}}>
                <List.Item
                    titleStyle={{ color: '#000000' }}
                    title='Adaptador Macbook'
                    left={(props) => (
                        <Switch
                        {...props}
                        value={reserva.adaptadorMacbook}
                        onValueChange={(input) => alterarValor('adaptadorMacbook', input)}
                        />
                    )}
                />
                <List.Item
                    titleStyle={{ color: '#000000' }}
                    title='Adaptador VGA'
                    left={(props) => (
                        <Switch
                        {...props}
                        value={reserva.adaptadorVGA}
                        onValueChange={(input) => alterarValor('adaptadorVGA', input)}
                        />
                    )}
                />
                <List.Item
                    titleStyle={{ color: '#000000' }}
                    title='Caixa de som'
                    left={(props) => (
                        <Switch
                        {...props}
                        value={reserva.caixaDeSom}
                        onValueChange={(input) => alterarValor('caixaDeSom', input)}
                        />
                    )}
                />
                <List.Item
                    titleStyle={{ color: '#000000' }}
                    title='Datashow'
                    left={(props) => (
                        <Switch
                        {...props}
                        value={reserva.datashow}
                        onValueChange={() => alterarValor('datashow')}
                        />
                    )}
                />
                <List.Item
                    titleStyle={{ color: '#000000' }}
                    title='Filtro de linha'
                    left={(props) => (
                        <Switch
                        {...props}
                        value={reserva.filtroDeLinha}
                        onValueChange={(input) => alterarValor('filtroDeLinha', input)}
                        />
                    )}
                />
                <List.Item
                    titleStyle={{ color: '#000000' }}
                    title='Mouse'
                    left={(props) => (
                        <Switch
                        {...props}
                        value={reserva.mouse}
                        onValueChange={(input) => alterarValor('mouse', input)}
                        />
                    )}
                />
                <List.Item
                    titleStyle={{ color: '#000000' }}
                    title='Notebook'
                    left={(props) => (
                        <Switch
                        {...props}
                        value={reserva.notebook}
                        onValueChange={(input) => alterarValor('notebook', input)}
                        />
                    )}
                />
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
        justifyContent: 'center',
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