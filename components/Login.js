import { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { TextInput, Button, Avatar, Snackbar, Checkbox  } from 'react-native-paper';
import firebase from "firebase/compat"
import * as SecureStore from 'expo-secure-store';
const screens = require("../config/ScreensEnum")

export default function LoginComponent({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const [visible, setVisible] = useState(false)
    const [errorMessage, setErrorMessage] = useState("Unknown Error")
    const [checked, setChecked] = useState(false)

    const [init, setInit] = useState(false)

    function showError(errorText){
        setErrorMessage(errorText)
        setVisible(true)
        setTimeout(() => {
            setVisible(false)
        }, 3000)
    }



    function handleLoginPress() {
        firebase.auth().signInWithEmailAndPassword(email, password).then(()=>{
            if (checked) {
                SecureStore.setItemAsync("email", email);
                SecureStore.setItemAsync("password", password);
            }else{
                SecureStore.deleteItemAsync("email");
                SecureStore.deleteItemAsync("password");
            }
        }).catch(err => {
            showError(err.message)
        })
    }

    useEffect(async ()=>{
        if (!init){

            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    navigation.navigate(screens.Drawer)
                }
            });

            let email = await SecureStore.getItemAsync("email");
            let password = await SecureStore.getItemAsync("password");
            if (email && password){
                setEmail(email);
                setPassword(password);
                setChecked(true)
            }
            setInit(true);
        }
    })

    return (
        <ImageBackground source={require("../assets/images/wallpaper.jpg")} style={styles.container}>
            <Avatar.Image source={require("../assets/images/iconMain.png")} size={150} style={styles.iconImage} />
            <View style={styles.inputView}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter Email"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter Password"
                    secureTextEntry={true}
                    value={password}
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
