import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Dimensions, ImageBackground, Platform } from 'react-native';
import { APP_YELLOW, APP_BLUE, } from '../Component/colors'
import ImageLoad from 'react-native-image-placeholder';


export default class NotificationDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: props.navigation.state.params.data
        }
        console.log(JSON.stringify(this.state.data))
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
                        flexDirection: 'row',
                        alignSelf: 'center',
                        alignItems: 'center', 
                        marginTop:Platform.OS==='ios'?25:7
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
                            <Image style={{ height: 20, width: 20, tintColor: APP_YELLOW }}
                                resizeMode='contain'
                                source={require('../assets/back.png')}></Image>

                        </TouchableOpacity>
                        <View style={{
                            height: 35,
                            alignItems: 'center',
                            justifyContent: 'center',

                        }}>
                            <Text style={{
                                fontSize: 18,
                                color: APP_YELLOW, fontFamily: 'EurostileBold',
                            }}>Notifications</Text>
                        </View>
                    </View>

                    <View style={{ flex: 1 }}>
                        <View style={{
                            height: Dimensions.get('window').height / 2.5,
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop:10
                            // backgroundColor:'pink'
                        }}>
                            <TouchableOpacity style={{
                                flex: 1,
                                width: '95%',
                                //borderRadius: 10,
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
                                    flex: 1,
                                    // width:'100%'
                                }}
                                 resizeMode='cover'
                                    source={
                                        { uri: this.state.data.image }}></ImageLoad>
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            marginTop: 10,
                            marginLeft: 10,
                            marginRight: 10,
                            width: '90%',
                            alignSelf: 'center'
                        }}>
                            <Text style={{
                                fontSize: 17,
                                color:APP_YELLOW,
                                fontFamily: 'EurostileBold',
                            }}>
                                {this.state.data.title.toUpperCase()}</Text>
                            <Text style={{
                                fontSize: 20,
                                marginTop: 10,
                                textAlign: 'justify',
                                color:'#C0C0C0',
                                fontFamily: Platform.OS === 'ios' ? 'EuroStyle' : 'EuroStyle Normal',
                            }}
                                numberOfLines={0}>
                                {this.state.data.description}
                            </Text>
                        </View>

                        {/* <TouchableOpacity style={{height:40,width:'50%',
                        alignSelf:'center',alignItems:'center',
                        justifyContent:'center',marginTop:20,
                        borderRadius:20,
                        backgroundColor:APP_BLUE}}
                        onPress={() =>{
                            this.props.navigation.navigate('DetailerList')
                        }}>
                            <Text style={{fontSize:18,fontWeight:'800',

                        color:'white'}}>Buy</Text></TouchableOpacity>
                      */}
                    </View>

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
                                <ImageLoad style={{ flex: 1, width: '100%' }}
                                    resizeMode='stretch'
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



