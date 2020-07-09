import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, AsyncStorage, ActivityIndicator, Dimensions, ImageBackground } from 'react-native';
import { APP_YELLOW, APP_BLUE, } from '../Component/colors'
import ImageLoad from 'react-native-image-placeholder';
export default class ServiceDeatil extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: '',
            data: props.navigation.state.params.plan,
            serviceplan: '',
            car: props.navigation.state.params.car,
            cardetail: "",
            detailer: props.navigation.state.params.detailer,
        }
    }

    componentDidMount() {
        this.PlanApi()
    }
    PlanApi = () => {
        this.setState({
            isLoading: true
        })
        fetch('http://3.137.41.50/coatit/public/api/plan/display/' + this.state.data,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(JSON.stringify(responseJson))
                if (responseJson.response.status == true) {
                    this.setState({
                        serviceplan: responseJson.response.data,
                    })
                }
                this.setState({
                    isLoading: false,
                    isFetching: false
                })
            })
            .catch((error) => {
                console.error(error);
                //  alert(error)
                //  callback({ data: error });
                //callback({error: true, data: error});
            });
    }

            CarDetailApi = (car_name, index) => {
        this.setState({
            isLoading: true
        })

        fetch('http://3.137.41.50/coatit/public/api/cardetail/' + this.state.car,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(JSON.stringify(responseJson))
                if (responseJson.response.status == true) {
                    this.setState({
                        cardetail: responseJson.response.carDetails,
                        isShow: true
                    })
                }
                else {
                    alert(responseJson.response.message)
                }
                this.setState({
                    isLoading: false,
                    isFetching: false
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
            // <SafeAreaView style={{ flex: 1, }}>
            <ImageBackground style={{ flex: 1, }}
                source={require('../assets/bg.png')}>
                <View style={{
                    height: 45,
                    width: '95%',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginTop: Platform.OS === 'ios' ? 25 : 7
                }}>
                    <TouchableOpacity style={{
                        // height: 35,
                        width: 35,
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        left: 5
                    }}
                        onPress={() => {
                            this.props.navigation.goBack()
                        }}>
                        <Image style={{
                            height: 25,
                            width: 25,
                            tintColor: APP_YELLOW
                        }}
                            resizeMode='contain'
                            source={require('../assets/back.png')}>
                            </Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        width: '80%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 15
                    }}
                        onPress={() => {
                            this.props.navigation.goBack()
                        }}>
                        <Text style={{
                            fontSize: 18,
                            color: APP_YELLOW,
                            fontFamily: 'EurostileBold',
                        }}
                            numberOfLines={0}>{this.state.serviceplan.name}
                            </Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        <View style={{
                            height: Dimensions.get('window').height / 3,
                            marginTop: 10,
                            width: '100%',
                            justifyContent:'center',
                            alignItems:'center'
                        }}>
                            <TouchableOpacity style={{
                                flex: 1,
                                width: '95%',
                                borderRadius: 10,
                                alignSelf: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden'
                            }}>
                                <ImageLoad style={{ flex: 1 }}
                                    resizeMode='stretch'
                                    source={this.state.serviceplan.image == null ?
                                        require('../assets/placeholder.jpg') :
                                        { uri: this.state.serviceplan.image }
                                    }>
                                </ImageLoad>
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            marginLeft: 10,
                            marginRight: 10,
                            width: '90%',
                            alignSelf: 'center'
                        }}>
                            <Text style={{
                                fontSize: 17,
                                fontFamily: 'EurostileBold',
                                color: '#C0C0C0'
                            }}>
                                {this.state.serviceplan.title}</Text>
                            <Text style={{
                                fontSize: 19,
                                marginBottom: 10,
                                marginTop: 10,
                                textAlign: 'justify',
                                color: '#C0C0C0',
                                fontFamily: Platform.OS === 'ios' ? 'EuroStyle' : 'EuroStyle Normal',
                            }}
                                numberOfLines={0}>
                                {this.state.serviceplan.description}
                            </Text>
                        </View>
                        <TouchableOpacity style={{
                            height: 45,
                            width: '60%',
                            alignSelf: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 20,
                            borderRadius: 10,
                            backgroundColor: APP_YELLOW
                        }}
                            onPress={() => {
                                this.CarDetailApi()
                            }}>
                            <Text style={{
                                fontSize: 20,
                                fontFamily: 'EurostileBold',
                                color: 'black'
                            }}>View Car</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            height: 45,
                            width: '60%',
                            alignSelf: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 10,
                            borderRadius: 10,
                            marginBottom: 10,
                            backgroundColor: APP_YELLOW
                        }}
                            onPress={() => {
                                this.setState({
                                    isHide: true
                                })
                            }}>
                            <Text style={{
                                fontSize: 20,
                                fontFamily: 'EurostileBold',
                                color: 'black'
                            }}>View Detailer</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                {this.state.isHide &&
                    <TouchableOpacity style={{
                        position: 'absolute',
                        backgroundColor: '#000000aa',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                        onPress={() => {
                            this.setState({
                                isHide: false
                            })
                        }}>
                        <TouchableOpacity style={{
                            height: Dimensions.get('window').height / 2.5,
                            width: '90%',
                            borderRadius: 10,
                            overflow: 'hidden',
                            // borderColor: APP_YELLOW,
                            // borderWidth: 2
                        }}
                            onPress={() => {
                                this.setState({
                                    isHide: false
                                })
                            }}>
                            <ImageBackground style={{ flex: 1 }}
                                resizeMode='stretch'
                                source={require('../assets/bg.png')}>
                                <ImageLoad style={{
                                    height: Dimensions.get('window').height / 3,
                                    width: '100%'
                                }}
                                    resizeMode='stretch'
                                    source={{ uri: this.state.detailer.avatar }}>
                                </ImageLoad>
                                <View style={{
                                    marginTop: 10,
                                    width: '95%',
                                    alignSelf: 'center',
                                    // alignItems: 'center',
                                    // justifyContent: 'center'
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignSelf: 'center',
                                        justifyContent: 'center',
                                        width: '60%',
                                    }}>
                                        <Text style={{
                                            fontSize: 18,
                                            color: APP_YELLOW,
                                            fontFamily: 'EurostileBold'
                                        }}>Name</Text>
                                        <Text style={{
                                            fontSize: 17,
                                            marginLeft: 20,
                                            marginBottom: 10,
                                            color: '#C0C0C0',
                                            fontFamily: 'EurostileBold'
                                        }}>{this.state.detailer.first_name}</Text>
                                    </View>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    </TouchableOpacity>
                }
                {this.state.isShow &&
                    <TouchableOpacity style={{
                        position: 'absolute',
                        backgroundColor: '#000000aa',
                        top: 0,
                        bottom: 0,
                        left: 0, 
                        right: 0,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                        onPress={() => {
                            this.setState({
                                isShow: false
                            })
                        }}>
                        <TouchableOpacity style={{
                            height: Dimensions.get('window').height / 2,
                            width: '90%',
                            borderRadius: 10,
                            overflow: 'hidden',
                            // borderColor: APP_YELLOW,
                            // borderWidth: 2
                        }}
                            onPress={() => {
                                this.setState({
                                    isShow: false
                                })
                            }}>
                            <ImageBackground style={{ flex: 1 }}
                                resizeMode='stretch'
                                source={require('../assets/bg.png')}>
                                <ImageLoad style={{
                                    height: Dimensions.get('window').height / 3,
                                    width: '100%'
                                }}
                                    resizeMode='stretch'
                                    source={{ uri: this.state.cardetail.image }}>
                                </ImageLoad>
                                <View style={{
                                    marginTop: 10,
                                    width: Dimensions.get('window').width / 1.6,
                                    alignSelf: 'center',
                                    // alignItems: 'center',
                                    // justifyContent: 'center'
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignSelf: 'center',
                                        width: '95%',
                                    }}>
                                        <Text style={{
                                            fontSize: 18,
                                            color: APP_YELLOW,
                                            fontFamily: 'EurostileBold'
                                        }}>Car name</Text>
                                        <Text style={{
                                            fontSize: 17, 
                                            marginLeft: 80,
                                            fontFamily: 'EurostileBold',
                                            color: '#C0C0C0'
                                        }}>{this.state.cardetail.brand_name}</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignSelf: 'center', 
                                        marginTop: 5,
                                        width: '95%'
                                    }}>
                                        <Text style={{
                                            fontSize: 18,
                                            color: APP_YELLOW,
                                            fontFamily: 'EurostileBold'
                                        }}>Model name</Text>
                                        <Text style={{
                                            fontSize: 17, 
                                            marginLeft: 60,
                                            fontFamily: 'EurostileBold',
                                            color: '#C0C0C0'
                                        }}>{this.state.cardetail.model_name}</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignSelf: 'center', 
                                        marginTop: 5,
                                        width: '95%'
                                    }}>
                                        <Text style={{
                                            fontSize: 18,
                                            color: APP_YELLOW,
                                            fontFamily: 'EurostileBold',
                                        }}>Vehicle no.</Text>
                                        <Text style={{
                                            fontSize: 17, 
                                            marginLeft: 73,
                                            fontFamily: 'EurostileBold',
                                            color: '#C0C0C0'
                                        }}
                                            numberOfLines={2}>
                                            {this.state.cardetail.vehicle_no}
                                        </Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        marginBottom: 5,
                                        alignSelf: 'center',
                                        marginTop: 5
                                        , width: '95%'
                                    }}>
                                        <Text style={{
                                            fontSize: 18,
                                            fontFamily: 'EurostileBold',
                                            color: APP_YELLOW
                                        }}>Manufacture year</Text>
                                        <Text style={{
                                            fontSize: 17, marginLeft: 18,
                                            fontFamily: 'EurostileBold',
                                            color: '#C0C0C0'
                                        }}>{this.state.cardetail.manufacture_year}</Text>
                                    </View>


                                </View>
                            </ImageBackground>
                        </TouchableOpacity>

                    </TouchableOpacity>
                }

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
}