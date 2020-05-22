import React from 'react';

import {Route} from './src/routes'
import { FIREBASE } from './src/config'
import firebase from "firebase"

firebase.initializeApp(FIREBASE);

export default function App() {
  return (
    <>
      <Route />
    </>
  );
}

