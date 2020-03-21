import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { APP_YELLOW, APP_BLUE, } from '../Component/colors'

export default class Settings extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
               
                     <View style={{
                        height: 40, width: '95%',
                        justifyContent: 'center',
                        flexDirection:'row',
                        alignSelf: 'center',
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
                            }}>Settings</Text>
                        </View>
                    </View>
            
                <View style={{flex:1}}>
                   
                     
                </View>
                
            </SafeAreaView>
        );
    }
}



