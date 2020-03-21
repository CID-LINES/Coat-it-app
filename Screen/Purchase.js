import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, SectionList } from 'react-native';
import { APP_YELLOW, APP_BLUE, } from '../Component/colors'




// const DATA = [
//     {
//         title: 'Current Orders',
//         data: ['Pizza', 'Burger', 'Risotto'],
//     },
//     // {
//     //     title: 'Past Orders',
//     //     data: ['Pizza', 'Burger', 'Risotto'],
//     // },

// ];
export default class Purchase extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orders: [{
                title: 'Current Purchase',
                data: ['Pizza', 'Burger', 'Risotto']
            },
            {
                title: 'Past Purchase',
                data: ['Pizza', 'Burger', 'Risotto'],
            }]
        }
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAvoidingView style={{ flex: 1 }}
                    behavior='padding' enabled>
                    <View style={{
                        height: 40, width: '95%',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        alignSelf: 'center',
                    }}>
                        <TouchableOpacity style={{
                            height: 35, width: 35,
                            alignItems: 'center', justifyContent: 'center',
                            position: 'absolute', left: 5


                        }}
                            onPress={() => {
                                this.props.navigation.goBack()
                            }}>
                            <Image style={{ height: 25, width: 25, tintColor: APP_BLUE }}
                                resizeMode='contain'
                                source={require('../assets/back.png')}></Image>

                        </TouchableOpacity>
                        <View style={{
                            height: 35,
                            alignItems: 'center', justifyContent: 'center',

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
                    {/* </ScrollView> */}
                </KeyboardAvoidingView>

            </SafeAreaView>
        );
    }

    MyPurchase = () => {
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
                source={require('../assets/placeholder.jpg')}>

                </Image>
                <View  style={{marginLeft:15,marginTop:20}}>
                <Text style={{fontSize:17,
                    fontWeight:'700'}}>
                        Product name
                    </Text>
                    <Text style={{marginTop:10}}>20/03/2020</Text>
                </View>
                </View>

            </View>
        )
    }
}



