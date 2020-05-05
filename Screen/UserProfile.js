import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Alert, Share, AsyncStorage, ActivityIndicator } from 'react-native';
import { APP_BLUE, APP_LIGHT, APP_YELLOW } from '../Component/colors'
import { StackActions, NavigationActions } from 'react-navigation';
import { CallGetApi } from '../Component/ApiClient';
//import { Platform } from 'react-native';
//import Share from 'react-native-share';

export default class UserProfile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: ''
        }
    }


    componentDidMount() {
        this.load()
        this.props.navigation.addListener('willFocus', this.load)
    }
    load = () => {

        this.get('user_id')
    }

    async get(key) {
        try {
            const value = await AsyncStorage.getItem(key);
            // alert(value)
            if (value != null && value != '') {
                this.setState({
                    user_id: value
                }, () => {
                    this.userDetaildApi()
                })
            }
        } catch (error) {

        }
    }


    userDetaildApi = () => {
        this.setState({
            isLoading: true
        })


        fetch('http://3.137.41.50/coatit/public/api/userProfile/' + this.state.user_id,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',

                    //  'Content-type':'multipart/form-data'
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(JSON.stringify(responseJson.response))
                if (responseJson.response.status == true) {
                    this.setState({
                        data: responseJson.response.userProfile
                    })
                    // alert('helo')
                }
                this.setState({
                    isLoading: false
                })

            })
            .catch((error) => {
                console.error(error);
                //  alert(error)
                //  callback({ data: error });
                //callback({error: true, data: error});
            });

    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <KeyboardAvoidingView style={{ flex: 1 }}
                    behavior='padding' enabled>
                    <View style={{
                        height: 40,

                        width: "95%", alignSelf: 'center',
                        justifyContent: 'center', alignItems: 'center'
                    }}>
                        <Text style={{
                            fontWeight: '800',
                            fontSize: 18, color: APP_YELLOW
                        }}>
                            User Profile
                            </Text>
                    </View>
                    <ScrollView style={{ flex: 1 }}>
                        <View style={{ flex: 1 }}>
                            <View style={{
                                height: 150,
                                marginTop: 5,
                                width: '100%', justifyContent: 'center',
                                // backgroundColor:'pink'
                            }}>
                                <View style={{
                                    height: 130,
                                    width: 130,
                                    //backgroundColor: 'gray',
                                    borderRadius: 65,
                                    // borderColor: APP_YELLOW,
                                    // borderWidth: 3,
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden'
                                }}>
                                    <Image style={{ height: 130, width: 130 }}
                                        resizeMode='cover'
                                        source={this.state.data.avatar == null ?
                                            require('../assets/placeholder.jpg')
                                            : { uri: this.state.data.avatar }
                                        }></Image>
                                </View>
                            </View>
                            <View style={{
                               // width: '85%',
                                 justifyContent: 'center',
                                 //alignItems:'center',
                                alignSelf: 'center', 
                                marginTop: 20,
                                borderColor:APP_YELLOW,
                                borderWidth:2,
                                borderRadius:10,
                               
                            }}>
                                <View style={{
                                    flexDirection:'row',
                                //justifyContent:'space-between',
                                // backgroundColor:'pink',
                                //width:'60%',
                                marginTop:10}}>
                                    <Text style={{fontWeight:'700',
                                    marginLeft:15,
                                fontSize:17,
                                color:APP_YELLOW}}>Customer id:- </Text>
                                <Text style={{marginLeft:30,
                                fontSize:16,fontWeight:'500',marginRight:15}}>
                                    {this.state.data.customer_id}
                                  </Text>
                                </View>
                                <View style={{flexDirection:'row',
                                marginTop:10, 
                                // width:'60%',
                                // justifyContent:'space-between'
                                }}>
                                    <Text style={{fontWeight:'700',
                                    marginLeft:15,
                                fontSize:17,color:APP_YELLOW}}>Name:- </Text>
                                <Text style={{marginLeft:80,
                                fontSize:16,fontWeight:'500',marginRight:15}}>
                                    {this.state.data.first_name} {this.state.data.last_name}
                                  </Text>
                                </View>
                                <View style={{flexDirection:'row',marginTop:10,
                            // width:'80%',justifyContent:'space-between'
                            }}>
                                    <Text style={{fontWeight:'700',
                                    marginLeft:15,
                                fontSize:17,color:APP_YELLOW}}>Email:- </Text>
                                <Text style={{marginLeft:82,
                                fontSize:16,fontWeight:'500',marginRight:15,}}>
                                    {this.state.data.email}
                                  </Text>
                                </View>
                                <View style={{flexDirection:'row',marginTop:10,
                                
                            marginBottom:10,
                            // width:'60%',justifyContent:'space-between'
                            }}>
                                    <Text style={{fontWeight:'700',marginLeft:15,
                                fontSize:17,color:APP_YELLOW}}>Phone no:- </Text>
                                <Text style={{marginLeft:50,marginRight:15,
                                fontSize:16,fontWeight:'500'}}>
                                    {this.state.data.phone_no}
                                  </Text>
                                </View>

                                
                        </View>


                        <View style={{ marginTop: 20 }}>
                            <TouchableOpacity style={{
                                height: 40, width: '60%',
                                alignItems: "center", justifyContent: 'center',
                                borderRadius: 10, alignSelf: 'center',
                                backgroundColor: APP_YELLOW
                            }}
                                onPress={() => {
                                    this.props.navigation.navigate('DetailerList')
                                }}>
                                <Text style={{
                                    fontSize: 18, fontWeight: '700',
                                    color: 'white'
                                }}>My Detailer</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{
                                height: 40, width: '60%',
                                marginTop: 10,
                                alignItems: "center", justifyContent: 'center',
                                borderRadius: 10, alignSelf: 'center',
                                backgroundColor: APP_YELLOW
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
                                alignItems: "center",
                                justifyContent: 'center',
                                borderRadius: 10,
                                alignSelf: 'center',
                                backgroundColor: APP_YELLOW
                            }}
                                onPress={() => {
                                    this.props.navigation.navigate('Settings', {
                                        data: this.state.data
                                    })
                                }}>
                                <Text style={{
                                    fontSize: 18, fontWeight: '700',
                                    color: 'white'
                                }}>Settings</Text>
                            </TouchableOpacity>

                            {/* <TouchableOpacity style={{
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
                                </TouchableOpacity> */}

                            {/* <TouchableOpacity style={{
                                    height: 40,
                                    width: '60%',
                                    marginTop: 10,
                                    alignItems: "center",
                                    justifyContent: 'center',
                                    borderRadius: 10, alignSelf: 'center',
                                    backgroundColor: APP_LIGHT
                                }}
                                    onPress={() => {
                                        Share.share({ message: 'this is my app' })
                                    }}>
                                    <Text style={{
                                        fontSize: 18, fontWeight: '700',
                                        color: 'white'
                                    }}>Share</Text>
                                </TouchableOpacity> */}
                            {/* <TouchableOpacity style={{
                                    height: 40, width: '60%',
                                    marginTop: 10, marginBottom: 10,
                                    alignItems: "center", justifyContent: 'center',
                                    borderRadius: 10, alignSelf: 'center',
                                    backgroundColor: APP_LIGHT
                                }}
                                    // onPress={() => {
                                    //     this.props.navigation.navigate('Login')
                                    // }}
                                    onPress={() => {
                                        Alert.alert(
                                            'Logout',
                                            'Are you sure you want to logout?',
                                            [
                                                {
                                                    text: 'Logout', onPress: () => {
                                                        this.save('user_id', '')
                                                        //this.props.navigation.navigate('Login')

                                                        const resetAction = StackActions.reset({
                                                            index: 0,
                                                            key: null,
                                                            actions: [NavigationActions.navigate({ routeName: 'Login' })],
                                                        });
                                                        this.props.navigation.dispatch(resetAction);
                                                    }
                                                },
                                                {
                                                    text: 'Cancel',
                                                    style: 'cancel',
                                                }],
                                            { cancelable: false },
                                        );
                                    }}
                                >
                                    <Text style={{
                                        fontSize: 18, fontWeight: '700',
                                        color: 'white'
                                    }}>Logout</Text>
                                </TouchableOpacity> */}

                        </View>


                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
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

                    color={APP_BLUE}
                ></ActivityIndicator>

            </View>
        }
            </SafeAreaView >
        );
    }


}

