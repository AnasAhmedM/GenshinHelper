import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Platform, Image } from 'react-native';
import { Button, Headline, Snackbar, TextInput, ProgressBar, Modal, Portal, Divider } from "react-native-paper";
import { useState, useEffect } from "react";
import firebase from "firebase/compat";
import * as ImagePicker from 'expo-image-picker';
// const fs = require("fs");

export default function AccountSettingsComponent() {
    const [init, setInit] = useState(false);

    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPassword2, setNewPassword2] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [image, setImage] = useState(require("../assets/images/defaultProfilePicture.png"));

    const [visible, setVisible] = useState(false)
    const [errorMessage, setErrorMessage] = useState("Unknown Error")

    const [modelVisible, setModelVisible] = useState(false)
    const [uploadPercent, setUploadPercent] = useState(0)
    const [imageUpdated, setImageUpdated] = useState(false)

    const showModal = () => setModelVisible(true)
    const hideModal = () => setModelVisible(false)

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    useEffect(() => {
        if (!init){
            setInit(true);
            firebase.database().ref(`userData/${firebase.auth().currentUser.uid}/profilePicture`).once("value").then(snapshot => {
                if (snapshot.val()){
                    setImage({uri: snapshot.val()})
                }
            })
        }
    })

    return (
        <ScrollView style={styles.container}>
            <Headline style={styles.headerText}>Change Profile Picture</Headline>
            <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                <Image style={styles.profilePicture} source={image} />
            </TouchableOpacity>
            <Button mode="contained" style={styles.button} onPress={changeProfilePicture} disabled={!imageUpdated}>
                <Text>UPDATE PROFILE PICTURE</Text>
            </Button>
            <Divider/>
            <View>
                <Headline style={styles.headerText}>Change Name</Headline>
                <TextInput placeholder="Enter New Username" style={styles.inputField} onChangeText={setNewUsername}/>
                <Button mode="contained" style={styles.button} onPress={handleUsernameChange}>
                    <Text>CHANGE NAME</Text>
                </Button>
            </View>
            <Divider/>
            <View>
                <Headline style={styles.headerText}>Change Password</Headline>
                <TextInput
                    secureTextEntry={true}
                    placeholder="Enter Old Password"
                    style={styles.inputField}
                    onChangeText={setOldPassword}/>
                <TextInput
                    secureTextEntry={true}
                    placeholder="Enter New Password"
                    style={styles.inputField}
                    onChangeText={setNewPassword}/>
                <TextInput
                    secureTextEntry={true}
                    placeholder="Enter New Password Again"
                    style={styles.inputField}
                    onChangeText={setNewPassword2}/>
                <Button mode="contained" style={styles.button} onPress={handlePasswordChange}>
                    <Text>UPDATE PASSWORD</Text>
                </Button>
            </View>
            <Snackbar
                visible={visible}>
                {errorMessage}
            </Snackbar>
            <Portal style={styles.modelContainerStyle}>
                <Modal visible={modelVisible} onDismiss={hideModal} contentContainerStyle={styles.modelStyle}>
                    <Text>Example Modal.  Click outside this area to dismiss.</Text>
                </Modal>
            </Portal>
        </ScrollView>
    );

    function changeProfilePicture() {
        // if (!imageUpdated) return;
        //
        // let fileUploadPath = firebase.storage().ref().child("userProfilePictures").child(
        //     firebase.auth().currentUser.uid + "." + image.uri.split('.').pop()
        // );
        // let fileUploadTask = fileUploadPath.put(fs.readFileSync(image.uri));
        // // dialog.style["display"] = "block";
        // fileUploadTask.on('state_changed', function(snapshot){
        //     // let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //     // progress = Math.round(progress);
        //     // let progressStyleString = progress.toString() + "%";
        //     // progressBar.style["width"] = progressStyleString;
        //     // progressValue.innerText = progressStyleString;
        // }, function(error) {
        //     console.log(error);
        //     showSnackbarMessage(error);
        //     // dialog.style["display"] = "none";
        // }, function() {
        //     fileUploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        //         // dialog.style["display"] = "none";
        //         firebase.database().ref().child("userData").child(firebase.auth().currentUser.uid).child("profilePicture").set(downloadURL);
        //         showSnackbarMessage("Profile Picture Changed");
        //     });
        // });
    }
    function handleUsernameChange() {
        if(newUsername.trim() !== ""){
            firebase.database().ref(`userData/${firebase.auth().currentUser.uid}/username`).set(newUsername)
            showSnackbarMessage("Username Updated")
        }else{
            showSnackbarMessage("Username cannot be empty")
        }
    }
    function handlePasswordChange(){
        if (newPassword === newPassword2){
            const credential = firebase.auth.EmailAuthProvider.credential(
                firebase.auth().currentUser.email,
                oldPassword
            );
            firebase.auth().currentUser.reauthenticateWithCredential(credential).then(() => {
                firebase.auth().currentUser.updatePassword(newPassword).then(function () {
                    showSnackbarMessage("Password Updated");
                }).catch(function (error) {
                    console.log(error);
                    showSnackbarMessage("Failed to update Password");
                });
            })
        }else{
            showSnackbarMessage("Passwords do not match")
        }
    }
    function showSnackbarMessage(errorText){
        setErrorMessage(errorText)
        setVisible(true)
        setTimeout(() => {
            setVisible(false)
        }, 3000)
    }
    async function pickImage(){
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImageUpdated(true);
            setImage(result);
        }
    }

}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    inputField:{
        margin: 10
    },
    headerText:{
        marginTop: 20,
        textAlign: "center"
    },
    button:{
        alignSelf: "center",
        width: "60%",
        margin: 10,
    },
    imagePicker:{
        width: "100%",
        height: 200,
        justifyContent: "center",
        alignItems: "center",
    },
    profilePicture:{
        borderRadius: 500,
        width: 200,
        height: 200,
        borderWidth:1,
        margin:10
    },
    modelContainerStyle:{
        borderWidth: 10,
        backgroundColor: "rgba(0,0,0,0)"
    },
    modelStyle: {
        backgroundColor: '#5b5b5b',
        padding: 20,
        margin: 20,
        borderWidth: 1,
    }
});
