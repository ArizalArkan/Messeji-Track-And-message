import React, { Component } from 'react'
import { Text, View, ActivityIndicator, AsyncStorage as storage, StyleSheet, StatusBar } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

export class AuthLoading extends Component {
    constructor(props) {
        super(props)

        this.Auth()
    }

    Auth = async () => {
        const uid = await storage.getItem('email')
        console.warn('hehe'+uid);
        

        this.props.navigation.navigate(uid ? 'App' : 'Auth')
    }

    render() {

        return (
            <LinearGradient
            colors={['#8A2387', '#E94057', '#F27121']}
          style={styles.linearGradient}>
            <View style={styles.container}>
            <StatusBar hidden />
                <ActivityIndicator size="large" color={"white"} />
                <Text style={{ color: 'white' }}>Please Wait...</Text>
            </View>
            </LinearGradient>
        )
    }
}

export default AuthLoading

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    linearGradient: {
        flex: 1,
      },
})