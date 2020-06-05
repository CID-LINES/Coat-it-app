import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, AsyncStorage, Platform, ActivityIndicator, StatusBar, Dimensions, DeviceEventEmitter, PushNotificationIOS, ImageBackground } from 'react-native';
import { APP_YELLOW, APP_BLUE } from '../Component/colors';
import { ApiCall ,CallApi} from '../Component/ApiClient';


import PushNotificationAndroid, { PushNotificationObject } from 'react-native-push-notification'
import PushNotification from 'react-native-push-notification';
import firebase from 'react-native-firebase';


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
            device_token:''
        }
    }


    componentDidMount() {
        this.get('user_id')
        AsyncStorage.getItem('user_id',(error,item)=>{
            if(item!=null&&item!=''){
                this.props.navigation.push('Home')
            }
        })
      this.checkPermission()
    }
    
    checkPermission = async () => {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
          this.getFcmToken();
        } else {
          this.requestPermission();
        }
      }
      requestPermission = async () => {
        try {
          console.log('request permission')
          await firebase.messaging().requestPermission();
          // User has authorised
          this.getFcmToken()
        } catch (error) {
          console.log('permission rejected')
          // User has rejected permissions
        }
      }
    
      getFcmToken = async () => {
        const { userId } = this.props;
        const fcmToken = await firebase.messaging().getToken();
        AsyncStorage.setItem('device_token', fcmToken + '')
        this.setState({
          device_token: fcmToken + ''
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

            //alert(JSON.stringify(value))
        } catch (error) {
            //   console.log("Error saving data" + error);
        }
    }
    LoginApi = () => {
        this.setState({
            isLoading: true
        })
        ApiCall('login',
            {
                'email': this.state.email,
                'password': this.state.Password,

            },
            (data) => {
                console.log(JSON.stringify(data))
                if (!data.error) {
                    if (data.data.response.status == true) {
                        
                       
                        this.save('access_token', data.data.response.access_token)
                        this.save('user_id', data.data.response.id+'')
                        this.props.navigation.push('Home')
                        // alert('helo')
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
                        this.setState({
                            isshow:!this.state.isshow
                        })
                        // this.props.navigation.replace('Home') 
                        // alert('helo')
                    }
                  
                    else {
                       alert('Please enter a valid email address ')
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
            <SafeAreaView style={{ flex: 1,backgroundColor:'white' }}>
                   <ImageBackground style={{ flex: 1 ,}}
                        source={require('../assets/bg.png')}>
                  <StatusBar barStyle="dark-content" />
                        <View style={{flex:1}}>
                        <View style={{
                                alignSelf: 'center',
                                alignItems: 'center', 
                                
                                justifyContent: 'center',
                                height: 30, width: '100%'
                            }}>
                                <Text style={{fontSize:20,
                                 fontFamily:'EurostileBold',
                                color:APP_YELLOW}}>Kenotek Coat IT</Text>
                            </View>
                            <KeyboardAvoidingView style={{flex:1}}
                    behavior={Platform.OS== 'ios'?'padding':null} 
                    keyboardVerticalOffset={Platform.OS == 'ios' ? 0 : 0}>
                    <ScrollView style={{flex:1}}>
                            <View style={{ height: Dimensions.get('window').height/2.5, 
                            width: 250,
                            alignSelf:'center',
                            justifyContent: 'center' ,
                            marginTop:10}}>
                                <Image style={{
                                    flex:1,
                                   // height: 250,
                                    width: '100%',
                                     alignSelf: 'center',
                                    marginTop: 20
                                }}
                                    resizeMode='contain'
                                    source={require('../assets/logo.png')}>

                                </Image>
                            </View>
                         
                            <View style={{
                                width: '100%', marginTop: 10,
                                alignItems: 'center'
                            }}>

                                <Text style={{ width: '78%', 
                                marginTop: 10
                                ,fontFamily:'EurostileBold' }}>Email</Text>
                                <TextInput style={{
                                    height: 40, width: '80%',

                                    marginTop: 2,
                                    // borderColor: 'gray',
                                    // borderWidth: 1,
                                    borderRadius: 10,
                                    padding: 5
                                }}
                                    value={this.state.email}
                                    onChangeText={(value) => this.setState({ email: value })}
                                    placeholder='Email'
                                    keyboardType='ascii-capable'
                                    placeholderTextColor='gray'></TextInput>
                                       <View style={{height:1,
                                        width:'80%',backgroundColor:'gray'}}></View>

                                <Text style={{ width: '78%', 
                                marginTop: 10,fontFamily:'EurostileBold',  
                            }}
                            >Password</Text>
                                <TextInput style={{
                                    height: 40,
                                    width: '80%',
                                    marginTop: 2,
                                    // borderColor: 'gray', borderWidth: 1,
                                    borderRadius: 10, padding: 5
                                }}
                                    value={this.state.Password}
                                    secureTextEntry={true}
                                    keyboardType='ascii-capable'
                                    onChangeText={(value) => this.setState({ Password: value })}
                                    placeholder='Password'
                                    placeholderTextColor='gray'></TextInput>
                                       <View style={{height:1,
                                        width:'80%',backgroundColor:'gray'}}></View>
                            </View>
                            <TouchableOpacity style={{ height: 30, width: '80%', alignSelf: 'center', marginTop: 5 }}
                                onPress={() => {
                                    this.setState({
                                        isshow: !this.state.isshow
                                    })
                                }}>
                                <Text style={{ alignSelf: 'flex-end', 
                               fontFamily:'EurostileBold',
                                fontSize: 16 }}>Forget Password</Text>
                            </TouchableOpacity>
                                <View style={{flexDirection:'row',
                                justifyContent:'space-between',
                                marginBottom:10,
                            width:'80%',alignSelf:'center'}}> 
                            <TouchableOpacity style={{
                                height: 50, width: '40%',
                                backgroundColor: APP_YELLOW,
                                marginTop: 15, alignSelf: 'center',
                                shadowColor: 'gray',
                                shadowOpacity: 0.5,
                                shadowRadius: 1,
                                shadowOffset: { width: 2, height: 1 },
                                borderRadius: 10, alignItems: 'center',
                                 justifyContent: 'center'
                            }}
                                onPress={() => {
                                     
                                     this.Login()
                                }}>
                                <Text style={{ 
                                    fontSize: 18, 
                                    fontFamily:'EurostileBold',
                                    
                                    color: 'white' }}>Login</Text>

                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                height: 50, width: '40%',
                                backgroundColor:APP_YELLOW,
                              
                                marginTop: 15, alignSelf: 'center',
                                shadowColor: 'gray',
                                shadowOpacity: 0.5,
                                shadowRadius: 1,
                                shadowOffset: { width: 2, height: 1 },
                                borderRadius: 10, alignItems: 'center', 
                                justifyContent: 'center'
                            }}
                                onPress={() => {
                                    // this.props.navigation.navigate('CarDetail')
                                    this.props.navigation.navigate('Signup')
                                }}>
                                <Text style={{ fontSize: 18,
                                 fontFamily:'EurostileBold', 
                                     color: 'white' }}>Sign up</Text>

                            </TouchableOpacity> 
                        
                             </View>
                             </ScrollView>
                </KeyboardAvoidingView>
                        </View>

                  
                {this.state.isshow &&
                    <View style={{
                        position: 'absolute', top: 0,
                        bottom: 0, left: 0, right: 0,
                        justifyContent: 'center',
                        backgroundColor: '#00000055'
                    }}>
                        <View style={{
                            height: 200, 
                            width: '90%',
                            borderColor: APP_YELLOW, 
                            borderWidth: 3,
                            alignSelf: 'center',
                             borderRadius: 10, 
                             justifyContent: 'center',

                            backgroundColor: 'white',
                            shadowColor: 'black',
                            shadowOpacity: 1, shadowRadius: 1,
                            shadowOffset: { width: 2, height: 1 }

                        }}>
                            <View style={{
                                width: '100%', marginTop: 10,
                                alignItems: 'center'
                            }}>
                                <Text style={{ width: '80%', marginTop: 10,
                          fontFamily:'EurostileBold', }}>Email</Text>
                                <TextInput style={{
                                    height: 40, width: '80%',

                                    marginTop: 2,
                                    // borderColor: 'gray',
                                    // borderWidth: 1,
                                    borderRadius: 10,
                                    padding: 5
                                }}
                                    value={this.state.femail}
                                    onChangeText={(value) => this.setState({ femail: value })}
                                    keyboardType='ascii-capable'
                                    placeholder='Email'
                                    placeholderTextColor='gray'>
                                </TextInput>
                                <View style={{height:1,width:'80%',
                            backgroundColor:'gray'}}></View>
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
                                        justifyContent:'center',
                                        alignItems: 'center',
                                        shadowColor: 'gray',
                                        shadowOpacity: 1, 
                                        shadowRadius: 1,
                                        shadowOffset: { width: 2, height: 1 }
                                    }}
                                        onPress={() => {
                                            this.forget()
                                        }}
                                    >
                                        <Text style={{fontWeight: '800', 
                                       fontFamily:'EurostileBold',
                                        color: 'white'}}>Ok</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{
                                        height: 40,
                                        width: 100, 
                                        backgroundColor: APP_YELLOW,
                                        borderRadius: 10,
                                        justifyContent: 'center', 
                                        alignItems: 'center',
                                        shadowColor: 'gray',
                                        shadowOpacity: 1, shadowRadius: 1,
                                        shadowOffset: { width: 2, height: 1 }
                                    }}
                                        onPress={() => {
                                            this.setState({
                                                isshow: !this.state.isshow
                                            })
                                        }}>
                                        <Text style={{ fontWeight: '800', color: 'white',
                                  fontFamily:'EurostileBold', }}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>

                        </View>
                    </View>}

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
            </SafeAreaView>
        );
    }
    Login = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (this.state.email == '') {
            alert('Please enter the email')
        }  else if (!reg.test(this.state.email)) {
            alert('Please enter a valid email address')
        }
        else if (this.state.Password == '') {
            alert('Please enter the password')
        } else {
            this.LoginApi()
        }
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



