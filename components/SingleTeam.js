import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import {Avatar, Headline, Dialog, Portal, Button, TextInput} from 'react-native-paper'
import { useEffect, useState } from "react";
import firebase from "firebase/compat";
import {myNavigatorTheme} from "../config/theme";
const screens = require("../config/ScreensEnum")

export default function SingleTeamComponent({ navigation, route }) {
    const [teamName, setTeamName] = useState("Team Name")
    const [characterData, setCharacterData] = useState([])
    const [init, setInit] = useState(false)
    const [newName, setNewName] = useState("");

    const [visible, setVisible] = useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    useEffect(() => {
        if (!init){
            setInit(true)
            const teamId = route.params.teamId;
            firebase.database().ref(`userData/${firebase.auth().currentUser.uid}/teams/${teamId}`).on("value", snapShot => {
                const data = snapShot.val()
                if (!data) return;
                let newCharacterData = [{},{},{},{}];
                firebase.database()
                    .ref(`/gameData`)
                    .once("value")
                    .then(gameDataSnapshot => {
                        const gameData = gameDataSnapshot.val()
                        for (let index=0; index < newCharacterData.length; index ++){
                            if (data.characters && data.characters[index]) {
                                if (data.characters[index].weapon) {
                                    newCharacterData[index].weapon = {}
                                    newCharacterData[index].weapon.image = gameData.Weapons[data.characters[index].weapon].image
                                    newCharacterData[index].weapon.name = gameData.Weapons[data.characters[index].weapon].name
                                    newCharacterData[index].weapon.type = gameData.Weapons[data.characters[index].weapon].type
                                }
                                if (data.characters[index].character) {
                                    newCharacterData[index].character = {}
                                    newCharacterData[index].character.name = gameData.Characters[data.characters[index].character].name
                                    newCharacterData[index].character.image = gameData.Characters[data.characters[index].character].image
                                    newCharacterData[index].character.weapon = gameData.Characters[data.characters[index].character].weapon
                                }
                                newCharacterData[index].artifacts = [null,null,null,null,null]
                                if (data.characters[index].artifacts) {
                                    for (let artifactIndex = 0; artifactIndex < newCharacterData[index].artifacts.length; artifactIndex ++){
                                        if (data.characters[index].artifacts[artifactIndex]){
                                            if (gameData.Artifacts[data.characters[index].artifacts[artifactIndex]])
                                                console.log(gameData.Artifacts[data.characters[index].artifacts[artifactIndex]])
                                                newCharacterData[index].artifacts[artifactIndex] = gameData.Artifacts[data.characters[index].artifacts[artifactIndex]].image
                                        }
                                    }
                                }
                            }
                        }
                        setCharacterData(newCharacterData)
                    }).catch(e => {
                        // console.log(e)
                    })
                setTeamName(data.teamName)
            })
        }
    })

    return (
        <View style={styles.container}>
            <View>
                <Headline style={styles.teamNameHeader}>{teamName}</Headline>
                <View  style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                    <TouchableOpacity onPress={showDialog}><Avatar.Icon size={20} style={styles.headerIcon} icon="pencil"/></TouchableOpacity>
                    <TouchableOpacity onPress={()=> handleDeleteTeam(teamName, route.params.teamId)}><Avatar.Icon size={20} style={styles.headerIcon} backgroundColor={"red"} icon="delete"/></TouchableOpacity>
                </View>
            </View>
            <View style={styles.allCharactersContainer}>
                <View style={styles.characterRowContainer}>
                    <SingleCharacterView characterData={characterData?.[0]} teamId={route.params.teamId} characterNo={0} navigation={navigation}/>
                    <SingleCharacterView characterData={characterData?.[1]} teamId={route.params.teamId} characterNo={1} navigation={navigation}/>
                </View>
                <View style={styles.characterRowContainer}>
                    <SingleCharacterView characterData={characterData?.[2]} teamId={route.params.teamId} characterNo={2} navigation={navigation}/>
                    <SingleCharacterView characterData={characterData?.[3]} teamId={route.params.teamId} characterNo={3} navigation={navigation}/>
                </View>
            </View>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Content>
                        <Text style={{fontSize: 20}}>Enter the new name of the team below</Text>
                        <TextInput onChangeText={setNewName}/>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => handleEditPress(newName)}>Done</Button>
                        <Button onPress={hideDialog}>Cancel</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );

    function handleEditPress(){
        hideDialog()
        if (newName.trim() !== ""){
            firebase
                .database()
                .ref(`userData/${firebase.auth().currentUser.uid}/teams/${route.params.teamId}/teamName`)
                .set(newName)

        }else{
            Alert.alert("Team name cannot be empty")
        }
    }

    function handleDeleteTeam(teamName, teamId){
        Alert.alert(
            "Are you sure you want to delete this team",
            `Team Name: ${teamName}`,
            [
                { text: "Yes", onPress: () => {
                        firebase.database().ref(`userData/${firebase.auth().currentUser.uid}/teams/${teamId}`).set({});
                        navigation.navigate(screens.ListTeams);
                    },
                    style: "cancel"
                },
                { text: "No", onPress: () => {} }
            ]
        );
    }

}

function SingleCharacterView(props){
    return (
        <ImageBackground resizeMode="contain" source={{uri: props.characterData?.character?.image}} style={styles.singleCharacterContainer}>
            <TouchableOpacity style={styles.singleCharacterTouchable} onPress={()=>{
                    props.navigation.navigate(screens.ChooseCharacter, {teamId: props.teamId, characterNo: props.characterNo, type: props.characterData?.weapon?.type})
            }}>
                <TouchableOpacity style={styles.weaponContainer} onPress={()=>{
                        props.navigation.navigate(screens.ChooseWeapon, {teamId: props.teamId, characterNo: props.characterNo, type: props.characterData?.character?.weapon})
                }}>
                    <Image resizeMode="contain" style={styles.singleWeaponImage} source={{uri: props.characterData?.weapon?.image}}/>
                    <Text style={styles.singleWeaponsName}>{props.characterData?.weapon?.name}</Text>
                </TouchableOpacity>
                <View style={styles.artifactsContainer}>
                    <TouchableOpacity style={styles.singleArtifactContainer} onPress={()=>{props.navigation.navigate(screens.ChooseArtifact, {teamId: props.teamId, characterNo: props.characterNo, artifactId: 0})}}>
                        <Image resizeMode="contain" style={styles.singleArtifactImage} source={{uri: props.characterData?.artifacts?.[0]}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.singleArtifactContainer} onPress={()=>{props.navigation.navigate(screens.ChooseArtifact, {teamId: props.teamId, characterNo: props.characterNo, artifactId: 1})}}>
                        <Image resizeMode="contain" style={styles.singleArtifactImage} source={{uri: props.characterData?.artifacts?.[1]}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.singleArtifactContainer} onPress={()=>{props.navigation.navigate(screens.ChooseArtifact, {teamId: props.teamId, characterNo: props.characterNo, artifactId: 2})}}>
                        <Image resizeMode="contain" style={styles.singleArtifactImage} source={{uri: props.characterData?.artifacts?.[2]}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.singleArtifactContainer} onPress={()=>{props.navigation.navigate(screens.ChooseArtifact, {teamId: props.teamId, characterNo: props.characterNo, artifactId: 3})}}>
                        <Image resizeMode="contain" style={styles.singleArtifactImage} source={{uri: props.characterData?.artifacts?.[3]}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.singleArtifactContainer} onPress={()=>{props.navigation.navigate(screens.ChooseArtifact, {teamId: props.teamId, characterNo: props.characterNo, artifactId: 4})}}>
                        <Image resizeMode="contain" style={styles.singleArtifactImage} source={{uri: props.characterData?.artifacts?.[4]}}/>
                    </TouchableOpacity>
                </View>
                <Text style={styles.characterNameContainer}>{props.characterData?.character?.name}</Text>
            </TouchableOpacity>

        </ImageBackground>
    )

}





const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    teamNameHeader:{
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 25
    },
    headerIcon:{
        margin: 5
    },
    allCharactersContainer:{
        flex: 1
    },
    characterRowContainer:{
        flex: 1,
        flexDirection:"row",
        height: "45%",
    },
    singleCharacterContainer:{
        margin: 10,
        flex: 1,
        backgroundColor: "#505050",
        width: "100%",
        borderRadius: 10,
        elevation: 10,
    },
    singleCharacterTouchable:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    characterNameContainer:{
        position: "absolute",
        left: 10,
        top: 10,
        fontSize: 20,
        color: myNavigatorTheme.colors.text,
        width: "60%"
    },
    weaponContainer:{
        backgroundColor: "rgba(150,150,150,0.60)",
        borderRadius: 5,
        position: "absolute",
        bottom: 10,
        left: 10,
        height: "50%",
        width: "45%"
    },
    artifactsContainer:{
        borderRadius: 5,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        right: 10
    },
    singleArtifactContainer:{
        borderRadius: 500,
        backgroundColor: "rgba(150,150,150,0.60)",
        margin: 5,
        width: 35,
        height: 35
    },
    singleArtifactImage:{
        width: "100%",
        height: "100%"
    },
    singleWeaponsName: {
        textAlign:"center",
        color: myNavigatorTheme.colors.text,
        fontSize: 10,
        width: "100%",

    },
    singleWeaponImage:{
        width: "100%",
        height: "80%",
    }
});
