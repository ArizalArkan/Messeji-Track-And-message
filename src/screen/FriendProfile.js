import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import  LinearGradient from 'react-native-linear-gradient'
import { Icon } from 'native-base'

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            BioFriend: this.props.navigation.getParam('data')
        }
    }

    render(){
        const { BioFriend } = this.state
        return (
            <View style={{flex:1,backgroundColor:'#eee'}}>
                
                <LinearGradient
            colors={['#5433ff', '#20bdff', '#a5fecb']}
          style={styles.linearGradient}>
              <View style={{ marginLeft: 350, marginTop: 18 }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Chat')}>
                        <Icon name='close' type='Ionicons' color='white' />
                </TouchableOpacity>
                </View>
                <View style={{justifyContent:'center',alignItems:'center',}}>
                    <View style={{flex:3,alignItems:'center'}}>
                        <Image style={{width:130,height:130,borderRadius:65,marginBottom:15,backgroundColor:'#fff', marginTop: 20}} source={{uri: BioFriend.avatar }}/>     
                        <Text style={{color:'#fff',fontSize:25,fontWeight:'bold', marginTop: 20}}>{BioFriend.fullname}</Text>
                    </View>
                </View>
                </LinearGradient>
                
                <View style={{flex:1,alignItems:'center'}}>
                <LinearGradient
                    start={{x: 0, y: 0}} 
                    end={{x: 1, y: 0}}
                    colors={['#0052d4', '#4364f7', '#6fb1fc']}
                    style={styles.linearGradientB}>
                    <View style={{}}>
                        <Text style={{alignSelf:'center',marginBottom:10,color:'white',fontSize:20}}>Contact</Text>
                        <Text style={{color:'white',width:'100%',borderTopWidth:1,padding:10}}>Email : {BioFriend.email}</Text>
                    </View>
                    </LinearGradient>
                    <LinearGradient
                     start={{x: 0, y: 0}} 
                     end={{x: 1, y: 0}}
                    colors={['#0052d4', '#4364f7', '#6fb1fc']}
                    style={styles.linearGradientB}>
                    <View style={{}}>
                        <Text style={{alignSelf:'center',marginBottom:10,color:'white',fontSize:20}}>Biodata</Text>
                        <Text style={{color:'white',width:'100%',borderTopWidth:1,padding:10}}>Name : {BioFriend.fullname}</Text>
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