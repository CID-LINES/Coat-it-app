import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity,ActivityIndicator, AsyncStorage, Alert } from 'react-native';
import { APP_YELLOW, APP_BLUE, } from '../Component/colors'
//mport { ApiCall, CallGetApi } from '../Config/ApiClient';
//import stripe from 'tipsi-stripe'



// stripe.setOptions({
//     publishableKey: 'pk_test_zh8e8iTYdiF3pxAbUTwETCEq00n6Z1THWs'
//     })
export default class Purchase extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //userid: props.navigation.state.params.user_id,
            start_time:'',
            end_time:'',
            isLoading:false,
            name:'',
            cardnumber:'',
            expMonth:'',
            expYear:'',
            cvv:'',
            token: '',
            user_id:'',
            // balance : props.navigation.state.params.amount,
            // fromScreen: props.navigation.state.params.screen

        }
       
    }
    



    onCreacteCardSourcePress = async () => {
        this.setState({
            isLoading: true
        })

        try {
           
          this.setState({ loading: true, source: null })
    
          const params = {
            // mandatory
            number: this.state.cardnumber,
            expMonth: parseInt(this.state.expMonth),
            expYear: parseInt(this.state.expYear),
            cvc: this.state.cvv,
            name: this.state.name,
           
          }
          
          const token = await stripe.createTokenWithCard(params)
    
        //   alert(JSON.stringify(token))
          
        //   console.log(token)
          this.UpdatebalanceApi(token)
        } catch (error) {
            alert(error)
          this.setState({ error, loading: false})
        }
        this.setState({
            isLoading: false
        })

      }




    //   UpdatebalanceApi = (token) => {
    //     this.setState({
    //         isLoading: true
    //     })

    //     ApiCall('update-balance',
    //         {
    //             'user_id': '' + this.state.user_id,
    //             'balance': this.state.balance,
    //             'token': token.tokenId
    //         },
    //         (data) => {

    //             if (!data.error) {
    //                 if (data.data.type == 'RXSUCCESS') {

    //                     alert(JSON.stringify(data.data.message))

                        
    //                     if(this.state.fromScreen == 'Signup')
    //                     {
    //                         Alert.alert(
    //                             'Successfully',
    //                             'Amount added in your wallet',
    //                             [
    //                                 {
    //                                     text: 'Next', onPress: () => {
    //                                         this.props.navigation.navigate('DrankLocation', {
    //                                             user_id: this.state.userid
    //                                         })
    
                                            
    //                                     }
    //                                 }
    //                             ],
    //                             { cancelable: false },
    //                         );
    //                     }
    //                     else
    //                     {
    //                         this.props.navigation.navigate('UserDetail')
    //                     }
                       
                        
    //                 }
    //                 else {
    //                     alert(data.data.message)
    //                 }
    //             } else {
    //                 alert('Somthing went wrong')
    //             }
    //             // alert(JSON.stringify(data))
    //             //     console.log(data)
    //             this.setState({
    //                 isLoading: false
    //             })
    //         })

    // }



    
// componentDidMount() {
   
//     this.load()
//     this.props.navigation.addListener('willFocus', this.load)
// }
// load = () => {
//     this.get('user_id')
    
// }
// async get(key) {

//     // alert('hello')
//     try {
//         const value = await AsyncStorage.getItem(key);
//         //alert(JSON.stringify(value))
//         if (value != null && value != '') {

//             this.setState({
//                 user_id: value
//             },() => {
//             })
//         }
//     } catch (error) {
//         // console.log("Error retrieving data" + error);
//         // alert('Unable to get data, try again' + 'Error: ' + error)
//     }
// }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, 
            backgroundColor: 'white' }}>
               
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
                            alignItems: 'center', justifyContent: 'center',

                        }}>
                            <Text style={{
                                fontSize: 18, fontWeight: '700',
                                color: APP_YELLOW
                            }}>Payment</Text>
                        </View>
                    </View>
                   
                 



           

                <ScrollView style={{
                    flex: 1, marginBottom: 5,
                    backgroundColor: 'white'

                }}>
                    <View style={{
                        flex: 1,
                        backgroundColor: 'white',
                        alignItems: "center"
                    }}>
                        
                       

                        <View style={{
                            // height: 60,
                            width: '90%',
                            alignSelf: 'center',
                            marginTop: 20
                        }}
                        >
                            <Text style={{
                                color: 'gray',
                                fontSize: 18
                            }}>Card Number</Text>
                            <TextInput style={{
                                //height: 40,
                                //width: '65%',

                                marginTop: 10,
                                fontSize: 18
                            }}
                            maxLength={16}
                            onChangeText={(cardnumber) => this.setState({cardnumber})}
                                value={this.state.cardnumber}
                                keyboardType='number-pad'
                                returnKeyType='done'
                                placeholderTextColor='gray'
                                placeholder='XXXX XXXX XXXX XXXX'
                            >

                            </TextInput>
                            <View style={{
                                height: 1,

                                width: '65%',
                                //alignSelf: 'center',
                                backgroundColor: 'gray',

                            }}></View>

                        </View>
                        <View style={{
                            // height: 40,
                            width: '90%',
                            alignSelf: 'center',
                            //backgroundColor: 'pink',
                            justifyContent: 'center',
                            marginTop: 10
                        }}
                        >
                            <TextInput style={{
                                //height: 35,
                                width: '90%',
                                //alignSelf: 'center',
                                padding: 5,
                                fontSize: 18
                            }}
                            onChangeText={(name) => this.setState({ name })}
                            value={this.state.name}
                                placeholderTextColor='gray'
                                keyboardType='ascii-capable'
                                placeholder='Name on card'>

                            </TextInput>
                            <View style={{
                                height: 1,
                                width: '90%',
                                //alignSelf: 'center',
                                backgroundColor: 'gray'
                            }}></View>



                        </View>
                        <View style={{
                            // height: 60,
                            width: '90%',

                          
                          
                           
                            marginTop: 20
                        }}>
                            <View style={{width:'95%',
                        height:60,
                        
                         flexDirection: "row",}}>

                             <View style={{height:60,
                            }}>
                         
                                <Text style={{ fontSize: 18, color: 'gray' }}>Exp month</Text>
                                <TextInput style={{
                                    fontSize: 18,
                                  
                                    marginTop: 10,

                                }}
                                maxLength={2}
                                onChangeText={(expMonth) => this.setState({ expMonth })}
                                value={this.state.expMonth} keyboardType='number-pad'
                                returnKeyType='done'
                                placeholderTextColor='gray'
                                placeholder='MM'
                                ></TextInput>
                                <View style={{
                                    height: 1,
                                    width: 60,
                                    //alignSelf: 'center',
                                    backgroundColor: 'gray'
                                }}></View>
                                </View>
                                <View style={{height:60,
                                marginLeft:40
                            }}>
                         
                                <Text style={{ fontSize: 18, color: 'gray' }}>Exp year</Text>
                                <TextInput style={{
                                    fontSize: 18,
                                    
                                    marginTop: 10,

                                }}
                                maxLength={4}
                                onChangeText={(expYear) => this.setState({expYear})}
                                value={this.state.expYear}
                                keyboardType='number-pad'
                                returnKeyType='done'
                                placeholderTextColor='gray'
                                placeholder='YY'
                                ></TextInput>
                                <View style={{
                                    height: 1,
                                    width: 60,
                                    //alignSelf: 'center',
                                    backgroundColor: 'gray'
                                }}></View>
                                </View>
                        </View>
                          
                                <Text style={{
                                    fontSize: 18,
                                    height: 25,
                                    marginTop:10,

                                    color: 'gray'
                                }}>CVV</Text>
                                <TextInput style={{
                                    fontSize: 18,
                                    //height:25,
                                    //marginTop:9
                                }}
                                maxLength={3}
                                onChangeText={(cvv) => this.setState({ cvv })}
                                value={this.state.cvv}
                                keyboardType='number-pad'
                                    placeholder='XXX'
                                    returnKeyType='done'
                                    placeholderTextColor='gray'></TextInput>
                                <View style={{
                                    height: 1,
                                    width: 40,
                                    backgroundColor: 'gray'
                                }}></View>
                            </View>

                       

                       

                        <View style={{
                    height: 60,
                    width: '95%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent:'center',
                    backgroundColor: 'white',
                    marginTop: 30


                }}>
                   
                    <TouchableOpacity style={{
                        height: 60,
                        width: '60%',
                        alignSelf:'center',
                        backgroundColor: APP_YELLOW,
                        alignItems: 'center',
                        
                        borderRadius: 10,

                        justifyContent: 'center'
                    }}
                        onPress={() => {}}
                        
                    >
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 20,
                            alignSelf: 'center',
                            color: 'white'
                        }}>Payment</Text>

                    </TouchableOpacity>
                </View>



                    </View>
                </ScrollView>
              
                {this.state.isLoading &&
                     <View style={{position:'absolute',
                         backgroundColor:'#000000aa',
                         top:0,
                         bottom:0,left:0,right:0,
                         alignItems:'center',
                         justifyContent:'center'}}>
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
    // PurchasePlan(){
    //     this.purchaseApi()
    // }
    paymentRequest() {
        if (this.state.cardnumber == '') {
            Alert.alert('', 'Please enter card number')
        }
        if (this.state.cardnumber.length < 16) {
            Alert.alert('', 'Please enter valid card number')
        }
        else if (this.state.name == '') {
            Alert.alert('', 'Please enter name')
        }
        else if (this.state.expMonth == '') {
            Alert.alert('', 'Please enter Exp month')
        }
        else if (this.state.expYear == '') {
            Alert.alert('', 'Please enter Exp year')
        }
        else if (this.state.cvv == '') {
            Alert.alert('', 'Please enter CVV')
        }
        else {
            this.onCreacteCardSourcePress()
        }
    }
}
