import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Dimensions, ActivityIndicator, AsyncStorage, ImageBackground, RefreshControl } from 'react-native';
import { APP_YELLOW, APP_BLUE, } from '../Component/colors'
import { FlatList } from 'react-native-gesture-handler';
import ImageLoad from 'react-native-image-placeholder';
import PushNotification from 'react-native-push-notification';


const DATA = [
    {
        title: 'Plan 1',
        description: 'This plan for 1 year membership'
    }, {
        title: 'Plan 2',
        description: 'This plan for 2 year membership'
    },
    {
        title: 'Plan 3',
        description: 'This plan for 3 year membership'
    }, {
        title: 'Plan 4',
        description: 'This plan for 4 year membership'
    },

]
export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: '',
            isFetching: false
        }

    }


    componentDidMount() {
       

        this.get('user_id')
    }

    async get(key) {
        try {
            const value = await AsyncStorage.getItem(key);
            //alert(value)
            if (value != null && value != '') {
                this.setState({
                    user_id: value
                }, () => {
                    this.PlanApi()
                })
            }
        } catch (error) {

        }
    }


    PlanApi = () => {
        this.setState({
            isLoading: true
        })


        fetch('http://3.137.41.50/coatit/public/api/plan/display',
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
                console.log(JSON.stringify(responseJson))
                if (responseJson.response.status == true) {
                    this.setState({
                        data: responseJson.response.data
                    })
                    // alert('helo')
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
            <ImageBackground style={{ flex: 1, }}
                resizeMode='stretch'
                source={require('../assets/bg.png')}>
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
                            Service Plan
                            </Text>
                    </View>
                    <FlatList style={{ marginTop: 5 }}

                        refreshControl={<RefreshControl
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
            // </SafeAreaView >
        );
    }
    MembershipPlan = (item) => {

        return (

            <TouchableOpacity style={{
                width: '95%',
                alignSelf: 'center',
                borderColor: APP_YELLOW,
                borderWidth: 3,
                borderRadius: 10,
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
                        source={item.image == null ?
                            require('../assets/placeholder.jpg') :
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
                        color: 'white'
                    }}
                    >{item.name}</Text>
                    <Text style={{
                        fontSize: 16,
                        color: 'white',
                        fontFamily: Platform.OS === 'ios' ? 'EuroStyle' : 'EuroStyle Normal',

                        marginTop: 5
                    }}
                    >{item.title}</Text>

                </View>
                <TouchableOpacity style={{
                    height: 30,
                    width: '30%',
                    marginTop: 5,
                    borderRadius: 5,
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
                        color: 'white', fontFamily: 'EurostileBold',
                    }}>View details</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }
}



