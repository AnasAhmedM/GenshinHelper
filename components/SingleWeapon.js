import {useState} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {Avatar, Card, Divider, List, Paragraph, Title} from 'react-native-paper';
import {myNavigatorTheme} from '../config/theme'

export default function SingleWeaponComponent({navigation, route}) {
    const [data] = useState(route.params?.data)
    const [weapons] = useState(route.params?.weapons)
    return (
        <View style={{flex: 1, justifyContent: 'center'}}>
            <View style={{height: '100%', borderWidth: 1}}>
                <ScrollView>
                    <Divider style={{height: 1}}/>
                    <Card style={{backgroundColor: myNavigatorTheme.colors.background}}>
                        <Card.Title
                            title={data.name}
                            subtitle={data.type}
                            left={props =>
                                <View>
                                    <Image style={{height: 60, width: 60, borderRadius: 20, alignSelf: 'center'}}
                                           source={{uri: data.image}}/>
                                </View>}
                        />
                        <Card.Content style={{flexDirection: 'row', justifyContent: 'center'}}>
                            {data.rarity > 0 ?
                                <Avatar.Icon style={{backgroundColor: 'transparent'}} color='yellow' size={32}
                                             icon="star"/> : null}
                            {data.rarity > 1 ?
                                <Avatar.Icon style={{backgroundColor: 'transparent'}} color='yellow' size={32}
                                             icon="star"/> : null}
                            {data.rarity > 2 ?
                                <Avatar.Icon style={{backgroundColor: 'transparent'}} color='yellow' size={32}
                                             icon="star"/> : null}
                            {data.rarity > 3 ?
                                <Avatar.Icon style={{backgroundColor: 'transparent'}} color='yellow' size={32}
                                             icon="star"/> : null}
                            {data.rarity > 4 ?
                                <Avatar.Icon style={{backgroundColor: 'transparent'}} color='yellow' size={32}
                                             icon="star"/> : null}
                        </Card.Content>
                        <Divider style={{height: 5}}/>
                        <Card.Content>
                            <Title>Description</Title>
                            <Paragraph>{data.description}</Paragraph>
                            <Title>Location</Title>
                            <Paragraph>{data.location}</Paragraph>
                            <Title>Lore</Title>
                            <Paragraph>{data.lore}</Paragraph>
                        </Card.Content>
                        <Divider style={{height: 20}}/>
                        <Card.Content>
                            <Title>Other Similar Weapons</Title>
                            {weapons.map((e) => {
                                if (e.abilityName === data.abilityName && e.id != data.id)
                                    return (
                                        <View>
                                            <List.Item
                                                title={e.name}
                                                titleStyle={{fontWeight: 'bold'}}
                                                description={e.type}
                                                left={props => <Image style={{height: 60, width: 60, borderRadius: 20}}
                                                                      source={{uri: e.image}}/>}
                                                onPress={() => navigation.push('SingleWeapon', {
                                                    data: e,
                                                    weapons: weapons
                                                })}
                                            />
                                            <Divider style={{height: 1}}/>
                                        </View>
                                    )
                            })
                            }
                        </Card.Content>
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
});
