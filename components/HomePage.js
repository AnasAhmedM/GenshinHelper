import { StyleSheet, Text, View } from 'react-native';
import {Avatar, Card, Headline } from "react-native-paper";
import {myNavigatorTheme} from "../config/theme";

export default function HomePage() {
    return (
        <View style={styles.container}>
            <View>
                <Headline>Hello!</Headline>
            </View>
            <Card style={styles.mainCard}>
                <Card.Title style={styles.cardTitle}>GENSHIN HELPER</Card.Title>
                <Card.Content style={styles.cardContent}>
                    <Avatar.Image source={require("../assets/images/iconMain.png")} size={150} style={styles.iconImage} />
                    <Text style={styles.cardContentText}>Welcome to Genshin Helper</Text>
                </Card.Content>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: "center",
        alignItems: "center",
    },
    mainCard:{
        elevation: 5,
        height: "80%",
        width: "80%",
        borderRadius: 10
    },
    cardContent:{
        flex:1,
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    cardTitle:{
        color: myNavigatorTheme.colors.text
    },
    cardContentText:{
        fontSize: 20
    }
});
