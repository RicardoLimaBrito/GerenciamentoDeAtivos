import React, {useState} from 'react'
import { View, ScrollView, StyleSheet, Image, TouchableOpacity, Text } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import { Switch, List } from 'react-native-paper'
import Constants from 'expo-constants';
import { Actions } from 'react-native-router-flux';

export default function TelaReservarEquipamento(){
    const [reserva, setReserva] = useState({
        dataRetirada: '',
        datashow: false,
        notebook: false,
        filtroDeLinha: false,
        adaptadorVGA: false,
        mouse: false,
    })
    
    function alterarValor(nome) {
        setReserva({ ...reserva, [nome]: !reserva[nome] })
        console.log(reserva)
    }

    return(
        <View style={Styles.containerPrincipal}>
            <Image
            style={Styles.redimensionarLogo}
            source={require('../../../assets/logo.png')}
            />
            <View style={Styles.containerDosDados}>
                <TextInputMask
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
            <ScrollView>
                <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
                    <List.Item
                        titleStyle={{ color: '#000000' }}
                        descriptionStyle={{ color: '#f3f3f3' }}
                        title='Datashow'
                        description=''
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
                        descriptionStyle={{ color: '#f3f3f3' }}
                        title='Notebook'
                        description=''
                        left={(props) => (
                            <Switch
                            {...props}
                            value={reserva.notebook}
                            onValueChange={(input) => alterarValor('notebook', input)}
                            />
                        )}
                    />
                    <List.Item
                        titleStyle={{ color: '#000000' }}
                        descriptionStyle={{ color: '#f3f3f3' }}
                        title='Filtro de linha'
                        description=''
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
                        descriptionStyle={{ color: '#f3f3f3' }}
                        title='Adaptador VGA'
                        description=''
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
                        descriptionStyle={{ color: '#f3f3f3' }}
                        title='Mouse'
                        description=''
                        left={(props) => (
                            <Switch
                            {...props}
                            value={reserva.mouse}
                            onValueChange={(input) => alterarValor('mouse', input)}
                            />
                        )}
                    />
                </View>
            </ScrollView>
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