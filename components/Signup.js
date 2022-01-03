import { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { TextInput, Button, Avatar, Snackbar, Checkbox  } from 'react-native-paper';
import firebase from "firebase/compat"
// import * as SecureStore from 'expo-secure-store';
const screens = require("../config/ScreensEnum")

export default function SignupComponent({ navigation }) {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRetype, setPasswordRetype] = useState("")

    const [visible, setVisible] = useState(false)
    const [errorMessage, setErrorMessage] = useState("Unknown Error")

    function handleSignupPress() {
        if (password === passwordRetype) {
            if (username.trim() !== "") {
                firebase.auth().createUserWithEmailAndPassword(email, password).then(userCredentials => {
                    const user = userCredentials.user
                    firebase.database().ref(`userData/${user.uid}`).set({
                        username: username.trim()
                    }).then(() => {navigation.navigate(screens.Drawer)})
                }).catch(err => {
                    showError(err.message)
                })
            }else{
                showError("Username cannot be empty")
            }
        }else{
            showError("Passwords do not match")
        }
    }

    function showError(errorText){
        setErrorMessage(errorText)
        setVisible(true)
        setTimeout(() => {
            setVisible(false)
        }, 3000)
    }

    return (
        <ImageBackground source={require("../assets/images/wallpaper.jpg")} style={styles.container}>
            <Avatar.Image source={require("../assets/images/iconMain.png")} size={150} style={styles.iconImage} />
            <View style={styles.inputView}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter Username"
                    placeholderTextColor="black"
                    onChangeText={setUsername}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter Email"
                    placeholderTextColor="black"
                    onChangeText={setEmail}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter Password"
                    placeholderTextColor="black"
                    secureTextEntry={true}
                    onChangeText={setPassword}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter Password Again"
                    placeholderTextColor="black"
                    secureTextEntry={true}
                    onChangeText={setPasswordRetype}
                />
            </View>
            <Button mode="contained" style={styles.loginBtn} onPress={handleSignupPress}>
                <Text>SIGNUP</Text>
            </Button>

            <Text style={{textAlign: "center"}} onPress={()=> {navigation.navigate(screens.Login)}}>Already have an account? Login here</Text>

            <Snackbar
                visible={visible}>
                {errorMessage}
            </Snackbar>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    inputView:{
        margin: 20,
        marginBottom: 10,
        marginTop: 10
    },
    loginBtn:{
        margin: 20
    },
    iconImage:{
        borderWidth: 0,
        alignSelf: "center"
    }
});
