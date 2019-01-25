import React, { Component } from 'react';
import { Image, StyleSheet, View, ScrollView, ImageBackground } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, ListItem, List, Grid, Row } from 'native-base';
import {SQLite} from 'expo';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { Divider } from 'react-native-elements'

const db = SQLite.openDatabase('reseptit.db');

class Reseptilista2 extends Component {
  constructor(props) {
    super(props);
    this.state = { reseptit: [] };
  }

  componentDidMount = () => {

    db.transaction(tx => {
      let sql =
        'CREATE TABLE if not exists resepti (' +
        'id integer PRIMARY KEY NOT NULL, ' +
        'otsikko text NOT NULL, ' +
        'paiva date NOT NULL, ' +
        'ainesosat text, ' +
        'ohjeet text NOT NULL, ' +
        'kuva blob, ' +
        'kesto text NOT NULL)';

      tx.executeSql(sql, null, null, this.virhe);
    });

  };

  haeReseptit = () => {
    db.transaction(tx => {
      tx.executeSql('select * from resepti', null, this.ok, this.virhe);
    });
  };

  ok = (tx, results) => {
    this.setState({ reseptit: results.rows._array });
  };

  virhe = (tx, error) => {
    alert('Reseptien listaus ei onnistunut');
  };

  poista = (id) => {
    db.transaction(tx => {
      tx.executeSql(
        'delete from resepti where id=?',
        [id],
        null,
        null
      );
    });
  };

  /*
  ifLiked = () => { 
    this.setState({
      reseptiendata[0].tykatty:true,
      icon: "ios-heart",
    })
  }
  */

  /*
  <View style={{flex:1}}>
            <Image source={{ uri: resepti.kuva }} style={styles.image}/>
            <View style={{height:40, position: 'absolute', top: 130, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor:"rgba(52, 52, 52, 0.8)", flexDirection:"row"}}>
              <Text style={styles.otsikko}>{resepti.otsikko}</Text>
              <Button 
                rounded
                icon
                onPress={() => this._ifLiked}
                style={styles.button}>
                <Icon name={this.state.icon} />
              </Button>
            </View>
          </View>
  */


  renderItem = (resepti) => {
    return (
        <Card style={styles.card}>
          <CardItem cardBody >
            <Image source={{ uri: resepti.kuva }} style={styles.image}/>
          </CardItem>
          <CardItem cardBody style={{height:40}} > 
            <Left>
              <Menu>
                <MenuTrigger customStyles={triggerStyles}>
                  <Icon name="create" />
                </MenuTrigger>
                <MenuOptions customStyles={optionsStyles}>
                  <MenuOption onSelect={() => this.props.navigation.navigate('Muokkaa', { resepti: resepti })} text='Muokkaa' />
                  <Divider style={{ backgroundColor: 'grey' }} />
                  <MenuOption onSelect={() => this.poista(resepti.id)} >
                    <Text style={{color: 'red'}}>Poista</Text>
                  </MenuOption>
                </MenuOptions>
              </Menu>
            </Left>
            <Body style={{ justifyContent:"center", paddingLeft:50, marginRight:10}}>
            <Text style={styles.otsikko}>{resepti.otsikko}</Text>
            </Body>
            <Right>
              <Button transparent style={{width:40, paddingLeft:10}}
              onPress={() =>
          this.props.navigation.navigate('Resepti', { resepti: resepti })}>
                <Icon name="arrow-round-forward" style={styles.iconStyle}/>
              </Button>
            </Right>
          </CardItem>
        </Card>
     
    );  
  };

  render() {
    this.haeReseptit();
    if (this.state.reseptit.length === 0) {
      return (
      <ImageBackground source={require("../img/wood.jpg")} style={styles.sitruuna}>
        <Content style={{flex:1, justifyContent:"center"}}>
          <Text style={{alignSelf:"center"}}>Ei reseptejä!</Text>
        </Content>
      </ImageBackground>
      );
    }
    return (
      <ImageBackground source={require("../img/wood.jpg")} style={styles.sitruuna}>
        <Content>
          <List dataArray={this.state.reseptit} renderRow={this.renderItem} />
        </Content>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  sitruuna: {
    flex:1,
    width:null,
    height:null,
    resizeMode:"cover",
    paddingTop:25,
  },
  card:{
    width:"95%",
    alignSelf:"center",
  },
  image: {
    height: 170,
    width: null,
    flex:1,
    borderWidth:3,
    borderColor:"white"
  },
  otsikko: { 
    fontSize:20,
    color:"black",
  },
  iconStyle: {
    color:'rgba(52, 52, 52, 1)',
    fontSize:25,
  },
  
});

const triggerStyles = {
  triggerOuterWrapper: {
    padding: 10,
    flex: 1,
  },
  triggerWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
};

const optionsStyles = {
  optionsContainer: {
    backgroundColor: 'white',
    padding: 5,
    borderWidth:1,
    borderColor:"black",
  },
  optionWrapper: {
    backgroundColor: 'white',
    margin: 5,
  },
  optionText: {
    color: 'black',
    fontSize:16,
  },
};

export default Reseptilista2;