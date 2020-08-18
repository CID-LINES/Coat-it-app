import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Dimensions, ActivityIndicator, AsyncStorage, ImageBackground, RefreshControl, StatusBar, Alert } from 'react-native';
import { APP_YELLOW, APP_BLUE, } from '../Component/colors'
import { FlatList } from 'react-native-gesture-handler';
import ImageLoad from 'react-native-image-placeholder';
import PushNotification from 'react-native-push-notification';
import firebase, { messaging, notifications } from 'react-native-firebase'
import { strings } from './Localization';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { ApiCall, CallApi } from '../Component/ApiClient';
import { NavigationActions } from 'react-navigation';
import { setupPushNotification } from './root'

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: '',
            isFetching: false,
            text: [],
            token: ''
        }

    }
    componentDidMount() {
        this.checkPermission();
        this.createNotificationListeners();
        this.PushNotification = setupPushNotification(this._handleNotificationOpen)
        this.load()
        this.props.navigation.addListener('willFocus', this.load)
    }
    load = () => {
        this.get('user_id')
        
    }

    _handleNotificationOpen = (data) => {
         console.log(data)
        const { navigate } = this.props.navigation
        if (data.type == 'Accepted your request') {
            navigate("DetailerList")
        }
        else if (data.type == 'Added new products') {
            navigate("ProductList")
        }
        else if (data.type == 'Admin send notification')
         {
            navigate('Notification')
        }

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
        } else {
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
            const value2 = await AsyncStorage.getItem("fcmToken");
            //alert(value)
            if (value != null && value != '') {
                this.setState({
                    user_id: value
                }, () => {
                    this.PlanApi()
                    this.tokenApi(value2)
                })
            }
        } catch (error) {

        }
    }


    async createNotificationListeners() {
        // This listener triggered when notification has been  received in foreground
        this.notificationListener = firebase.notifications().onNotification((notification) => {
            const { title, body,data } = notification;
            const localNotification = PushNotification.localNotification({
                title: title,
                message: body,
                soundName: 'default',
                smallIcon: true,
                show_in_foreground: true,
            })
            return localNotification;
        });


        //This listener triggered when app is in backgound and we click, tapped and opened notifiaction
        this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
            const { data } = notificationOpen.notification;
            console.log(data)

        });
        // // // This listener triggered when app is closed and we click,tapped and opened notification 
        const notificationOpen = await firebase.notifications().getInitialNotification();
        if (notificationOpen) {
            const { data } = notificationOpen.notification;
            const { navigate } = this.props.navigation
            console.log(data)
            if (data.type == 'Accepted your request') {
                navigate('DetailerList')
            }
            else if (data.type == 'Added new products') {
                navigate('ProductList')
            }
            else if (data.type == 'Admin send notification') {
                navigate('Notification')
            }
        }
    }

    tokenApi = (fcmToken) => {
        this.setState({
            isLoading: true
        })
        CallApi('update_device_token',
            {
                'user_id': "" + this.state.user_id,
                'device_type': Platform.OS == 'android' ? 'a' : 'i',
                'device_token': fcmToken
            },
            (data) => {
                //console.log(JSON.stringify(data))
                if (!data.error) {
                    if (data.data.response.status == true) {

                    }
                    else {
                        //alert(data.data.response.message)
                    }
                } else {
                    //alert('Somthing went wrong')
                }
                this.setState({
                    isLoading: false
                })
                // alert(JSON.stringify(data))
                //nsole.log(data)
            })
    }
    PlanApi = () => {
        this.setState({
            isLoading: true
            // isFetching:true
        })

        fetch('http://3.137.41.50/coatit/public/api/plan/display',
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',

                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                //console.log(JSON.stringify(responseJson))
                if (responseJson.response.status == true) {
                    this.setState({
                        data: responseJson.response.data
                    })

                }
                this.setState({
                    isLoading: false,
                    isFetching: false
                })
            })
            .catch((error) => {
                console.error(error);
                //  alert(error)
                //  callback({ data: error });
                //callback({error: true, data: error});
            });
    }
    onRefresh = () => {
        this.setState({ isFetching: true }, function () { this.PlanApi() });
    }
    render() {

        return (
            // <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ImageBackground style={{ flex: 1 }}
                resizeMode='stretch'
                source={require('../assets/bg.png')}>
                <StatusBar barStyle="light-content" />
                <View style={{ flex: 1 }}>
                    <View style={{
                        height: 40,
                        width: "95%",
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: Platform.OS === 'ios' ? 25 : 7
                    }}>
                        <Text style={{
                            fontSize: 18,
                            color: APP_YELLOW,
                            fontFamily: 'EurostileBold',
                        }}>
                            Services
                            </Text>
                    </View>
                    <FlatList style={{ marginTop: 5 }}
                        refreshControl={<RefreshControl
                            tintColor={APP_YELLOW}
                            colors={["#D65050", "#D65050"]}
                            refreshing={this.state.isFetching}
                            onRefresh={this.onRefresh}>
                        </RefreshControl>}
                        data={this.state.data}
                        renderItem={({ item }) => (
                            this.MembershipPlan(item)
                        )}>
                    </FlatList>
                </View>

                {this.state.isLoading &&
                    <View style={{
                        position: 'absolute',
                        backgroundColor: '#000000aa',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
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
            // </SafeAreaView >
        );
    }
    MembershipPlan = (item) => {

        return (

            <TouchableOpacity style={{
                width: '95%',
                alignSelf: 'center',
                //borderRadius: 10,
                marginBottom: 10,
                overflow: 'hidden'
            }} onPress={() => {

                this.props.navigation.navigate('ServiceDetail', {
                    plan: item
                })
            }}>
                <View style={{
                    height: Dimensions.get('window').height / 4,
                    width: '100%'
                }} >
                    <ImageLoad style={{
                        flex: 1,
                        width: '100%'
                    }}
                        resizeMode='cover'
                        source={
                            { uri: item.image }}></ImageLoad>
                </View>
                <View style={{
                    width: '95%',
                    marginTop: 10,
                    marginLeft: 10,
                }}>
                    <Text style={{
                        fontSize: 17,
                        fontFamily: 'EurostileBold',
                        color: '#C0C0C0'
                    }}
                    >{item.name.toUpperCase()}</Text>
                    <Text style={{
                        fontSize: 16,
                        color: '#C0C0C0',
                        fontFamily: Platform.OS === 'ios' ? 'EuroStyle' : 'EuroStyle Normal',
                        marginTop: 5
                    }}
                    >{item.title}
                    </Text>
                </View>
                <TouchableOpacity style={{
                    height: 30,
                    // width: '30%',
                    marginTop: 5,
                    //borderRadius: 5,
                    marginBottom: 10,
                    alignSelf: 'flex-end',
                    marginRight: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: APP_YELLOW
                }}
                    onPress={() => {
                        this.props.navigation.navigate('ServiceDetail', {
                            plan: item
                        })
                    }}>
                    <Text style={{
                        color: 'black',
                        marginLeft: 5,
                        marginRight: 5,
                        fontFamily: 'EurostileBold',
                    }}>View details</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }
}



