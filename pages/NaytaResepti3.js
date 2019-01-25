import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import {
  Left,
  Body,
  Title,
  Right,
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Icon,
  List,
  ListItem,
  Grid,
  Row,
  CardItem,
  Col,
} from 'native-base';
import { Font, SQLite } from 'expo';
import { Rating } from 'react-native-elements'

const db = SQLite.openDatabase('reseptit.db');

class NaytaResepti3 extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      resepti: {},
    }; 
  }

  componentDidMount = () => {

  }

  /*
  renderItem = (ainesosa) => {
    return (
      <ListItem icon>
        <Left>
          <Icon name="arrow-dropright" />
        </Left>
        <Body>
          <Text>{ainesosa}</Text>
        </Body>
        <Right />
      </ListItem>
    );
  };
  */

  render() {
    return (
      <Container style={styles.container}>
        <Content avatar style={styles.carditemstyle}>
          <Image source={{ uri: this.props.navigation.state.params.resepti.kuva }} style={styles.image} />
          <Grid style={styles.gridstyle}>
            <Row style={styles.rowstyle}>
              <Text style={styles.otsikkoStyle}>
                {this.props.navigation.state.params.resepti.otsikko}
              </Text>
              <Body></Body>
              <Right style={styles.timeContainer}>
                <Icon name="time" style={{marginRight:5}}></Icon>
                <Text>{this.props.navigation.state.params.resepti.kesto}</Text>
              </Right>
            </Row>
            <Row style={styles.rowstyle}>
              <Text>{this.props.navigation.state.params.resepti.ainesosat}</Text>
            </Row>
            <Row style={styles.rowstyle}>
              <Text>{this.props.navigation.state.params.resepti.ohjeet}</Text>
            </Row>
            <Row style={{justifyContent:"center"}}>
              <Text note>{this.props.navigation.state.params.resepti.paiva}</Text>
            </Row>
          </Grid>
          
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingTop:24,
  },
  image: {
    flex: 1,
    width: 370,
    height: 150,
    alignSelf: 'center',
  },
  gridstyle: {
    margin: 15,
  },
  rowstyle: {
    margin: 10,
  },
  otsikkoStyle: { 
    padding: 10, 
    fontSize: 20, 
    textDecorationLine:"underline"
  },
  timeContainer: {
    flex:1, 
    flexDirection:"row", 
    justifyContent:"center", 
    alignItems:"center",
  },
});

export default NaytaResepti3;
