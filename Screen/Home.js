import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Dimensions, ActivityIndicator, AsyncStorage } from 'react-native';
import { APP_YELLOW, APP_BLUE, } from '../Component/colors'
import { FlatList } from 'react-native-gesture-handler';


const DATA = [
    {
        title: 'Plan 1',
        description: 'This plan for 1 year membership'
    }, {
        title: 'Plan 2',
        description: 'This plan for 2 year membership'
    },
    {
        title: 'Plan 3',
        description: 'This plan for 3 year membership'
    }, {
        title: 'Plan 4',
        description: 'This plan for 4 year membership'
    },

]
export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: ''
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
                    this.PlanApi()
                })
            }
        } catch (error) {

        }
    }


    PlanApi = () => {
        this.setState({
            isLoading: true
        })


        fetch('http://3.137.41.50/coatit/public/api/plan/display', 
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
                console.log(JSON.stringify(responseJson))
                if (responseJson.response.status == true) {
                    this.setState({
                        data: responseJson.response.data
                    })
                    // alert('helo')
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
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        <View style={{
                            height: 50,
                            width: "95%",
                            alignSelf: 'center',
                            justifyContent: 'center', alignItems: 'center'
                        }}>
                            <Text style={{
                                fontWeight: '800',
                                fontSize: 18, color: APP_BLUE
                            }}>
                                MembershipPlan
                            </Text>
                        </View>
                        <FlatList style={{ marginTop: 20 }}

                            numColumns={2}
                            data={this.state.data}
                            renderItem={({ item }) => (
                                this.MembershipPlan(item)
                            )}>

                        </FlatList>
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

                                color={APP_BLUE}
                            ></ActivityIndicator>

                        </View>
                    }

            </SafeAreaView>
        );
    }
    MembershipPlan = (item) => {
        var plan ={
            title:item.title,
            description:item.description,
            image:item.image
            }
        return (

            <TouchableOpacity style={{
                // height: 150,
                width: '50%',
                //backgroundColor:'pink',
                //alignSelf:'center',
                justifyContent: 'center'
            }} onPress={() => {
                
                this.props.navigation.navigate('ServiceDetail',{
                  plan:plan
                })
            }}>
                <View style={{
                    flex: 1,
                    marginLeft: 5,
                    marginBottom: 20,
                    borderRadius: 10,
                    overflow: 'hidden',
                    marginRight: 5,
                    borderColor: APP_BLUE,
                    borderWidth: 1
                }} >
                    <Image style={{
                        height: 75,
                        width: '100%'
                    }}
                        resizeMode='cover'
                        source={item.image == null ? 
                            require('../assets/car-icon.jpg'):
                            {uri:item.image}}></Image>


                    <Text style={{
                        marginLeft: 10,
                        marginTop: 10
                    }}>{item.title}</Text>
                    <Text style={{
                        marginLeft: 10,
                        marginTop: 10, marginBottom: 10
                    }}
                        numberOfLines={2}>{item.description}</Text>

                </View>



            </TouchableOpacity>


        )
    }
}



