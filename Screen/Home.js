import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Dimensions } from 'react-native';
import { APP_YELLOW, APP_BLUE, } from '../Component/colors'
import { FlatList } from 'react-native-gesture-handler';


const DATA = [
    {
        title: 'Plan 1',
        description:'This plan for 1 year membership'
    }, {
        title: 'Plan 2',
        description:'This plan for 2 year membership'
    },
    {
        title: 'Plan 3',
        description:'This plan for 3 year membership'
    }, {
        title: 'Plan 4',
        description:'This plan for 4 year membership'
    },
    
]
export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        <View style={{
                            height: 50,
                           
                            width: "95%", alignSelf: 'center',
                            justifyContent: 'center', alignItems: 'center'
                        }}>
                            <Text style={{
                                fontWeight: '800',
                                fontSize: 18,color:APP_BLUE
                            }}>
                                MembershipPlan
                            </Text>
                        </View>
                        <FlatList style={{marginTop:20}}

                            numColumns={2}
                            data={DATA}
                            renderItem={({ item }) => (
                                this.MembershipPlan(item)
                            )}>

                        </FlatList>
                    </View>
                </ScrollView>

            </SafeAreaView>
        );
    }
    MembershipPlan = (item) => {
        return (

            <TouchableOpacity style={{
               // height: 150,
                width: '50%',

                //backgroundColor:'pink',
                //alignSelf:'center',
                justifyContent: 'center'
            }} onPress={() =>{
                this.props.navigation.navigate('ServiceDetail')
            }}>
                <View style={{
                    flex: 1,
                    marginLeft: 5,
                   marginBottom:20,
                    borderRadius: 10,
                    overflow: 'hidden',
                    marginRight: 5,
                    borderColor:APP_BLUE,
                    borderWidth:1
                }} >
                    <Image style={{
                        height: 75,
                        width: '100%'
                    }}
                        resizeMode='cover'
                        source={require('../assets/car-icon.jpg')}></Image>


                    <Text style={{ marginLeft: 10,
                         marginTop: 10 }}>{item.title}</Text>
                    <Text style={{ marginLeft: 10, 
                        marginTop: 10,marginBottom:10 }}
                        numberOfLines={2}>{item.description}</Text>

                </View>



            </TouchableOpacity>


        )
    }
}



