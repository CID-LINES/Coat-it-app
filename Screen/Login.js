import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, TextInput, ScrollView, 
    TouchableOpacity, KeyboardAvoidingView, AsyncStorage,
     Platform, ActivityIndicator, StatusBar, Dimensions, 
    ImageBackground } from 'react-native';
import { APP_YELLOW, APP_BLUE } from '../Component/colors';
import { ApiCall, CallApi } from '../Component/ApiClient';
import { NavigationActions } from 'react-navigation';
import {strings} from './Localization'
import firebase from 'react-native-firebase';
import PushNotification from 'react-native-push-notification';


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
            fcm: ''
        }
    }
    

    componentDidMount() {
        this.createNotificationListeners()
        this.checkPermission()
        this.get('user_id')
        AsyncStorage.getItem('user_id', (error, item) => {
            if (item != null && item != '') {
                // this.props.navigation.push('Home')
                this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Home' })], 0)
            }
        })
    }
    componentWillUnmount() {
        this.notificationListener();
        this.notificationOpenedListener();
      }
    async checkPermission() {
        const enabled = await firebase.messaging().hasPermission();
        // If Premission granted proceed towards token fetch
        if (enabled) {
            this.getToken();
        } 
        else {
            // If permission hasn’t been granted to our app, request user in requestPermission method. 
            this.requestPermission();
        }
    }


    async getToken() {
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        if (!fcmToken) {
            fcmToken = await firebase.messaging().getToken();
            if (fcmToken) {
                // user has a device token
                await AsyncStorage.setItem('fcmToken', fcmToken);

            }
        }
    }
    

    async requestPermission() {
        try {
            await firebase.messaging().requestPermission();
            // User has authorised
            this.getToken();
        } catch (error) {
            // User has rejected permissions
            console.log('permission rejected');
        }
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


    
    async createNotificationListeners() {
        // This listener triggered when notification has been received in foreground
        this.notificationListener = firebase.notifications().onNotification((notification) => {
            const { title, body } = notification;
           // this.navigate(title, body)
        });

        // This listener triggered when app is in backgound and we click, tapped and opened notifiaction
        this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
            const { title, body } = notificationOpen.notification;
            //this.navigate(title, body)

        });

        // This listener triggered when app is closed and we click,tapped and opened notification 
        const notificationOpen = await firebase.notifications().getInitialNotification();
        if (notificationOpen) {
            const { title, body } = notificationOpen.notification;
            //this.navigate(title, body)
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
                'device_token':fcmToken,
                'device_type': Platform.OS == 'android' ? 'a' : 'i'
            },
            (data) => {
                console.log(JSON.stringify(data))
                if (!data.error) {
                    if (data.data.response.status == true) {
                        this.save('customer_id', data.data.response.customer_id +'')
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
            <ImageBackground style={{ flex: 1,backgroundColor:'black' }}
                resizeMode='stretch'
                //source={require('../assets/bg.png')}
                >
                <StatusBar barStyle="light-content"/>
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
                                        placeholderTextColor='#C0C0C0'>
                                        </TextInput>
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
                                    //borderRadius: 10,
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
                                    //borderRadius: 10,
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



