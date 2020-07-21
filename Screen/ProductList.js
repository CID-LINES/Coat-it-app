import React, { Component } from 'react';
import {
    Text,
    View, SafeAreaView, Image, TextInput, ScrollView,
    TouchableOpacity, KeyboardAvoidingView, AsyncStorage,
    ActivityIndicator, Alert, RefreshControl, Dimensions,
    ImageBackground,
    SectionList
} from 'react-native';
import { APP_YELLOW, APP_BLUE, } from '../Component/colors'
import { FlatList } from 'react-native-gesture-handler';
import { CallGetApi } from '../Component/ApiClient';
import { NavigationActions } from 'react-navigation';
import ImageLoad from 'react-native-image-placeholder';



export default class ProductList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            access_token: '',
            car: '',
            DATA: [],
            orders: [{
                title: 'Captain America',
                data: []
            },
            // {
            //     title: "Rahul",
            //     data: []
            //   },
            ],
            user_id: '',
            id: '',
            isFetching: false
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
            //alert(value)
            if (value != null && value != '') {
                this.setState({
                    user_id: value
                }, () => {
                    this.ProductApi()
                })
            }
        } catch (error) {

        }
    }
    // DetailerListApi = (index) => {
    //     this.setState({
    //         isLoading: true
    //     })

    //     fetch('http://3.137.41.50/coatit/public/api/request_accepted/' + this.state.user_id,
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
    //                 var orders = this.state.orders
    //                 var _order = []
    //                 responseJson.response.details.map((item)=>{
    //                     if(item.first_name != null){
    //                         _order.push(item.first_name)
    //                     }
    //                 })

    //                  orders[0].title= _order.join(',')
    //                        this.setState({
    //                         orders: orders
    //                        })


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
    ProductApi = () => {
        this.setState({
            isLoading: true
        })
        fetch('http://3.137.41.50/coatit/public/api/products_list/' + '' + this.state.user_id,
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
                    var orders = this.state.orders
                    orders[0].data = responseJson.response.products
                    this.setState({
                        orders: orders
                    })
                }
                else {
                    alert(responseJson.response.message)
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
        this.setState({ isFetching: true }, function () { this.ProductApi() });
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
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    alignSelf: 'center',
                    marginTop: Platform.OS === 'ios' ? 25 : 7
                }}>

                    <View style={{
                        height: 35,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Text style={{
                            fontSize: 18,
                            fontFamily: 'EurostileBold',
                            color: APP_YELLOW
                        }}>Products</Text>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    {/* <FlatList style={{
                        flex: 1,
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
                            this.MyCars(item, index)
                        )}>
                    </FlatList> */}

                    <SectionList 
                        sections={this.state.orders}
                        renderItem={({ item, index, section }) =>
                            this.Products(item, index, section)
                        }
                        keyExtractor={(item, index) => item + index}
                        renderSectionHeader={({ section: { title } }) => (
                            <View style={{
                                backgroundColor: 'white',
                                height: 40
                            }}>
                                <View style={{
                                    height: 40,
                                    width: '100%',
                                    justifyContent: 'center',
                                    backgroundColor: APP_YELLOW
                                }}>
                                    <Text style={{
                                        fontSize: 18,
                                        marginLeft: 10,
                                        color: 'black',
                                        fontWeight: 'bold'
                                    }}>{title}</Text>
                                </View>
                            </View>
                        )}
                        stickySectionHeadersEnabled={true}>
                    </SectionList>


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
                        ></ActivityIndicator>
                    </View>
                }
            </ImageBackground>
            // </SafeAreaView>
        );
    }
    Products = (item, index) => {
        return (
            <TouchableOpacity style={{
                marginTop: 5,
                marginBottom: 5,
                width: '95%',
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
                        <Text style={{
                            fontSize: 18,
                            fontFamily: 'EurostileBold',
                            color: '#C0C0C0'
                        }}>
                            {item.name.toUpperCase()}
                        </Text>
                        <Text style={{
                            marginTop: 10,
                            fontSize: 17,
                            color: '#C0C0C0',
                            fontFamily: 'EurostileBold',
                        }}>{item.description}</Text>

                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}



