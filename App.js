
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


import {React, useState} from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 




function LoginScreen({ navigation, route}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  return (
    <View style={styles.container}>
    
      <Icon name='person' color='black' size={256}/>
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Email."
          placeholderTextColor="black"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Password."
          placeholderTextColor="black"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
 
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
 
      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LoginScreen' screenOptions={{headerShown:false}}>
        <Stack.Screen name='Login' component={LoginScreen} />
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
