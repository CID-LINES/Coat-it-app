import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, SectionList, AsyncStorage, ActivityIndicator, Alert, RefreshControl, Dimensions } from 'react-native';
import { APP_YELLOW, APP_BLUE, } from '../Component/colors'
import { FlatList } from 'react-native-gesture-handler';
import ImageLoad from 'react-native-image-placeholder';
import moment from 'moment';
// const DATA = [
//     {
//         title: 'Current Orders',
//         // data: ['Pizza', 'Burger', 'Risotto'],
//     },
//     {
//         title: 'Past Orders',

//     },

// ];
export default class DetailerList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: '',
            DATA: [],
            isFetching: false,
            previewurl:null
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
    DetailerListApi = () => {
        this.setState({
            isLoading: true
        })

        fetch('http://3.137.41.50/coatit/public/api/detailer_list/' + "" + this.state.user_id,
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
            <SafeAreaView style={{ flex: 1 }}>

                <View style={{
                    height: 40, width: '95%',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignSelf: 'center',
                    marginTop: 10
                }}>
                    <TouchableOpacity style={{
                        height: 35, width: 35,
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        left: 5
                    }}
                        onPress={() => {
                            this.props.navigation.goBack()
                        }}>
                        <Image style={{ height: 25, width: 25, tintColor: APP_YELLOW }}
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
                            fontSize: 18, fontWeight: '700',
                            color: APP_YELLOW, fontFamily: 'EuroStileBold',
                        }}>Detailers List</Text>
                    </View>
                </View>
                {this.state.DATA.length == 0 || this.state.DATA == null ?
                    <View style={{
                        width: '95%', flex: 1,
                        alignSelf: 'center',
                        justifyContent: "center",
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontSize: 22,
                            color: 'gray',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            fontFamily: 'EuroStileBold'
                        }}
                            numberOfLines={0}>
                            No detailers found, Please visit your latest detailer to get detailing!
                        </Text>
                    </View> :
                    <View style={{ flex: 1 }}>

                        <FlatList style={{ marginTop: 20 }}
                            refreshControl={<RefreshControl
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
                {
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
        }

            </SafeAreaView>
        );
    }

DetailerList = (item, index) => {
    return (
        <TouchableOpacity style={{
            marginTop: 5,
            marginBottom: 5,
            width: '95%',
            borderRadius: 10,
            flexDirection: 'row',
            borderColor: APP_YELLOW,
            borderWidth: 2,
            alignSelf: 'center',
            // backgroundColor: 'pink',
            overflow: 'hidden'
        }}
            onPress={() => {
                this.props.navigation.push('DetailerCar', {
                    plan: item.service,
                    car: item.car_name,
                    detailer: item

                })
            }}

        >
            <TouchableOpacity style={{
                // height:120,
                width: Dimensions.get('window').width / 3
            }}
                onPress={() => {
                    this.setState({
                        previewurl:item.avatar,
                        isShow: true
                    })
                }}>
                <ImageLoad style={{
                    // height: 120,
                    flex: 1,
                    width: '100%',
                }}
                    resizeMode='cover'
                    source={item.avatar == null || item.avatar == 0 ?
                        require('../assets/placeholder.jpg')
                        : { uri: item.avatar }}>

                </ImageLoad>
            </TouchableOpacity>
            <View style={{
                marginLeft: 15,
                marginTop: 5,
                width: '55%'
            }}>
                <Text style={{
                    fontSize: 17,
                    fontWeight: '800', fontFamily: 'EuroStileBold',
                }}
                    numberOfLines={2}>
                    {item.first_name}
                </Text>

                <TouchableOpacity style={{
                    height: 20,
                    marginTop: 8,
                    width: '80%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row'
                }}
                    onPress={() => {
                        this.props.navigation.push('DetailerCar', {
                            plan: item.service,
                            car: item.car_name
                        })
                    }}>
                    <View style={{ width: '95%' }}>
                        <Text style={{
                            fontFamily: 'EuroStyle',
                            fontSize: 17
                        }}
                            numberOfLines={0}>{item.service}</Text>
                    </View>
                    <Image style={{
                        height: 15,
                        width: 15,
                        tintColor: APP_YELLOW
                    }}
                        source={require('../assets/info.png')}
                        resizeMode='contain'>
                    </Image>
                </TouchableOpacity>
                <Text style={{
                    marginTop: 8,
                    fontSize: 17,
                    fontFamily: 'EuroStyle',
                }}
                    numberOfLines={0}>
                    {item.car_name}
                </Text>

                <Text style={{
                    marginTop: 8, marginBottom: 5,
                    fontFamily: 'EuroStyle', fontSize: 17
                }}>
                    {moment(item.created_at).format('DD-MM-YYYY')}</Text>
                {/* <Text style={{ marginTop: 10 }}>10 km</Text> */}



            </View>





        </TouchableOpacity>

    )
}
}





