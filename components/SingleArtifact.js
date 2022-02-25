import {useState} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {Avatar, Card, Divider, List, Paragraph, Subheading, Title} from 'react-native-paper';
import {myNavigatorTheme} from '../config/theme'

export default function SingleArtifactComponent({navigation, route}) {
    const [data] = useState(route.params?.data)
    const [artifacts] = useState(route.params?.artifacts)
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
                            <Title>Set</Title>
                            <Paragraph>{data.artifactSet.name}</Paragraph>
                            <Title>Description</Title>
                            <Paragraph>{data.description}</Paragraph>
                            <Title>Location</Title>
                            <Paragraph>{data.location}</Paragraph>
                            <Title>Lore</Title>
                            <Paragraph>{data.lore}</Paragraph>
                        </Card.Content>
                        <Divider style={{height: 20}}/>
                        <Card.Content>
                            <Title>Bonuses</Title>
                            <Subheading style={{fontWeight: 'bold'}}>Two Piece Bonus</Subheading>
                            <Paragraph>{data.artifactSet.twoPieceBonus}</Paragraph>
                            <Subheading style={{fontWeight: 'bold'}}>Four Piece Bonus</Subheading>
                            <Paragraph>{data.artifactSet.fourPieceBonus}</Paragraph>
                        </Card.Content>
                        <Divider style={{height: 20}}/>
                        <Card.Content>
                            <Title>Other Artifacts of Same Set</Title>
                            {artifacts.map((e) => {
                                if (e.artifactSet.name === data.artifactSet.name && e.rarity === data.rarity && e.type != data.type)
                                    return (
                                        <View>
                                            <List.Item
                                                title={e.name}
                                                titleStyle={{fontWeight: 'bold'}}
                                                description={e.type}
                                                left={props => <Image style={{height: 60, width: 60, borderRadius: 20}}
                                                                      source={{uri: e.image}}/>}
                                                onPress={() => navigation.push('SingleArtifact', {
                                                    data: e,
                                                    artifacts: artifacts
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
