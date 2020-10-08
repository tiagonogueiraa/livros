import React, { Component, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput, StatusBar, ImagePickerIOS, ScrollView, Button } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
// import MapView from 'react-native-maps'
// import Marker from 'react-native-maps'
import MapView, { AnimatedRegion, Marker } from 'react-native-maps';

import Contants from "expo-constants"
import * as Permissions from 'expo-permissions';
import Fire from "../Fire"
import * as ImagePicker from 'expo-image-picker'

import UserPermissions from '../utilies/UserPermissions'

import RNPickerSelect from 'react-native-picker-select';


import * as Location from 'expo-location';
import { Dimensions } from 'react-native';

const firebase = require("firebase")
require("firebase/firestore")


export default class PostScreen extends React.Component {

    state = {
        text: "",
        livro: "",
        sinopse: "",
        autor: "",
        acao: "",
        image: null,
        displayM: false,
        location: "",
        latitude: -21.6723057,
        longitude: -43.4411336,
        errorMessage: '',
        region: {
            latitude: -21.6723057,
            longitude: -43.4411336,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
        },
        maker: {    
            latitude: -21.6723057,
            longitude: -43.4411336,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
        },
        coordenadas: {
            latitude: '',
            longitude: ''
        }
        

    }
    
    
    
    
    componentDidMount() {
        UserPermissions.getCameraPermission()
        // Map.mudouMapa()
        this.getLocationM()
        
        
    }
    
    
    
    
    getPhotoPermission = async () => {
        
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        
        if (status != "granted") {
            alert("We need permission to access your camera roll")
        } else {
            // alert("estamos aqui")
        }
        
    }
    
    componentWillMount() {
        this.getLocationM()
    }
    
    
    getLocationM = async () => {
        
        console.log('chamou a funcao de localizacao ')
        const { statusM } = await Permissions.askAsync(Permissions.LOCATION)
        
        console.log('chamou a funcao get loction')
        console.log('statusM')
        console.log(statusM)
        
        if (statusM !== 'granted') {
            console.log('PERMISSION NOT GRANTED!');
            
            this.setState({
                errorMessage: 'PERMISSION NOT GRANTED',
            })
        }
        
    }
    
    
    mudouMapa = (region) => {
        // console.log('location')
        // console.log(region)
        
        setTimeout(() => {
            this.setState({
                latitude: region.latitude
            })
        }, 1000);
        
        
        this.setState({
            region: region
            
        })
        // setState({
            //     latitude: region.latitude,
            // })
            this.setState({
                longitude: "" + region.longitude + "",
            })
            
            console.log('region state ' + region.longitude)
            // location => this.setState({region})
            console.log('state longitude' + this.state.longitude)
            
            console.log('passou o set latitude')
            
        }
        handlePost = async () => {
            
            // console.log('latitude ' + state.latitude)
            // modouMapa()
            await Fire.shared.addLivro({ text: this.state.text.trim(), localUri: this.state.image, livro: this.state.livro.trim(), sinopse: this.state.sinopse.trim(), autor: this.state.autor.trim(), acao: this.state.acao.trim(), location: this.state.location, latitude: this.state.latitude, longitude: this.state.longitude }).then(ref => {
                this.setState({ text: "", image: null, livro: "", sinopse: "", autor: "", acao: "", location: null, latitude: "", longitude: "" })
                this.props.navigation.goBack()
            })
            .catch(error => {
                alert(error)
            })
        }
        
        pickImage = async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3]
            })
            
            if (!result.cancelled) {
                this.setState({ image: result.uri })
            }
        }
        
        getLocationM = async () => {
            
            console.log('chamou a funcao de localizacao ')
            const { statusM } = await Permissions.askAsync(Permissions.LOCATION)
            
            console.log('chamou a funcao get loction')
            console.log('statusM')
            console.log(statusM)
            
            if (statusM !== 'granted') {
                console.log('PERMISSION NOT GRANTED!');
                
                this.setState({
                    errorMessage: 'PERMISSION NOT GRANTED',
                })
            }
            
            const location = await Location.getCurrentPositionAsync();
            
            this.setState({
                location
            })
            
            
            console.log("location")
            console.log(location)
        }
        
        
        getLocation = async () => {
            console.log('chamou a function')
            
            
            this.setState({
                displayM: true
            })
            
            console.log(this.state.displayM)
            
            
            // this.setState.displayM = false
        }
        
        
        
        render() {
            // const { region } = this.state;
            // if(this.state.displayM == true){
                
                const { region, latitude, longitude, maker } = this.state;
                // const [latitude, setLatitude] = useState('');
                // }
                console.log(this.state)
                return (
                    <SafeAreaView style={style.container}>
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

                <View style={style.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Ionicons name="md-arrow-back" size={24} color="#D8D9DB"></Ionicons>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.handlePost}>
                        <Text style={{ fontWeight: "500" }}>Salvar</Text>
                    </TouchableOpacity>

                </View>
                <View style={style.inputContainer}>
                    {/* <Image source={require("../img/womanperfil.jpg")} style={style.avatar}></Image> */}

                    <TextInput
                        autoFocus={true}
                        multiline={true}
                        numberOfLines={1}
                        // style={{ width: '100%' }}
                        placeholder="Livro"
                        onChangeText={livro => this.setState({ livro })}
                        value={this.state.livro}
                    ></TextInput>
                    <TextInput
                        autoFocus={true}
                        multiline={true}
                        numberOfLines={3}
                        // style={{ width: '100%' }}
                        placeholder="Sinopse"
                        onChangeText={sinopse => this.setState({ sinopse })}
                        value={this.state.sinopse}
                    ></TextInput>
                    <TextInput
                        autoFocus={true}
                        multiline={true}
                        numberOfLines={3}
                        // style={{ width: '100%' }}
                        placeholder="Autor"
                        onChangeText={autor => this.setState({ autor })}
                        value={this.state.autor}
                    ></TextInput>
                    <RNPickerSelect
                        onValueChange={(acao) => this.setState({ acao })}
                        value={this.state.acao}
                        items={[
                            { label: 'Doar', value: 'Doar' },
                            { label: 'Procurar', value: 'Procurar' },
                        ]}
                    />

                    <TouchableOpacity style={style.photo} onPress={this.pickImage}>
                        <Ionicons name="md-camera" size={32} color="#D8D9DB"></Ionicons>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.photo} onPress={this.getLocation}>
                        <Ionicons name="md-map" size={32} color="#D8D9DB"></Ionicons>
                    </TouchableOpacity>

                    <View style={{ marginHorizontal: 32, marginTop: 32, height: 150 }}>
                        <Image source={{ uri: this.state.image }} style={{ width: "100%", height: "100%" }}></Image>
                    </View>


                </View>

                {this.state.displayM ? <View style={style.map}>
                    <MapView
                        style={style.mapApp}
                        loadingEnabled={true}
                        initialRegion={{
                        //    latitude: -21.6723057,
                        //             longitude: -43.4411336,
                            latitude: latitude,
                            longitude: longitude,
                            latitudeDelta: 0.0042,
                            longitudeDelta: 0.0031
                        
                        }}
                        annotations={region}
                        // showsUserLocation
                        // loadingEnabled

                    >

                             <MapView.Marker
                                        draggable
                                        // onDragEnd={(t, map, coords) => { 
                                        //     // this.setState(coordenadas)
                                        //     console.log(coords)
                                        //     console.log(t)
                                        //     console.log(map)
                                        // }}
                                        onDragEnd={(coords)=>{
                                            console.log('coordeandas'+coords.LatLng)
                                            console.log(coords.nativeEvent.coordinate.latitude)
                                            console.log(coords.nativeEvent.coordinate.longitude)
                                            this.setState({latitude : coords.nativeEvent.coordinate.latitude})
                                            this.setState({longitude : coords.nativeEvent.coordinate.longitude})
                                           
                                        }}
                                coordinate={{
                                    latitude: -21.6723057,
                                    longitude: -43.4411336,
                                }}
                              /> 


{/* <MapView.Marker.Animated
        ref={marker => { this.marker = marker }}
        coordinate={this.state.region}
      /> */}
                        </MapView>
                                <ScrollView
                                    style={style.placesContainer}
                                    horizontal
                                    // showHorizontalScrollIndicator={false}
                                    // pagingEnabled
                                >
                                    <View style={style.place}></View>
                                    <View style={style.place}></View>
                                    

                                </ScrollView>

                <Button title="clique aqui" />    

                </View>
                    : null}

          
            </SafeAreaView>
        )
    }
}

const { height, width } = Dimensions.get('window');


const style = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 25,
        zIndex: 1
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#D8D9DB"
    },
    inputContainer: {
        flex: 1,
        margin: 32,
        flexDirection: "column"
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 16
    },
    photo: {
        alignItems: "flex-end",
        marginHorizontal: 32
    },
    map: {
       

    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#1B1B16",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonMap: {
        // alignItems: "flex-end",
        zIndex: 150,
      
        backgroundColor: "#1B1B16",
        borderRadius: 4,
        height: 52,
        position: "absolute",
     
    },
    map: {
        backgroundColor: "red",
        flex: 1,
        // flexDirection: 'column',
        // justifyContent: 'center',
        // alignItems: 'center',
        // position: 'relative',
        // zIndex: 99,
        // marginBottom: 30,
        // marginTop: -50,
        // paddingTop: 150
        position: 'absolute',
        // alignSelf: "stretch",
        height: "80%",
        width: "90%",
        marginVertical: 75,
        marginHorizontal: 10,
        // marginRight: 500    

    },
    mapApp: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    // map: {
    //     backgroundColor: "blue",
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     // position: 'relative',
    //     zIndex: 15,
    //     marginBottom: 30,
    //     marginTop: -50,
    //     paddingTop: 150
    //     // position: 'relative'
    // },
    mapApp: {
        position: 'absolute',
        top: 0,
        zIndex: 100,
        left: 0,
        right: 0,
        bottom: 75
    },
    placesContainer: {
        width: '100%',
        maxHeight: 200
    },

    place: {
        width: width -40,
        maxHeight: 200,
        backgroundColor: '#FFF',
        marginHorizontal: 20,
    }


})