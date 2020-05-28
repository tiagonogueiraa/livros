import React from 'react'
import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import { Ionicons } from "@expo/vector-icons"
// import {moment} from 'moment'
// import * as moment from 'moment'


let moment = require("moment");
if ("default" in moment) {
    moment = moment["default"];
}

posts = [
  {
    id: '1',
    name: "Marlon albano",
    text: 
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    timestamp: 1569109273726,
    avatar: require("../img/womanperfil.jpg"),
    image: require("../img/womanperfil.jpg")

  },
  {
    id: '2',
    name: "Josue McKay",
    text: 
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    timestamp: 1569109273726,
    avatar: require("../img/womanperfil.jpg"),
    image: require("../img/womanperfil.jpg")

  },
  {
    id: '3',
    name: "Maria McKay",
    text: 
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    timestamp: 1569109273726,
    avatar: require("../img/womanperfil.jpg"),
    image: require("../img/womanperfil.jpg")

  },
]

console.log(posts)
// console.log(user )
export default class HomeScreen extends React.Component {
  

  renderPost = post => {
    return(
      <View style={styles.feedItem}>
        <Image source={post.avatar} style={styles.avatar} />
       <View style={{flex:1}}>
         <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
           <View>
             <Text style={styles.name}>{post.name}</Text>
             {/* <Text style={styles.timestamp}>{moment("post.timestamp", "YYYYMMDD").fromNow()}</Text> */}
             {/* <Text style={styles.timestamp}>{moment(post.timestamp, "dddd").fromNow()}</Text> */}
             <Text style={styles.timestamp}>{moment(post.timestamp).fromNow()}</Text>

             {/* moment("20111031", "YYYYMMDD").fromNow(); */}
           </View>

           <Ionicons name="ios-more" size={24} color="#737888"></Ionicons>
         </View>

         <Text style={styles.posts}>{post.text}</Text>

         <Image source={post.image} style={styles.postImage} resizeMode="cover" />

         <View style={{ flexDirection: "row"}}>
            <Ionicons name="ios-heart-empty" size={24} color="#737888" style={{ marginRight: 16}} />
            <Ionicons name="ios-chatboxes" size={24} color="#737888" />
         </View>
       </View>
      </View>
    )
  }


  render() {
    // efeito
    // LayoutAnimation.easeInEaseOut();

    return (
      <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Feed</Text>
        </View>
        <FlatList
            style={styles.feed}
            data={posts}
            renderItem={({item}) => this.renderPost(item)}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
        />
      </View>
    )
  }
}

const styles =  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFECF4"
  },
  header: {
    paddingTop: 64,
    paddingBottom: 16,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EBECF4",
    shadowColor: "#454D65",
    shadowOffset: {height: 5},
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 16
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "500"
  },
  feed: {
    marginHorizontal: 12
  },
  feedItem: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 8
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#C4C6CE",
  },
  timestamp: {
    fontSize: 11,
    color: "#3C4C6E",
    marginTop: 4,
    

  },
  post: {
    marginTop: 16,
    fontSize: 14,
    color: "#838899"

  },
  postImage: {
    width: undefined,
    height: 150,
    borderRadius: 5,
    marginVertical: 16

  }
})