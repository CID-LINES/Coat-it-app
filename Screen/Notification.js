import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, RefreshControl, ActivityIndicator, Dimensions, PushNotificationIOS, ImageBackground } from 'react-native';
import { APP_BLUE, APP_YELLOW } from '../Component/colors'
import { FlatList } from 'react-native-gesture-handler';
import moment from 'moment';
import ImageLoad from 'react-native-image-placeholder';
import PushNotification from 'react-native-push-notification';



export default class Notification extends Component {
    constructor() {
        super()
        this.state = {
            data: [],
            isFetching: false,
            previewurl: null,
           
        }
    }

    async componentDidMount() {
        this.NotificationApi()
    }

    NotificationApi = () => {
        this.setState({
            isLoading: true  
        })

        fetch('http://3.137.41.50/coatit/public/api/notification_list',
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(JSON.stringify(responseJson.response))
                if (responseJson.response.status == true) {
                    this.setState({
                        data: responseJson.response.notifcations,
                    })

                }
                this.setState({
                     isLoading: false,
                     isFetching: false
                })

            })
            .catch((error) => {
                console.error(error);
            });
    }

    onRefresh = () => {
        this.setState({ isFetching: true }, function () {this.NotificationApi()});
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            // <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <ImageBackground style={{ flex: 1, }}
                    resizeMode='stretch'
                    source={require('../assets/bg.png')}>
                    <View style={{ flex: 1 }}>
                        <View style={{
                            alignSelf: 'center',
                            alignItems: 'center', 
                            justifyContent: 'center',
                            height: 45,
                            width: '100%',
                            marginTop: Platform.OS === 'ios'? 25 : 7
                        }}>
                            <Text style={{
                                fontSize: 20,
                                fontFamily: 'EurostileBold',
                                color: APP_YELLOW
                            }}>Notifications</Text>
                        </View>
                        <FlatList style={{marginTop: 5}}
                                refreshControl={<RefreshControl
                                tintColor={APP_YELLOW}
                                colors={["#D65050","#D65050"]}
                                refreshing={this.state.isFetching}
                                onRefresh={this.onRefresh}>
                            </RefreshControl>}
                            data={this.state.data}
                            renderItem={({ item }) => (
                                this.Notification(item)
                            )}>
                            </FlatList>
                    </View>
                    {this.state.isLoading &&
                        <View style={{
                            position:'absolute',
                            backgroundColor:'#000000aa',
                            top: 0,
                            bottom: 0, 
                            left: 0, 
                            right: 0,
                            alignItems:'center',
                            justifyContent:'center'
                        }}>
                            <ActivityIndicator
                                animating={this.state.isLoading}
                                size='large'
                                color={APP_YELLOW}
                            ></ActivityIndicator>

                        </View>
                    }
                </ImageBackground>
          
        );
    }

    Notification = (item) => {
        return (
            <View>
                <TouchableOpacity style={{
                    width: '98%',
                    alignSelf: 'center',
                    marginBottom: 10,
                    flexDirection: 'row',
                    overflow: 'hidden'
                }}
                    onPress={() => {
                        this.props.navigation.navigate('NotificationDetail',{
                            data: item
                        })
                    }}>

                    <TouchableOpacity style={{
                        marginTop: 5,
                        height: Dimensions.get('window').height / 12,
                        width: 60,
                        marginLeft: 5,
                        //borderRadius: 5,
                        overflow: "hidden"
                    }}
                        onPress={() => {
                            // this.setState({
                            //     previewurl:item.image,
                            //     isShow:true
                            // })
                        }}>
                        <ImageLoad style={{ flex: 1, width: '100%' }}
                            resizeMode='cover'
                            source={item.image == null || item.image == ''
                                ? require('../assets/placeholder.jpg') :
                                { uri: item.image }}
                        ></ImageLoad>
                    </TouchableOpacity>
                    <View>
                        <View style={{
                            marginTop: 5,
                            marginLeft: 5,
                            // marginBottom: 5, 
                            flexDirection: 'row',
                            justifyContent: 'space-between'

                        }}>
                            <View style={{
                                width: Dimensions.get('window').width /2,
                            }}>
                                <Text style={{
                                    fontSize: 17,
                                    textAlign: 'justify',
                                    marginLeft:10,
                                    color: '#C0C0C0',
                                    fontFamily: 'EurostileBold'
                                }}>
                                    {item.title.toUpperCase()}
                                    </Text>
                            </View>
                            <Text style={{
                                fontSize: 15,
                                fontFamily: 'EurostileBold'
                                , marginLeft: 5,
                                color:'#C0C0C0',
                                marginRight: 5
                            }}>
                                {moment.utc(item.created_at).local().format('hh:mm a')}
                            </Text>
                        </View>
                        <View style={{
                            width: Dimensions.get('window').width / 1.33,
                            marginLeft: 15,
                            marginBottom: 5,
                            marginTop: 10
                        }}>
                            <Text style={{
                                fontSize: 18,
                                color:'#C0C0C0',
                                fontFamily: Platform.OS === 'ios' ? 'EuroStyle' : 'EuroStyle Normal',
                                textAlign: 'justify'

                            }}
                                numberOfLines={2}>
                                {item.description}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                {/* <View style={{
                    height: 2, width: '100%',
                    marginBottom: 5,
                    backgroundColor: APP_YELLOW
                }}></View> */}
            </View>
        )

    }
}



