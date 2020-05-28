import React, { Component } from 'react';

import { View, Text, StyleSheet } from 'react-native'

import MapView from 'react-native-maps'

import UserPermissions from '../../utilies/UserPermissions'




export default class Map extends React.Component {

    constructor(props){
        
        // this.latitude
        super(props);
        this.state = {
            region : {
                latitude: -21.6723057,
                longitude: -43.4411336,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121
            }
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

        const location = await Location.getCurrentPositionAsync();

        this.setState({
            location
        })


        console.log("location")
        console.log(location)
    }

    
    mudouMapa = (region) => {
        console.log('chamou a funcao')
        console.log(region)
        // console.log(this.state.region)
        console.log(this.state.region)
        let state = this.state
        // state.region = {
        //     latitude: region.latitude,
        //     longitude: region.longitude,
        //     latitudeDelta: 0.015,
        //     longitudeDelta: 0.0121
        // }
    }

    render() {

        const { region } =  this.state;

        return (
            <View style={style.map}>
                <MapView
                    style={style.mapApp}
                    loadingEnabled={true}
                    region={{
                        latitude: -21.6723057,
                        longitude: -43.4411336,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                        //     <Marker
                        //     // coordinate={marker.latlng}
                        //     // title={marker.title}
                        //     // description={marker.description}
                        //   />
                    }}
                    showsUserLocation
                    loadingEnabled

                    onRegionChangeComplete={this.mudouMapa}
                >

                    {/* onPress={e => console.log(e.nativeEvent)} */}
                </MapView>
            </View>
        );

    }


}


const style = StyleSheet.create({

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