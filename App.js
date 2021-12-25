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
          return(
              <NavigationContainer independent={true}>
                <Drawer.Navigator initialRouteName={screens.Homepage}>
                  <Drawer.Screen name = {screens.Homepage} component={HomePageComponent}/>
                  <Drawer.Screen name = {screens.ListCharacters} component={ListCharacterComponent}/>
                  <Drawer.Screen name = {screens.ListArtifacts} component={ListArtifactComponent}/>
                  <Drawer.Screen name = {screens.ListWeapons} component={ListWeaponComponent}/>
                  <Drawer.Screen name = {screens.ListTeams} component={ListTeamComponent}/>
                  <Drawer.Screen name = {screens.AccountSettings} component={AccountSettingsComponent}/>
                </Drawer.Navigator>
              </NavigationContainer>
          )
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: "gray",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },

  textInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "gray",
  },
});
