import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, AsyncStorage, ActivityIndicator } from 'react-native';
import { APP_YELLOW, APP_BLUE, } from '../Component/colors'
import { FlatList } from 'react-native-gesture-handler';
import { CallGetApi } from '../Component/ApiClient';


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
            access_token: '',
            car: '',
            car_id: ''
        }
    }



    componentDidMount() {

        this.get('car_id')
    }

    async get(key) {
        try {
            const value = await AsyncStorage.getItem(key);
            alert(value)
            if (value != null && value != '') {
                this.setState({
                    car_id: value
                }, () => {
                    this.MycarApi()
                })
            }
        } catch (error) {

        }
    }


    MycarApi = () => {
        this.setState({
            isLoading: true
        })

      
        fetch('http://3.137.41.50/coatit/public/api/cardetails/'+this.state.car_id, 
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
            console.log(JSON.stringify(responseJson.response.carDetails))
              if(responseJson.response.status == true){
                  this.setState({
                      car: responseJson.response.carDetails
                  })
                //alert('helo')
              }
            this.setState({
                isLoading:false
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

                        <FlatList style={{ flex: 1, marginTop: 10 }}
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
                            position: 'absolute',
                            alignContent: 'flex-end',
                            right: 20,
                            bottom: 30,
                        }}
                            onPress={() => {
                                this.props.navigation.navigate('AddCar')
                            }
                            }>
                            <Image style={{ height: 40, width: 40 }}
                                source={require('../assets/plus-icon.png')}></Image>
                        </TouchableOpacity>

                    </View>


                </KeyboardAvoidingView>

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
                onPress={() => {
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



