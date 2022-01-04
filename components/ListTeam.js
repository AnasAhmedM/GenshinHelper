import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import { useState, useEffect } from "react";
import firebase from "firebase/compat";
import { Divider, List, Searchbar, FAB } from "react-native-paper";
import { myNavigatorTheme } from "../config/theme";

const screens = require("../config/ScreensEnum")

export default function ListTeamComponent({ navigation }) {
    const [searchQuery, setSearchQuery] = useState('')
    const [data, setData] = useState([])

    const [init, setInit] = useState(false);
    useEffect(()=>{
        if(!init) {
            setInit(true)
            firebase.database().ref(`userData/${firebase.auth().currentUser.uid}/teams`).on('value', function (snapshot) {
                let values = snapshot.val()
                let data = []
                for (let value in values) {
                    data.push({id: value, ...values[value]})
                }
                setData(data)
            });
        }
    })

    return(
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
                        if(e.teamName.toLowerCase().includes(searchQuery.toLowerCase()))
                            return(
                                <View key={ind}>
                                    <List.Item
                                        title={e.teamName}
                                        onPress={()=> navigation.navigate(screens.SingleTeam, {teamId: e.id})}
                                    />
                                    <Divider/>
                                </View>
                            );
                    })}
                </ScrollView>
                <FAB
                    style={styles.fab}
                    medium
                    icon="plus"
                    onPress={handleNewTeamCreate}
                />
            </View>
        </View>
    );
    function handleNewTeamCreate(){
        const newTeamId = firebase.database().ref(`userData/${firebase.auth().currentUser.uid}/teams`).push({teamName: ""}).getKey()
        navigation.navigate(screens.SingleTeam, {teamId: newTeamId})
    }
}



const styles = StyleSheet.create({
    fab:{
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    }


});
