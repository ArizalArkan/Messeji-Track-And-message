import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import { Header, Button, Right, Icon, Body, Title, Subtitle } from 'native-base';
import Lists from '../public/UserList'

class UserList extends Component {
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
            <Lists />
            </>
        )
    }
}
export default UserList