/**
 * Create screen to route application
 */

import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import Routes from './src/routes';

const App = () => (
  <SafeAreaView style={{ flex: 1, backgroundColor: '#F7F7F7' }}>
    <Routes />
  </SafeAreaView>
);

export default App;

