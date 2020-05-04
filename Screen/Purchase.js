import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, SectionList, ActivityIndicator, AsyncStorage } from 'react-native';
import { APP_YELLOW, APP_BLUE, } from '../Component/colors'
import Moment from 'react-moment';
import moment from 'moment';

export default class Purchase extends Component {
    constructor(props) {
        super(props)
        this.state = {
           
            orders: [{
                title: 'Current Purchase',
                data: []
            },
            {
                title: 'Past Purchase',
                data: [],
            }],
           user_id:''
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
                    this.PurchaseApi()
                })
            }
        } catch (error) {

        }
    }

    PurchaseApi = () => {
        this.setState({
            isLoading: true
        })


        fetch('http://3.137.41.50/coatit/public/api/purchase/order/dhiraj76' ,
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
                console.log(JSON.stringify(responseJson.response))
                if (responseJson.response.status == true) {
                   
                    var order = this.state.orders
                    order[0].data = responseJson.response.current_purchase
                    order[1].data= responseJson.response.past_purchase
                  
                    this.setState({
                        orders:order
                    })
                    
                  
                }
                this.setState({
                    isLoading: false
                })

            })
            .catch((error) => {
                console.error(error);
                //  alert(error)
                //  callback({ data: error });
                //callback({error: true, data: error});
            });

    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                {/* <KeyboardAvoidingView style={{ flex: 1 }}
                    behavior='padding' enabled> */}
                    <View style={{
                        height: 40,
                        width: '95%',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        alignSelf: 'center',
                    }}>
                        <TouchableOpacity style={{
                            height: 35, 
                            width: 35,
                            alignItems: 'center',
                             justifyContent: 'center',
                            position: 'absolute',
                             left: 5
                        }}
                            onPress={() => {
                                this.props.navigation.goBack()
                            }}>
                            <Image style={{ height: 25, width: 25, tintColor: APP_BLUE }}
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
                                color: APP_BLUE
                            }}>My Purchase</Text>
                        </View>
                    </View>
                    {/* <ScrollView style={{ flex: 1 }}> */}
                        <View style={{ flex: 1 }}>

                            <SectionList

                                sections={this.state.orders}
                                renderItem={({ item, index, section }) =>
                                    this.MyPurchase(item, index, section)
                                }
                                keyExtractor={(item, index) => item + index}
                                renderSectionHeader={({ section: { title } }) => (
                                    <View style={{
                                        backgroundColor: 'white',
                                        //marginTop:10,
                                        height: 40
                                    }}>
                                        <View style={{
                                            height: 40,
                                            width: '100%',
                                            justifyContent: 'center',
                                            backgroundColor: APP_BLUE
                                        }}>
                                            <Text style={{
                                                fontSize: 18,
                                                marginLeft: 10,
                                                color: 'white',
                                                fontWeight: 'bold'
                                            }}>{title}</Text>
                                        </View>
                                    </View>
                                )}
                                stickySectionHeadersEnabled={true}
                            >
                            </SectionList>
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

                                color={APP_BLUE}
                            ></ActivityIndicator>

                        </View>
                    }
                    {/* </ScrollView> */}
                {/* </KeyboardAvoidingView> */}

            </SafeAreaView>
        );
    }

    MyPurchase = (item) => {
        return (
            <View style={{
                height: 120,
                marginTop: 5,
                marginBottom:5,
                width: '95%', 
                borderRadius:10,borderColor:APP_BLUE,borderWidth:1,
                alignSelf: 'center', 
                // backgroundColor: 'pink',
                overflow:'hidden'
            }}>
                <View style={{flexDirection:'row'}}>
                <Image style={{height:120,
                width:'40%',}}
            resizeMode='cover'
                source={item.image ==  null ?
                    require('../assets/placeholder.jpg'):
                    {uri:item.image}}>

                </Image>
                <View  style={{marginLeft:15,marginTop:20}}>
               <Text style={{fontSize:17,
                    fontWeight:'700'}}>
                        {/* Product name */}
                        {item.product_name}
                    </Text>
                    <Text style={{marginTop:10}}>
                        {moment.utc(item.created_at).local().format('DD-MM-YYYY hh:mm a')}
                        {/* 20/03/2020 */}
                    </Text>
                </View>
                </View>

            </View>
        )
    }
}





