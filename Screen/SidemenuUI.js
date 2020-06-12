import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
    StatusBar,
    ImageBackground,
    Platform,
    FlatList,
    Image,
    Linking
} from 'react-native';
// import global from '../config/global';
import { NavigationActions, StackActions } from 'react-navigation';
import { AsyncStorage } from 'react-native';
import colors from '../Config/colors';
import Loader from '../MyComponents/loader';
// import { storeData } from '../store/SharedPref.js'
// import UserProfile from './UserProfile';
import ImageLoad from 'react-native-image-placeholder';
import constants from '../Config/constants';
import { notifications } from "react-native-firebase-push-notifications"

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

function StatusBarPlaceHolder() {
    return (
        <View style={{
            width: "100%",
            height: STATUS_BAR_HEIGHT,
            // backgroundColor: colors.APPCOLOR,
            position: 'absolute'
        }}>
            {/* <StatusBar
                barStyle="light-content"
            /> */}
        </View>
    );
}

export default class SidemenuUI extends Component {
    constructor() {
        super();
        this.state = {
            data: [
                'Home',
                'Account Settings',
                'Terms and Conditions',
                // 'Feedback',
                'Contact',
                // 'FAQ',
                'Log out'],
            token: '',
            user_id: '',
            isLoading: false,
            profileData: null,
            bannerUrl: null
        }
    }

    getToken = async () => {
        //get the messeging token
        const token = await notifications.getToken()
        //you can also call messages.getToken() (does the same thing)
        console.log("token -------> " + token)
        AsyncStorage.setItem("noti_token", token + "")
        return token + ""
    }

    getInitialNotification = async () => {
        //get the initial token (triggered when app opens from a closed state)
        const notification = await notifications.getInitialNotification()
        // alert('getInitialNotification')

        console.log("getInitialNotification", notification)
        return notification
    }

    onNotificationOpenedListener = () => {
        //remember to remove the listener on un mount
        //this gets triggered when the application is in the background
        this.removeOnNotificationOpened = notifications.onNotificationOpened(
            notification => {
                // alert(notification.data)
                this._retrieveUserId(notification.data.eventId + '', notification.data.user_type + "" == "s")
                console.log("onNotificationOpened", notification)
                //do something with the notification
            }
        )
    }

    onNotificationListener = () => {
        //remember to remove the listener on un mount
        //this gets triggered when the application is in the forground/runnning
        //for android make sure you manifest is setup - else this wont work
        //Android will not have any info set on the notification properties (title, subtitle, etc..), but _data will still contain information
        this.removeOnNotification = notifications.onNotification(notification => {
            //do something with the notification
            // alert(JSON.stringify(notification.data))
            // notification.localNotification({
            //     message: notification.data.body,
            // })
            console.log("onNotification", notification)
        })
    }

    onTokenRefreshListener = () => {
        //remember to remove the listener on un mount
        //this gets triggered when a new token is generated for the user
        this.removeonTokenRefresh = messages.onTokenRefresh(token => {
            //do something with the new token
        })
    }
    setBadge = async number => {
        //only works on iOS for now
        return await notifications.setBadge(number)
    }

    getBadge = async () => {
        //only works on iOS for now
        return await notifications.getBadge()
    }

    hasPermission = async () => {
        //only works on iOS
        return await notifications.hasPermission()
        //or     return await messages.hasPermission()
    }

    requestPermission = async () => {
        //only works on iOS
        return await notifications.requestPermission()
        //or     return await messages.requestPermission()
    }

    //   componentDidMount() {
    //     if(Platform.OS == 'ios') {
    //       this.requestPermission()
    //     }

    //     // if(this.hasPermission()) {
    //     //   AsyncStorage.setItem("noti_token", this.getToken() + "")
    //     // }
    //     // alert('test')
    //     this.getToken()

    //     this.getInitialNotification()
    //     this.onNotificationOpenedListener()
    //     this.onNotificationListener()

    //   }

    componentWillUnmount() {
        //remove the listener on unmount
        if (this.removeOnNotificationOpened) {
            this.removeOnNotificationOpened()
        }
        if (this.removeOnNotification) {
            this.removeOnNotification()
        }

        if (this.removeonTokenRefresh) {
            this.removeonTokenRefresh()
        }
    }

    _retrieveUserId = async (event_id, isStreamer) => {
        try {
            const value = await AsyncStorage.getItem('user_id');
            if (value !== null && value != '') {
                this.setState({
                    user_id: value
                })
                this.getEventDetailApi(event_id, isStreamer)
            }
        } catch (error) {
            // Error retrieving data
        }
    };

    getEventDetailApi(id, isStreamer) {
        var url = 'http://44.229.78.65:8089/1.0/event/id/' + id
    
        this.setState({
            isLoading: true
        })
        fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false
                })
                // alert(JSON.stringify(responseJson))
                if (responseJson.response != null && responseJson.response.success != null && responseJson.response.success) {
                  if(isStreamer) {
                    this.props.navigation.push('NotificationScreen', {
                    //   data: responseJson.response.event,
                        isStreamer: isStreamer
                    })
                  }
                  else {
                    this.props.navigation.push('NotificationScreen', {
                    //   data: responseJson.response.event,
                    //   user_id: this.state.user_id
                        isStreamer: isStreamer
                    })
                  } 
                  
                    // this.navigateToScreen('AddtoLaunchScreen', responseJson.response.event)
                }
            })
            .catch((error) => {
                this.setState({
                    isLoading: false
                })
                console.error(error);
            });
    }

    componentDidMount() {

        if (Platform.OS == 'ios') {
            this.requestPermission()
        }

        // if(this.hasPermission()) {
        //   AsyncStorage.setItem("noti_token", this.getToken() + "")
        // }
        // alert('test')
        this.getToken()

        

        this.getInitialNotification()
        this.onNotificationOpenedListener()
        this.onNotificationListener()

        this._retrieveData('token', false)
        this._retrieveData('user_id', true)
        this.load()
        this.props.navigation.addListener('willFocus', this.load)
    }
    load = () => {
        // alert('test')
        this._retrieveData('token', false)
        this._retrieveData('user_id', true)
    }

    _retrieveData = async (key, isApi) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null && value != '') {
                this.setState({
                    [key]: value
                })
                isApi ? this.getUserProfileApi() : null
                isApi ? this._retrieveStreamerData() : null

            }
        } catch (error) {
            // Error retrieving data
        }
    };

    navigateToScreen = (route, data) => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        // if(data != null) {
        //     this.props.navigation.dispatch(navigateAction, {
        //         data: data
        //     });
        // }
        // else {
            this.props.navigation.dispatch(navigateAction);
        // }
    }

    _retrieveStreamerData = async () => {
        try {
            const value = await AsyncStorage.getItem('streamer_id');
            if (value !== null && value != '') {
                this.getStreamerProfileApi(value)
            }
        } catch (error) {
            // Error retrieving data
        }
    };

    getUserProfileApi() {
        var url = 'http://44.229.78.65:8084/1.0/viewer/profile/id/' + this.state.user_id
        // this.setState({
        //   isLoading: true
        // })
        fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                // this.setState({
                //   isLoading: false
                // })
                if (responseJson.response != null && responseJson.response.success != null && responseJson.response.success) {
                    this.setState({
                        profileData: responseJson.response
                    })

                }
                else {
                    // Alert.alert('', JSON.stringify(responseJson.response.message))
                }
                // alert('update')
                console.log('======>' + JSON.stringify(responseJson))
                // alert(JSON.stringify(responseJson))
                // return responseJson.response.broadcasters;
            })
            .catch((error) => {
                // this.setState({
                //   isLoading: false
                // })
                console.error(error);
            });
    }

    getStreamerProfileApi(streamer_id) {
        var url = 'http://44.229.78.65:8082/1.0/broadcaster/profile/id/' + streamer_id
        // this.setState({
        //   isLoading: true
        // })
        fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {

                // this.setState({
                //   isLoading: false
                // })
                if (responseJson.response != null && responseJson.response.success != null && responseJson.response.success) {
                    // alert(JSON.stringify(responseJson))
                    console.log(responseJson)
                    this.setState({
                        bannerUrl: responseJson.response.broadcaster.bannerUrl
                    })
                }
                else {
                    // alert(JSON.stringify(responseJson.response.message))
                }
                console.log(responseJson)
                // alert(JSON.stringify(responseJson.response.broadcasters[0]))
                // return responseJson.response.broadcasters;
            })
            .catch((error) => {
                // this.setState({
                //   isLoading: false
                // })
                console.error(error);
            });
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <SafeAreaView style={{
                flex: 1,
                // backgroundColor: colors.APP_COLOR,
            }}>
                <StatusBarPlaceHolder />

                <View style={{
                    flex: 1,
                    overflow: 'hidden'
                }}
                // source={require('../assets/background_pattern.png')}
                >
                    <View style={{
                        width: '100%',
                        // height: 120,
                        // marginTop: 15,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <ImageLoad style={{
                            height: 130,
                            width: '100%',
                            resizeMode: 'cover'
                        }}
                            source={(this.state.bannerUrl != null ?
                                (this.state.bannerUrl == 'NO_IMAGE_FOUND' ?
                                    require('../Assets/user-placeholder.png') :
                                    { uri: this.state.bannerUrl + '' }) : require('../Assets/user-placeholder.png'))} />
                        <TouchableOpacity
                            style={{
                                marginTop: -50
                            }}
                            onPress={() => {
                                this.props.navigation.push('ViewerProfile', {
                                    data: this.state.user_id
                                })
                            }}>
                            <ImageLoad style={{
                                height: 100,
                                width: 100,
                                backgroundColor: 'gray',
                                borderRadius: 50,
                            }}
                                borderRadius={50}
                                source={(this.state.profileData != null && this.state.profileData.viewer != null ?
                                    (this.state.profileData.viewer.profilePicture == 'NO_IMAGE_FOUND' ?
                                        require('../Assets/user-placeholder.png') :
                                        { uri: this.state.profileData.viewer.profilePicture + '' }) : require('../Assets/user-placeholder.png'))} />
                            <Text style={{
                                // flex: 1,
                                textAlign: 'center',
                                fontSize: 16,
                                fontWeight: '600'
                            }}
                                numberOfLines={3}>{this.state.profileData != null ? this.state.profileData.viewer.fname : ''}</Text>
                        </TouchableOpacity>
                        {/* <View style={{
                            width: '100%',
                            // height: 120,
                            marginTop: 15,
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row'
                        }}>
                            <Text style={{
                                // flex: 1,
                                textAlign: 'center',
                                fontSize: 16,
                                fontWeight: '600',
                                color: 'green'
                            }}
                                numberOfLines={3}>{this.state.profileData != null && this.state.profileData.viewer.wallet.toFixed(2) + ''} Credits</Text>
                            <TouchableOpacity onPress={() => {
                                Alert.alert('', 'In app purchases of credits are not supported please visit our website to add credits to your account.')
                                
                            }}>
                                <Text style={{
                                    // flex: 1,
                                    textAlign: 'center',
                                    fontSize: 16,
                                    fontWeight: '600',
                                    marginLeft: 10
                                }}
                                    numberOfLines={3}>+ Add credits</Text>
                            </TouchableOpacity>
                        </View> */}
                    </View>

                    <FlatList style={{
                        flex: 1,
                        marginTop: 15,
                        overflow: 'hidden'
                    }}
                        data={this.state.data}
                        renderItem={({ item, index }) =>
                            this.menuUI(item)
                        }
                    />

                    <Text style={{
                        position: 'absolute',
                        bottom: 10,
                        textAlign: 'center',
                        width: '100%',

                    }}>{Platform.OS == 'android' ? 'V-10' : 'V-1 B-38'}</Text>
                </View>

                {this.state.isLoading && <Loader size='large' text='Loading...' />}

            </SafeAreaView>
        );
    }

    menuUI(item) {
        return (
            <View style={{
                height: 40
            }}>
                <TouchableOpacity
                    onPress={() => {
                        this.handleMenuClick(item)
                    }}
                    style={{
                        justifyContent: 'center',
                        // alignItems: 'center'
                    }} >
                    <Text style={{
                        marginLeft: 15,
                        // marginTop: 15,
                        height: 30,
                        // backgroundColor: 'green',
                        fontSize: 16,
                        // fontWeight: '600',
                        // color: 'white'
                    }}>{item}</Text>
                </TouchableOpacity>
                <View style={{
                    backgroundColor: 'lightgray',
                    height: 1,

                }} />
            </View>
        )
    }

    handleMenuClick = async (item) => {
        this.props.navigation.goBack()
        if (item == 'Home') {
            this.props.navigation.navigate('Home')
        }
        else if (item == 'Account Settings') {
            this.props.navigation.navigate('AccountSettings')
        }
        else if (item == 'Terms and Conditions') {
            Linking.openURL(constants.TERMS_LINK)
        }
        else if (item == 'Contact') {
            Linking.openURL('mailto:swoopdeveloper@gmail.com')
        }
        else if (item == 'Log out') {
            // this.navigateToScreen('Login')
            Alert.alert(
                'Logout',
                'Are you sure you want to logout?',
                [
                    {
                        text: 'Logout', onPress: () => {
                            this.logoutUser(this.state.token)
                        }
                    },
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                ],
                { cancelable: false },
            );
        }
    }

    // _retrieveData = async (key) => {
    //     try {
    //         const value = await AsyncStorage.getItem(key);
    //         if (value !== null && value != '') {
    //             this.setState({
    //                 token: value
    //             })
    //         }
    //     } catch (error) {
    //         // Error retrieving data
    //     }
    // };

    _storeData = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            // Error saving data
        }
    };

    logoutUser(token) {
        this.setState({
            isLoading: true
        });
        fetch('http://44.229.78.65:8765/api/1.0/logout/viewer', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false
                });

                // alert(JSON.stringify(responseJson))

                // if(responseJson.response != null && responseJson.response.success)
                // {
                this._storeData('token', '')
                this._storeData('streamer_id', '')
                this._storeData('is_streamer', 'false')

                this.setState({
                    token: ''
                })
                // this.props.navigation.goBack()
                // const navigateAction = NavigationActions.navigate({
                //     routeName: 'Welcome',
                //     params: {},
                //     action: NavigationActions.navigate({ routeName: 'Welcome' }),
                // });
                // this.props.navigation.dispatch(navigateAction);

                this.props.navigation.replace('Welcome')

                // }
                // else
                // {
                //   // alert(responseJson.message)
                // }
            })
            .catch((error) => {
                this.setState({
                    isLoading: false
                });
                console.error(error);
            });
    }

}