import { useState } from 'react';
import { StyleSheet, Text, Image, View, ScrollView, Alert} from 'react-native';
import { List, Card, Title, Paragraph, Divider, Avatar} from 'react-native-paper';
import {myNavigatorTheme} from '../config/theme'
export default function SingleCharacterComponent({ navigation, route }) {
    const [data] = useState(route.params?.data)
    const [element] = useState(route.params?.element)
    
    const showDesc= (desc) =>{
        Alert.alert('Description', desc, [
            { text: 'OK', onPress: () => console.log('OK Pressed') }
          ]);
    }

    return (
        <View style={{flex:1, justifyContent:'center'}}>
        <View style={{height:'100%', borderWidth:1}}>
          <ScrollView>
            <Divider style={{height:1}}/>
            <Card style={{backgroundColor: myNavigatorTheme.colors.background}}>
                <Card.Title
                    title={data.name}
                    subtitle={data.weapon}
                    left={props=>
                        <View >
                            <Image style={{height:60, width:60, borderRadius:20, alignSelf:'center'}} source={{ uri: data.icon}}/>
                        </View>}
                    right={props=>
                        <View>
                            <Image style={{height:40, width:40, borderRadius:20, alignSelf:'center'}} source={{ uri: element }}/>
                            <Text style={{alignSelf:'center'}}>{data.element}</Text>
                        </View>}
                    />
                <Card.Content style={{flexDirection:'row', justifyContent:'center'}}>
                    {data.rarity>0?<Avatar.Icon style={{backgroundColor:'transparent'}} color='yellow' size={32} icon="star" />:null}
                    {data.rarity>1?<Avatar.Icon style={{backgroundColor:'transparent'}} color='yellow' size={32} icon="star" />:null}
                    {data.rarity>2?<Avatar.Icon style={{backgroundColor:'transparent'}} color='yellow' size={32} icon="star" />:null}
                    {data.rarity>3?<Avatar.Icon style={{backgroundColor:'transparent'}} color='yellow' size={32} icon="star" />:null}
                    {data.rarity>4?<Avatar.Icon style={{backgroundColor:'transparent'}} color='yellow' size={32} icon="star" />:null}
                </Card.Content>
                <Divider style={{height:5}}/>
                <Card.Content>
                    <Title>Description</Title>
                    <Paragraph>{data.description}</Paragraph>
                    <Title>Faction</Title>
                    <Paragraph>{data.faction}</Paragraph>
                    <Title>Constellation</Title>
                    <Paragraph>{data.constellation}</Paragraph>
                    <Title>Birthday</Title>
                    <Paragraph>{data.birthday}</Paragraph>
                    <Title>Voice Actor</Title>
                    <Paragraph>{data.englishVA}</Paragraph>
                </Card.Content>
                <Divider style={{height:5}}/>
                <Card.Content>
                    <Title>Constellations</Title>
                    {data.constellations.map((e, ind) =>{
                        return(
                            <View>
                                <List.Item
                                    title={e.name}
                                    titleStyle={{fontWeight:'bold'}}
                                    description={e.description}
                                    left={props=> <Image style={{height:60, width:60, borderRadius:20}} source={{ uri: e.image }}/>}
                                    onPress={()=>showDesc(e.description)}
                                />
                                <Divider style={{height:1}}/>
                            </View>
                            )
                        })
                        }
                </Card.Content>
                <Divider style={{height:5}}/>
                <Card.Content>
                    <Title>Talents</Title>
                    {data.talents.map((e, ind) =>{
                        return(
                            <View>
                                <List.Item
                                    title={e.name}
                                    titleStyle={{fontWeight:'bold'}}
                                    description={e.description}
                                    style={{padding:10}}
                                    left={props=> <Image style={{height:60, width:60, borderRadius:20}} source={{ uri: e.image }}/>}
                                    onPress={()=>showDesc(e.description)}
                                />
                                <Divider style={{height:1}}/>
                            </View>
                            )
                        })
                        }
                </Card.Content>
                <Divider style={{height:20}}/>
            </Card>
          </ScrollView>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    containerStyle : {
        backgroundColor: 'white',
        padding: 20
    }
});
