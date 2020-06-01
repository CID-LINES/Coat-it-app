import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, RefreshControl, ActivityIndicator, Dimensions } from 'react-native';
import { APP_BLUE, APP_YELLOW } from '../Component/colors'
import { FlatList } from 'react-native-gesture-handler';
import moment from 'moment';
const DATA=[
{
    title:'first'
},{
    title:'first'
},{
    title:'first'
}
]


export default class Notification extends Component {
    constructor() {
        super()
        this.state = {
            data:[],
            isFetching:false
        }
    }

componentDidMount(){
    this.NotificationApi()
}
    NotificationApi = () => {
        this.setState({
            isLoading: true
        })


        fetch('http://3.137.41.50/coatit/public/api/notification_list',
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
                        data: responseJson.response.notifcations,
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

    onRefresh=()=> {
        this.setState({ isFetching: true }, function() { this.NotificationApi() });    
     }

    render() {
        return (
            <SafeAreaView style={{ flex: 1,backgroundColor:'white' }}>
               

                        <View style={{ flex: 1 }}>
                            <View style={{
                                alignSelf: 'center',
                                alignItems: 'center', justifyContent: 'center',
                                height: 30, width: '100%'
                            }}>
                                <Text style={{fontSize:18,
                                fontWeight:'bold', fontFamily:'EuroStileBold',
                                color:APP_YELLOW}}>Notifications</Text>
                            </View>


                                    <FlatList style={{marginTop:20}}
                                      refreshControl={<RefreshControl 
                                        refreshing={this.state.isFetching}
                                        onRefresh={this.onRefresh}>
                                        </RefreshControl>}
                                    data={this.state.data}
                                    renderItem={({item}) =>(
                                        this.Notification(item)
                                    )}></FlatList>

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

    Notification=(item)=>{
        return(
            <View>
            <TouchableOpacity style={{
            width:'95%',
            alignSelf:'center',
            justifyContent:'center',
            //alignItems:'center',
            flexDirection:'row',
            marginBottom:5
           
            }} onPress={() =>{
                this.props.navigation.navigate('NotificationDetail',{
                    data:item
                })
            }}>
                <View style={{height:Dimensions.get('window').height/13
                ,width:60,
                borderColor:APP_YELLOW,
                borderWidth:1,
                marginLeft:10,
                borderRadius:10,
                overflow:'hidden'}}>
                <Image style={{
                    flex:1,
                    width:60,
               // marginLeft:10,
                   resizeMode:'cover'
                }}
                    source={item.image == null ? 
                        require('../assets/placeholder.jpg'):
                    {uri:item.image}}>
                    </Image>
                    </View>
                    <View style={{width:'80%',
                    justifyContent:'center',
                    marginLeft:10,}}> 
                  <View style={{flexDirection:'row',
                  width:'70%',
                  justifyContent:'space-between'}}>
                      <View>
                  <Text style={{fontSize:17,
                    fontWeight:'600', 
                    fontFamily:'EuroStileBold',}}>
                       {item.title}
                    </Text>
                    </View>
                    
                  <Text style={{fontSize:17,       
                    color:'gray',
                    marginLeft:5,
                    fontFamily:'EuroStileBold'
                    }}>
                   {moment.utc(item.created_at,'HH:mm:ss').local().format('hh:mm a')}
                    </Text>
                  </View>
                    <Text style={{fontSize:18,
                    fontWeight:'600',
                     fontFamily:'EuroStyle',
                    marginTop:5}}
                    numberOfLines={0}>
                        {item.description}
                    </Text>
                    </View>
            </TouchableOpacity>
            <View style={{height:2,width:'100%',
            marginBottom:5,
        backgroundColor:APP_YELLOW}}></View>
            </View>
           
        )
        
    }
}



