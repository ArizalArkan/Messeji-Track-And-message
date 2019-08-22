import React, {Component} from 'react'
import { Text, View, Image, Button, TouchableOpacity, StyleSheet, Platform, StatusBar, AsyncStorage } from 'react-native'
import { Thumbnail,Content, Form, Item, Input, Label, Icon } from 'native-base'
import  LinearGradient from 'react-native-linear-gradient'
import GetLocation from 'react-native-get-location'
import { Database, Auth } from '../public/config/db'

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            users: [],
            email: '',
            password: '',
            latitude: null,
            longitude: null
        }
    }

    componentDidMount = async () => {
        await this.getCurrentPostion()
    }

    getCurrentPostion() {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(location => {
                this.setState({
                    latitude: location.latitude,
                    longitude: location.longitude
                })
            })
            .catch(error => {
                const { code, message } = error
                console.warn(code, message)
            })
    }

    Login = async () => {
        const { email, password } = this.state
        if (email === '' || password === '') {
            alert('Please fill all filed')
        } else {
            Database.ref('/user').orderByChild('email').equalTo(email).once('value', (result) => {
                let data = result.val()
                console.warn("datanya: ", data)

                if (data !== null) {
                    let users = Object.values(data)

                    AsyncStorage.setItem('email', users[0].email)
                    AsyncStorage.setItem('fullname', users[0].fullname)
                    AsyncStorage.setItem('avatar', users[0].avatar)
                    console.warn("datapribadi", users[0])
                }
            })

            await Auth.signInWithEmailAndPassword(email, password)
                .then((response) => {
                    Database.ref('/user/' + response.user.uid).update({ status: 'online', latitude: this.state.latitude, longitude: this.state.longitude })
                    AsyncStorage.setItem('userid', response.user.uid)
                    this.props.navigation.navigate('Maps')
                })
                .catch(error => {
                    alert(error.message)
                })
        }
    }
    

    render(){
        return(
            <>
            <View>
                <StatusBar hidden />
            </View>
            <LinearGradient
            colors={['#8A2387', '#E94057', '#F27121']}
          style={styles.linearGradient}>
         <View style={{ alignItems: 'center', marginTop: 20 }}>
                 <Text style={{ color: 'white', fontSize: 25, fontStyle: 'italic' }}> メッセージ! </Text>
         </View>
         <View style={{ alignItems: 'center', marginTop: 25 }}>
             <Image source={{ uri: 'https://cdn3.iconfinder.com/data/icons/gradient-circle/36/5076-512.png' }} style={{ height: 100, width: 100 }} />
         </View>
         <View style={{ marginTop: 50 }}>
                <Form style={{ marginHorizontal: 30, alignContent: 'center' }}>
                    <Item floatingLabel>
                        <Label style={{ color: 'white' }}>Email</Label>
                        <Input style={{ color: 'white' }} onChangeText={email => this.setState({ email })} />
                    </Item>
                    <Item floatingLabel>
                        <Label style={{ color: 'white' }}>Password</Label>
                        <Input secureTextEntry style={{ color: 'white' }} onChangeText={password => this.setState({ password })} />
                    </Item>
                </Form>
         </View>
         <View style={{ alignItems: 'center', marginTop: 100 }}>
             <TouchableOpacity onPress={() => this.Login()}>
            <LinearGradient 
                start={{x: 0, y: 0}} 
                end={{x: 1, y: 0}} 
                colors={['#89216B', '#DA4453']} 
                style={styles.linearGradientButton}>
          <Text style={styles.buttonText}>
            Sign In
          </Text>
        </LinearGradient>
        </TouchableOpacity>
         </View>
         <View style={{ alignItems: "center", marginTop: 120 }}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                <Text style={{ fontStyle: 'italic', color: 'white', fontFamily: 'Open Sans' }}>Don't Have An Account? Sign Up Here!</Text>
            </TouchableOpacity>
         <View style={{ marginTop: 100 }}></View>
         </View>
         </LinearGradient>
            </>   
        )
    }
}
const styles = StyleSheet.create({
    linearGradient: {
      flex: 1,
    },
    linearGradientButton: {
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 8,
        marginTop:16,
        width:280,
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
      },
  })

export default Login