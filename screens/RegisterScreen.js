import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar } from 'react-native'

import { Ionicons } from '@expo/vector-icons'
import firebase from 'firebase'

import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import Fire from '../Fire'
import UserPermissions from '../utilies/UserPermissions'


// const firebase = require("firebase")

// require("firebase/firestore")
// import firebaseKeys from ".firebaseConnection"

export default class RegisteScreen extends React.Component {

  state = {

    user: {
      name: "",
      email: "",
      password: "",
      avatar: null
    },      
    errorMessage: null,
    // image: null
  }


  static navigationOptions = {
    header: null,
    // title: ''
  }

  componentDidMount() {
    this.getPhotoPermission();
  }

  getPhotoPermission = async () => {
    // const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // const { status: cameraRollPermission } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // if(Contants.platform.ios){
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)

    if (status != "granted") {
      alert("We need permission to access your camera roll")
    } else {
      // alert("estamos aqui")
    }
    // }


    // let { locationStatus } = await Permissions.askAsync(Permissions.LOCATION);
    // console.log("locationStatus in askPermission ", locationStatus)
    // if (locationStatus === 'granted') {
    //      console.log("locationStatus granted")
    //   }
  }

  getFoto = () => {
    console.log('clicou no add imagem')
  }

  pickImage = async () => {

    UserPermissions.getCameraPermission();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,3]
    })

    if(!result.cancelled){
      this.setState({user: {...this.state.user, avatar: result.uri}})
    }
 

    console.log(`chamou a funcao pickimage`)
    console.log(this.state.image)
    console.log(result.uri)
    console.log(image)
  }


  handleCreate = () => {
    const { email, password, name, image } = this.state
    // console.log(state)
    console.log('image da funcao handlecreate')
    console.log(image)

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCrendentials => {
        return userCrendentials.user.updateProfile({
          displayName: name,
          // photoURL: this.state.image
        })


      })
      .catch(error => this.setState({ errorMessage: error.message }))

    //inserir imagem

    // Fire.shared.addPhotoPerfil({ localUri: this.state.image }).then(ref => {
    //   this.setState({ image: null })
    // }).catch(error => {
    //   alert(error)
    // })


  }


  render() {
    return (
      <View style={styles.container}>
        {/* <StatusBar barStyle="light-content"></StatusBar>*/}
        <StatusBar
          barStyle="dark-content"
          // dark-content, light-content and default
          hidden={false}
          //To hide statusBar
          backgroundColor="#00BCD4"
          // Background color of statusBar
          translucent={false}
          //allowing light, but not detailed shapes
          networkActivityIndicatorVisible={true}
        />
        {/* <Image source={require("../img/logoteste.png")} style={{ marginTop: -30, width: 100, height: 100, backgroundColor:"black"  , marginLeft: "35%"
        }}  ></Image> */}
        <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
          <Ionicons name="ios-arrow-round-back" size={18} color="#FFF"></Ionicons>
        </TouchableOpacity>
        <View style={styles.centro}>
          <View style={{ position: "absolute", alignItems: "center", width: "100%" }}>
            <Text style={styles.greenting}>{`Olá! Bem vindo! Cadastre para começar.`}</Text>
            <TouchableOpacity style={styles.avatarPlaceholder} onPress={this.pickImage}>
              <Image source={{uri: this.state.user.avatar}}  style={styles.avatar} />
              <Ionicons 
                  nome="ios-add" 
                  size={40} 
                  color="black" 
                  style={{ marginTop: 6, marginLeft: 2 }}
                  ></Ionicons>
              {/* <Image source={{ uri: this.state.image }} style={{ width: "100%", height: "100%", borderRadius: 50, marginTop: -64 }}></Image> */}
            </TouchableOpacity>
     
          </View>



          <View style={styles.errorMessage}>
            {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
          </View>

          <View style={styles.form}>

            <View>
              <Text style={styles.inputTitle}>Nome</Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                onChangeText={name => this.setState({ name })}
                value={this.state.name}
              ></TextInput>
            </View>

            <View style={{ marginTop: 32 }}>
              <Text style={styles.inputTitle}>
                Email</Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                onChangeText={email => this.setState({ email })}
                keyboardType='email-address'
                value={this.state.email}
              ></TextInput>
            </View>

            <View style={{ marginTop: 32 }}>
              <Text style={styles.inputTitle}>Senha</Text>
              <TextInput
                style={styles.input}
                secureTextEntry
                autoCapitalize="none"
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
              ></TextInput>
            </View>

            <View style={{ marginTop: 32 }}>

              <TouchableOpacity style={styles.button} onPress={this.handleCreate}>
                <Text style={{ color: "#FFF", fontWeight: "500" }} >Entrar</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={{ alignSelf: "center", marginTop: 32 }}
              onPress={() => this.props.navigation.navigate("Login")}

            >
              <Text style={{ color: "#414959", fontSize: 13 }}>
                Novo aqui? <Text style={{ fontWeight: "500", color: "#E9446A" }}>Cadastre - se</Text>
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  centro: {
    flex: 1,
    marginTop: 30
  },
  greenting: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    color: "#E9446A"
  },
  errorMessage: {
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30
  },
  error: {
    color: "#E9446A",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center"
  },
  form: {
    marginBottom: 80,
    paddingTop: 15,
    marginHorizontal: 30,
    flex: 1,
    marginVertical: 80
  },
  inputTitle: {
    color: "#8ABF9E",
    fontSize: 10,
    textTransform: "uppercase"
  },
  input: {
    borderBottomColor: "#BABF9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    // color: "#161F3D"
  },
  button: {
    marginHorizontal: 30,
    // backgroundColor: "#E9446A",
    backgroundColor: "#1B1B16",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center"
  },
  back: {
    position: "absolute",
    top: 27,
    left: 15,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(21,22,48,0.1)",
    alignItems: "center",
    justifyContent: "center"
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: "#E1E2E6",
    borderRadius: 50, 
    marginTop: 1,
    // marginBottom: 1200,
    justifyContent: "center",
    alignItems: "center"
  },
  avatar: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    
  },


})