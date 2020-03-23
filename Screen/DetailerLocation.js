import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { APP_YELLOW, APP_BLUE, } from '../Component/colors'
import MapView, { Polyline, Marker } from 'react-native-maps';


export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isshow: false,
            email: '',
            Password: '',
            femail: '',
            shift: false
        }
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{
                    height: 40, width: '100%',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignSelf: 'center',
                    alignItems: 'center',backgroundColor:'#ffffff'
                }}>
                    <TouchableOpacity style={{
                        height: 35, width: 35,
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute', left: 5


                    }}
                        onPress={() => {
                            this.props.navigation.goBack()
                        }}>
                        <Image style={{ height: 25, width: 25, tintColor: APP_BLUE }}
                            resizeMode='contain'
                            source={require('../assets/back.png')}></Image>

                    </TouchableOpacity>
                    <View style={{
                        height: 35,
                        alignItems: 'center', justifyContent: 'center',

                    }}>
                        <Text style={{
                            fontSize: 18, fontWeight: '700',
                            color: APP_BLUE
                        }}>Detailer Location</Text>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <MapView
                        initialRegion={{
                            latitude: 31.0497,
                            longitude: 74.8346,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        
                        mapType='standard'
                        style={{ flex: 1, width: '100%' }}
                    >
                    <Polyline coordinates={[
                        { latitude: 31.1061, longitude:  74.9839},
                        { latitude: 31.0497, longitude: 74.8346 },
                    ]}
                    strokeColor={APP_BLUE}
                    
                    strokeWidth={5}
                   ></Polyline>
                   <Marker coordinate={{
                       latitude:31.1061,longitude:74.9839,
                       latitude: 31.0497, longitude: 74.8346
                   }}
               // onPress={alert('helos')}
                  ></Marker>
                    </MapView>


                </View>



            </SafeAreaView>
        );
    }
   
}



