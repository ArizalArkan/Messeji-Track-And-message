import React from 'react'
import {
    createStackNavigator,
    createAppContainer,
    createMaterialTopTabNavigator,
    createSwitchNavigator
} from 'react-navigation'
import { Icon } from 'react-native-elements'
import Maps from '../screen/Maps'
import ChatList from '../screen/ChatList'
import ChatRoom from '../screen/ChatRoom'
import FriendList from '../screen/UserList'
import FriendProfile from '../screen/FriendProfile'
import Profile from '../screen/Profile'
import Login from '../screen/Login'
import Register from '../screen/Register'
import AuthLoading from '../public/AuthLoading'

const AppNavigator = createMaterialTopTabNavigator({
    Profile: {
        screen: Profile,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Icon name='face' color={tintColor} size={22} style={{ color: 'white' }} />
            )
        }
    },
    Maps: {
        screen: Maps,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Icon name='map' color={tintColor} size={22} style={{ color: 'white' }} />
            )
        }
    },
    Chat: {
        screen: FriendList,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Icon name='forum' color={tintColor} size={22} style={{ color: 'white' }} />
            )
        }
    },
    },
    {
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        animationEnabled: false,
        tabBarOptions: {
            activeTintColor: 'white',
            inactiveTintColor: 'grey',
            upperCaseLabel: false,
            labelStyle: {
                fontSize: 9,
                marginTop: 1
            },
            style: {
                backgroundColor: '#89216B',
                elevation: 15,
                height: 50
            },
            indicatorStyle: {
                height: 0
            },
            showIcon: true
        }
    })

const AppStackNavigator = createStackNavigator({
    Maps: {
        screen: AppNavigator,
    },
    ChatList: {
        screen: ChatList
    },
    Profile: {
        screen: Profile
    },
    ChatRoom: {
        screen: ChatRoom
    },
    Friend: {
        screen: FriendList
    },
    FriendProfile: {
        screen: FriendProfile
    }
},
{   
    headerMode: 'none',
    initialRouteName: 'Maps'
})

const AuthStack = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    },

    Register: {
        screen: Register,
        navigationOptions: {
            header: null
        }
    },
})

export default createAppContainer(createSwitchNavigator({
    AuthLoading: AuthLoading,
    App: AppStackNavigator,
    Auth: AuthStack,
},
{
    headerMode: 'none'
}))