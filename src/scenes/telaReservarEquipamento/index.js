import React, {useState} from 'react'
import { View, ScrollView, StyleSheet, Image, TouchableOpacity, Text } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import { Switch, List } from 'react-native-paper'
import Constants from 'expo-constants';
import { Actions } from 'react-native-router-flux';

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
    
    function alterarValor(nome) {
        setReserva({ ...reserva, [nome]: !reserva[nome] })
    }

    return(
        <View style={Styles.containerPrincipal}>
            <Image
            style={Styles.redimensionarLogo}
            source={require('../../../assets/logo.png')}
            />
            <View style={Styles.containerDosDados}>
                <TextInputMask
                    placeholder={'DD/MM/AAAA'}
                    type={'datetime'}
                    options={{
                        format: 'DD/MM/YYYY'
                    }}
                    value={reserva.dataRetirada}
                    onChangeText={input => setReserva({...reserva, dataRetirada: input})}
                    style={Styles.textoData}
                    keyboardType={"number-pad"}
                />
            </View>
            <View style={{ustifyContent: 'center', width: '100%'}}>
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
            </View>
            <View style={Styles.botaoContainer}>
                <TouchableOpacity style={Styles.botaoCadastrar} onPress={()=>Actions.push('telaProfessor')}>
                <Text style={Styles.textoBotaoCadastrar}>RETORNAR</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.botaoAcessar} onPress={()=>null}>
                <Text style={Styles.textoBotaoAcessar}>RESERVAR</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    containerPrincipal: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: 'white',
    },
    containerDosDados: {
        margin: 15,
        borderBottomWidth: 2,
        width: 150,
        borderColor: '#e0ebeb',
        borderRadius: 10,
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