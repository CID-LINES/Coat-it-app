import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, AsyncStorage, Platform, ActivityIndicator, StatusBar, Dimensions, DeviceEventEmitter, PushNotificationIOS, ImageBackground } from 'react-native';
import { APP_YELLOW, APP_BLUE } from '../Component/colors';
import { ApiCall, CallApi } from '../Component/ApiClient';
import { NavigationActions } from 'react-navigation';
import {strings} from './Localization'
// import { notifications } from "react-native-firebase-push-notifications"

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isshow: false,
            email: '',
            Password: '',
            femail: '',
            shift: false,
            user_id: '',
            device_token: ''
        }
    }
    

    componentDidMount() {
        this.get('user_id')
        AsyncStorage.getItem('user_id', (error, item) => {
            if (item != null && item != '') {
                // this.props.navigation.push('Home')
                this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Home' })], 0)
            }
        })
    }
    async get(key) {
        try {
            const value = await AsyncStorage.getItem(key);
            //alert(value)
            if (value != null && value != '') {
                this.setState({
                    user_id: value
                })
            }
        } catch (error) {

        }
    }
    async save(key, value) {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            //   console.log("Error saving data" + error);
        }
    }
    LoginApi = (fcmToken) => {
        this.setState({
            isLoading: true
        })

        ApiCall('login',
            {
                'email': this.state.email,
                'password': this.state.Password,
                'device_token': fcmToken + '',
                'device_type': Platform.OS == 'android' ? 'a' : 'i'
            },
            (data) => {
                console.log(JSON.stringify(data))
                if (!data.error) {
                    if (data.data.response.status == true) {
                        this.save('access_token', data.data.response.access_token)
                        this.save('user_id', data.data.response.id + '')
                        // this.props.navigation.push('Home')
                        this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Home' })], 0)
                    }
                    else {
                        alert(data.data.response.message)
                    }
                }
                else {
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
            // <SafeAreaView style={{ flex: 1, }}>
            <ImageBackground style={{ flex: 1, }}
                resizeMode='stretch'
                source={require('../assets/bg.png')}>
                <StatusBar barStyle="light-content" />
                <View style={{ flex: 1 }}>
                    <View style={{
                        alignSelf: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 40,
                        width: '100%',
                        marginTop: Platform.OS === 'ios' ? 25 : 7
                    }}>
                        <Text style={{
                            fontSize: 20,
                            fontFamily: 'EurostileBold',
                            color: APP_YELLOW
                        }}>Kenotek Coat IT</Text>
                    </View>
                    <KeyboardAvoidingView style={{ flex: 1 }}
                        behavior="padding" enabled={Platform.OS === 'ios'}
                        keyboardVerticalOffset={Platform.OS == 'ios' ? 0 : 0}>
                        <ScrollView style={{ flex: 1 }}>
                            <View style={{
                                height: Dimensions.get('window').height / 3.8,
                                width: 250,
                                alignSelf: 'center',
                                justifyContent: 'center',
                                marginTop: 70
                            }}>
                                <Image style={{
                                    flex: 1,
                                    width: '100%',
                                    alignSelf: 'center',
                                    marginTop: 20
                                }}
                                    resizeMode='contain'
                                    source={require('../assets/logo.png')}>
                                </Image>
                            </View>
                            <View style={{
                                width: '100%',
                                marginTop: 20,
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    width: '78%',
                                    marginTop: 10,
                                    color: '#C0C0C0',
                                    fontFamily: 'EurostileBold'
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
                                        resizeMode='cover'>
                                    </Image>
                                    <TextInput style={{
                                        height: 40,
                                        width: '80%',
                                        marginTop: 2,
                                        borderRadius: 10,
                                        padding: 5,
                                        color: '#C0C0C0'
                                    }}
                                        value={this.state.email}
                                        onChangeText={(value) => this.setState({ email: value })}
                                        placeholder='Enter your email'
                                        keyboardType='ascii-capable'
                                        placeholderTextColor='#C0C0C0'>
                                    </TextInput>
                                </View>
                                {/* <View style={{
                                        height: 1,
                                        width: '80%', 
                                        backgroundColor: '#C0C0C0'
                                    }}></View> */}

                                <Text style={{
                                    width: '78%',
                                    marginTop: 10,
                                    fontFamily: 'EurostileBold',
                                    color: '#C0C0C0'
                                }}>Password</Text>
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
                                        source={require('../assets/lock.png')}
                                        resizeMode='cover'
                                    ></Image>
                                    <TextInput style={{
                                        height: 40,
                                        width: '75%',
                                        marginTop: 2,
                                        color: '#C0C0C0',
                                        borderRadius: 10,
                                        padding: 5
                                    }}
                                        value={this.state.Password}
                                        secureTextEntry={true}
                                        keyboardType='ascii-capable'
                                        onChangeText={(value) => this.setState({ Password: value })}
                                        placeholder='Enter your password'
                                        placeholderTextColor='#C0C0C0'></TextInput>
                                </View>
                                {/* <View style={{
                                        height: 1,
                                        width: '80%', 
                                        backgroundColor: '#C0C0C0'
                                    }}>
                                    </View> */}
                            </View>
                            <TouchableOpacity style={{
                                height: 30,
                                width: '80%',
                                alignSelf: 'center',
                                marginTop: 5
                            }}
                                onPress={() => {
                                    this.props.navigation.navigate('ForgetPassword')
                                }}>
                                <Text style={{
                                    alignSelf: 'flex-end',
                                    fontFamily: 'EurostileBold',
                                    color: '#C0C0C0',
                                    fontSize: 16
                                }}>Forget Password</Text>
                            </TouchableOpacity>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginBottom: 10,
                                width: '80%',
                                alignSelf: 'center'
                            }}>
                                <TouchableOpacity style={{
                                    height: 50,
                                    width: '40%',
                                    backgroundColor: APP_YELLOW,
                                    marginTop: 15,
                                    alignSelf: 'center',
                                    borderRadius: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                    onPress={() => {
                                         this.Login()
                                       // this._onSetLanguageToItalian()
                                    }}>
                                    <Text style={{
                                        fontSize: 18,
                                        fontFamily: 'EurostileBold',
                                        color: 'black'
                                    }}>Login</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    height: 50,
                                    width: '40%',
                                    backgroundColor: APP_YELLOW,
                                    marginTop: 15,
                                    alignSelf: 'center',
                                    borderRadius: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                    onPress={() => {
                                        // this.props.navigation.navigate('CarDetail')
                                        this.props.navigation.navigate('Signup')
                                    }}>
                                    <Text style={{
                                        fontSize: 18,
                                        fontFamily: 'EurostileBold',
                                        color: 'black'
                                    }}>Sign up</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>

                {/* {this.state.isshow &&
                        <View style={{
                            position: 'absolute', top: 0,
                            bottom: 0, left: 0, right: 0,
                            justifyContent: 'center',
                            backgroundColor: '#00000055'
                        }}>
                            <View style={{
                                height: 200,
                                width: '90%',
                                // borderColor: APP_YELLOW,
                                // borderWidth: 3,
                                alignSelf: 'center',
                                borderRadius: 10,
                                justifyContent: 'center',
                                backgroundColor: 'white',
                                // shadowColor: 'black',
                                // shadowOpacity: 1, shadowRadius: 1,
                                // shadowOffset: { width: 2, height: 1 },
                                overflow: 'hidden'

                            }}>
                                <ImageBackground style={{ flex: 1 }}
                                    resizeMode='stretch'
                                    source={require('../assets/bg.png')}>
                                    <View style={{
                                        width: '100%',
                                        marginTop: 10,
                                        alignItems: 'center'
                                    }}>

                                        <Text style={{
                                            width: '80%', marginTop: 10,
                                            color: '#C0C0C0',
                                            fontFamily: 'EurostileBold',
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
                                            padding: 5, color: '#C0C0C0'
                                        }}
                                            value={this.state.femail}
                                            onChangeText={(value) => this.setState({ femail: value })}
                                            keyboardType='ascii-capable'
                                            placeholder='Enter your email'
                                            placeholderTextColor='#C0C0C0'>
                                        </TextInput>
                                        </View>
                                        <View style={{
                                            height: 1, width: '80%',
                                            backgroundColor: '#C0C0C0'
                                        }}></View>
                                        <View style={{
                                            flexDirection: 'row',
                                            width: '80%',
                                            justifyContent: 'space-between',
                                            marginTop: 10
                                        }}>

                                            <TouchableOpacity style={{
                                                height: 40,
                                                width: 80,
                                                backgroundColor: APP_YELLOW,
                                                borderRadius: 10,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                shadowColor: 'gray',
                                                // shadowOpacity: 1, 
                                                // shadowRadius: 1,
                                                // shadowOffset: { width: 2, height: 1 }
                                            }}
                                                onPress={() => {
                                                    this.forget()
                                                }}
                                            >
                                                <Text style={{
                                                    fontWeight: '800',
                                                    fontSize:17,
                                                    fontFamily: 'EurostileBold',
                                                    color: 'black'
                                                }}>Ok</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity style={{
                                                height: 40,
                                                width: 100,
                                                backgroundColor: APP_YELLOW,
                                                borderRadius: 10,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                // shadowColor: 'gray',
                                                // shadowOpacity: 1, shadowRadius: 1,
                                                // shadowOffset: { width: 2, height: 1 }
                                            }}
                                                onPress={() => {
                                                    this.setState({
                                                        isshow: !this.state.isshow
                                                    })
                                                }}>
                                                <Text style={{
                                                    fontWeight: '800',
                                                    fontSize:17,
                                                     color: 'black',
                                                    fontFamily: 'EurostileBold',
                                                }}>Cancel</Text>
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                </ImageBackground>
                            </View>

                        </View>} */}
                {
                    this.state.isLoading &&
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
                            color={APP_YELLOW}>
                        </ActivityIndicator>
                    </View>
                }
            </ImageBackground>
            // </SafeAreaView>
        );
    }
    Login = async () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (this.state.email == '') {
            alert('Please enter the email')
        } else if (!reg.test(this.state.email)) {
            alert('Please enter a valid email address')
        }
        else if (this.state.Password == '') {
            alert('Please enter the password')
        } else {
            const value = await AsyncStorage.getItem("fcmToken");
            this.LoginApi(value)
        }
    }

}



