import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, StatusBar } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

export default class Splash extends Component {
    render() {
        return (
            <>
                <LinearGradient
                colors={['#8A2387', '#E94057', '#F27121']}
                style={styles.linearGradient}>
                <StatusBar translucent={true} hidden />
                <Image source={require('../asset/chat.png')} style={styles.imgBackground} resizeMode='cover' />
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                 <Text style={{ color: 'white', fontSize: 40, fontStyle: 'italic' }}> メッセージ! </Text>
                </View>
                <View style={styles.container}>
                </View>
                </LinearGradient>
            </>
        )
    }
}

const styles = StyleSheet.create({
    imgBackground: {
        width: 200,
        height: 200,
        marginLeft: 100,
        marginTop: 250
    },
    linearGradient: {
        flex: 1,
      },
    container: {
        flex: 1,
        margin: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})