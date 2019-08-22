import React, { Component } from 'react'
import { StyleSheet, AsyncStorage as storage } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { Header, Left, Icon, Body, Thumbnail, Button, Title, Subtitle } from 'native-base';
import MarqueeText from 'react-native-marquee'
import { Database, Auth } from '../public/config/db'

export class Chat extends Component {
    constructor(props) {
        super(props)

        this.state = {
            messages: [],
            datauser: this.props.navigation.getParam('data'),
            text: '',
            avatar: '',
            fullname: ''
        }

        storage.getItem('avatar', (err, result) => {
            if (result) {
                this.setState({
                    avatar: result
                })
            }
        })

        storage.getItem('fullname', (err, result) => {
            if (result) {
                this.setState({
                    fullname: result
                })
            }
        })
    }

    componentWillMount() {
        console.warn('uid1', Auth.currentUser.uid)
        console.warn('uid2', this.state.datauser.id)
        Database.ref('messages').child(Auth.currentUser.uid).child(this.state.datauser.id)
            .on('child_added', (value) => {
                this.setState((prevState) => {
                    return {
                        messages: GiftedChat.append(prevState.messages, value.val())
                    }
                })
            })
    }

    onSend = () => {

        if (this.state.text.length > 0) {
            let msgId = Database.ref('messages').child(Auth.currentUser.uid).child(this.state.datauser.id).push().key
            let updates = {}
            let message = {
                _id: msgId,
                text: this.state.text,
                createdAt: new Date(),
                user: {
                    _id: Auth.currentUser.uid,
                    fullname: this.state.fullname,
                    avatar: this.state.avatar
                }
            }

            updates['messages/' + Auth.currentUser.uid + '/' + this.state.datauser.id + '/' + msgId] = message
            updates['messages/' + this.state.datauser.id + '/' + Auth.currentUser.uid + '/' + msgId] = message

            Database.ref().update(updates)
            this.setState({ text: '' })
        }
    }

    render() {
        const { datauser } = this.state
        console.warn(datauser)
        return (
            <>
                <Header style={{ backgroundColor: '#89216B' }}>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate('Chat')}
                        >
                            <Icon name="arrow-round-back" type="Ionicons" style={styles.iconStyle} />
                        </Button>
                    </Left>
                    <Body>
                        <Thumbnail source={{ uri: datauser.avatar }} rounded style={styles.avatar} />
                    </Body>
                    <Body style={{ marginLeft: -60, width: 500 }}>
                        <MarqueeText
                            style={{ fontSize: 24 }}
                            duration={3000}
                            marqueeOnStart
                            loop
                            marqueeDelay={1000}
                            marqueeResetDelay={1000}
                        >
                            <Title>{datauser.fullname}</Title>
                        </MarqueeText>
                        <Subtitle>{datauser.status}</Subtitle>
                    </Body>
                </Header>
                <GiftedChat
                    text={this.state.text}
                    messages={this.state.messages}
                    onSend={this.onSend}
                    user={{
                        _id: Auth.currentUser.uid,
                        fullname: this.state.fullname,
                        avatar: this.state.avatar
                    }}
                    onInputTextChanged={(value) => this.setState({ text: value })}
                    isLoadingEarlier={true}
                />
            </>
        )
    }
}

const styles = StyleSheet.create({
    avatar: {
        width: 40,
        height: 40,
        borderColor: 'white',
        borderWidth: 1
    },
    iconStyle: {
        color: 'white',
        marginHorizontal: 10
    }
})

export default Chat