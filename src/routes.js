import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import TelaLogin from './scenes/telaLogin'
import TelaLocalizarSala from './scenes/telaLocalizarSala'
import TelaCadastrarAluno from './scenes/telaCadastrarAluno'
import TelaResetarSenha from './scenes/telaResetarSenha'
import TelaAluno from './scenes/telaAluno'
import TelaProfessor from './scenes/telaProfessor'
import TelaSolicitacaoReservas from './scenes/telaSolicitacaoReservas'
import TelaReservarEquipamento from './scenes/telaReservarEquipamento'
import TelaSGP from './scenes/telaSGP'
import TelaCadastrarColaborador from './scenes/telaCadastrarColaborador'
import TelaVerificarReservas from './scenes/telaVerificarReservas'
import TelaConfigurarLocais from './scenes/telaConfigurarLocais'
import TelaCadastrarLocal from './scenes/telaCadastrarLocal'
import TelaEditarLocal from './scenes/telaEditarLocal'

export function Route(props){
    return(
        <NavigationContainer>
            <Stack.Navigator headerMode={"none"}>
                <Stack.Screen name="TelaLogin" component={TelaLogin} />
                <Stack.Screen name="TelaLocalizarSala" component={TelaLocalizarSala} />
                <Stack.Screen name="TelaCadastrarAluno" component={TelaCadastrarAluno} />
                <Stack.Screen name="TelaResetarSenha" component={TelaResetarSenha} />
                <Stack.Screen name="TelaAluno" component={TelaAluno} />
                <Stack.Screen name="TelaProfessor" component={TelaProfessor} />
                <Stack.Screen name="TelaSolicitacaoReservas" component={TelaSolicitacaoReservas} />
                <Stack.Screen name="TelaReservarEquipamento" component={TelaReservarEquipamento} />
                <Stack.Screen name="TelaSGP" component={TelaSGP} />
                <Stack.Screen name="TelaCadastrarColaborador" component={TelaCadastrarColaborador} />
                <Stack.Screen name="TelaVerificarReservas" component={TelaVerificarReservas} />
                <Stack.Screen name="TelaConfigurarLocais" component={TelaConfigurarLocais} />
                <Stack.Screen name="TelaCadastrarLocal" component={TelaCadastrarLocal} />
                <Stack.Screen name="TelaEditarLocal" component={TelaEditarLocal} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
