import {StyleSheet} from 'react-native'
import Constants from 'expo-constants';

export const Styles = StyleSheet.create({
    imagemContainer: {
        flex: 2,
        paddingTop: Constants.statusBarHeight,
        alignItems: 'center',
    },
    redimensionarLogo: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
    },
});