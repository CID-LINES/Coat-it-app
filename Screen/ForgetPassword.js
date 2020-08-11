import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, AsyncStorage, ActivityIndicator, Platform, Dimensions, ImageBackground } from 'react-native';
import { APP_YELLOW, APP_BLUE, } from '../Component/colors'
import { ApiCall, CallApi } from '../Component/ApiClient';



export default class ForgetPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            femail: '',
            user_id: ''
        }
    }
   

    forgetApi = () => {
        this.setState({
            isLoading: true
        })
        CallApi('forgot_password/email',
            {
                'email': this.state.femail
            },
            (data) => {
                console.log(JSON.stringify(data))
                if (!data.error) {
                    if (data.data.response.Status == true) {
                        alert('A link with password reset instructions has been sent on entered email address. Please follow the instructions to reset the link')
                      
                         this.props.navigation.replace('Login') 
                      
                    }
                    else {
                        alert('Please entered a valid email address ')
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
            // <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <ImageBackground style={{ flex: 1, backgroundColor:'black'}}
                    resizeMode='stretch'
                    //source={require('../assets/bg.png')}
                    >
                    <View style={{
                        height: 45,
                         width: '95%',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        alignSelf: 'center',
                        alignItems:'center',
                        marginTop:Platform.OS==='ios'?25:7
                    }}>
                        <TouchableOpacity style={{
                            height: 35,
                            width: 35,
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'absolute',
                            left: 5

                        }}
                            onPress={() => {
                                this.props.navigation.goBack()
                            }}>
                            <Image style={{ height: 20, width: 20, tintColor: APP_YELLOW }}
                                resizeMode='contain'
                                source={require('../assets/back.png')}></Image>

                        </TouchableOpacity>
                        <View style={{
                            height: 35,
                            alignItems: 'center', justifyContent: 'center',

                        }}>
                            <Text style={{
                                fontSize: 20,
                                color: APP_YELLOW,
                                fontFamily: 'EurostileBold',
                            }}>Forget Password
                            </Text>
                        </View>
                    </View>
                    <KeyboardAvoidingView style={{ flex: 1 }}
                        behavior="padding" enabled={Platform.OS==='ios'}
                        keyboardVerticalOffset={Platform.OS == 'ios' ? 0: 0}
                    >
                        <ScrollView style={{ flex: 1 }}>
                            <View style={{ flex: 1 }}>

                                <View style={{
                                    height: Dimensions.get('window').height /3.8,
                                    width: 250,
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                    marginTop:70
                                }}>
                                    <Image style={{
                                        flex: 1,
                                        width: '100%',
                                        alignSelf: 'center',
                                        // marginTop: 20
                                    }}
                                        resizeMode='contain'
                                        source={require('../assets/logo.png')}>

                                    </Image>
                                </View>

                                <View style={{
                                    width: '100%',
                                    marginTop: 30,
                                    alignItems: 'center'
                                }}>


                                    <Text style={{
                                        width: '75%',
                                        marginTop: 10, color: '#C0C0C0'
                                        , fontFamily: 'EurostileBold',
                                    }}>Email</Text>
                                      <View style={{
                                    flexDirection: 'row',
                                    width: '80%',
                                    alignItems: "center"
                                }}>
                                    <Image style={{
                                        height: 25,
                                        tintColor: APP_YELLOW,
                                        width: 25
                                    }}
                                        source={require('../assets/email.png')}
                                        resizeMode='cover'
                                    ></Image>
                                    <TextInput style={{
                                        height: 40,
                                         width: '75%',
                                        marginTop: 2,
                                        // borderColor: 'gray',
                                        // borderWidth: 1,
                                        borderRadius: 10,
                                        padding: 5,
                                        color: '#C0C0C0'
                                    }}
                                        value={this.state.femail}
                                        onChangeText={(value) => this.setState({ femail: value })}
                                        placeholder='Enter the email'
                                        keyboardType='ascii-capable'
                                       
                                        placeholderTextColor='#C0C0C0'></TextInput>
                                        </View>
                                    {/* <View style={{
                                        height: 1, width: '80%',
                                        backgroundColor: '#C0C0C0'
                                    }}></View> */}

                                 
                                </View>

                                <TouchableOpacity style={{
                                    height: 50, width: '60%',
                                    backgroundColor: APP_YELLOW,
                                    marginTop: 20,
                                    alignSelf: 'center',
                                   
                                    //borderRadius: 10, 
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                    onPress={() => {
                                        this.forget()
                                    }}>
                                    <Text style={{
                                        fontSize: 20,

                                        fontFamily: 'EurostileBold',
                                        color: 'black'
                                    }}>Submit</Text>

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

                                color={APP_YELLOW}
                            ></ActivityIndicator>

                        </View>
                    }
                </ImageBackground>
            // </SafeAreaView>
        );
    }
    forget = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!reg.test(this.state.femail)) {
            alert('Please enter valid email')
        } else if (this.state.femail == '') {
            alert('Please enter the email')
        }
        else {
          
            this.forgetApi()
        }
    }
}



