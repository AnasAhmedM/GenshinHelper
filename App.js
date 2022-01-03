import LoginComponent from "./components/Login"
import SignupComponent from "./components/Signup"
import AccountSettingsComponent from "./components/AccountSettings"
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
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

import firebase from "firebase/compat"

firebase.initializeApp(require("./config/firebaseConfig").firebaseConfig)

firebase.database().ref('gameData/').once('value', function (snapshot) {
  // console.log(snapshot.val())
});

const screens = require("./config/ScreensEnum")

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#4771a6',
        accent: '#4771a6',
    },
};


export default function App() {
  return (
      <PaperProvider theme={theme}>
          <NavigationContainer>
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
    firebase.auth().onAuthStateChanged(user => {
        if (!user) navigation.navigate(screens.Login)
    });
    return(
        <Drawer.Navigator initialRouteName={screens.Homepage} drawerContent={props => {
            return (
                <DrawerContentScrollView {...props}>
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
            <Drawer.Screen name = {screens.AccountSettings} component={AccountSettingsComponent}/>
        </Drawer.Navigator>
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
        <Stack.Navigator screenOptions={{
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



