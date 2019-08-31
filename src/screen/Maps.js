import React, { Component } from 'react'
import {View, StyleSheet, StatusBar, AsyncStorage as storage, Image } from 'react-native'
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'
import GetLocation from 'react-native-get-location'
import { Database } from '../public/config/db'
import { Icon } from 'native-base'

export default class Maps extends Component {

    constructor(props) {
        super(props)
        this.state = {
            Place: null,
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

    getCurrentPosition() {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 10000,
        })
            .then(location => {
                let region = {
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0,
                    longitudeDelta: 0
                }

                this.setState({
                    Place: region,
                    latitude: location.latitude,
                    longitude: location.longitude
                })
            })
            .catch(error => {
                const { code, message } = error;
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
        return (
            <>
                <StatusBar hidden />
                <View style={styles.container}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        showsMyLocationButton={true}
                        showsUserLocation={true}
                        showsTraffic={true}
                        showsBuildings={true}
                        style={styles.map}
                        region={this.state.Place}
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