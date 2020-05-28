import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Button, Image, SnapshotViewIOS } from 'react-native'

// import firebase from 'firebase';
import Fire from '../Fire'



export default class ProfileScreen extends React.Component {

    state = {
        user: {
            avatar: null,
            name: "",
            email: ""
        }
    }

    unsubscribe = null

    componentDidMount() {

        // user = []
        const userid = this.props.uid || Fire.shared.uid;

        this.unsubscribe = Fire.shared.firestore
            .collection("users")
            .doc(userid)
            .onSnapshot(doc => {

                // // console.log('teste o que vem no doc',doc.data())
                // user = [

                //     user.avatar = doc.data().avatar, 
                //     user.name = doc.data().name,
                //     user.email = doc.data().email
                // ]

                this.setState({ user: doc.data() })

                console.log('avatar')
                console.log(this.state.user.avatar)
                console.log(this.state.user.name)
                console.log(this.state.user.email)
                // doc.forEach(doc => {
                //     const data = doc.data();
                //     console.log(doc.id, data);
                //     this.setState({user: data})
                //   });


            });
            // console.log('user')
            // console.log(this.state.user.avatar)
      
    }

    componentWillUnmount(){
        this.unsubscribe();
    }


    // logout() {

    //     console.log("logout foi chamado")
    //     Fire.auth().signOut()
    //     this.props.navigation.navigate("Login")
    //     alert("Deslogado com sucesso!");

    // }

    render() {
        console.log('chamou profiel')
        return (
            // <SafeAreaView>

            <View style={style.container}>
                <View style={{ marginTop: 64, alignItems: "center" }}>


                    <View style={style.avatarContainer}>
                        {/* <Image style={style.avatar} /> */}

                            <Image source={{uri: this.state.user.avatar}} style={style.avatar}></Image>
                    </View>

                            <Text style={style.name}>
                               {this.state.user.name}                                
                            </Text>
                </View>
                <View style={style.statsContainer}>
                    <View>
                        <View style={style.stat}>
                            <Text style={style.statAmount}>0</Text>
                            <Text style={style.statTitle}>Livros</Text>
                        </View>
                    </View>
                    <View>
                        <View style={style.stat}>
                            <Text style={style.statAmount}>0</Text>
                            <Text style={style.statTitle}>Amigos</Text>
                        </View>
                    </View>
                    <View>
                        <View style={style.stat}>
                            <Text style={style.statAmount}>0</Text>
                            <Text style={style.statTitle}>Trocou</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity 
                    style={style.button} onPress={()=>Fire.shared.signOut()}
                >
                <Text style={{ color: "#FFF", fontWeight: "500" }} >Sair</Text>
                </TouchableOpacity>
            </View>

        )
    }
}

const style = StyleSheet.create({

    container: {
        flex : 1,
      
    },
    avatarContainer: {
        shadowColor: "#151734",
        shadowRadius: 15,
        shadowOpacity: 0.4
    },
    avatar: {
        width: 136,
        height: 136,
        borderRadius: 68
    }, 
    name: {
        marginTop: 24,
        fontSize: 24,
        fontWeight: "600"
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 32
    },
    stat: {
        alignItems: "center",
        flex: 1
    },
    statAmount: {
        color: "#4F566D",
        fontSize: 18,
        fontWeight: "300"
    },
    statTitle: {
        color: "#C3C4CD",
        fontSize: 18,
        fontWeight: "500",
        marginTop: 4
    },
    button: {
      marginHorizontal: 30,
      backgroundColor: "#1B1B16",
      borderRadius: 4,
      height: 52,
      marginBottom: 150,
      marginTop: 50,
      alignItems: "center",
      justifyContent: "center"
    }
  

})

// const styles = StyleSheet.create({
//     // container: {
//     //   flex: 1,
//     //   backgroundColor: '#fff',
//     //   alignItems: 'center',
//     //   justifyContent: 'center',
//     // },
//     container: {
//         flex: 1,
//         // paddingTop: 20,
//         padding: 20,
//         // justifyContent: 'center'


//     },
//     texto: {
//         fontSize: 20
//     },
//     input: {
//         padding: 10,
//         // borderWidth: 1,
//         // borderColor: 'black',

//         height: 50,
//         margin: 5,
//         backgroundColor: '#ccc'
//     },
//     button: {
//         // width: 230,
//         height: 50,
//         borderWidth: 2,
//         borderColor: '#3EA9E1',
//         borderRadius: 10,
//         backgroundColor: '#3EA9E1',
//         marginTop: 10
//     },
//     btnArea: {
//         flex: 1,
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     btnTexto: {
//         fontSize: 19,
//         fontWeight: 'bold',
//         color: 'white'
//     },
//     logo: {
//         alignItems: 'center',
//         marginTop: 50

//     },
//     logoView: {
//         alignItems: 'center',
//         marginBottom: 50,
//         // marginTop: -100
//     }
// });
