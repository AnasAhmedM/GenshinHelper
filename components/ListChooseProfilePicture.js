import {useState, useEffect} from 'react';
import { Image, View, ScrollView } from 'react-native';
import firebase from "firebase/compat"
import { List, Divider, Searchbar} from 'react-native-paper';
import { myNavigatorTheme } from '../config/theme'

firebase.initializeApp(require("../config/firebaseConfig").firebaseConfig)

export default function ListChooseProfilePictureComponent({ navigation, route }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [data, setData] = useState([])
    const [rarities] = useState(['#8F6DA8', '#AA7A4F'])

    useEffect(()=>{
        if(data.length === 0)
        firebase.database().ref('gameData/Characters').once('value', function (snapshot) {
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
              if(e.id.includes(searchQuery.toLowerCase()))
              return(
                  <View key={ind}>
                    <List.Item
                        title={e.name}
                        // description={e.description}
                        onPress={() => {
                            firebase
                                .database()
                                .ref(`userData/${firebase.auth().currentUser.uid}/profilePicture`)
                                .set(e.icon)
                            navigation.goBack()
                        }}
                        left={props=> <Image  style={{height:80, width:80, backgroundColor:rarities[e.rarity-4], borderRadius:20, alignSelf:'center'}} source={{ uri: e.icon }}/>}
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
