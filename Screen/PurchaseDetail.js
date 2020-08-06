import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, AsyncStorage, ActivityIndicator, Dimensions, ImageBackground, RefreshControl, Linking } from 'react-native';
import { APP_YELLOW, APP_BLUE, } from '../Component/colors'
import ImageLoad from 'react-native-image-placeholder';
import { FlatList } from 'react-native-gesture-handler';
import { CallApi, ApiCallWithImage } from '../Component/ApiClient';
import moment from 'moment';


export default class DetailerDeatil extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customer_id: '',
            isSelected: 0,
            isSelected1: 0,
            detailer: props.navigation.state.params.detailer,
            serviceplan: [],
            products: []
        }
        //console.log(this.state.detailer)
    }

    componentDidMount() {
        //     this.load()
        //     this.props.navigation.addListener('willFocus', this.load)
        // }
        // load = () => {

        this.getcustomer('customer_id')

    }
    async getcustomer(key) {
        try {
            const value = await AsyncStorage.getItem(key);
            //alert(value)
            if (value != null && value != '') {
                this.setState({
                    customer_id: value
                }, () => {
                    this.ServiceProductsApi()
                })
            }
        } catch (error) {

        }
    }

    ServiceProductsApi = () => {
        this.setState({
            isLoading: true
        })
        CallApi('product_and_service',
            {
                'detailer_id': '' + this.state.detailer,
                'customer_id': '' + this.state.customer_id,
            },
            (data) => {
                console.log(JSON.stringify(data))
                if (!data.error) {
                    if (data.data.response.status == true) {
                        this.setState({
                            serviceplan: data.data.response.services,
                            products: data.data.response.products
                        })
                    }
                    else {
                        alert(data.data.response.message)
                    }
                } else {
                    //alert('Somthing went wrong')
                }
                this.setState({
                    isLoading: false,
                    isFetching: false
                })
                // alert(JSON.stringify(data))
                //nsole.log(data)
            })
    }
    onRefresh = () => {
        this.setState({ isFetching: true }, function () { this.ServiceProductsApi() });
    }

    render() {
        return (
            <ImageBackground style={{ flex: 1, }}
                source={require('../assets/bg.png')}>
                <View style={{
                    height: 45,
                    width: '95%',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginTop: Platform.OS === 'ios' ? 25 : 7
                }}>
                    <TouchableOpacity style={{
                        // height: 35,
                        // width: 35,
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        left: 5
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
                        width: '80%',
                        //position:'absolute',
                        // alignItems: 'center',
                        marginLeft: 60,
                        justifyContent: 'center',

                    }}
                        onPress={() => {
                            this.props.navigation.goBack()
                        }}>
                        <Text style={{
                            fontSize: 18,
                            color: APP_YELLOW,
                            fontFamily: 'EurostileBold',
                        }}
                            numberOfLines={0}>Purchased Detail
                            </Text>
                    </View>
                    <View style={{
                        height: 30,
                        borderRadius: 5,
                        flexDirection: 'row',
                        overflow: 'hidden',
                        position: 'absolute',
                        right: 5,
                        backgroundColor: 'white'
                    }}>
                        <TouchableOpacity style={{
                            height: 30,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: this.state.isSelected == 0 ? APP_YELLOW : 'white'
                        }}
                            onPress={() => {
                                this.setState({
                                    isSelected: 0
                                })
                            }}>
                            <Text style={{
                                marginLeft: 5,
                                fontFamily: 'EurostileBold',
                                marginRight: 5
                            }}>Services</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            height: 30,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: this.state.isSelected == 0 ? 'white' : APP_YELLOW
                        }}
                            onPress={() => {
                                this.setState({
                                    isSelected: 1
                                })
                            }}>
                            <Text style={{
                                marginRight: 5,
                                marginLeft: 5, fontFamily: 'EurostileBold',
                            }}>Products</Text>
                        </TouchableOpacity>

                    </View>

                </View>

                <View style={{ flex: 1 }}>

                    {this.state.isSelected == 0 &&
                        <View>
                            <Text style={{
                                marginTop: 5,
                                width: '95%', alignSelf: 'center',
                                fontSize: 20,
                                fontFamily: 'EurostileBold',
                                color: APP_YELLOW
                            }}>Services</Text>

                            {this.state.serviceplan.length == 0 || this.state.serviceplan == null ?
                                <View style={{
                                    width: '95%',
                                    height: '100%',
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
                                        No services found, Please visit your latest detailer to get detailing!
                        </Text>
                                </View> :
                                <FlatList style={{
                                    marginTop: 5,
                                    marginBottom: 20
                                }}
                                    refreshControl={<RefreshControl
                                        tintColor={APP_YELLOW}
                                        colors={["#D65050", "#D65050"]}
                                        refreshing={this.state.isFetching}
                                        onRefresh={this.onRefresh}>
                                    </RefreshControl>}
                                    data={this.state.serviceplan}
                                    renderItem={({ item, index }) => (
                                        this.Service(item, index)
                                    )}
                                ></FlatList>}
                        </View>}
                    {this.state.isSelected == 1 &&
                        <View>
                            <Text style={{
                                marginTop: 5,
                                width: '95%', alignSelf: 'center',
                                fontSize: 20,
                                fontFamily: 'EurostileBold',
                                color: APP_YELLOW
                            }}>Products</Text>
                            {this.state.products.length == 0 || this.state.products == null ?
                                <View style={{
                                    width: '95%',
                                    height: '100%',
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
                                        No products found, Please visit your latest detailer to get detailing!
                        </Text>
                                </View> :

                                <FlatList style={{
                                    // marginTop: 5,
                                    marginBottom: 20
                                }}
                                    refreshControl={<RefreshControl
                                        tintColor={APP_YELLOW}
                                        colors={["#D65050", "#D65050"]}
                                        refreshing={this.state.isFetching}
                                        onRefresh={this.onRefresh}>
                                    </RefreshControl>}
                                    data={this.state.products}
                                    renderItem={({ item, index }) => (
                                        this.Products(item, index)
                                    )}
                                ></FlatList>
                            }
                        </View>}

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
                            color={APP_YELLOW}
                        >
                        </ActivityIndicator>
                    </View>
                }

                {/* /</ScrollView> */}
            </ImageBackground>
        );
    }
    Service = (item, index) => {
        return (
            <TouchableOpacity style={{
                width: '95%',
                alignSelf: 'center',
                // borderColor: APP_YELLOW,
                // borderWidth: 3,
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

                    {/* <Text style={{
                        fontSize: 17,
                        fontFamily: 'EurostileBold',
                        color: '#C0C0C0'
                    }}
                    >{item.name.toUpperCase()}</Text> */}
                      <View style={{
                        //height:40,
                        marginTop: 10,
                        
                        flexDirection: 'row',

                        width: '100%'
                    }}>
                        <Text style={{
                            fontSize: 20,
                            //width:'55%',
                            fontFamily: 'EurostileBold',

                            color: APP_YELLOW
                        }}
                            numberOfLines={0}>
                            {item.name.toUpperCase()}</Text>
                        <Text style={{
                            marginTop: 5,
                            position: 'absolute',
                            right: 0,
                            fontFamily: Platform.OS === 'ios' ? 'EuroStyle' : 'EuroStyle Normal',
                            fontSize: 17,
                            marginBottom: 5,
                            color: '#C0C0C0',

                        }}>
                            {moment(item.created_at).format('DD-MM-YYYY')}</Text>
                    </View>
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
                        color: 'black',
                        fontFamily: 'EurostileBold',
                    }}>Service details</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }
    Products = (item, index) => {
        return (
            <TouchableOpacity style={{
                marginTop: 5,
                marginBottom: 5,
                width: '95%',
                //borderRadius: 10,
                alignSelf: 'center',
                overflow: 'hidden'
            }}
                onPress={() => {
                    this.props.navigation.navigate('ProductDetail', {
                        data: item
                    })
                }}>
                <View style={{ flexDirection: 'column' }}>
                    <ImageLoad style={{
                        height: Dimensions.get('window').height / 4,
                        width: '100%',
                    }}
                        resizeMode='cover'
                        source={item.image == null || item.image == 0 ?
                            require('../assets/placeholder.jpg') :
                            { uri: item.image }}>
                    </ImageLoad>
                    <View style={{
                        marginLeft: 5,
                        marginTop: 10
                    }}>
                        <View style={{
                        //height:40,
                        marginTop: 10,
                      
                        flexDirection: 'row',

                       
                    }}>
                        <Text style={{
                            fontSize: 18,
                            width:'55%',
                            fontFamily: 'EurostileBold',
                            color: '#C0C0C0'
                        }}>
                            {item.name.toUpperCase()}
                        </Text>
                        <Text style={{
                            marginTop: 5,
                            position: 'absolute',
                            right: 0,
                            fontFamily: Platform.OS === 'ios' ? 'EuroStyle' : 'EuroStyle Normal',
                            fontSize: 17,
                            marginBottom: 5,
                            color: '#C0C0C0',

                        }}>
                            {moment(item.created_at).format('DD-MM-YYYY')}</Text>
                    </View>
                        <Text style={{
                            marginTop: 10,
                            fontSize: 17,
                            color: '#C0C0C0',
                            fontFamily: 'EurostileBold',
                        }}
                        numberOfLines={2}>{item.description}</Text>
                        <Text style={{
                            fontSize: 17,
                            marginTop: 5,
                            color: APP_YELLOW,
                            fontFamily: 'EurostileBold'
                        }}
                            onPress={() => Linking.openURL(item.video_link)}> {item.video_link}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity style={{
                    height: 30,
                    width: '30%',
                    marginTop:item.video_link == null ? 0 :5,
                    borderRadius: 5,
                    marginBottom: 10,
                    alignSelf: 'flex-end',
                    marginRight: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: APP_YELLOW
                }}
                    onPress={() => {
                        this.props.navigation.navigate('ProductDetail', {
                            data: item
                        })
                    }}>
                    <Text style={{
                        color: 'black',
                        fontFamily: 'EurostileBold',
                    }}>Product details</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }

}