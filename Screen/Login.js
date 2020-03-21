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

                                <Text style={{ width: '75%', marginTop: 10 }}>Email</Text>
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
                                    placeholder='Email'
                                    placeholderTextColor='gray'></TextInput>

                                <Text style={{ width: '75%', marginTop: 10 }}>Password</Text>
                                <TextInput style={{
                                    height: 45,
                                    width: '80%',
                                    marginTop: 5,
                                    borderColor: 'gray', borderWidth: 1,
                                    borderRadius: 10, padding: 5
                                }}
                                    value={this.state.Password}
                                    onChangeText={(value) => this.setState({ Password: value })}
                                    placeholder='Password'
                                    placeholderTextColor='gray'></TextInput>
                            </View>
                            <TouchableOpacity style={{ height: 30, width: '80%', alignSelf: 'center', marginTop: 5 }}
                                onPress={() => {
                                    this.setState({
                                        isshow: !this.state.isshow
                                    })
                                }}>
                                <Text style={{ alignSelf: 'flex-end', fontSize: 16 }}>Forget Password</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{
                                height: 50, width: '60%',
                                backgroundColor: APP_BLUE,
                                marginTop: 15, alignSelf: 'center',
                                shadowColor: 'gray',
                                shadowOpacity: 0.5, 
                                shadowRadius: 1,
                                shadowOffset: { width: 2, height: 1 },
                                borderRadius: 25, alignItems: 'center', justifyContent: 'center'
                            }}
                                onPress={() => {
                                    this.props.navigation.navigate('CarDetail')
                                }}>
                                <Text style={{ fontSize: 18, fontWeight: '700', color: 'white' }}>Login</Text>

                            </TouchableOpacity>

                        </View>

                    </ScrollView>
                </KeyboardAvoidingView>
                {this.state.isshow &&
                    <View style={{
                        position: 'absolute', top: 0,
                        bottom: 0, left: 0, right: 0,
                        justifyContent: 'center',
                        backgroundColor: '#00000055'
                    }}>
                        <View style={{
                            height: 200, width: '90%',
                            borderColor: 'gray', borderWidth: 1,
                            alignSelf: 'center', borderRadius: 10, justifyContent: 'center',

                            backgroundColor: 'white',
                            shadowColor: 'black',
                            shadowOpacity: 1, shadowRadius: 1,
                            shadowOffset: { width: 2, height: 1 }

                        }}>
                            <View style={{
                                width: '100%', marginTop: 10,
                                alignItems: 'center'
                            }}>
                                <Text style={{ width: '75%', marginTop: 10 }}>Email</Text>
                                <TextInput style={{
                                    height: 45, width: '90%',

                                    marginTop: 5,
                                    borderColor: 'gray',
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    padding: 5
                                }}
                                    value={this.state.femail}
                                    onChangeText={(value) => this.setState({ femail: value })}
                                    placeholder='Email'
                                    placeholderTextColor='gray'>
                                </TextInput>
                                <View style={{
                                    flexDirection: 'row',
                                    width: '80%', justifyContent: 'space-between',
                                    marginTop: 10
                                }}>

                                    <TouchableOpacity style={{
                                        height: 40,
                                        width: 80, backgroundColor: APP_BLUE,
                                        borderRadius: 10, justifyContent: 'center',
                                        alignItems: 'center',
                                        shadowColor: 'gray',
                                        shadowOpacity: 1, shadowRadius: 1,
                                        shadowOffset: { width: 2, height: 1 }
                                    }}>
                                        <Text style={{ fontWeight: '800', color: 'white' }}>Ok</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{
                                        height: 40,
                                        width: 100, backgroundColor: APP_BLUE, borderRadius: 10,
                                        justifyContent: 'center', alignItems: 'center',
                                        shadowColor: 'gray',
                                        shadowOpacity: 1, shadowRadius: 1,
                                        shadowOffset: { width: 2, height: 1 }
                                    }}
                                        onPress={() => {
                                            this.setState({
                                                isshow: !this.state.isshow
                                            })
                                        }}>
                                        <Text style={{ fontWeight: '800', color: 'white' }}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>

                        </View>
                    </View>}

            </SafeAreaView>
        );
    }
}



