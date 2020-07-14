import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, SectionList, AsyncStorage, ActivityIndicator, Alert, RefreshControl, Dimensions, ImageBackground } from 'react-native';
import { APP_YELLOW, APP_BLUE, } from '../Component/colors'
import { FlatList } from 'react-native-gesture-handler';
import ImageLoad from 'react-native-image-placeholder';
import moment from 'moment';

export default class DetailerList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: '',
            DATA: [],
            isFetching: false,
            previewurl: null,
            request: '0'
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
                    this.DetailerListApi()
                })
            }
        } catch (error) {
        }
    }
    // DetailerListApi = (index) => {
    //     this.setState({
    //         isLoading: true
    //     })

    //     fetch('http://3.137.41.50/coatit/public/api/detailer_list/' + "" + this.state.user_id,
    //         {
    //             method: 'GET',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'application/json',
    //             }
    //         })
    //         .then((response) => response.json())
    //         .then((responseJson) => {
    //             console.log(JSON.stringify(responseJson))
    //             if (responseJson.response.status == true) {
    //                 this.setState({
    //                     DATA: responseJson.response.data
    //                 })
    //             }
    //             this.setState({
    //                 isLoading: false,
    //                 isFetching: false
    //             })
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //             //  alert(error)
    //             //  callback({ data: error });
    //             //callback({error: true, data: error});
    //         });
    // }
    DetailerListApi = (index) => {
        this.setState({
            isLoading: true
        })

        fetch('http://3.137.41.50/coatit/public/api/detailer_list',
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(JSON.stringify(responseJson))
                if (responseJson.response.status == true) {
                    this.setState({
                        DATA: responseJson.response.data
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
        this.setState({ isFetching: true }, function () { this.DetailerListApi() })
    }
    render() {
        return (
            // <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground style={{ flex: 1, }}
                resizeMode='stretch'
                source={require('../assets/bg.png')}>

                <View style={{
                    height: 45,
                    width: '95%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignSelf: 'center',
                    marginTop: Platform.OS === 'ios' ? 25 : 7
                }}>
                    <TouchableOpacity style={{
                        height: 25,
                        width: 25,
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        left: 10
                    }}
                        onPress={() => {
                            this.props.navigation.goBack()
                        }}>
                        <Image style={{
                            height: 25,
                            width: 25,
                            tintColor: APP_YELLOW
                        }}
                            resizeMode='contain'
                            source={require('../assets/back.png')}>
                        </Image>
                    </TouchableOpacity>
                    <View style={{
                        height: 35,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Text style={{
                            fontSize: 18,
                            color: APP_YELLOW,
                            fontFamily: 'EurostileBold',
                        }}>Detailers List</Text>
                    </View>
                </View>
                {this.state.DATA.length == 0 || this.state.DATA == null ?
                    <View style={{
                        width: '95%',
                        flex: 1,
                        alignSelf: 'center',
                        justifyContent: "center",
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontSize: 22,
                            color: '#C0C0C0',
                            textAlign: 'center',
                            fontFamily: 'EurostileBold'
                        }}
                            numberOfLines={0}>
                            No detailers found, Please visit your latest detailer to get detailing!
                        </Text>
                    </View> :
                    <View style={{ flex: 1 }}>
                        <FlatList style={{
                            marginTop: 10,
                            marginBottom: 20
                        }}
                            refreshControl={<RefreshControl
                                tintColor={APP_YELLOW}
                                colors={["#D65050", "#D65050"]}
                                refreshing={this.state.isFetching}
                                onRefresh={this.onRefresh}>
                            </RefreshControl>}
                            data={this.state.DATA}
                            renderItem={({ item, index }) => (
                                this.DetailerList(item, index)
                            )}></FlatList>
                    </View>}

                {/* </ScrollView> */}

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
                {/* {
                    this.state.isShow &&
                    <TouchableOpacity style={{
                        position: 'absolute',
                        backgroundColor: '#000000aa',
                        //backgroundColor:'black',
                        top: 0,
                        bottom: 0, left: 0, right: 0,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }} onPress={() => {
                        this.setState({
                            previewurl:null,
                            isShow: false
                        })
                    }}>
                        <View style={{
                            height: 400,
                            width: '100%'
                        }}
                        >
                            <ImageLoad style={{ flex: 1, width: '100%' }}
                                resizeMode=
                                'cover'
                                source={{ uri 
                                :this.state.previewurl }}></ImageLoad>
               </View>

            </TouchableOpacity>
        } */}
            </ImageBackground>
            // </SafeAreaView`>
        );
    }

    DetailerList = (item, index) => {
        return (
            <TouchableOpacity style={{
                marginTop: 5,
                marginBottom: 5,
                width: '95%',
                // borderRadius: 10,
                alignSelf: 'center',
                overflow: 'hidden'
            }}
                onPress={() => {
                    this.props.navigation.push('DetailerCar', {
                        plan: item.service,
                        car: item.car_name,
                        detailer: item

                    })
                }}>
                <View style={{
                    height: Dimensions.get('window').height / 4,
                    width: '100%'
                }}
                    onPress={() => {
                        // this.setState({
                        //     previewurl:item.avatar,
                        //     isShow: true
                        // })
                    }}>
                    <ImageLoad style={{
                        flex: 1,
                        width: '100%',
                    }}
                        resizeMode='cover'
                        source={item.avatar == null || item.avatar == 0 ?
                            require('../assets/placeholder.jpg')
                            : { uri: item.avatar }}>

                    </ImageLoad>
                </View>
                <View style={{
                    marginTop: 5,
                    width: '100%'
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Text style={{
                            fontSize: 17,
                            fontFamily: 'EurostileBold',
                            color: APP_YELLOW
                        }}
                            numberOfLines={2}>
                            {item.first_name}
                        </Text>
                        <TouchableOpacity style={{
                            height: 30,
                            width: '30%',
                            borderRadius: 5,
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: APP_YELLOW
                        }}
                            onPress={() => {
                               
                            }}>
                            {this.state.request == '0' ?
                                <Text style={{
                                    color: 'black',
                                    fontFamily: 'EurostileBold',
                                }}>Request</Text> :
                                <Text style={{
                                    color: 'black',
                                    fontFamily: 'EurostileBold',
                                }}>Request Sent</Text>}
                        </TouchableOpacity>

                        {/* <TouchableOpacity style={{
                            flexDirection: 'row'
                        }}
                            onPress={() => {
                                this.props.navigation.push('DetailerCar', {
                                    plan: item.service,
                                    car: item.car_name,
                                    detailer: item
                                })
                            }}> */}
                        {/* <View style={{}}>
                                <Text style={{
                                    color: '#C0C0C0',
                                    fontFamily: Platform.OS === 'ios' ? 'EuroStyle' : 'EuroStyle Normal',
                                    fontSize: 17
                                }}
                                    numberOfLines={0}>{item.service}</Text>
                            </View>
                            <Image style={{
                                height: 15,
                                width: 15,
                                marginLeft: 10,
                                tintColor: APP_YELLOW
                            }}
                                source={require('../assets/info.png')}
                                resizeMode='contain'>
                            </Image>
                        </TouchableOpacity>
                    </View> */}
                        {/* <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 10,
                    }}>
                        <Text style={{
                            fontSize: 17,
                            fontFamily: Platform.OS === 'ios' ? 'EuroStyle' : 'EuroStyle Normal',
                            color: '#C0C0C0'
                        }}
                            numberOfLines={0}>
                            {item.car_name}
                        </Text>

                        <Text style={{
                            marginBottom: 5,
                            marginRight: 8,
                            fontFamily: Platform.OS === 'ios' ? 'EuroStyle' : 'EuroStyle Normal',
                            fontSize: 17, color: '#C0C0C0'
                        }}>
                            {moment(item.created_at).format('DD-MM-YYYY')}</Text>
                        {/* <Text style={{ marginTop: 10 }}>10 km</Text> */}
                    </View>

                </View>



            </TouchableOpacity>

        )
    }
}





