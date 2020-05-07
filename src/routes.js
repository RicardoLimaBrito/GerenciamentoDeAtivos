import React from 'react'
import { Router, Stack, Scene } from 'react-native-router-flux'

import TelaLogin from './scenes/telaLogin'
import TelaCadastrar from './scenes/telaCadastrar'
import TelaResetarSenha from './scenes/telaResetarSenha'
import TelaAluno from './scenes/telaAluno'
import TelaProfessor from './scenes/telaProfessor'
import TelaReservarEquipamento from './scenes/telaReservarEquipamento'
import TelaSGP from './scenes/telaSGP'
import TelaAtualizarTabela from './scenes/telaAtualizarTabela'

export function Route(props){
    return(
        <Router>
            <Stack key="root">
                <Scene key="telaLogin" component={TelaLogin} title="TelaLogin" hideNavBar={true}/>
                <Scene key="telaCadastrar" component={TelaCadastrar} title="TelaCadastrar" hideNavBar={true}/>
                <Scene key="telaResetarSenha" component={TelaResetarSenha} title="TelaResetarSenha" hideNavBar={true}/>
                <Scene key="telaAluno" component={TelaAluno} title="TelaAluno" hideNavBar={true}/>
                <Scene key="telaProfessor" component={TelaProfessor} title="TelaProfessor" hideNavBar={true}/>
                <Scene key="telaReservarEquipamento" component={TelaReservarEquipamento} title="TelaReservarEquipamento" hideNavBar={true}/>
                <Scene key="telaSGP" component={TelaSGP} title="TelaSGP" hideNavBar={true}/>
                <Scene key="telaAtualizarTabela" component={TelaAtualizarTabela} title="TelaAtualizarTabela" hideNavBar={true}/>
            </Stack>
        </Router>
    )
}
