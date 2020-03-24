import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { APP_YELLOW, APP_BLUE, } from '../Component/colors'
import { FlatList } from 'react-native-gesture-handler';


const DATA = [
    {
        title: 'Swift',
        // image:require('../assets/car')
    }, {
        title: 'Swift',
        // image:require('../assets/car')
    }, {
        title: 'Swift',
        // image:require('../assets/car')
    }
]

export default class MyCars extends Component {
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
                            }}>My Cars</Text>
                        </View>
                    </View>
                   
                        <View style={{ flex: 1 }}>

                            <FlatList style={{flex:1,marginTop:10}}
                                data={DATA}
                                renderItem={({ item, index }) => (
                                    this.MyCars(item, index)
                                )}>

                            </FlatList>
                            <TouchableOpacity style={{
                                height: 60, width: 60,
                                borderRadius: 30, 
                                backgroundColor: APP_BLUE,
                                alignItems: 'center', justifyContent: 'center',
                                position:'absolute',
                                alignContent:'flex-end',
                                right:20,
                                bottom:30,
                            }}
                            onPress={() => {
                                this.props.navigation.navigate('AddCar')}
                                }>
                                <Image style={{ height: 40, width: 40 }}
                                    source={require('../assets/plus-icon.png')}></Image>
                            </TouchableOpacity>
                           
                        </View>
                       
                  
                </KeyboardAvoidingView>

            </SafeAreaView>
        );
    }
    MyCars = (item) => {
        return (
            <TouchableOpacity style={{
                height: 120,
                marginTop: 5,
                marginBottom: 5,
                width: '95%',
                borderRadius: 10, borderColor: APP_BLUE, borderWidth: 1,
                alignSelf: 'center',
                // backgroundColor: 'pink',
                overflow: 'hidden'
            }}
            onPress={() =>{
                this.props.navigation.navigate('EditCarDetail')
            }}
            >
                <View style={{ flexDirection: 'row' }}>
                    <Image style={{
                        height: 120,
                        width: '40%',
                    }}
                        resizeMode='cover'
                        source={require('../assets/car-icon.jpg')}>

                    </Image>
                    <View style={{ marginLeft: 15, marginTop: 20 }}>
                        <Text style={{
                            fontSize: 17,
                            fontWeight: '700'
                        }}>
                            {item.title}
                        </Text>
                        <Text style={{ marginTop: 10 }}>20/03/2020</Text>
                    </View>
                </View>

            </TouchableOpacity>
        )
    }
}



