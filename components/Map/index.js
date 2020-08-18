// import React, { Component, useState } from 'react';

// import { View, Text, StyleSheet } from 'react-native'

import MapView from 'react-native-maps'

import UserPermissions from '../../utilies/UserPermissions'




// export default class Map extends React.Component {
    
//     // const location = useState('');
    
//     // constructor(props) {
        
//         // this.latitude
//         // super(props);
//         state = {
//             region: {
//                 latitude: -21.6723057,
//                 longitude: -43.4411336,
//                 latitudeDelta: 0.015,
//                 longitudeDelta: 0.0121
//             },
  
//         }
//         // }
        
        
//         componentWillMount() {
//             this.getLocationM()
//         }
        
//         getLocationM = async () => {
            
//             console.log('chamou a funcao de localizacao ')
//             const { statusM } = await Permissions.askAsync(Permissions.LOCATION)
            
//             console.log('chamou a funcao get loction')
//             console.log('statusM')
//             console.log(statusM)
            
//             if (statusM !== 'granted') {
//                 console.log('PERMISSION NOT GRANTED!');
                
//                 this.setState({
//                     errorMessage: 'PERMISSION NOT GRANTED',
//                 })
//             }
            
//             //    var location = await Location.getCurrentPositionAsync();
            
//             //      location = this.setState({
//                 //         location
//                 //     })
                
                
//                 //     console.log("location latitude")
//                 // console.log(location.latitude)
//             }
            
            
//             mudouMapa = async (region) => {
//                 console.log('chamou a funcao')
//                 // console.log(state)
//                 // console.log(region)
//                 // console.log(this.state.region)
//                 // console.log(this.state.region)
//                 // let state = this.state
                
                
//                 // this.state.region = this.setState({
//                     //     region
//                     // })
                    
//                     console.log('location')
//                     console.log(region)

//                     setTimeout(() => {
//                         this.setState({
//                             latitude: region.latitude
//                         })
//                     }, 1000);
                    
//                     // this.setState({region: region})
                    

//                     //     this.setState({location: region.json()})
//                     //     this.setState({longitude: region.longitude})
//                     //     this.state.latitude =  region.latitude
//                     //     this.setState({latitude: region.latitude})
//                     //   this.state.longitude = region.longitude
                    
                    
                    
//                     //     // console.log('location2')
//                     //     // console.log(this.state.location)        
//                     //     // console.log(this.state.location)        
//                     //     // console.log(this.state.location)        
                    
//                     this.setState({
//                         region: region
                        
//                     })
//                     // setState({
//                     //     latitude: region.latitude,
//                     // })
//                     this.setState({
//                         longitude: ""+region.longitude+"",
//                     })
                    
//                     console.log('region state ' + region.longitude)
//                     // location => this.setState({region})
//                     console.log('state longitude'+ this.state.longitude)
                    
//                     // const [latitude, setLatitude] = useState('');
                    
//                     // setLatitude(""+region.Content[1]+"")
//                     console.log('passou o set latitude')
//                     //     location => this.setState({region})
//                     //     console.log('thisstate region.longitude'+ this.state.longitude)
                    
//                     // this.state.location = region
//                     // // console.log(this.state.location)
                    
//                     // this.setState({location: region})
                    
//                     // console.log(this.state.location)
//         // // this.setState.location = state.region
//         // location => this.setState({ location })
//         // // console.log('state location')
//         // // console.log(location)
//         // console.log(location)
//         // state.region = {
//         //     latitude: region.latitude,
//         //     longitude: region.longitude,
//         //     latitudeDelta: 0.015,
//         //     longitudeDelta: 0.0121
//         // }
//     }

//     render() {

//         const { region } = this.state;

//         return (
//             <View style={style.map}>
//                 <MapView
//                     style={style.mapApp}
//                     loadingEnabled={true}
//                     region={{
//                         latitude: region.latitude,
//                         longitude: region.longitude,
//                         latitudeDelta: region.latitudeDelta,
//                         longitudeDelta: region.longitudeDelta
//                         //     <Marker
//                         //     // coordinate={marker.latlng}
//                         //     // title={marker.title}
//                         //     // description={marker.description}
//                         //   />
//                     }}
//                     showsUserLocation
//                     loadingEnabled

//                     onRegionChangeComplete={this.mudouMapa}
//                     // onRegionChangeComplete={ location => this.setState({region})}
//                 >

//                     {/* onPress={e => console.log(e.nativeEvent)} */}
//                 </MapView>
//             </View>
//         );

//     }


// }


// const style = StyleSheet.create({

//     map: {
//         backgroundColor: "blue",
//         flex: 10,
//         justifyContent: 'center',
//         alignItems: 'center',
//         // position: 'relative',
//         zIndex: 10,
//         marginBottom: 30,
//         marginTop: -50,
//         paddingTop: 150
//         // position: 'relative'
//     },
//     mapApp: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0
//     }

// })