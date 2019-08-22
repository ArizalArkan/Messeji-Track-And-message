import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import { Text, Header, Left, Icon, Button, Right, Body, Title, Thumbnail, List, ListItem, Fab, Subtitle, View } from 'native-base'
import { TouchableOpacity } from 'react-native-gesture-handler';

export class chatlist extends Component {
    render() {
        return (
            <>
                <StatusBar translucent={false} backgroundColor="transparent" />
                <Header style={{ backgroundColor: '#89216B' }}>
                    <Body>
                        <Title>メッセージ!</Title>
                        <Subtitle>Chat List</Subtitle>
                    </Body>
                </Header>
                {/* <List>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => this.props.navigation.navigate('Chat')}
                    >
                        <ListItem avatar>
                            <Left>
                                <Thumbnail source={{ uri: 'https://res.cloudinary.com/dnqtceffv/image/upload/v1565841345/w4erugmcy0csw2cvjmx7.jpg' }} />
                            </Left>
                            <Body>
                                <Text>Nathalia Gabryel</Text>
                                <Text note>Doing what you like will always keep you happy . .</Text>
                            </Body>
                            <Right>
                                <Text note>3:43 pm</Text>
                            </Right>
                        </ListItem>
                    </TouchableOpacity>
                </List> */}
                <View
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 0, }}>
                    <Text note >Belum ada percakapan, mulai percakapan yuk!</Text>
                </View>
            </>
        )
    }
}

export default chatlist