import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import TelaLogin from './scenes/telaLogin'
import TelaLocalizarSala from './scenes/telaLocalizarSala'
import TelaCadastrarAluno from './scenes/telaCadastrarAluno'
import TelaResetarSenha from './scenes/telaResetarSenha'
import TelaAluno from './scenes/telaAluno'
import TelaCadastrarAgendaAluno from './scenes/telaCadastrarAgendaAluno'
import TelaEditarAgendaAluno from './scenes/telaEditarAgendaAluno'
import TelaProfessor from './scenes/telaProfessor'
import TelaCadastrarAgendaProfessor from './scenes/telaCadastrarAgendaProfessor'
import TelaEditarAgendaProfessor from './scenes/telaEditarAgendaProfessor'
import TelaSolicitacaoReservasEquipamentos from './scenes/telaSolicitacaoReservasEquipamentos'
import TelaSolicitacaoReservasSalas from './scenes/telaSolicitacaoReservasSalas'
import TelaReservarEquipamento from './scenes/telaReservarEquipamento'
import TelaReservarSala from './scenes/telaReservarSala'
import TelaSGP from './scenes/telaSGP'
import TelaVerificarReservasEquipamentos from './scenes/telaVerificarReservasEquipamentos'
import TelaVerificarReservasSalas from './scenes/telaVerificarReservasSalas'
import TelaCadastrarColaborador from './scenes/telaCadastrarColaborador'
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
                <Stack.Screen name="TelaCadastrarAgendaAluno" component={TelaCadastrarAgendaAluno} />
                <Stack.Screen name="TelaEditarAgendaAluno" component={TelaEditarAgendaAluno} />
                <Stack.Screen name="TelaProfessor" component={TelaProfessor} />
                <Stack.Screen name="TelaCadastrarAgendaProfessor" component={TelaCadastrarAgendaProfessor} />
                <Stack.Screen name="TelaEditarAgendaProfessor" component={TelaEditarAgendaProfessor} />
                <Stack.Screen name="TelaSolicitacaoReservasEquipamentos" component={TelaSolicitacaoReservasEquipamentos} />
                <Stack.Screen name="TelaSolicitacaoReservasSalas" component={TelaSolicitacaoReservasSalas} />
                <Stack.Screen name="TelaReservarEquipamento" component={TelaReservarEquipamento} />
                <Stack.Screen name="TelaReservarSala" component={TelaReservarSala} />
                <Stack.Screen name="TelaSGP" component={TelaSGP} />
                <Stack.Screen name="TelaVerificarReservasEquipamentos" component={TelaVerificarReservasEquipamentos} />
                <Stack.Screen name="TelaVerificarReservasSalas" component={TelaVerificarReservasSalas} />
                <Stack.Screen name="TelaCadastrarColaborador" component={TelaCadastrarColaborador} />
                <Stack.Screen name="TelaConfigurarLocais" component={TelaConfigurarLocais} />
                <Stack.Screen name="TelaCadastrarLocal" component={TelaCadastrarLocal} />
                <Stack.Screen name="TelaEditarLocal" component={TelaEditarLocal} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
