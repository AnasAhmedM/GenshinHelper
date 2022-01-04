import {useState, useEffect} from 'react';
import { StyleSheet, Text, Image, View, ScrollView, Alert } from 'react-native';
import firebase from "firebase/compat"
import { List, Divider, Searchbar, Avatar} from 'react-native-paper';
import {myNavigatorTheme} from '../config/theme'

firebase.initializeApp(require("../config/firebaseConfig").firebaseConfig)

export default function ListChooseArtifactComponent({ navigation, route }) {
    const [searchQuery, setSearchQuery] = useState('')
    const [data, setData] = useState([])
    const [rarities] = useState(['#555B66', '#4A5F62', '#51597B', '#8F6DA8', '#AA7A4F'])

    useEffect(()=>{
        if(data.length === 0)
        firebase.database().ref('gameData/Artifacts').once('value', function (snapshot) {
            let values = Object.keys(snapshot.val()).map(function(e) {
              return snapshot.val()[e]
            })
            setData(values)
          });
    })

    return (
        <View style={{flex:1, justifyContent:'center'}}>
        <View style={{height:'100%', borderWidth:1}}>
          <Searchbar
            style={{backgroundColor: myNavigatorTheme.colors.background}}
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
          <ScrollView>
            {data.map((e, ind) =>{
              if(e.name.toLowerCase().includes(searchQuery.toLowerCase()))
              return(
                  <View key={ind}>
                    <List.Item
                        title={e.name}
                        description={e.type}
                        left={props=> <Image style={{height:60, width:60, borderRadius:20, alignSelf:'center', backgroundColor:rarities[e.rarity-1]}} source={{ uri: e.image }}/>}
                    />
                    <Divider/>
                  </View>
                )
              })
              }
          </ScrollView>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({

});
