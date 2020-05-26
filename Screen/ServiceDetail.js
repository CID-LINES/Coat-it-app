import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, AsyncStorage, ActivityIndicator } from 'react-native';
import { APP_YELLOW, APP_BLUE, } from '../Component/colors'

export default class ServiceDeatil extends Component {
    constructor(props) {
        super(props)
        this.state={
            user_id:'',
           data:props.navigation.state.params.plan
        }
      // console.log(JSON.stringify(this.state.data))
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
                     //this.DetailerListApi()
                })
            }
        } catch (error) {

        }
    }

   
    BuyPlanApi = () => {
        this.setState({
            isLoading: true
        })
        let body = new FormData();
        var photo = {
            uri: this.state.data.image,
            type: 'image/jpeg',
            name: 'photo.jpg',
        };
        // alert(this.state.brewery_id)
        body.append('image', photo);
        body.append('title', this.state.data.title)
        body.append('description', this.state.data.description)
        body.append('user_id', ''+this.state.user_id)
        body.append('plan_id', ''+this.state.data.id)
      

        fetch('http://3.137.41.50/coatit/public/api/add_plan',

            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    //  'Content-Type': 'application/json'
                },
                body: body
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.response)
                if (responseJson.response.status == true) {
                    
                    this.props.navigation.goBack()

                }
                this.setState({
                    isLoading: false

                })
            })
            .catch((error) => {
                console.error(message);
                //  alert(error)
                //  callback({ data: error });
                //callback({error: true, data: error});
            });
    }




    render() {
        return (
            <SafeAreaView style={{ flex: 1,backgroundColor:'white' }}>

                <View style={{
                    height: 40, width: '95%',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignSelf: 'center', marginTop: 10
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
                        <Image style={{ height: 25, width: 25, tintColor: APP_YELLOW }}
                            resizeMode='contain'
                            source={require('../assets/back.png')}></Image>

                    </TouchableOpacity>
                    <View style={{
                        height: 35,
                        alignItems: 'center',
                         justifyContent: 'center',

                    }}>
                        <Text style={{
                            fontSize: 18, fontWeight: '700',
                            color: APP_YELLOW
                        }}>{this.state.data.title}</Text>
                    </View>
                </View>

                <View style={{ flex: 1,backgroundColor:'white' }}
                >

                    <View style={{
                        height: 250,
                        width: '100%', justifyContent: 'center',
                        alignItems:'center'
                        // backgroundColor:'pink'
                    }}>
                        <TouchableOpacity style={{
                            height: 180,
                            width: '95%',
                         
                            borderRadius: 10,
                            alignSelf: 'center',

                            justifyContent: 'center',
                             overflow: 'hidden'
                        }}>
                            <Image style={{ height: 180, flex:1 }}
                                resizeMode='cover'
                                source={ this.state.data.image == null ? 
                                    require('../assets/placeholder.jpg'):
                                    {uri:this.state.data.image}
                                   }>

                            </Image>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        marginLeft: 10, marginRight: 10,
                        width: '90%', alignSelf: 'center'
                    }}>
                        <Text style={{
                            fontSize: 17,
                            fontWeight:'bold'
                         
                        }}>
                       {this.state.data.title}</Text>
                        <Text style={{
                            fontSize: 17,

                            marginTop: 10, textAlign: 'justify',
                           
                        }}
                            numberOfLines={4}>
                            
                                 {this.state.data.description}
                             
                            </Text>
                    </View>
{/* 
                    <TouchableOpacity style={{
                        height: 45, width: '60%',
                        alignSelf: 'center', alignItems: 'center',
                        justifyContent: 'center', marginTop: 20,
                        borderRadius: 10,
                        backgroundColor: APP_YELLOW
                    }}
                        onPress={() => {
                            this.BuyPlanApi()
                           // this.props.navigation.navigate('Payment')
                        }}>
                        <Text style={{
                            fontSize: 18, fontWeight: '800',

                            color: 'white'
                        }}>Buy</Text></TouchableOpacity> */}

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
            </SafeAreaView>
        );
    }
}



