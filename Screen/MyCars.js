import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, AsyncStorage, ActivityIndicator, Alert, RefreshControl, Dimensions, ImageBackground } from 'react-native';
import { APP_YELLOW, APP_BLUE, } from '../Component/colors'
import { FlatList } from 'react-native-gesture-handler';
import { CallGetApi } from '../Component/ApiClient';
import { NavigationActions } from 'react-navigation';
import ImageLoad from 'react-native-image-placeholder';

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
            user_id: '',

            id: '',
            isFetching:false

        }
    }



    componentDidMount() {
        this.load()
        this.props.navigation.addListener('willFocus', this.load)
    }
    load = () => {
        this.get('user_id')

    }

    async get(key) {
        try {
            const value = await AsyncStorage.getItem(key);
            // alert(value)
            if (value != null && value != '') {
                this.setState({
                    user_id: value
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


        fetch('http://3.137.41.50/coatit/public/api/cardetails/' + this.state.user_id+'',
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(JSON.stringify(responseJson.response))
                if (responseJson.response.status == true) {
                    // this.save('car_id',responseJson.response.carDetails.id +'' )
                    this.setState({
                        car: responseJson.response.carDetails,
                    })

                }
                this.setState({
                    isLoading: false,
                    isFetching:false
                })

            })
            .catch((error) => {
                console.error(error);
                //  alert(error)
                //  callback({ data: error });
                //callback({error: true, data: error});
            });

    }

    DeletecarApi = (id,index) => {
        this.setState({
            isLoading: true
        })
     
        fetch('http://3.137.41.50/coatit/public/api/delete_car/' + ""+id,
            {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(JSON.stringify(responseJson))
                if (responseJson.response.status == true) {
                    var item = this.state.car
                    item.splice(index, 1)
                    this.setState({
                        car: item
                    })
                    alert(responseJson.response.message)
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
    onRefresh=()=> {
        this.setState({ isFetching: true }, function() { this.MycarApi() });    
     }

    render() {
        return (
            // <SafeAreaView style={{ flex: 1 }}>
                 <ImageBackground style={{ flex: 1 ,}}
                 resizeMode='stretch'
                        source={require('../assets/bg.png')}>
                    <View style={{
                        height: 45, 
                        width: '95%',
                        justifyContent: 'center',
                        alignItems:'center',
                        flexDirection: 'row',
                        alignSelf: 'center',
                        marginTop:Platform.OS==='ios'?25:7
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
                            <Image style={{ height: 20, width: 20, tintColor: APP_YELLOW }}
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
                                fontSize: 18, 
                                fontFamily:'EurostileBold',
                                color: APP_YELLOW
                            }}>My Cars</Text>
                        </View>
                    </View>

                    <View style={{ flex: 1 }}>
                        <FlatList style={{ flex: 1, marginTop: 10 ,marginBottom:20}}
                          refreshControl={<RefreshControl 
                            refreshing={this.state.isFetching}
                            onRefresh={this.onRefresh}>
                            </RefreshControl>}
                            data={this.state.car}
                            renderItem={({ item, index }) => (
                                this.MyCars(item, index)
                            )}>
                        </FlatList>
                        <TouchableOpacity style={{
                            height: 60, width: 60,
                            borderRadius: 30,
                            backgroundColor: APP_YELLOW,
                            alignItems: 'center', justifyContent: 'center',
                            position: 'absolute',
                            alignContent: 'flex-end',
                            right: 20,
                            bottom: 40,
                        }}
                            onPress={() => {
                                this.props.navigation.navigate('AddCar')
                            }
                            }>
                            <Image style={{ height: 40, width: 40 }}
                                source={require('../assets/plus-icon.png')}></Image>
                        </TouchableOpacity>

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

                            color={APP_YELLOW}
                        ></ActivityIndicator>

                    </View>
                }
</ImageBackground>
            // </SafeAreaView>
        );
    }
    MyCars = (item, index) => {
      

        return (
            <TouchableOpacity style={{
               // height: 120,
                marginTop: 5,
                marginBottom: 5,
                width: '95%',
                borderRadius: 10, borderColor: APP_YELLOW, borderWidth: 3,
                alignSelf: 'center',
                // backgroundColor: 'pink',
                overflow: 'hidden'
            }}
                onPress={() => {

                    this.props.navigation.navigate('EditCarDetail', {
                        data: item
                    })
                }}
            >
                <View style={{ flexDirection: 'row' }}>
                   
                    <ImageLoad style={{
                        //height: 120,
                       
                        width: Dimensions.get('window').width/2,
                    }}
                        resizeMode='cover'
                        source={item.image == null || item.image == 0 ?
                            require('../assets/placeholder.jpg'):
                            { uri: item.image }}>
                    </ImageLoad>
                    <View style={{ 
                        marginLeft:20, 
                        marginTop:10,
                        // alignItems:'center',
                        // justifyContent:'center'
                        }}>
                        {/* <Text style={{
                            fontSize: 17,
                            fontWeight: '700'
                        }}>
                            {item.brand_name} {item.model_name}
                        </Text> */}
                        <Text style={{
                            fontSize: 18,
                           
                       marginTop:10,
                       fontFamily:'EurostileBold',
                       color:'white'
                        }}>
                            {item.vehicle_no}
                        </Text>
                        <Text style={{ 
                            marginTop: 10,
                            fontSize:17,
                            color:'white',
                            fontFamily:'EurostileBold', }}>{item.manufacture_year}</Text>
                        <TouchableOpacity style={{
                            height: 30,
                            width: 30,
                            marginTop:10,
                            marginBottom:5,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                            onPress={() => {
                                Alert.alert(
                                    'Remove item',
                                    'Are you sure you want to remove this car?',
                                    [
                                        {
                                            text: 'Remove', onPress: () => {
                                                this.DeletecarApi(item.id, index)
                                            }
                                        },
                                        {
                                            text: 'Cancel',
                                            style: 'cancel',
                                        }],
                                    { cancelable: false },
                                );
                            }} >
                            <Image style={{
                                height: 24,
                                width: 24,
                                tintColor: 'gray'
                            }}
                                source={require('../assets/delete-icon.png')}></Image>
                        </TouchableOpacity>

                    </View>
                </View>

            </TouchableOpacity>
        )
    }
}



