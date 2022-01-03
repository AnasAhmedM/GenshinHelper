import {useState, useEffect} from 'react';
import { StyleSheet, Text, Image, View, ScrollView, Alert } from 'react-native';
import firebase from "firebase/compat"
import { List, Divider, Searchbar} from 'react-native-paper';
firebase.initializeApp(require("../config/firebaseConfig").firebaseConfig)

export default function ListChooseCharacterComponent({ navigation, route }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [data, setData] = useState([])
    const [elements, setElements] = useState({})
    const [rarities, setRarities] = useState(['#8F6DA8', '#AA7A4F'])

    useEffect(()=>{
        if(data.length === 0)
        firebase.database().ref('gameData/Characters').once('value', function (snapshot) {
            setData(snapshot.val())
          });
        if(Object.keys(elements).length === 0)
        firebase.database().ref('gameData/Elements').once('value', function (snapshot) {
            setElements(snapshot.val())
        });
    })

    return (
        <View style={{flex:1, justifyContent:'center'}}>
        <View style={{height:'100%', borderWidth:1}}>
          <Searchbar
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
          <ScrollView>
            {data.map((e, ind) =>{
              if(e.id.includes(searchQuery.toLowerCase()))
              return(
                  <View key={ind}>
                    <List.Item
                        title={e.name}
                        description={e.description}
                        left={props=> <Image  style={{height:80, width:80, backgroundColor:rarities[e.rarity-4], borderRadius:20, alignSelf:'center'}} source={{ uri: e.icon }}/>}
                        right={props=> <Image style={{height:40, width:40, borderRadius:20, alignSelf:'center'}} source={{ uri: elements[e.element] }}/>}
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
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 8,
      },
});
