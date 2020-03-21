import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { APP_YELLOW, APP_BLUE, } from '../Component/colors'



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
                    height: 40, width: '95%',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignSelf: 'center',
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
                        {/* <Text style={{
                                fontSize: 18, fontWeight: '700',
                                color: APP_BLUE
                            }}>My Cars</Text> */}
                    </View>
                </View>
                <KeyboardAvoidingView style={{ flex: 1 }}
                    behavior='padding' enabled>
                    <ScrollView style={{ flex: 1 }}>
                        <View style={{ flex: 1 }}>

                            <View style={{ height: 250, width: '100%', justifyContent: 'center' }}>
                                <Image style={{
                                    height: 200,
                                    width: 200, alignSelf: 'center',
                                    marginTop: 20
                                }}
                                    resizeMode='cover'
                                    source={require('../assets/car-logo.png')}>

                                </Image>
                            </View>

                            <View style={{
                                width: '100%', marginTop: 20,
                                alignItems: 'center'
                            }}>

                                <Text style={{ width: '75%', marginTop: 10 }}>Old Password</Text>
                                <TextInput style={{
                                    height: 45, width: '80%',

                                    marginTop: 5,
                                    borderColor: 'gray',
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    padding: 5
                                }}
                                    value={this.state.email}
                                    onChangeText={(value) => this.setState({ email: value })}
                                    placeholder='Old Password'
                                    placeholderTextColor='gray'></TextInput>

                                <Text style={{ width: '75%', marginTop: 10 }}>New Password</Text>
                                <TextInput style={{
                                    height: 45,
                                    width: '80%',
                                    marginTop: 5,
                                    borderColor: 'gray', borderWidth: 1,
                                    borderRadius: 10, padding: 5
                                }}
                                    value={this.state.Password}
                                    onChangeText={(value) => this.setState({ Password: value })}
                                    placeholder=' New Password'
                                    placeholderTextColor='gray'></TextInput>
                            </View>

                            <TouchableOpacity style={{
                                height: 50, width: '60%',
                                backgroundColor: APP_BLUE,
                                marginTop: 15,
                                alignSelf: 'center',
                                shadowColor: 'gray',
                                shadowOpacity: 0.5,
                                shadowRadius: 1,
                                shadowOffset: { width: 2, height: 1 },
                                borderRadius: 25, alignItems: 'center',
                                justifyContent: 'center'
                            }}
                                onPress={() => {
                                    this.props.navigation.navigate('Login')
                                }}>
                                <Text style={{ fontSize: 18, fontWeight: '700', color: 'white' }}>Submit</Text>

                            </TouchableOpacity>

                        </View>

                    </ScrollView>
                </KeyboardAvoidingView>


            </SafeAreaView>
        );
    }
}



