import React, { Component } from 'react';
import { Text, View } from 'react-native';

class Greeting extends Component {
  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <Text>Hello {this.props.texto}!</Text>
      </View>
    );
  }
}

export default class LotsOfGreetings extends Component {

  componentDidMount(){
    // Toggle the state every second
    setInterval(() => (
      this.setState(previousState => (
        { a: !previousState.a }
      ))
    ), 1000);
  }

  //state object
  state = { a: true };

  render() {
    if (!this.state.a) {
      return null;
    }
  
  
  // render() {




    return (
      <View style={{alignItems: 'center', top: 50}}>
        <Greeting name='Rexxar' />
        <Greeting name='Jaina' texto='texto' />
        <Greeting name='Valeera' />
      </View>
    );
  }
}
