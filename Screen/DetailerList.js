import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, SectionList, AsyncStorage, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import { APP_YELLOW, APP_BLUE, } from '../Component/colors'
import { FlatList } from 'react-native-gesture-handler';


// const DATA = [
//     {
//         title: 'Current Orders',
//         // data: ['Pizza', 'Burger', 'Risotto'],
//     },
//     {
//         title: 'Past Orders',

//     },

// ];
export default class DetailerList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: '',
            DATA: [],
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
                    this.DetailerListApi()
                })
            }
        } catch (error) {
        }
    }
   DetailerListApi = () => {
        this.setState({
            isLoading: true
        })

        fetch('http://3.137.41.50/coatit/public/api/detailer_list/' + "" + this.state.user_id,
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
                            DATA:responseJson.response.data
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

    onRefresh=()=>{
        this.setState({isFetching:true} ,function(){this.DetailerListApi()})
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
                        marginTop: 10
                    }}>
                        <TouchableOpacity style={{
                            height: 35, width: 35,
                            alignItems: 'center', 
                            justifyContent: 'center',
                            position: 'absolute',
                            left: 5
                        }}
                            onPress={() => {
                                this.props.navigation.goBack()
                            }}>
                            <Image style={{ height: 25, width: 25, tintColor: APP_YELLOW }}
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
                                fontSize: 18, fontWeight: '700',
                                color: APP_YELLOW
                            }}>Detailer List</Text>
                        </View>
                    </View>
                    {/* <ScrollView style={{ flex: 1 }}> */}
                    <View style={{ flex: 1 }}>

                        <FlatList style={{ marginTop: 20 }}
                        refreshControl={<RefreshControl 
                            refreshing={this.state.isFetching}
                            onRefresh={this.onRefresh}>
                            </RefreshControl>}
                            data={this.state.DATA}
                            renderItem={({ item ,index}) => (
                                this.DetailerList(item,index)
                            )}></FlatList>
                    </View>
                    {/* </ScrollView> */}
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

                            color={APP_YELLOW}
                        ></ActivityIndicator>

                    </View>
                }

            </SafeAreaView>
        );
    }

    DetailerList = (item,index) => {
        return (
            <TouchableOpacity style={{
                height: 120,
                marginTop: 5,
                marginBottom: 5,
                width: '95%',
                borderRadius: 10, borderColor: APP_YELLOW, borderWidth: 2,
                alignSelf: 'center',
                // backgroundColor: 'pink',
                overflow: 'hidden'
            }}
                onPress={() => {
                    //this.props.navigation.navigate('Payment')
                }}
            >
                <View style={{ flexDirection: 'row' }}>
                    <Image style={{
                        height: 120,
                        width: '40%',
                    }}
                        resizeMode='cover'
                        source={item.avatar==null ?
                            require('../assets/placeholder.jpg'):
                            {uri:item.avatar}
                            }>

                    </Image>
                    <View style={{ marginLeft: 15, marginTop: 20 }}>
                        <Text style={{
                            fontSize: 17,
                            fontWeight: '700'
                        }}>
                           {item.first_name}
                    </Text>
                    <Text style={{ marginTop: 10 }}>{item.car_name}</Text>

                        {/* <Text style={{ marginTop: 10 }}>10 km</Text> */}
                        {/* <TouchableOpacity style={{
                            height: 30,
                            width: 30,
                            marginTop: 5,
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
                                                this.DeleteDetailerApi(item.id, index)
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
                        </TouchableOpacity> */}

                    </View>
                </View>

            </TouchableOpacity>
        )
    }
}





