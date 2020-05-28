import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput, StatusBar, ImagePickerIOS } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import MapView from 'react-native-maps'

import Contants from "expo-constants"
import * as Permissions from 'expo-permissions';
import Fire from "../Fire"
import * as ImagePicker from 'expo-image-picker'

import UserPermissions from '../utilies/UserPermissions'

import RNPickerSelect from 'react-native-picker-select';

const firebase = require("firebase")
require("firebase/firestore")

export default class PostScreen extends React.Component {
    state = {
        text: "",
        livro: "",
        sinopse: "",
        autor: "",
        acao: "",
        image: null
    }

    componentDidMount() {
        UserPermissions.getCameraPermission()
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

    }

    handlePost = () => {

        console.log(this.state)

        Fire.shared.addLivro({ text: this.state.text.trim(), localUri: this.state.image, livro: this.state.livro.trim(), sinopse: this.state.sinopse.trim(), autor: this.state.autor.trim(), acao: this.state.acao.trim()  }).then(ref => {
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
                        <Text style={{ fontWeight: "500" }}>Postar</Text>
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
                        onValueChange={(acao) => this.setState({acao})}
                        value={this.state.acao}
                        items={[
                            { label: 'Doar', value: 'Doar' },
                            { label: 'Procurar', value: 'Procurar' },                            
                        ]}
                    />

                    <TouchableOpacity style={style.photo} onPress={this.pickImage}>
                        <Ionicons name="md-camera" size={32} color="#D8D9DB"></Ionicons>
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
            </SafeAreaView>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 25
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
      }

})