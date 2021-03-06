import React, { Component } from 'react';
import { View, StyleSheet, Image, Alert, ImageBackground, ScrollView, KeyboardAvoidingView } from 'react-native';
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
} from 'native-base';
import DatePicker from 'react-native-datepicker';
import { SQLite, Permissions, ImagePicker } from 'expo';

const db = SQLite.openDatabase('reseptit.db');

class MuokkaaReseptia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kuva: null,
      otsikko: '',
      paiva: this.teePaiva(),
      ainesosat: '',
      ohjeet: '',
      kesto: '',
    },
    this.muokkaa = this.muokkaa.bind(this);
    this.kasitteleTyhjenna = this.kasitteleTyhjenna.bind(this);
    this.validoi = this.validoi.bind(this);
  }

  componentDidMount = () => {
    this.setState({otsikko:this.props.navigation.state.params.resepti.otsikko});
    this.setState({paiva:this.props.navigation.state.params.resepti.paiva});
    this.setState({ainesosat:this.props.navigation.state.params.resepti.ainesosat});
    this.setState({ohjeet:this.props.navigation.state.params.resepti.ohjeet});
    this.setState({kesto:this.props.navigation.state.params.resepti.kesto});
    this.setState({kuva:this.props.navigation.state.params.resepti.kuva});
    this.setState({id:this.props.navigation.state.params.resepti.id});
  };

  teePaiva = () => {
    let tanaan = new Date();
    let kuukausi = tanaan.getMonth() + 1;
    if (kuukausi < 10) {
      kuukausi = '0' + kuukausi;
    }
    let paiva = tanaan.getDate();
    if (paiva < 10) {
      paiva = '0' + paiva;
    }
    let pvm = paiva + '.' + kuukausi + '.' + tanaan.getFullYear();
    return pvm;
  };

  validoi() {
    if(this.state.otsikko !=='' && this.state.ainesosat !=='' && this.state.ohjeet !=='' && this.state.kesto !=='' && this.state.paiva !== '') {
      this.muokkaa();
    } else {
      Alert.alert('Huomio!','Täytä tyhjät kentät');
    }
  }

  muokkaa() {
    db.transaction(tx => {
      let sql = 'UPDATE resepti SET otsikko =?, paiva=?, ainesosat=?, ohjeet=?, kuva=?, kesto=? WHERE id=?'
      tx.executeSql(
        sql,
        [
          this.state.otsikko,
          this.state.paiva,
          this.state.ainesosat,
          this.state.ohjeet,
          this.state.kuva,
          this.state.kesto,
          this.props.navigation.state.params.resepti.id
        ],
        this.props.navigation.navigate('Tab', { }),
        //this.ok,
        this.virhe
      );
    });
  }

  ok = () => {
    Alert.alert("Jee", "Muokkaus onnistui")
  }

  virhe = () => {
    Alert.alert("Huom","Muokkaus ei onnistunut");
  }

  kasitteleTyhjenna() {
    this.setState({
      kuva: null,
      otsikko: '',
      paiva: this.teePaiva(), 
      ainesosat: '',
      ohjeet: '',
      kesto: '',
    });
    Alert.alert("",'Tyhjennetty');
  }

  askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
  }

  otaKuva = async () => {
    await this.askPermissionsAsync();

    let result = await ImagePicker.launchCameraAsync({
      base64: true,
    });

    if (!result.cancelled) {
      this.setState({ kuva: result.uri });
    }
  };

  
  haeKuva = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
    });

    if (!result.cancelled) {
     this.setState({ kuva: result.uri });
    }
  };

  render() {
    return (
      <Container>
      <ImageBackground source={require("../img/wood.jpg")} style={styles.sitruuna}>
        <KeyboardAvoidingView behavior="padding" enabled>
        
          <ScrollView>
          <View style={styles.buttonContainer}>
            <Button iconLeft
              light
              rounded
              style={styles.button}
              onPress={this.otaKuva}>
              <Icon name="camera" style={styles.buttonColor}/>
              <Text style={styles.buttonColor}>Ota kuva</Text>
            </Button>
            <Button iconLeft
              light
              rounded
              style={styles.button}
              onPress={this.haeKuva}>
              <Icon name="attach" style={styles.buttonColor}/>
              <Text style={styles.buttonColor}>Hae kuva</Text>
            </Button>
          </View>
          <View style={styles.formContainer}>
          {this.state.kuva &&
            <Image source={{ uri: this.state.kuva }} style={styles.image} />}
          <Form>
            <View> 
            <Item inlineLabel >
              <Input
                placeholder="Otsikko"
                value={this.state.otsikko}
                onChangeText={text => this.setState({ otsikko: text })}
              />
            </Item>
            <Item inlineLabel >
              <Input
                placeholder="Kesto"
                value={this.state.kesto}
                onChangeText={text => this.setState({ kesto: text })}
                multiline={true}
                style={{ height: 50 }}
              />
            </Item>
            <Item inlineLabel>
              <Input
                placeholder="Ainesosat"
                value={this.state.ainesosat}
                onChangeText={text => this.setState({ ainesosat: text })}
              />
            </Item>
            <Item inlineLabel>
              <Input
                placeholder="Ohjeet"
                value={this.state.ohjeet}
                onChangeText={text => this.setState({ ohjeet: text })}
                multiline={true}
                style={{ height: 100 }}
              />
            </Item>
            <Item inlineLabel>
              <Label>  Päivä</Label>
              <Text>{this.state.paiva}</Text>
              <DatePicker
                style={{ width: 200, flex: 1, paddingBottom: 5 }}
                date={this.state.paiva}
                mode="date"
                placeholder="Valitse päivä"
                format="DD.MM.YYYY"
                confirmBtnText="OK"
                cancelBtnText="Peruuta"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    right: 0,
                    width:0,
                    height:0,
                  },
                  dateInput: {
                    display: 'none',
                  },
                  btnTextConfirm: {
                    color: 'pink'
                  }
                }}
                onDateChange={date => {
                  this.setState({ paiva: date });
                }}
              />
            </Item>
            </View>
            
          </Form>
          </View>
          <View style={styles.buttonContainer}>
              <Button
                light
                rounded
                iconLeft
                style={styles.button}
                onPress ={this.validoi}>
                <Icon name="checkmark" />
                <Text>Tallenna resepti</Text>
              </Button>
              <Button
                light
                rounded
                iconLeft
                style={[styles.button,{marginBottom:10}]}
                onPress={this.kasitteleTyhjenna}>
                <Icon name="trash" style={styles.buttonColor}/>
                <Text style={styles.buttonColor}>Tyhjennä kentät</Text>
              </Button>
            </View>
          </ScrollView>
        </KeyboardAvoidingView >
        </ImageBackground>
      </Container>
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
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  formContainer: {
    backgroundColor:"white", 
    paddingTop:15, 
    marginTop:10, 
    borderWidth:1
  },
  image: {
    flex: 1,
    width: 330,
    height: 150,
    alignSelf: 'center', // Keskittää yksittäisen komponentin
    borderWidth:1,
    borderColor:"black",
  },
  button: {
    height: 45,
    width: 300,
    marginRight: 10,
    marginTop: 10,
    justifyContent: 'center', // ikonien vuoksi
    color: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 1,
    borderColor:'rgba(52, 52, 52, 1)',
  },
  buttonColor: {
    color:'rgba(52, 52, 52, 1)',
  }
});

export default MuokkaaReseptia;