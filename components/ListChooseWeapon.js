import {useState, useEffect} from 'react';
import { StyleSheet, Text, Image, View, ScrollView, Alert } from 'react-native';
import firebase from "firebase/compat"
import { List, Divider, Searchbar, Avatar} from 'react-native-paper';
import { myNavigatorTheme } from '../config/theme'
const screens = require("../config/ScreensEnum")

export default function ListChooseWeaponComponent({ navigation, route }) {
    const [searchQuery, setSearchQuery] = useState('')
    const [data, setData] = useState([])
    const [init, setInit] = useState(false)
    const [rarities] = useState(['#555B66', '#4A5F62', '#51597B', '#8F6DA8', '#AA7A4F'])

    useEffect(()=>{
      if(data.length === 0)
      firebase.database().ref('gameData/Weapons').once('value', function (snapshot) {
        let values = Object.keys(snapshot.val()).map(function(e) {
          return snapshot.val()[e]
        })
          setData(values)
          setInit(true)
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
              if(e.name.toLowerCase().includes(searchQuery.toLowerCase()) && (route.params.type === null || e.type === route.params.type))
              return(
                  <View key={ind}>
                    <List.Item
                        title={e.name}
                        description={e.description}
                        onPress={() => {
                            // console.log(route.params.teamId, route.params.characterNo)
                            if (route.params.teamId !== null && route.params.characterNo !== null){
                                // console.log({name: e.name, image: e.image})
                                firebase
                                    .database()
                                    .ref(`userData/${firebase.auth().currentUser.uid}/teams/${route.params.teamId}/characters/${route.params.characterNo}/weapon`)
                                    .set(e.id)
                                navigation.goBack()
                            }
                        }}
                        left={props=> <Image style={{height:60, width:60, borderRadius:20, alignSelf:'center', backgroundColor:rarities[e.rarity-1]}} source={{ uri: e.image }}/>}
                    />
                    <Divider/>
                  </View>
                )
              })}

              {(route.params.type && init) && <Text style={styles.dividerText}>The weapons under this cannot be used by the selected character</Text>}

              {data.map((e, ind) =>{
                  if(e.name.toLowerCase().includes(searchQuery.toLowerCase()) && !(route.params.type === null || e.type === route.params.type))
                      return(
                          <View key={ind}>
                              <List.Item
                                  title={e.name}
                                  description={e.description}
                                  onPress={() => {
                                      // console.log(route.params.teamId, route.params.characterNo)
                                      if (route.params.teamId !== null && route.params.characterNo !== null){
                                          // console.log({name: e.name, image: e.image})
                                          firebase
                                              .database()
                                              .ref(`userData/${firebase.auth().currentUser.uid}/teams/${route.params.teamId}/characters/${route.params.characterNo}/weapon`)
                                              .set(e.id)
                                          navigation.goBack()
                                      }
                                  }}
                                  left={props=> <Image style={{height:60, width:60, borderRadius:20, alignSelf:'center', backgroundColor:rarities[e.rarity-1]}} source={{ uri: e.image }}/>}
                              />
                              <Divider/>
                          </View>
                      )
              })}
          </ScrollView>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    dividerText:{
        color:myNavigatorTheme.colors.text,
        width:"70%", alignSelf: "center",
        textAlign:"center"
    }
});
