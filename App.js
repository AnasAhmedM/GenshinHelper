import 'react-native-gesture-handler';

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

import { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// NOTE for Anas : import this in all files you need
import firebase from "firebase/compat"
import { getAuth, onAuthStateChanged } from "firebase/auth";

// NOTE for Anas : this line only needs to be called once. (kinda like mongoose.connect)
firebase.initializeApp(require("./config/firebaseConfig").firebaseConfig)

// NOTE for Anas : since gameData is public, we can access it without logging in, but we will need auth for other data like userdata
firebase.database().ref('gameData/').once('value', function (snapshot) {
  // NOTE for Anas : this is the data
  console.log(snapshot.val())
});

const screens = {
  Login : "Login",
  Signup: "Signup",
  AccountSettings: "Account Settings",
  ListArtifacts: "All Artifacts",
  ListWeapons: "All Weapons",
  ListCharacters: "All Characters",
  ListTeams: "All Teams ",
  SingleArtifact: "SingleArtifact",
  SingleWeapon: "SingleWeapon",
  SingleCharacter: "SingleCharacter",
  SingleTeam: "SingleTeam",
  ChooseArtifact: "ChooseArtifact",
  ChooseWeapon: "ChooseWeapon",
  ChooseCharacter: "ChooseCharacter",

  Drawer: "Drawer",
  Homepage: "Home"
};



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={screens.Drawer} screenOptions={{headerShown:false}}>
        <Stack.Screen name={screens.Login} component={LoginComponent} />
        <Stack.Screen name={screens.Signup} component={SignupComponent} />
        <Stack.Screen name={screens.Drawer} component={({ navigation, routes }) => {
          onAuthStateChanged(getAuth(), (user) => {
            if (user) {
              console.log("User logged in", user.uid)
            } else {
              navigation.navigate(screens.Login);
            }
          });
          // return (
          //     <View>
          //     </View>
          // )
          return(
              <Drawer.Navigator initialRouteName={screens.Homepage}>
                <Drawer.Screen name = {screens.Homepage} component={HomePageComponent}/>
                <Drawer.Screen name = "Characters" component={() => {
                  return(
                      <Stack.Navigator >
                        <Stack.Screen name = {screens.ListCharacters} component={ListCharacterComponent}/>
                        <Stack.Screen name = {screens.SingleCharacter} component={SingleCharacterComponent}/>
                      </Stack.Navigator>
                  )
                }}/>

                <Drawer.Screen name = "Artifacts" component={() => {
                  return(
                      <Stack.Navigator >
                        <Stack.Screen name = {screens.ListArtifacts} component={ListArtifactComponent}/>
                        <Stack.Screen name = {screens.SingleArtifact} component={SingleArtifactComponent}/>
                      </Stack.Navigator>
                  )
                }}/>

                <Drawer.Screen name = "Weapons" component={() => {
                  return(
                      <Stack.Navigator >
                        <Stack.Screen name = {screens.ListWeapons} component={ListWeaponComponent}/>
                        <Stack.Screen name = {screens.SingleWeapon} component={SingleWeaponComponent}/>
                      </Stack.Navigator>
                  )
                }}/>

                <Drawer.Screen name = "Teams" component={() => {
                  return(
                      <Stack.Navigator>
                        <Stack.Screen name = {screens.ListTeams} component={ListTeamComponent}/>
                        <Stack.Screen name = {screens.SingleTeam} component={SingleTeamComponent}/>
                        <Stack.Screen name = {screens.ChooseArtifact} component={ListChooseArtifactComponent}/>
                        <Stack.Screen name = {screens.ChooseWeapon} component={ListChooseWeaponComponent}/>
                        <Stack.Screen name = {screens.ChooseCharacter} component={ListChooseCharacterComponent}/>
                      </Stack.Navigator>
                  )
                }}/>
                <Drawer.Screen name = {screens.AccountSettings} component={AccountSettingsComponent}/>
              </Drawer.Navigator>
          )
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
