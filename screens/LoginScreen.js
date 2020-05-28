import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity,  Image, StatusBar, LayoutAnimation  } from 'react-native'

import firebase from 'firebase'

export default class LoginScreen extends React.Component {

  state = {
    email: "",
    password: "",
    errorMessage: null
  }


  static navigationOptions = {
    header: null,
    // title: ''
  }

  handleLogin = () => {
    const { email, password } = this.state

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => this.setState({errorMessage: error.message}))

  }

  render() {
    LayoutAnimation.easeInEaseOut();


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
     

        {/* <Image source={require("../img/logoteste.png")} style={{ width: 40,
        height: 40,
        justifyContent: "center",
        textAlign: "center"
        }}  ></Image> */}
        <Image source={require("../img/logoteste.png")} style={{ marginTop: -30, width: 100, height: 100, backgroundColor:"black"  , marginLeft: "35%"
        }}  ></Image>
        <Text style={styles.greenting}>{`Olá de Novo.\nBem vindo de volta!`}</Text>

        <View style={styles.errorMessage}>
          {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
        </View>

        <View style={styles.form}>

          <View>
            <Text style={styles.inputTitle}>Email</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="nome"
              onChangeText={email => this.setState({ email })}
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

            <TouchableOpacity 
              style={styles.button} onPress={this.handleLogin}
              >
              <Text style={{ color: "#FFF", fontWeight: "500" }} >Entrar</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
              style={{ alignSelf: "center", marginTop: 32 }}
              onPress={ () => this.props.navigation.navigate("Register")}
          >
            <Text style={{ color: "#414959", fontSize: 13 }}>
              Novo aqui? <Text style={{ fontWeight: "500", color: "#E9446A" }}>Cadastre - se</Text>
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 80

  },
  greenting: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center'
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
    marginBottom: 48,
    marginHorizontal: 30
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
    color: "#161F3D"
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: "#1B1B16",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center"
  }

})