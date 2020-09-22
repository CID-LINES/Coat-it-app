import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, SectionList, Alert, AsyncStorage, ActivityIndicator, StatusBar, RefreshControl, Dimensions, Platform, ImageBackground, Linking, } from 'react-native';
import { APP_YELLOW, APP_BLUE, } from '../Component/colors'
import { FlatList } from 'react-native-gesture-handler';
import moment from 'moment';
import ImageLoad from 'react-native-image-placeholder';
import firebase from 'react-native-firebase';


export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: '',
            searchText: '',
            filteredData: [],
            isFetching: false,
            DATA: [],
            car: '',
            isHide: false,
            plan: '',
            previewurl: null,

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
                    this.FavouriteProductApi()
                })
            }
        } catch (error) {

        }
    }

    FavouriteProductApi = () => {
        this.setState({
            isLoading: true
        })
        fetch('http://18.156.66.145/public/api/favourite_productsList/' + '' + this.state.user_id,
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
                        DATA: responseJson.response.productsList,
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
        this.setState({ isFetching: true }, function () { this.FavouriteProductApi() });
    }

    render() {
        return (

            <ImageBackground style={{ flex: 1, }}
                resizeMode='stretch'
                source={require('../assets/bg.png')}>
                <StatusBar barStyle="light-content" />
                <View style={{
                    height: 45,
                    width: '95%',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignSelf: 'center',
                    marginTop: Platform.OS === 'ios' ? 25 : 7
                }}>
                    <TouchableOpacity style={{
                        height: 35,
                        width: 35,
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute', left: 5

                    }}
                        onPress={() => {
                            this.props.navigation.goBack()
                        }}>
                        <Image style={{
                            height: 20,
                            width: 20,
                            tintColor: APP_YELLOW
                        }}
                            resizeMode='contain'
                            source={require('../assets/back.png')}></Image>

                    </TouchableOpacity>
                    <View style={{
                        height: 35,
                        alignItems: 'center',
                        justifyContent: 'center',

                    }}>
                        <Text style={{
                            fontSize: 20,
                            color: APP_YELLOW,
                            fontFamily: 'EurostileBold',
                        }}>Favourite Products</Text>
                    </View>
                </View>


                <View style={{ flex: 1 }}>
                    <FlatList style={{ marginTop: 10 }}
                        refreshControl={<RefreshControl
                            tintColor={APP_YELLOW}
                            colors={["#D65050", "#D65050"]}
                            refreshing={this.state.isFetching}
                            onRefresh={this.onRefresh}>
                        </RefreshControl>}
                        data={this.state.DATA}
                        renderItem={({ item, index }) =>
                            (
                                this.Products(item, index)
                            )}
                        keyExtractor={index => index}>
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
                    <View>

                        <ImageLoad style={{
                            height: Dimensions.get('window').height / 4,
                            width: '100%',
                        }}
                            resizeMode='cover'
                            source={item.image == null || item.image == 0 ?
                                require('../assets/placeholder.jpg') :
                                { uri: item.image }}>

                        </ImageLoad>

                    </View>
                    <View style={{
                        marginLeft: 5,
                        marginTop: 10,

                    }}>

                        <Text style={{
                            fontSize: 18,
                            fontFamily: 'EurostileBold',
                            color: '#C0C0C0'
                        }}>
                            {item.name.toUpperCase()}
                        </Text>
                        {/* <Text style={{
                            marginTop: 10,
                            fontSize: 17,
                            color: '#C0C0C0',
                            fontFamily: 'EurostileBold',
                        }}>{item.description}</Text> */}
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

            </TouchableOpacity>
        )
    }
}





