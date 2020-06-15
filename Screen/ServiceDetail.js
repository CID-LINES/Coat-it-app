import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, AsyncStorage, ActivityIndicator, Dimensions, ImageBackground } from 'react-native';
import { APP_YELLOW, APP_BLUE, } from '../Component/colors'
import ImageLoad from 'react-native-image-placeholder';
export default class ServiceDeatil extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: '',
            data: props.navigation.state.params.plan
        }
        // console.log(JSON.stringify(this.state.data))
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
                    //this.DetailerListApi()
                })
            }
        } catch (error) {

        }
    }


    BuyPlanApi = () => {
        this.setState({
            isLoading: true
        })
        let body = new FormData();
        var photo = {
            uri: this.state.data.image,
            type: 'image/jpeg',
            name: 'photo.jpg',
        };
        // alert(this.state.brewery_id)
        body.append('image', photo);
        body.append('title', this.state.data.title)
        body.append('description', this.state.data.description)
        body.append('user_id', '' + this.state.user_id)
        body.append('plan_id', '' + this.state.data.id)


        fetch('http://3.137.41.50/coatit/public/api/add_plan',

            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    //  'Content-Type': 'application/json'
                },
                body: body
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.response)
                if (responseJson.response.status == true) {

                    this.props.navigation.goBack()

                }
                this.setState({
                    isLoading: false

                })
            })
            .catch((error) => {
                console.error(message);
                //  alert(error)
                //  callback({ data: error });
                //callback({error: true, data: error});
            });
    }




    render() {
        return (
            // <SafeAreaView style={{ flex: 1, }}>
                <ImageBackground style={{ flex: 1, }}
                    resizeMode='stretch'
                    source={require('../assets/bg.png')}>
                    <View style={{
                        height: 45,
                        width: '95%',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        alignSelf: 'center',
                        alignItems: 'center',
                        marginTop:Platform.OS==='ios'?25:7

                    }}>
                        <TouchableOpacity style={{
                            //  height: 35, 
                            width: 35,
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'absolute',
                            left: 5

                        }}
                            onPress={() => {
                                this.props.navigation.goBack()
                            }}>
                            <Image style={{ height: 20, width: 20, tintColor: APP_YELLOW }}
                                resizeMode='contain'
                                source={require('../assets/back.png')}></Image>

                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            //height: 35, 
                            width: '80%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: 15

                        }} onPress={() => {
                            this.props.navigation.goBack()
                        }}>
                            <Text style={{
                                fontSize: 18,

                                color: APP_YELLOW,
                                fontFamily: 'EurostileBold',

                            }}
                                numberOfLines={0}>{this.state.data.name}</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={{ flex: 1 }}>
                        <View style={{
                            flex: 1,
                        }}
                        >
                            <View style={{
                                height: Dimensions.get('window').height / 3,
                                width: '100%', justifyContent: 'center',
                                alignItems: 'center'
                                // backgroundColor:'pink'
                            }}>
                                <TouchableOpacity style={{
                                    flex: 1,
                                    width: '95%',
                                    borderRadius: 10,
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden'
                                }}
                                    onPress={() => {
                                        this.setState({
                                            isShow: true
                                        })
                                    }}>
                                    <ImageLoad style={{
                                        //height: 200,
                                        flex: 1
                                    }}
                                        resizeMode='stretch'
                                        source={this.state.data.image == null ?
                                            require('../assets/placeholder.jpg') :
                                            { uri: this.state.data.image }
                                        }>

                                    </ImageLoad>
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                marginLeft: 10,
                                marginRight: 10,
                                marginTop: 10,
                                width: '90%',
                                alignSelf: 'center'
                            }}>
                                <Text style={{
                                    fontSize: 20,
                                    color: '#C0C0C0',
                                    textAlign: 'justify',
                                    fontFamily: 'EurostileBold',

                                }}>
                                    {this.state.data.title}</Text>
                                <Text style={{
                                    fontSize: 18,
                                    marginBottom: 10,
                                    color: '#C0C0C0',
                                    marginTop: 10,
                                    textAlign: 'justify',
                                    fontFamily: Platform.OS === 'ios' ? 'EuroStyle' : 'EuroStyle Normal',

                                }}
                                    numberOfLines={0}>

                                    {this.state.data.description}

                                </Text>
                            </View>
                            {/* 
                    <TouchableOpacity style={{
                        height: 45, width: '60%',
                        alignSelf: 'center', alignItems: 'center',
                        justifyContent: 'center', marginTop: 20,
                        borderRadius: 10,
                        backgroundColor: APP_YELLOW
                    }}
                        onPress={() => {
                            this.BuyPlanApi()
                           // this.props.navigation.navigate('Payment')
                        }}>
                        <Text style={{
                            fontSize: 18, fontWeight: '800',

                            color: 'white'
                        }}>Buy</Text></TouchableOpacity> */}

                        </View>
                    </ScrollView>
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

                                isShow: false
                            })
                        }}>
                            <View style={{
                                height: Dimensions.get('window').height / 2,
                                width: '100%'
                            }}
                            >
                                <ImageLoad style={{ flex: 1 }}
                                    resizeMode=
                                    'stretch'
                                    source={{
                                        uri
                                            : this.state.data.image
                                    }}></ImageLoad>
                            </View>

                        </TouchableOpacity>
                    }
                </ImageBackground>
            // </SafeAreaView>

        );
    }
}



