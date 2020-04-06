import React, {Component} from 'react';
import { View, Image } from 'react-native';

import {Styles} from './Styles'

export default class ImagensDeCima extends Component {
  render() {
    return (
      <View style={Styles.imagemContainer}>
        <Image
          style={Styles.redimensionarLogo}
          source={require('../../assets/imgs/logo.png')}
        />
      </View>
    );
  }
}
