import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { APP_YELLOW, APP_BLUE, } from '../Component/colors'

export default class NotificationDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data:props.navigation.state.params.data
        }
        console.log(JSON.stringify(this.state.data))
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
               
                     <View style={{
                        height: 40, width: '95%',
                        justifyContent: 'center',
                        flexDirection:'row',
                        alignSelf: 'center',
                        alignItems:'center',marginTop:10
                    }}> 
                        <TouchableOpacity style={{
                            height: 35, width: 35,
                            alignItems: 'center', 
                            justifyContent: 'center',
                            position: 'absolute', left: 5

                        }}
                            onPress={() => {
                                this.props.navigation.goBack()
                            }}>
                            <Image style={{ height: 25, width: 25, tintColor: APP_YELLOW }}
                                resizeMode='contain'
                                source={require('../assets/back.png')}></Image>

                        </TouchableOpacity>
                        <View style={{
                            height: 35,
                            alignItems:'center', 
                            justifyContent:'center',

                        }}>
                            <Text style={{
                                fontSize: 18, fontWeight: '700',
                                color: APP_YELLOW
                            }}>Notifications</Text>
                        </View>
                    </View>
            
                <View style={{flex:1}}>
                   <View style={{height:250,
                        width:'100%',
                        justifyContent:'center',
                        alignItems:'center'
                        // backgroundColor:'pink'
                        }}>
                            <TouchableOpacity style={{
                                height:250,
                            width:'95%',
                           
                            borderRadius:10,
                            alignSelf:'center',
                            
                            justifyContent:'center',overflow:'hidden'}}>
                            <Image style={{height:250,flex:1}}
                            resizeMode='cover'
                            source={this.state.data.image == null? 
                            require('../assets/placeholder.jpg'):
                                {uri:this.state.data.image}}></Image>
                            </TouchableOpacity>
                        </View>
                                <View style={{
                                    marginTop:10,
                                marginLeft:10,marginRight:10,
                                width:'90%',alignSelf:'center'}}>
                        <Text style={{fontSize:17,
                        fontWeight:'bold'
                            }}>
                            {this.state.data.title}</Text>
                            <Text style={{fontSize:17,
                            
                            marginTop:10,textAlign:'justify',
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
                
            </SafeAreaView>
        );
    }
}



