import React from 'react'
import { Router, Stack, Scene } from 'react-native-router-flux'

import TelaLogin from '../scenes/telaLogin'
import TelaDeCadastro from '../scenes/telaRegister'

const App = () => (
    <Router>
        <Stack key="root">
            <Scene key="login" component={TelaLogin} title="TelaLogin" />
            <Scene key="register" component={TelaDeCadastro} title="TelaDeCadastro" />
        </Stack>
    </Router>
);