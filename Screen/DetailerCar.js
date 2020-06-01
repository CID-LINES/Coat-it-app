import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, AsyncStorage, ActivityIndicator, Dimensions } from 'react-native';
import { APP_YELLOW, APP_BLUE, } from '../Component/colors'

export default class ServiceDeatil extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: '',
            data: props.navigation.state.params.plan,
            serviceplan: '',
            car: props.navigation.state.params.car,
            cardetail: "",
            isHide: false
        }
        console.log(JSON.stringify(this.state.car))
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

                    //  'Content-type':'multipart/form-data'
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(JSON.stringify(responseJson))
                if (responseJson.response.status == true) {
                    this.setState({
                        serviceplan: responseJson.response.data,
                        isHide: true
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

                    //  'Content-type':'multipart/form-data'
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
                else
                {
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
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>

                <View style={{
                    height: 60,
                    width: '95%',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignItems:'center',
                    alignSelf: 'center',
                }}>
                    <TouchableOpacity style={{
                       // height: 35,
                         width: 35,
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute', left: 5

                    }}
                        onPress={() => {
                            this.props.navigation.goBack()
                        }}>
                        <Image style={{
                             height: 25, 
                        width: 25, 
                        tintColor: APP_YELLOW }}
                            resizeMode='contain'
                            source={require('../assets/back.png')}></Image>

                    </TouchableOpacity>
                    <TouchableOpacity style={{
                       // height: 40, 
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
                            fontWeight: '700',
                            color: APP_YELLOW,
                            fontFamily:'EuroStileBold',

                        }}
                            numberOfLines={0}>{this.state.serviceplan.name}</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ flex: 1, backgroundColor: 'white' }}
                    >

                        <View style={{
                            height: Dimensions.get('window').height/3,
                            width: '100%', justifyContent: 'center',
                            alignItems: 'center'
                            // backgroundColor:'pink'
                        }}>
                            <TouchableOpacity style={{
                               flex:1,
                                width: '95%',
                                borderRadius: 10,
                                alignSelf: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden'
                            }}>
                                <Image style={{  flex: 1 }}
                                    resizeMode='cover'
                                    source={this.state.serviceplan.image == null ?
                                        require('../assets/placeholder.jpg') :
                                        { uri: this.state.serviceplan.image }
                                    }>
                                </Image>
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
                                fontWeight: 'bold',
                                fontFamily:'EuroStileBold',

                            }}>
                                {this.state.serviceplan.title}</Text>
                            <Text style={{
                                fontSize: 19,
                                marginBottom: 10,
                                marginTop: 10, 
                                textAlign: 'justify',
                                fontFamily:'EuroStyle',

                            }}
                                numberOfLines={0}>

                                {this.state.serviceplan.description}

                            </Text>
                        </View>

                        <TouchableOpacity style={{
                            height: 45, width: '60%',
                            alignSelf: 'center', alignItems: 'center',
                            justifyContent: 'center', marginTop: 20,
                            borderRadius: 10,
                            marginBottom: 10,
                            backgroundColor: APP_YELLOW
                        }}
                            onPress={() => {
                                this.CarDetailApi()

                            }}>
                            <Text style={{
                                fontSize: 18, fontWeight: '800',

                                color: 'white'
                            }}>View Car</Text></TouchableOpacity>

                    </View>
                </ScrollView>

                {this.state.isShow &&
                    <TouchableOpacity style={{
                        position: 'absolute',
                        backgroundColor: '#000000aa',
                        top: 0,
                        bottom: 0, left: 0, right: 0,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                        onPress={() => {
                            this.setState({
                                isShow: false
                            })
                        }}
                    >
                        <TouchableOpacity style={{
                            width: '90%',
                            borderRadius: 10,

                            overflow: 'hidden',
                            backgroundColor: 'white'
                        }}
                            onPress={() => {
                                this.setState({
                                    isShow: false
                                })
                            }}>
                            <Image style={{
                                height: 250,
                                width: '100%'
                            }}
                                source={{ uri: this.state.cardetail.image }}>
                            </Image>
                            <View style={{
                                marginTop: 10,
                                width: '85%',
                                alignSelf: 'center',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignSelf: 'center',
                                    width: '95%',
                                }}>
                                    <Text style={{
                                        fontSize: 17,
                                        fontWeight: '800',
                                        color: APP_YELLOW
                                    }}>Car name</Text>
                                    <Text style={{
                                        fontSize: 17, marginLeft: 120
                                    }}>{this.state.cardetail.brand_name}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignSelf: 'center', marginTop: 5,
                                    width: '95%'
                                }}>
                                    <Text style={{
                                        fontSize: 17,
                                        fontWeight: '800', color: APP_YELLOW
                                    }}>Model name</Text>
                                    <Text style={{
                                        fontSize: 17, marginLeft: 95
                                    }}>{this.state.cardetail.model_name}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignSelf: 'center', marginTop: 5,
                                    width: '95%'
                                }}>
                                    <Text style={{
                                        fontSize: 17,
                                        fontWeight: '800', color: APP_YELLOW
                                    }}>Vehicle no.</Text>
                                    <Text style={{
                                        fontSize: 17, marginLeft: 105,
                                    }}
                                        numberOfLines={2}>
                                        {this.state.cardetail.vehicle_no}
                                    </Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    marginBottom: 5,
                                    alignSelf: 'center', marginTop: 5
                                    , width: '95%'
                                }}>
                                    <Text style={{
                                        fontSize: 17,
                                        fontWeight: '800', color: APP_YELLOW
                                    }}>Manufacture year</Text>
                                    <Text style={{
                                        fontSize: 17, marginLeft: 45
                                    }}>{this.state.cardetail.manufacture_year}</Text>
                                </View>


                            </View>

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
            </SafeAreaView>
        );
    }
}