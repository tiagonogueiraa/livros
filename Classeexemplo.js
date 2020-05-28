
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      data: 'Jordan Belfort'
    }
  }

  getData(){
    setTimeout(() => {
      console.log('Our data is fetched');
      this.setState({
        data: 'Hello WallStreet'
      })
    }, 3000)
  }

  componentDidMount(){
    this.getData();
  }

  render() {
    return(
      <View>
        <Text style={{marginTop: 25}}>
          
      {this.state.data}

        </Text>
    </View>
    )
  }
}

export default App;