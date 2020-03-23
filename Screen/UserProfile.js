import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { APP_BLUE, APP_LIGHT } from '../Component/colors'
//import { Platform } from 'react-native';
//import Share from 'react-native-share';

export default class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAvoidingView style={{ flex: 1 }}
                    behavior='padding' enabled>
                         <View style={{
                            height: 40,
                           
                            width: "95%", alignSelf: 'center',
                            justifyContent: 'center', alignItems: 'center'
                        }}>
                            <Text style={{
                                fontWeight: '800',
                                fontSize: 18,color:APP_BLUE
                            }}>
                                User Profile
                            </Text>
                        </View>
                    <ScrollView style={{ flex: 1 }}>
                        <View style={{ flex: 1 }}>
                            <View style={{
                                height: 200,
                                marginTop: 10,
                                width: '100%', justifyContent: 'center',
                                // backgroundColor:'pink'
                            }}>
                                <TouchableOpacity style={{
                                    height: 120,
                                    width: 120,
                                    backgroundColor: 'gray',
                                    borderRadius: 75,
                                    alignSelf: 'center',

                                    justifyContent: 'center', overflow: 'hidden'
                                }}>
                                    <Image style={{ height: 120, width: 120 }}
                                        resizeMode='cover'
                                        source={require('../assets/placeholder.jpg')}></Image>
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                width: '100%', height: 30
                                , justifyContent: 'center', alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: '900'
                                }}>Manpreet.singh716@gamil.com</Text>
                            </View>


                            <View style={{ marginTop: 15 }}>
                                <TouchableOpacity style={{
                                    height: 40, width: '60%',
                                    alignItems: "center", justifyContent: 'center',
                                    borderRadius: 10, alignSelf: 'center',
                                    backgroundColor: APP_LIGHT
                                }}
                                    onPress={() => {
                                        this.props.navigation.navigate('Purchase')
                                    }}>
                                    <Text style={{
                                        fontSize: 18, fontWeight: '700',
                                        color: 'white'
                                    }}>My Purchase/ Detailer</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{
                                    height: 40, width: '60%',
                                    marginTop: 10,
                                    alignItems: "center", justifyContent: 'center',
                                    borderRadius: 10, alignSelf: 'center',
                                    backgroundColor: APP_LIGHT
                                }}
                                    onPress={() => {
                                        this.props.navigation.navigate('MyCars')
                                    }}>
                                    <Text style={{
                                        fontSize: 18, fontWeight: '700',
                                        color: 'white'
                                    }}>My Cars</Text>
                                </TouchableOpacity>


                                <TouchableOpacity style={{
                                    height: 40, width: '60%',
                                    marginTop: 10,
                                    alignItems: "center", justifyContent: 'center',
                                    borderRadius: 10, alignSelf: 'center',
                                    backgroundColor: APP_LIGHT
                                }}
                                    onPress={() => {
                                        this.props.navigation.navigate('Settings')
                                    }}>
                                    <Text style={{
                                        fontSize: 18, fontWeight: '700',
                                        color: 'white'
                                    }}>Settings</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{
                                    height: 40, width: '60%',
                                    marginTop: 10,
                                    alignItems: "center", justifyContent: 'center',
                                    borderRadius: 10, alignSelf: 'center',
                                    backgroundColor: APP_LIGHT
                                }}
                                    onPress={() => {

                                        this.props.navigation.navigate('ChangePassword')
                                    }}>
                                    <Text style={{
                                        fontSize: 18, fontWeight: '700',
                                        color: 'white'
                                    }}>Chnage Password</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{
                                    height: 40, width: '60%',
                                    marginTop: 10,
                                    alignItems: "center", justifyContent: 'center',
                                    borderRadius: 10, alignSelf: 'center',
                                    backgroundColor: APP_LIGHT
                                }}
                                    onPr={() => {
                                        //this.onShare()
                                    }}>
                                    <Text style={{
                                        fontSize: 18, fontWeight: '700',
                                        color: 'white'
                                    }}>Share</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    height: 40, width: '60%',
                                    marginTop: 10,
                                    alignItems: "center", justifyContent: 'center',
                                    borderRadius: 10, alignSelf: 'center',
                                    backgroundColor: APP_LIGHT
                                }}
                                    onPr={() => {
                                        //this.onShare()
                                    }}>
                                    <Text style={{
                                        fontSize: 18, fontWeight: '700',
                                        color: 'white'
                                    }}>Logout</Text>
                                </TouchableOpacity>

                            </View>


                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>

            </SafeAreaView>
        );
    }


}



