import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { Headline } from 'react-native-paper'
import {useEffect, useState} from "react";
import firebase from "firebase/compat";

function SingleCharacterView(props){
    const [singleCharacterData, setSingleCharacterData] = useState(props.characterData)
    // console.log(singleCharacterData)
    return (
        <ImageBackground resizeMode="contain" source={{uri: singleCharacterData?.image}} style={styles.singleCharacterContainer}>
            <View style={styles.weaponContainer}>
                <Image resizeMode="contain" style={styles.singleWeaponImage} source={{uri: singleCharacterData?.weaponImage}}/>
                <Text style={styles.singleWeaponsName}>{singleCharacterData?.weaponName}</Text>
            </View>
            <View style={styles.artifactsContainer}>
                <View style={styles.singleArtifactContainer}>
                    <Image resizeMode="contain" style={styles.singleArtifactImage} source={{uri: singleCharacterData?.artifacts?.[0]}}/>
                </View>
                <View style={styles.singleArtifactContainer}>
                    <Image resizeMode="contain" style={styles.singleArtifactImage} source={{uri: singleCharacterData?.artifacts?.[1]}}/>
                </View>
                <View style={styles.singleArtifactContainer}>
                    <Image resizeMode="contain" style={styles.singleArtifactImage} source={{uri: singleCharacterData?.artifacts?.[2]}}/>
                </View>
                <View style={styles.singleArtifactContainer}>
                    <Image resizeMode="contain" style={styles.singleArtifactImage} source={{uri: singleCharacterData?.artifacts?.[3]}}/>
                </View>
                <View style={styles.singleArtifactContainer}>
                    <Image resizeMode="contain" style={styles.singleArtifactImage} source={{uri: singleCharacterData?.artifacts?.[4]}}/>
                </View>
            </View>
            <Text style={styles.characterNameContainer}>{singleCharacterData?.name}</Text>
        </ImageBackground>
    )
}

export default function SingleTeamComponent({ navigation, route }) {
    const [teamName, setTeamName] = useState("Team Name")
    const [characterData, setCharacterData] = useState([])
    const [init, setInit] = useState(false)

    useEffect(() => {
        if (!init){
            setInit(true)
            const teamId = route.params.teamId;
            firebase.database().ref(`userData/${firebase.auth().currentUser.uid}/teams/${teamId}`).on("value", snapShot => {
                const data = snapShot.val()
                let newCharacterData = [{},{},{},{}];
                firebase.database()
                    .ref(`/gameData`)
                    .once("value")
                    .then(gameDataSnapshot => {
                        const gameData = gameDataSnapshot.val()
                        for (let index=0; index < newCharacterData.length; index ++){
                            if (data.characters && data.characters[index]) {
                                if (data.characters[index].weapon) {
                                    newCharacterData[index].weaponImage = gameData.Weapons[data.characters[index].weapon].image
                                    newCharacterData[index].weaponName = gameData.Weapons[data.characters[index].weapon].name
                                }
                                if (data.characters[index].characterId) {
                                    newCharacterData[index].name = gameData.Characters[data.characters[index].characterId].name
                                    newCharacterData[index].image = gameData.Characters[data.characters[index].characterId].image
                                }
                                if (data.characters[index].artifacts) {
                                    newCharacterData[index].artifacts = []
                                    for (let artifactIndex = 0; artifactIndex < data.characters[index].artifacts.length; artifactIndex ++){
                                        if (data.characters[index].artifacts[artifactIndex]){
                                            newCharacterData[index].artifacts[artifactIndex] = gameData.Artifacts[data.characters[index].artifacts[artifactIndex]].image
                                        }
                                    }
                                }
                            }
                        }
                        setCharacterData(newCharacterData)
                    })
                setTeamName(data.teamName)
            })
        }
    })

    return (
        <View style={styles.container}>
            <Headline style={styles.teamNameHeader}>{teamName}</Headline>
            <View style={styles.allCharactersContainer}>
                <View style={styles.characterRowContainer}>
                    <SingleCharacterView characterData={characterData?.[0]}/>
                    <SingleCharacterView characterData={characterData?.[1]}/>
                </View>
                <View style={styles.characterRowContainer}>
                    <SingleCharacterView characterData={characterData?.[2]}/>
                    <SingleCharacterView characterData={characterData?.[3]}/>
                </View>
            </View>
        </View>
    );

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
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#505050",
        width: "100%",
        borderRadius: 10
    },
    characterNameContainer:{
      position: "absolute",
      left: 10,
      top: 10,
      fontSize: 20,
      color: "white"
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
        width: 40,
        height: 40
    },
    singleArtifactImage:{
        width: "100%",
        height: "100%"
    },
    singleWeaponsName: {
        textAlign:"center",
        fontSize: 10,
        width: "100%",

    },
    singleWeaponImage:{
        width: "100%",
        height: "80%",
    }
});
