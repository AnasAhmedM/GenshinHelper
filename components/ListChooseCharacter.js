import {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import firebase from "firebase/compat"
import {Divider, List, Searchbar} from 'react-native-paper';
import {myNavigatorTheme} from '../config/theme'

firebase.initializeApp(require("../config/firebaseConfig").firebaseConfig)

export default function ListChooseCharacterComponent({navigation, route}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [data, setData] = useState([])
    const [elements, setElements] = useState({})
    const [rarities] = useState(['#8F6DA8', '#AA7A4F'])
    const [init, setInit] = useState(false)

    useEffect(() => {
        if (data.length === 0)
            firebase.database().ref('gameData/Characters').once('value', function (snapshot) {
                let values = Object.keys(snapshot.val()).map(function (e) {
                    return snapshot.val()[e]
                })
                setData(values)
            });
        if (Object.keys(elements).length === 0)
            firebase.database().ref('gameData/Elements').once('value', function (snapshot) {
                let values = Object.keys(snapshot.val()).map(function (e) {
                    return snapshot.val()[e]
                })
                setElements(values)
                setInit(true)
            });
    })

    return (
        <View style={{flex: 1, justifyContent: 'center'}}>
            <View style={{height: '100%', borderWidth: 1}}>
                <Searchbar
                    style={{backgroundColor: myNavigatorTheme.colors.background}}
                    placeholder="Search"
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                />
                <ScrollView>
                    {data.map((e, ind) => {
                        if (e.id.includes(searchQuery.toLowerCase()) && (route.params.type === null || e.weapon === route.params.type))
                            return (
                                <View key={ind}>
                                    <List.Item
                                        title={e.name}
                                        description={e.description}
                                        onPress={() => {
                                            // console.log(route.params.teamId, route.params.characterNo)
                                            if (route.params.teamId !== null && route.params.characterNo !== null) {
                                                // console.log({name: e.name, image: e.image})
                                                firebase
                                                    .database()
                                                    .ref(`userData/${firebase.auth().currentUser.uid}/teams/${route.params.teamId}/characters/${route.params.characterNo}/character`)
                                                    .set(e.id)
                                                navigation.goBack()
                                            }
                                        }}
                                        left={props => <Image style={{
                                            height: 80,
                                            width: 80,
                                            backgroundColor: rarities[e.rarity - 4],
                                            borderRadius: 20,
                                            alignSelf: 'center'
                                        }} source={{uri: e.icon}}/>}
                                        right={props => <Image
                                            style={{height: 40, width: 40, borderRadius: 20, alignSelf: 'center'}}
                                            source={{uri: elements[e.element]}}/>}
                                    />
                                    <Divider/>
                                </View>
                            )
                    })}

                    {(route.params.type && init) &&
                        <Text style={styles.dividerText}>The characters under this cannot not use the selected
                            weapon</Text>}

                    {data.map((e, ind) => {
                        if (e.id.includes(searchQuery.toLowerCase()) && !(route.params.type === null || e.weapon === route.params.type))
                            return (
                                <View key={ind}>
                                    <List.Item
                                        title={e.name}
                                        description={e.description}
                                        onPress={() => {
                                            // console.log(route.params.teamId, route.params.characterNo)
                                            if (route.params.teamId !== null && route.params.characterNo !== null) {
                                                // console.log({name: e.name, image: e.image})
                                                firebase
                                                    .database()
                                                    .ref(`userData/${firebase.auth().currentUser.uid}/teams/${route.params.teamId}/characters/${route.params.characterNo}/character`)
                                                    .set(e.id)
                                                navigation.goBack()
                                            }
                                        }}
                                        left={props => <Image style={{
                                            height: 80,
                                            width: 80,
                                            backgroundColor: rarities[e.rarity - 4],
                                            borderRadius: 20,
                                            alignSelf: 'center'
                                        }} source={{uri: e.icon}}/>}
                                        right={props => <Image
                                            style={{height: 40, width: 40, borderRadius: 20, alignSelf: 'center'}}
                                            source={{uri: elements[e.element]}}/>}
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
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    dividerText: {
        color: myNavigatorTheme.colors.text,
        width: "70%", alignSelf: "center",
        textAlign: "center"
    }
});
