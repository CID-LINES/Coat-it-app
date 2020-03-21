import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, SectionList } from 'react-native';
import { APP_YELLOW, APP_BLUE, } from '../Component/colors'
import { FlatList } from 'react-native-gesture-handler';




const DATA = [
    {
        title: 'Current Orders',
        // data: ['Pizza', 'Burger', 'Risotto'],
    },
    {
        title: 'Past Orders',
       
    },

];
export default class Purchase extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
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
                            }}>Detailer List</Text>
                        </View>
                    </View>
                    {/* <ScrollView style={{ flex: 1 }}> */}
                        <View style={{ flex: 1 }}>

                            <FlatList style={{marginTop:20}}
                            data={DATA}
                            renderItem={({item})=>(
                                this.DetailerList(item)
                            )}></FlatList>
                        </View>
                    {/* </ScrollView> */}
                </KeyboardAvoidingView>

            </SafeAreaView>
        );
    }

   DetailerList = (item) => {
        return (
            <TouchableOpacity style={{
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
                    Jaspreet Singh
                    </Text>
                    <Text style={{marginTop:10}}>Sirhind</Text>

                    <Text style={{marginTop:10}}>10 km</Text>
                </View>
                </View>

            </TouchableOpacity>
        )
    }
}





