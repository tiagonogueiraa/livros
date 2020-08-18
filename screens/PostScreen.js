import React, { Component, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput, StatusBar, ImagePickerIOS } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import MapView from 'react-native-maps'
import Marker from 'react-native-maps'

import Contants from "expo-constants"
import * as Permissions from 'expo-permissions';
import Fire from "../Fire"
import * as ImagePicker from 'expo-image-picker'

import UserPermissions from '../utilies/UserPermissions'

import RNPickerSelect from 'react-native-picker-select';


import * as Location from 'expo-location';


// import MapLocation from '../components/Map/index'

// import MapView from 'react-native-maps'

// import UserPermissions from '../utilies/UserPermissions'


// import { MapView } from 'react-native-maps';

const firebase = require("firebase")
require("firebase/firestore")


//  mudouMapa = () => {
//     console.log('chamou a funcao')
//     // console.log(region)
//     // console.log(this.state.region)
//     // console.log(this.state.region)
//     // let state = this.state
//     // state.region = {
//     //     latitude: region.latitude,
//     //     longitude: region.longitude,
//     //     latitudeDelta: 0.015,
//     //     longitudeDelta: 0.0121
//     // }
// }

// function YourApp() {

//     state = {
//         region : {
//             latitude: -21.6723057,
//             longitude: -43.4411336,
//             latitudeDelta: 0.015,
//             longitudeDelta: 0.0121
//         }
//     }

// componentDidMount() {
// getLocation();

// }

// render(){

// const { region } = this.state;

//     return (
//         <View style={style.map}>
//         <MapView  
//             style={style.mapApp}
//             loadingEnabled={true}
//             region={{
//                 latitude: -21.6723057,
//                 longitude: -43.4411336,
//                 latitudeDelta: 0.015,
//                 longitudeDelta: 0.0121,
//                 //     <Marker
//                 //     // coordinate={marker.latlng}
//                 //     // title={marker.title}
//                 //     // description={marker.description}
//                 //   />
//             }}
//             showsUserLocation
//             loadingEnabled

//             onRegionChangeComplete={this.mudouMapa()}
//             >

//             {/* onPress={e => console.log(e.nativeEvent)} */}
//         </MapView>
//     </View>
// );
// }
// }


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
        latitude: "",
        longitude: "",
        errorMessage: '',
        region: {
            latitude: -21.6723057,
            longitude: -43.4411336,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
        },

    }

    componentDidMount() {
        UserPermissions.getCameraPermission()
        // Map.mudouMapa()
        this.getLocationM()

        // UserPermissions.getLocationPermission()

        // UserPermissions.getLocationM()
    }

    // componentWillMount(){
    //     this.getLocationM()
    // }


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

    }

    componentWillMount() {
        this.getLocationM()
    }

    // getLocationPermission = async () => {

    //     // const permissionLocation = await Permission.askAsync(Permission.LOCATION)
    //     // console.log('permissão abaixo')
    //     // console.log(permissionLocation)

    //     let { statusM } = await Permissions.askAsync(Permissions.LOCATION);
    //     if(statusM === 'granted') {
    //         // this.getLocation();
    //         alert('Precisamos da permissão para acesso a localização')
    //     } 

    // }

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

        //    var location = await Location.getCurrentPositionAsync();

        //      location = this.setState({
        //         location
        //     })


        //     console.log("location latitude")
        // console.log(location.latitude)
    }


    mudouMapa = async (region) => {
        console.log('chamou a funcao')
        // console.log(state)
        // console.log(region)
        // console.log(this.state.region)
        // console.log(this.state.region)
        // let state = this.state


        // this.state.region = this.setState({
        //     region
        // })

        console.log('location')
        console.log(region)

        setTimeout(() => {
            this.setState({
                latitude: region.latitude
            })
        }, 1000);

        // this.setState({region: region})


        //     this.setState({location: region.json()})
        //     this.setState({longitude: region.longitude})
        //     this.state.latitude =  region.latitude
        //     this.setState({latitude: region.latitude})
        //   this.state.longitude = region.longitude



        //     // console.log('location2')
        //     // console.log(this.state.location)        
        //     // console.log(this.state.location)        
        //     // console.log(this.state.location)        

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

        // const [latitude, setLatitude] = useState('');

        // setLatitude(""+region.Content[1]+"")
        console.log('passou o set latitude')
        //     location => this.setState({region})
        //     console.log('thisstate region.longitude'+ this.state.longitude)

        // this.state.location = region
        // // console.log(this.state.location)

        // this.setState({location: region})

        // console.log(this.state.location)
        // // this.setState.location = state.region
        // location => this.setState({ location })
        // // console.log('state location')
        // // console.log(location)
        // console.log(location)
        // state.region = {
        //     latitude: region.latitude,
        //     longitude: region.longitude,
        //     latitudeDelta: 0.015,
        //     longitudeDelta: 0.0121
        // }
    }
    handlePost = () => {

        console.log(this.state)
        console.log('teste handlepost')
        console.log("sinopse")
        console.log(this.state.sinopse)
        console.log("location")
        console.log(this.state.location)
        console.log("location props")
        console.log(this.props.location)
        console.log(this.props.latitude)
        console.log(this.state.latitude)
        // console.log('latitude ' + state.latitude)
        // modouMapa()
        Fire.shared.addLivro({ text: this.state.text.trim(), localUri: this.state.image, livro: this.state.livro.trim(), sinopse: this.state.sinopse.trim(), autor: this.state.autor.trim(), acao: this.state.acao.trim(), location: this.state.location, latitude: this.state.latitude, longitude: this.state.longitude.trim() }).then(ref => {
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

        const { region } = this.state;

        // }
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

                    {/* <TextInput
                        // autoFocus={true}
                        // multiline={true}
                        hidden={true}
                        // numberOfLines={1}
                        // style={{ width: '100%' }}
                        // placeholder="Livro"
                        onChangeText={location => this.setState({ location })}
                        value={this.state.location}
                    ></TextInput> */}
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
                        region={{
                            latitude: region.latitude,
                            longitude: region.longitude,
                            latitudeDelta: region.latitudeDelta,
                            longitudeDelta: region.longitudeDelta
                            //     <Marker
                            //     // coordinate={marker.latlng}
                            //     // title={marker.title}
                            //     // description={marker.description}
                            //   />
                        }}
                        showsUserLocation
                        loadingEnabled

                        onRegionChangeComplete={this.mudouMapa}
                    // onRegionChangeComplete={ location => this.setState({region})}
                    >

                        {/* onPress={e => console.log(e.nativeEvent)} */}
                    </MapView>

                    {/* <TouchableOpacity style={style.photo} onPress={this.pickImage}>
                        <Ionicons name="md-camera" size={32} color="#D8D9DB"></Ionicons>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.photo} onPress={this.getLocation}>
                        <Ionicons name="md-map" size={32} color="#D8D9DB"></Ionicons>
                    </TouchableOpacity> */}
                    <TouchableOpacity
                        style={style.buttonMap} onPress={() => Fire.shared.signOut()}
                    >
                        <Text style={{ color: "#FFF", fontWeight: "500" }} >Sair</Text>
                    </TouchableOpacity>
                </View>
                    : null}

                {/* <MapView
    style={style.map}
    loadingEnabled={true}
    region={{
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
    }}
   ></MapView> */}

                {/*  this.state.content ? <Text style= {styles.headerText}> Hello Friends </Text> : null */}

                {/* {this.state.displayM == true ? <YourApp style={{ display: this.state.displayM, display: "none", showTheThing: false }} ></YourApp> : null} */}
                {/* {this.state.displayM == true ? <MapLocation style={{ display: this.state.displayM, display: "none", showTheThing: false }} ></MapLocation> : null} */}
            </SafeAreaView>
        )
    }
}

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
    // map: {
    //     // flex: 1,
    //     // position: 'relative',
    //     // top: 0,
    //     // left: 0,
    //     // right: 0,
    //     // bottom: 0,

    // },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#1B1B16",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonMap: {
        alignItems: "flex-end",
        zIndex: 150,
        // marginHorizontal: 30,
        backgroundColor: "#1B1B16",
        borderRadius: 4,
        height: 52,
        position: "absolute",
        // marginTop: "-90%"
        // alignItems: "center",
        // justifyContent: "center"
    },
    map: {
        backgroundColor: "blue",
        flex: 1,
        // flexDirection: 'column',
        // justifyContent: 'center',
        // alignItems: 'center',
        // position: 'relative',
        zIndex: 99,
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
    // mapApp: {
    //     position: 'absolute',
    //     top: 0,
    //     left: 0,
    //     right: 0,
    //     bottom: 0
    // },
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
    }


})