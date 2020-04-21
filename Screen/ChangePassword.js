import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, AsyncStorage, ActivityIndicator } from 'react-native';
import { APP_YELLOW, APP_BLUE, } from '../Component/colors'
import { ApiCall, CallApi } from '../Component/ApiClient';



export default class ChangePassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isshow: false,
            email: '',
            Oldpassword: '',
            NewPassword: '',

            shift: false,
            access_token: ''
        }
    }
    componentDidMount() {
        this.get('access_token')
    }

    async get(key) {
        try {
            const value = await AsyncStorage.getItem(key);
            //alert(value)
            if (value != null && value != '') {
                this.setState({
                    access_token: value
                })
            }
        } catch (error) {

        }
    }

    changePasswordApi = () => {
        this.setState({
            isLoading: true
        })
        CallApi('reset_password',
            {
                'email': this.state.email,
                'token':this.state.access_token,
                'password':this.state.Oldpassword,
                'password_confirmation':this.state.NewPassword

            },
            (data) => {
                console.log(JSON.stringify(data))
                if (!data.error) {
                    if (data.data.response.Status == true) {
                        alert('link send succesfully')
                        //this.props.navigation.navigate('Login')
                    }
                    else {
                        alert(data.data.response.message)
                    }
                } else {
                    alert('Somthing went wrong')
                }
                this.setState({
                    isLoading: false
                })
                // alert(JSON.stringify(data))
                //nsole.log(data)
            })
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

                            <View style={{ height: 200, width: '100%', justifyContent: 'center' }}>
                                <Image style={{
                                    height: 200,
                                    width: 200, alignSelf: 'center',
                                    // marginTop: 20
                                }}
                                    resizeMode='cover'
                                    source={require('../assets/car-logo.png')}>

                                </Image>
                            </View>

                            <View style={{
                                width: '100%', marginTop: 20,
                                alignItems: 'center'
                            }}>

                                <Text style={{ width: '75%',  }}>Email</Text>
                                <TextInput style={{
                                    height: 45, width: '80%',

                                    marginTop: 5,
                                    borderColor: 'gray',
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    padding: 5
                                }}
                                    value={this.state.email}
                                    onChangeText={(value) => this.setState({email: value })}
                                    placeholder='email'
                                   
                                    placeholderTextColor='gray'></TextInput>

                                <Text style={{ width: '75%', marginTop: 10 }}>Old Password</Text>
                                <TextInput style={{
                                    height: 45, width: '80%',

                                    marginTop: 5,
                                    borderColor: 'gray',
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    padding: 5
                                }}
                                    value={this.state.Oldpassword}
                                    onChangeText={(value) => this.setState({Oldpassword: value })}
                                    placeholder='Old Password'
                                    secureTextEntry={true}
                                    placeholderTextColor='gray'></TextInput>

                                <Text style={{ width: '75%', marginTop: 10 }}>New Password</Text>
                                <TextInput style={{
                                    height: 45,
                                    width: '80%',
                                    marginTop: 5,
                                    borderColor: 'gray', borderWidth: 1,
                                    borderRadius: 10, padding: 5
                                }}
                                    value={this.state.NewPassword}
                                    onChangeText={(value) => this.setState({ NewPassword: value })}
                                    placeholder=' New Password'
                                    secureTextEntry={true}
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
                                    this.ChangePassword()
                                }}>
                                <Text style={{ fontSize: 18, fontWeight: '700', color: 'white' }}>Submit</Text>

                            </TouchableOpacity>

                        </View>

                    </ScrollView>
                </KeyboardAvoidingView>
                {this.state.isLoading &&
                    <View style={{
                        position: 'absolute',
                        backgroundColor: '#000000aa',
                        top: 0,
                        bottom: 0, left: 0, right: 0,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <ActivityIndicator
                            animating={this.state.isLoading}
                            size='large'

                            color={APP_BLUE}
                        ></ActivityIndicator>

                    </View>
                }

            </SafeAreaView>
        );
    }
    ChangePassword=()=>{
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!reg.test(this.state.email)) {
            alert('Please enter valid email')
        }else if(this.state.email==''){
            alert('Please enter the email')
        }
        else if(this.state.Oldpassword == ''){
            alert('Plaese enter old password')
        }else if(this.state.NewPassword == ''){
            alert('Plaese enter new password')
        }else{
            this.changePasswordApi()
        }
    }
}



