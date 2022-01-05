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
              if(e.name.toLowerCase().includes(searchQuery.toLowerCase()) && getArtifactType(route.params.artifactId) === e.type)
              return(
                  <View key={ind}>
                    <List.Item
                        title={e.name}
                        description={e.type}
                        onPress={() => {
                            if (route.params.teamId !== null && route.params.characterNo !== null){
                                // console.log({name: e.name, image: e.image})
                                firebase
                                    .database()
                                    .ref(`userData/${firebase.auth().currentUser.uid}/teams/${route.params.teamId}/characters/${route.params.characterNo}/artifacts/${route.params.artifactId}`)
                                    .set(e.id)
                                navigation.goBack()
                            }
                        }}
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

function getArtifactType(index){
    switch (index){
        case 0:
            return "Flower of Life"
        case 1:
            return "Plume of Death"
        case 2:
            return "Sands of Eon"
        case 3:
            return "Goblet of Eonothem"
        case 4:
            return "Circlet of Logos"

    }
}

const styles = StyleSheet.create({

});
