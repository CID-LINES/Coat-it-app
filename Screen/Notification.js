import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { APP_BLUE } from '../Component/colors'
import { FlatList } from 'react-native-gesture-handler';

const DATA=[
{
    title:'first'
},{
    title:'first'
},{
    title:'first'
}
]


export default class Notification extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            phone: '',
            firstname: '',
            lastname: ''
        }
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1,backgroundColor:'white' }}>
                <KeyboardAvoidingView style={{ flex: 1 }}
                    behavior='padding' enabled>
                    <ScrollView style={{ flex: 1 }}>

                        <View style={{ flex: 1 }}>
                            <View style={{
                                alignSelf: 'center',
                                alignItems: 'center', justifyContent: 'center',
                                height: 50, width: '100%'
                            }}>
                                <Text style={{fontSize:18,
                                fontWeight:'bold',
                                color:APP_BLUE}}>Notification</Text>
                            </View>


                                    <FlatList style={{marginTop:20}}
                                    data={DATA}
                                    renderItem={({item}) =>(
                                        this.Notification(item)
                                    )}></FlatList>

                        </View>

                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }

    Notification=(item)=>{
        return(
            <View>
            <TouchableOpacity style={{
            width:'100%',alignSelf:'center',
            justifyContent:'center',
            alignItems:'center',
            flexDirection:'row',
            marginBottom:10
           
            }} onPress={() =>{
                this.props.navigation.navigate('NotificationDetail')
            }}>
                <Image style={{height:60,width:60,
               // marginLeft:10,
                    borderRadius:30}}
                    source={require('../assets/placeholder.jpg')}>
                    </Image>
                    <View style={{width:'70%',marginLeft:10}}> 
                  
                    <Text style={{fontSize:17,fontWeight:'600'}}>
                        Car Cleanner
                    </Text>
                    <Text style={{fontSize:16,
                    marginTop:3,
                    color:'gray'}}>
                       5 hours ago
                    </Text>
                  
                    <Text style={{fontSize:17,fontWeight:'400',
                    marginTop:3}}
                    numberOfLines={2}>
                        This is a new product added by jaspreet singh.
                    </Text>
                    
                    </View>
                 
            </TouchableOpacity>
            <View style={{height:1,width:'100%',
            marginBottom:5,
        backgroundColor:'gray'}}></View>
            </View>
           
        )
        
    }
}



