import React from 'react'
import { Router, Stack, Scene } from 'react-native-router-flux'

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
import TelaConfigurarSalas from './scenes/telaConfigurarSalas'
import TelaCadastrarLocal from './scenes/telaCadastrarLocal'

export function Route(props){
    return(
        <Router>
            <Stack key="root">
                <Scene key="telaLogin" component={TelaLogin} title="TelaLogin" hideNavBar={true}/>
                <Scene key="telaLocalizarSala" component={TelaLocalizarSala} title="TelaLocalizarSala" hideNavBar={true}/>
                <Scene key="telaCadastrarAluno" component={TelaCadastrarAluno} title="TelaCadastrarAluno" hideNavBar={true}/>
                <Scene key="telaResetarSenha" component={TelaResetarSenha} title="TelaResetarSenha" hideNavBar={true}/>
                <Scene key="telaAluno" component={TelaAluno} title="TelaAluno" hideNavBar={true}/>
                <Scene key="telaProfessor" component={TelaProfessor} title="TelaProfessor" hideNavBar={true}/>
                <Scene key="telaSolicitacaoReservas" component={TelaSolicitacaoReservas} title="TelaSolicitacaoReservas" hideNavBar={true}/>
                <Scene key="telaReservarEquipamento" component={TelaReservarEquipamento} title="TelaReservarEquipamento" hideNavBar={true}/>
                <Scene key="telaSGP" component={TelaSGP} title="TelaSGP" hideNavBar={true}/>
                <Scene key="telaCadastrarColaborador" component={TelaCadastrarColaborador} title="TelaCadastrarColaborador" hideNavBar={true}/>
                <Scene key="telaVerificarReservas" component={TelaVerificarReservas} title="TelaVerificarReservas" hideNavBar={true}/>
                <Scene key="telaConfigurarSalas" component={TelaConfigurarSalas} title="TelaConfigurarSalas" hideNavBar={true}/>
                <Scene key="telaCadastrarLocal" component={TelaCadastrarLocal} title="TelaCadastrarLocal" hideNavBar={true}/>
            </Stack>
        </Router>
    )
}
