import React, { Component } from 'react';
import { View, StyleSheet, Image, ImageBackground } from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Icon,
  List
} from 'native-base';
import Swiper from 'react-native-swiper';

class Etusivu extends Component {
  render() {
    return (
      <ImageBackground source={require("../img/wood.jpg")} style={styles.sitruuna}>
        <View style={styles.container}>
          <Swiper style={styles.wrapper}>
            <View style={styles.slide}>
              <Text style={styles.text}>Tervetuloa</Text>
            </View>
            <View style={styles.slide}>
              <Image source={require('../img/hamppari.jpg')} style={styles.image}/>
            </View>
            <View style={styles.slide}>
              <Text style={styles.text}>Kokkaa,</Text>
              <Text style={styles.text}>nauti,</Text>
              <Text style={styles.text}>herkuttele!</Text>
            </View>
            <View style={styles.slide}>
              <Image source={require('../img/pizza.jpg')} style={styles.image}/>
            </View>
          </Swiper>
        </View>
      </ImageBackground>
    );
  }
}
 
const styles = StyleSheet.create({
  sitruuna: {
    flex:1,
    flexDirection: 'row',
    width:null,
    height:null,
    paddingTop: 25,
    justifyContent:"center",
    resizeMode:"cover",
  },
  container:{
    flex:1,
    height:400,
    width:300,
    justifyContent:'center',
    marginTop:70,
  },
  wrapper: {
    height:400,
    width:300,
    alignSelf:"center",
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
  },
  image: {
    width: 300,
    height: 400,
    alignSelf: 'center',
  },
});

export default Etusivu;