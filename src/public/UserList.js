import React, { Component } from 'react'
import { FlatList, AsyncStorage as storage, TouchableOpacity } from 'react-native'
import { Text, Left, Body, List, ListItem, Thumbnail } from 'native-base';
import { Database } from '../public/config/db'
import { withNavigation } from 'react-navigation'

export class UserList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            data: []
        }
    }

    componentWillMount = async () => {
        let dbref = Database.ref('/user')
        let email = await storage.getItem('email')
        dbref.on('child_added', (val) => {
            let person = val.val()
            
            if (person.email === email) {
                email = person.email
            } else {
                this.setState((prevState) => {
                    return {
                        users: [...prevState.users, person]
                    }
                })
            }
        })
    }

    _renderItem = ({ item, index }) => {
        return (

            <List key={index}>
                <ListItem avatar>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.navigate('FriendProfile', { data: item })}>
                        <Left>
                            <Thumbnail source={{ uri: item.avatar }} />
                        </Left>
                    </TouchableOpacity>
                    <Body>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.navigate('ChatRoom', { data: item })}>
                            <Text>{item.fullname}</Text>
                            <Text note>{item.status}</Text>
                        </TouchableOpacity>
                    </Body>
                </ListItem>
            </List>
        )
    }

    render() {
        console.warn("list user: ", this.state.users)
        return (
            <FlatList
                data={this.state.users}
                renderItem={this._renderItem}
                keyExtractor={(index) => {
                    return index
                  }}
                showsVerticalScrollIndicator={false}
            />
        )
    }
}

export default withNavigation(UserList)