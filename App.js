const loginComponent = require("./components/Login")
const signupComponent = require("./components/Signup")
const accountSettingsComponent = require("./components/AccountSettings")

const listArtifactComponent = require("./components/ListArtifact")
const listCharacterComponent = require("./components/ListCharacter")
const listWeaponComponent = require("./components/ListWeapon")
const listTeamComponent = require("./components/ListTeam")

const singleArtifactComponent = require("./components/SingleArtifact")
const singleWeaponComponent = require("./components/SingleWeapon")
const singleCharacterComponent = require("./components/SingleCharacter")
const singleTeamComponent = require("./components/SingleTeam")

const listChooseArtifactComponent = require("./components/ListChooseArtifact")
const listChooseWeaponComponent = require("./components/ListChooseWeapon")
const listChooseCharacterComponent = require("./components/ListChooseCharacter")

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
