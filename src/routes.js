import React from 'react'
import { Router, Stack, Scene } from 'react-native-router-flux'

import TelaLogin from './scenes/telaLogin'
import TelaCadastrarColaborador from './scenes/telaCadastrarColaborador'
import TelaResetarSenha from './scenes/telaResetarSenha'
import TelaAluno from './scenes/telaAluno'
import TelaProfessor from './scenes/telaProfessor'
import TelaReservarEquipamento from './scenes/telaReservarEquipamento'
import TelaSGP from './scenes/telaSGP'
import TelaVerificarReservas from './scenes/telaVerificarReservas'
import TelaConfigurarSalas from './scenes/telaConfigurarSalas'
import TelaCadastrarSalas from './scenes/telaCadastrarSalas'

export function Route(props){
    return(
        <Router>
            <Stack key="root">
                <Scene key="telaLogin" component={TelaLogin} title="TelaLogin" hideNavBar={true}/>
                <Scene key="telaCadastrarColaborador" component={TelaCadastrarColaborador} title="TelaCadastrarColaborador" hideNavBar={true}/>
                <Scene key="telaResetarSenha" component={TelaResetarSenha} title="TelaResetarSenha" hideNavBar={true}/>
                <Scene key="telaAluno" component={TelaAluno} title="TelaAluno" hideNavBar={true}/>
                <Scene key="telaProfessor" component={TelaProfessor} title="TelaProfessor" hideNavBar={true}/>
                <Scene key="telaReservarEquipamento" component={TelaReservarEquipamento} title="TelaReservarEquipamento" hideNavBar={true}/>
                <Scene key="telaSGP" component={TelaSGP} title="TelaSGP" hideNavBar={true}/>
                <Scene key="telaVerificarReservas" component={TelaVerificarReservas} title="TelaVerificarReservas" hideNavBar={true}/>
                <Scene key="telaConfigurarSalas" component={TelaConfigurarSalas} title="TelaConfigurarSalas" hideNavBar={true}/>
                <Scene key="telaCadastrarSalas" component={TelaCadastrarSalas} title="TelaCadastrarSalas" hideNavBar={true}/>
            </Stack>
        </Router>
    )
}
