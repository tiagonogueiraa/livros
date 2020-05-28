import React from 'react'
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


import MapLocation from '../components/Map/index'

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
        location : {},
        errorMessage: ''
    }
    
    componentDidMount() {
        UserPermissions.getCameraPermission()
        // this.getLocationM()

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
        
        handlePost = () => {
            
            console.log(this.state)
            
            Fire.shared.addLivro({ text: this.state.text.trim(), localUri: this.state.image, livro: this.state.livro.trim(), sinopse: this.state.sinopse.trim(), autor: this.state.autor.trim(), acao: this.state.acao.trim() }).then(ref => {
                this.setState({ text: "", image: null, livro: "", sinopse: "", autor: "", acao: "" })
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

        if(statusM  !== 'granted'){
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
                {this.state.displayM == true ? <MapLocation style={{ display: this.state.displayM, display: "none", showTheThing: false }} ></MapLocation> : null}
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
    map: {
        flex: 1,
        position: 'relative',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,

    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#1B1B16",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    },
    map: {
        backgroundColor: "blue",
        flex: 10,
        justifyContent: 'center',
        alignItems: 'center',
        // position: 'relative',
        zIndex: 10,
        marginBottom: 30,
        marginTop: -50,
        paddingTop: 150
        // position: 'relative'
    },
    mapApp: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }

})