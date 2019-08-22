import React, {Component} from 'react'
import { Text, View, Image, Button, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native'
import { Thumbnail,Content, Form, Item, Input, Label, Icon } from 'native-base'
import  LinearGradient from 'react-native-linear-gradient'
import { Database, Auth } from '../public/config/db'
import GetLocation from 'react-native-get-location'

class Register extends Component {
    constructor(props){
        super(props)
        this.state = {
            fullname: '',
            email: '',
            password: '',
            latitude: null,
            longitude: null
        }
    }

    componentDidMount = async () => {
        await this.getCurrentPosition()
    }

    getCurrentPosition() {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000
        })
            .then(location => {
                console.warn(location.latitude);
                
                let region = {
                    latitude: this.state.latitude,
                    longitude: this.state.longitude,
                    latitudeDelta: 0.00922 * 1.5,
                    longitudeDelta: 0.00421 * 1.5
                }

                this.setState({
                    mapRegion: region,
                    latitude: location.latitude,
                    longitude: location.longitude
                })
            })
            .catch(error => {
                const { code, message } = error
                console.warn(code, message);
            })
    }

    Register = () => {
        if (this.state.fullname === '' || this.state.email === '' || this.state.password === '') {
            alert('Please fill all filed')
        } else {
            Auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then((response) => {
                    Database.ref('/user/' + response.user.uid).set({
                        fullname: this.state.fullname,
                        status: 'offline',
                        email: this.state.email,
                        avatar: 'https://theshonet-assets.s3.ap-southeast-1.amazonaws.com/filemanager/shared/22fb0cee_Untitled%20design%28232%29.jpg',
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        id: response.user.uid
                    })
                    this.setState({
                        fullname: '',
                        email: '',
                        password: ''
                    })
                    this.props.navigation.navigate('Login')
                })
                .catch(error => {
                    alert(error.message)
                    

                    this.props.navigation.navigate('Register')
                })
        }
    }

    render(){
        return(
            <>
            <LinearGradient
            colors={['#8A2387', '#E94057', '#F27121']}
          style={styles.linearGradient}> 
          <View style={{ alignItems: 'center', marginTop: 20 }}>
                 <Text style={{ color: 'white', fontSize: 25, fontStyle: 'italic' }}> メッセージ! </Text>
         </View>
         <View style={{ alignItems: 'center', marginTop: 40 }}>
             <Image source={{ uri: 'https://cdn3.iconfinder.com/data/icons/gradient-circle/36/5076-512.png' }} style={{ height: 100, width: 100 }} />
         </View>
         <View style={{ marginTop: 70 }}>
                <Form style={{ marginHorizontal: 30, alignContent: 'center' }}>
                    <Item floatingLabel>
                        <Label style={{ color: 'white' }}>Full Name</Label>
                        <Input style={{ color: 'white' }} onChangeText={fullname => this.setState({ fullname })} />
                    </Item>
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
         <View style={{ alignItems: 'center', marginTop: 80 }}>
             <TouchableOpacity onPress={() => this.Register()}>
            <LinearGradient 
                start={{x: 0, y: 0}} 
                end={{x: 1, y: 0}} 
                colors={['#89216B', '#DA4453']} 
                style={styles.linearGradientButton}>
          <Text style={styles.buttonText}>
            Sign Up
          </Text>
        </LinearGradient>
        </TouchableOpacity>
         </View>
         <View style={{ alignItems: "center", marginTop: 70 }}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                <Text style={{ fontStyle: 'italic', color: 'white', fontFamily: 'Open Sans' }}>Already Have An Account? Sign In!</Text>
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
export default Register