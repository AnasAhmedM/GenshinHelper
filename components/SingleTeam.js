import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { useState } from "react";

export default function SingleTeamComponent() {
    const [teamName, setTeamName] = useState("Team Name")

    const [character1Data, setCharacter1Data] = useState({name:"Albedo"})
    const [character2Data, setCharacter2Data] = useState({name:"Childe"})
    const [character3Data, setCharacter3Data] = useState({name:"Diluc"})
    const [character4Data, setCharacter4Data] = useState({name:"Mona"})

    return (
        <View style={styles.container}>
            <Text style={styles.teamNameHeader}>{teamName}</Text>
            <View style={styles.allCharactersContainer}>
                <View style={styles.characterRowContainer}>
                    <ImageBackground resizeMode="contain" source={{uri: "https://impact.moe/assets/img/portraits/Albedo.webp"}} style={styles.singleCharacterContainer}>
                        <View style={styles.weaponContainer}>
                            <Image resizeMode="contain" style={styles.singleWeaponImage} source={{uri: "https://impact.moe/assets/img/weapon-icons/amenoma-kageuchi.webp"}}/>
                            <Text style={styles.singleWeaponsName}>Amenoma Kageuchi</Text>
                        </View>
                        <View style={styles.artifactsContainer}>
                            <View style={styles.singleArtifactContainer}>
                                <Image resizeMode="contain" style={styles.singleArtifactImage} source={{uri: "https://impact.moe/assets/img/artifact-icons/adventurers-flower.webp"}}/>
                            </View>
                            <View style={styles.singleArtifactContainer}>
                                <Image resizeMode="contain" style={styles.singleArtifactImage} source={{uri: "https://impact.moe/assets/img/artifact-icons/adventurers-flower.webp"}}/>
                            </View>
                            <View style={styles.singleArtifactContainer}>
                                <Image resizeMode="contain" style={styles.singleArtifactImage} source={{uri: "https://impact.moe/assets/img/artifact-icons/adventurers-flower.webp"}}/>
                            </View>
                            <View style={styles.singleArtifactContainer}>
                                <Image resizeMode="contain" style={styles.singleArtifactImage} source={{uri: "https://impact.moe/assets/img/artifact-icons/adventurers-flower.webp"}}/>
                            </View>
                            <View style={styles.singleArtifactContainer}>
                                <Image resizeMode="contain" style={styles.singleArtifactImage} source={{uri: "https://impact.moe/assets/img/artifact-icons/adventurers-flower.webp"}}/>
                            </View>
                        </View>
                        <Text style={styles.characterNameContainer}>{character1Data.name}</Text>
                    </ImageBackground>
                    <ImageBackground resizeMode="contain" source={{uri: "https://impact.moe/assets/img/portraits/Albedo.webp"}} style={styles.singleCharacterContainer}>
                        <Text>{character2Data.name}</Text>
                    </ImageBackground>
                </View>
                <View style={styles.characterRowContainer}>
                    <ImageBackground resizeMode="contain" source={{uri: "https://impact.moe/assets/img/portraits/Albedo.webp"}} style={styles.singleCharacterContainer}>
                        <Text>{character3Data.name}</Text>
                    </ImageBackground>
                    <ImageBackground resizeMode="contain" source={{uri: "https://impact.moe/assets/img/portraits/Albedo.webp"}} style={styles.singleCharacterContainer}>
                        <Text>{character4Data.name}</Text>
                    </ImageBackground>
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
        fontSize: 40
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
        borderRadius: "100%",
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
