import React, { Component } from 'react'
import { View, Text, TouchableOpacity, AsyncStorage, Image, StyleSheet } from 'react-native'
import { Database, Auth } from '../public/config/db'
import  LinearGradient from 'react-native-linear-gradient'
import { Icon } from 'react-native-elements'

export default class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            avatar: '',
            fullname: '',
            userid: ''
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('userid', (err, result) => {
            if (result) {
                this.setState({ userid: result })
            }
        })
        AsyncStorage.getItem('email', (err, result) => {
            if (result) {
                this.setState({ email: result })
            }
        })

        AsyncStorage.getItem('fullname', (err, result) => {
            if (result) {
                this.setState({ fullname: result })
            }
        })

        AsyncStorage.getItem('avatar', (err, result) => {
            if (result) {
                this.setState({ avatar: result })
            }
        })
    }

    _Logout = async () => {
        const userToken = await AsyncStorage.getItem('userid');
        console.log(userToken)
        Database.ref('/user/' + userToken).update({ status: "offline" })
        Auth.signOut().then(() => {
            AsyncStorage.clear();
            this.props.navigation.navigate('Login');
        }).catch(error => { alert(error.message) })
    }

    render(){
        const { email, fullname, avatar, userid } = this.state
        return (
            <View style={{flex:1,backgroundColor:'#eee'}}>
                
                <LinearGradient
            colors={['#8A2387', '#E94057', '#F27121']}
          style={styles.linearGradient}>
              <View style={{ marginLeft: 300, marginTop: 18 }}>
                <TouchableOpacity onPress={this._Logout}>
                        <Icon name='polymer' color='white' />
                </TouchableOpacity>
                </View>
                <View style={{justifyContent:'center',alignItems:'center',}}>
                    <View style={{flex:3,alignItems:'center'}}>
                        <Image style={{width:130,height:130,borderRadius:65,marginBottom:15,backgroundColor:'#fff', marginTop: 20}} source={{uri: avatar }}/>     
                        <Text style={{color:'#fff',fontSize:25,fontWeight:'bold', marginTop: 20}}>{this.state.fullname}</Text>
                    </View>
                </View>
                </LinearGradient>
                
                <View style={{flex:1,alignItems:'center'}}>
                <LinearGradient
                    start={{x: 0, y: 0}} 
                    end={{x: 1, y: 0}}
                    colors={['#8A2387', '#E94057', '#F27121']}
                    style={styles.linearGradientB}>
                    <View style={{}}>
                        <Text style={{alignSelf:'center',marginBottom:10,color:'white',fontSize:20}}>Contact</Text>
                        <Text style={{color:'white',width:'100%',borderTopWidth:1,padding:10}}>Email : {email}</Text>
                    </View>
                    </LinearGradient>
                    <LinearGradient
                     start={{x: 0, y: 0}} 
                     end={{x: 1, y: 0}}
                    colors={['#8A2387', '#E94057', '#F27121']}
                    style={styles.linearGradientB}>
                    <View style={{}}>
                        <Text style={{alignSelf:'center',marginBottom:10,color:'white',fontSize:20}}>Biodata</Text>
                        <Text style={{color:'white',width:'100%',borderTopWidth:1,padding:10}}>Name : {fullname}</Text>
                    </View>
                    </LinearGradient>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        borderBottomLeftRadius:25,
        borderBottomRightRadius:25
      },linearGradientB: {
        marginTop:30,
        borderRadius:9,
        elevation:1,
        padding:15
      },
});