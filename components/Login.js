import { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { TextInput, Button, Avatar, Snackbar, Checkbox  } from 'react-native-paper';
import firebase from "firebase/compat"
// import * as SecureStore from 'expo-secure-store';
const screens = require("../config/ScreensEnum")

export default function LoginComponent({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [visible, setVisible] = useState(false)
    const [errorMessage, setErrorMessage] = useState("Unknown Error")
    const [checked, setChecked] = useState(false);

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            if (checked){

            }
            navigation.navigate(screens.Drawer)
        }
    });

    function handleLoginPress() {
        firebase.auth().signInWithEmailAndPassword(email, password).catch(err => {
            setErrorMessage(err.message)
            setVisible(true)
            setTimeout(()=> {setVisible(false)}, 3000)
        })
    }

    return (
        <ImageBackground source={require("../resources/images/wallpaper.jpg")} style={styles.container}>
            <Avatar.Image source={require("../resources/images/iconMain.png")} size={150} style={styles.iconImage} />
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
            <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setChecked(!checked);
                    }}
                />
                <Text>Remember Me</Text>
            </View>

            <Button mode="contained" style={styles.loginBtn} onPress={handleLoginPress}>
                <Text>LOGIN</Text>
            </Button>

            <Text style={{textAlign: "center"}} onPress={()=> {navigation.navigate(screens.Signup)}}>Don't have an account? Signup here</Text>

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
