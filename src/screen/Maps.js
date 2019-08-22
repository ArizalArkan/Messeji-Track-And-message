import React, { Component } from 'react'
import { Button, TouchableOpacity, Text, View, StyleSheet, StatusBar, AsyncStorage as storage, Image } from 'react-native'
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'
import GetLocation from 'react-native-get-location'
import { Database } from '../public/config/db'
import { Icon } from 'native-base'

export default class Maps extends Component {

    constructor(props) {
        super(props)
        this.state = {
            mapRegion: null,
            users: [],
            userDetail: [],
            latitude: 0,
            longitude: 0,
        }
        this.getCurrentPosition()
    }

    componentWillMount = async () => {
        await this.user()
    }

   componentDidMount() {
        this.getCurrentPosition()
        setInterval(() => this.updateLocation(), 10000);
    }

    updateLocation = async () => {
        let uid = await storage.getItem('userid')
        Database.ref('/user').orderByChild('id').equalTo(uid).once('value', (result) => {
            let data = result.val()
            Database.ref('/user/' + uid).update({ latitude: this.state.latitude, longitude: this.state.longitude })
        })
    }

    getCurrentPosition() {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 10000,
        })
            .then(location => {
                console.warn(location.latitude);

                let region = {
                    latitude: location.latitude,
                    longitude: location.longitude,
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
                const { code, message } = error;
                console.warn(code, message);
            })
    }

    user = async () => {
        Database.ref('/user').once('value', (result) => {
            let data = result.val();
            if (data !== null) {
                let users = Object.values(data);
                this.setState({
                    users: users
                })
            }
        });
    }


    render(){
        console.warn("longitude", this.state.longitude)
        console.warn("latitude", this.state.latitude)
        console.warn("data", this.state.users)
        console.warn("detail user: ", this.state.userDetail)
        return (
            <>
                <StatusBar hidden />
                <View style={styles.container}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        showsMyLocationButton={true}
                        showsIndoorLevelPicker={true}
                        showsUserLocation={true}
                        showsTraffic={true}
                        showsBuildings={true}
                        style={styles.map}
                        region={this.state.mapRegion}
                    >
                        {
                            this.state.users.map((item) => {
                                return (
                                    <Marker
                                        coordinate={{
                                            latitude: this.state.latitude,
                                            longitude: this.state.longitude,
                                        }}
                                        description={`${item.latitude} / ${item.longitude}`}
                                        title={item.fullname}
                                        key={item.id}
                                    >
                                        <View>
                                            <Icon name='add-circle' type='Ionicons' style={{ color: '#89216B', fontSize: 50 }} />
                                            <Image
                                                source={{ uri: item.avatar }}
                                                style={{ width: 35, height: 33, borderRadius: 100 / 2, position: 'absolute', bottom: 11, left: 3 }}
                                            />
                                        </View>

                                    </Marker>
                                )
                            })
                        }
                    </MapView>
                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        flex: 1
    }
})