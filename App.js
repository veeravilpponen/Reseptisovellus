import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
//import PerusteitaBase from './pages/PerusteitaBase';
//import LisaaResepti from './pages/LisaaResepti';
//import NaytaResepti from './pages/NaytaResepti';
//import Reseptilista from './pages/Reseptilista';
//import Tabit from './pages/Tabit';
//import Navigaatio from './navigation/Navigaatio';
import TabStack from './navigation/TabStack';
import { MenuProvider } from 'react-native-popup-menu';

export default class App extends React.Component {
  render() {
    return (
      <MenuProvider>
        <TabStack />
      </MenuProvider>
    );
  }
}

const styles = StyleSheet.create({
  
});