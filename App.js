import LoginComponent from "./components/Login"
import SignupComponent from "./components/Signup"
import AccountSettingsComponent from "./components/AccountSettings"
import ListChooseProfilePictureComponent from "./components/ListChooseProfilePicture";
import HomePageComponent from "./components/HomePage"

import ListArtifactComponent from "./components/ListArtifact"
import ListCharacterComponent from "./components/ListCharacter"
import ListWeaponComponent from "./components/ListWeapon"
import ListTeamComponent from "./components/ListTeam"

import SingleArtifactComponent from "./components/SingleArtifact"
import SingleWeaponComponent from "./components/SingleWeapon"
import SingleCharacterComponent from "./components/SingleCharacter"
import SingleTeamComponent from "./components/SingleTeam"

import ListChooseArtifactComponent from "./components/ListChooseArtifact"
import ListChooseWeaponComponent from "./components/ListChooseWeapon"
import ListChooseCharacterComponent from "./components/ListChooseCharacter"

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Provider as PaperProvider } from 'react-native-paper';
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { ImageBackground } from "react-native";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

import firebase from "firebase/compat"
firebase.initializeApp(require("./config/firebaseConfig").firebaseConfig)

const screens = require("./config/ScreensEnum")
import { myNavigatorTheme, myPaperTheme } from './config/theme'


export default function App() {
  return (
      <PaperProvider theme={myPaperTheme}>
          <NavigationContainer theme={myNavigatorTheme}>
              <Stack.Navigator initialRouteName={screens.Drawer} screenOptions={{headerShown:false}}>
                  <Stack.Screen name={screens.Login} component={LoginComponent} />
                  <Stack.Screen name={screens.Signup} component={SignupComponent} />
                  <Stack.Screen name={screens.Drawer} component={DrawerComponent} />
              </Stack.Navigator>
          </NavigationContainer>
      </PaperProvider>
  );
}

let DrawerComponent = ({ navigation }) => {
    const [currentUserData, setCurrentUserData] = useState({username:"", profilePicture: require("./assets/images/defaultProfilePicture.png")});
    const [init, setInit] = useState(false)
    useEffect(() => {
        if (!init) {
            setInit(true);
            firebase.auth().onAuthStateChanged(user => {
                if (!user) navigation.navigate(screens.Login)
                else {
                    firebase.database().ref(`userData/${user.uid}`).on("value", snapshot => {
                        const value = snapshot.val()
                        setCurrentUserData({
                            username: value.username,
                            profilePicture: value.profilePicture === undefined ? currentUserData.profilePicture : { uri: value.profilePicture }
                        })
                    })
                }

            });
        }
    })

    return(
        <Drawer.Navigator initialRouteName={screens.Homepage} drawerContent={props => {
            return (
                <DrawerContentScrollView {...props}>
                    <TouchableOpacity style={styles.banner} onPress={() => {props.navigation.navigate(screens.AccountSettings)}}>
                        <ImageBackground
                            source={require("./assets/images/wallpaper.jpg")}
                            resizeMode="cover"
                            style={styles.bannerBackground}>
                            <View style={styles.bannerItemsContainer}>
                                <Avatar.Image
                                    size={60}
                                    style={styles.bannerImage}
                                    source={currentUserData.profilePicture}
                                />
                                <Text style={styles.bannerText}>{currentUserData.username}</Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>

                    <DrawerItemList {...props} />

                    <DrawerItem label="Logout" onPress={() => {
                        firebase.auth().signOut().catch(err => {
                            console.log(err)
                        })
                    }} />

                </DrawerContentScrollView>
            )
        }}>
            <Drawer.Screen name = {screens.Homepage} component={HomePageComponent}/>
            <Drawer.Screen name = {screens.Characters} component={CharactersComponent}/>
            <Drawer.Screen name = {screens.Artifacts} component={ArtifactsComponent}/>
            <Drawer.Screen name = {screens.Weapons} component={WeaponsComponent}/>
            <Drawer.Screen name = {screens.Teams} component={TeamsComponent}/>
            <Drawer.Screen name = {screens.Settings} component={SettingsComponent}/>
        </Drawer.Navigator>
    )
}

let SettingsComponent = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name={screens.AccountSettings} component={AccountSettingsComponent}/>
            <Stack.Screen name={screens.ChooseProfilePicture} component={ListChooseProfilePictureComponent}/>
        </Stack.Navigator>
    )
}

let CharactersComponent = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name={screens.ListCharacters} component={ListCharacterComponent}/>
            <Stack.Screen name={screens.SingleCharacter} component={SingleCharacterComponent}/>
        </Stack.Navigator>
    )
}

let ArtifactsComponent = () => {
    return(
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name = {screens.ListArtifacts} component={ListArtifactComponent}/>
            <Stack.Screen name = {screens.SingleArtifact} component={SingleArtifactComponent}/>
        </Stack.Navigator>
    )
}

let WeaponsComponent = () => {
    return(
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name = {screens.ListWeapons} component={ListWeaponComponent}/>
            <Stack.Screen name = {screens.SingleWeapon} component={SingleWeaponComponent}/>
        </Stack.Navigator>
    )
}

let TeamsComponent = () => {
    return(
        <Stack.Navigator initialRouteName={screens.ListTeams} screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name = {screens.ListTeams} component={ListTeamComponent}/>
            <Stack.Screen name = {screens.SingleTeam} component={SingleTeamComponent}/>
            <Stack.Screen name = {screens.ChooseArtifact} component={ListChooseArtifactComponent}/>
            <Stack.Screen name = {screens.ChooseWeapon} component={ListChooseWeaponComponent}/>
            <Stack.Screen name = {screens.ChooseCharacter} component={ListChooseCharacterComponent}/>
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    banner:{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        height: 150,
        backgroundColor: myPaperTheme.colors.primary
    },
    bannerImage:{
        elevation: 10
    },
    bannerItemsContainer:{
        height: "100%",
        justifyContent: "center",
        padding: 20
    },
    bannerBackground:{
        width: "100%",
        height: "100%",
    },
    bannerText: {
        color: myNavigatorTheme.colors.primary,
        fontWeight: "bold",
        fontSize: 20,
        elevation: 10
    }
})


