
import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Dimensions, ActivityIndicator, AsyncStorage, ImageBackground, RefreshControl } from 'react-native';
import { APP_YELLOW, APP_BLUE, } from '../Component/colors'
import { FlatList } from 'react-native-gesture-handler';
import ImageLoad from 'react-native-image-placeholder';
import PushNotification from 'react-native-push-notification';
import firebase from 'react-native-firebase'
import { strings } from './Localization';



export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShow: false,
            title: '',
            DATA: [
                {
                    title: 'German'
                },
                {
                    title: 'French'
                },
                {
                    title: 'Dutch'
                },
                {
                    title: 'Poland'
                },
                {
                    title: 'Russian'
                },
                {
                    title: 'Spanish'
                }
            ]
        }
    }


    render() {

        return (
            // <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ImageBackground style={{ flex: 1, }}
                resizeMode='stretch'
                source={require('../assets/bg.png')}>
                <View style={{ flex: 1 }}>
                    <View style={{
                        height: 40,
                        width: "95%",
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: Platform.OS === 'ios' ? 25 : 7
                    }}>
                        <Text style={{
                            fontSize: 18,
                            color: APP_YELLOW,
                            fontFamily: 'EurostileBold',
                        }}>
                            Kenotek Coat-IT
                            </Text>
                    </View>
                   
                        <View style={{
                            height: Dimensions.get('window').height / 3,
                            width: 250,
                            alignSelf: 'center',
                            marginLeft: 20,
                            justifyContent: 'center',
                            marginTop: 70
                        }}>
                            <Image style={{
                                flex: 1,
                                width: '100%',
                                alignSelf: 'center',
                                marginTop: 20
                            }}
                                resizeMode='contain'
                                source={require('../assets/logo.png')}>
                            </Image>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 10
                        }}>
                            <TouchableOpacity style={{
                                height: 40,
                                width: '50%',
                                backgroundColor: APP_YELLOW,
                                justifyContent: 'center',
                                alignItems: "center",

                            }}
                                onPress={() => {
                                    var data = this.state.isShow == false ? true : false
                                    this.setState({
                                        isShow: data
                                    })
                                }}>
                                <Text style={{
                                    fontSize: 17,
                                    fontFamily: 'EurostileBold'
                                }}>
                                    {this.state.title == '' ?
                                        'English' : this.state.title}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                height: 40,
                                width: 60,
                                alignSelf: 'center',
                                backgroundColor: APP_YELLOW,
                                justifyContent: 'center',
                                alignItems: "center",
                                marginLeft: 10,
                                borderRadius: 5
                            }}
                                onPress={() => {
                                    if (this.state.title == '') {
                                        strings.setLanguage('en')
                                        this.props.navigation.navigate('Login')
                                    } 
                                    else {
                                        this.props.navigation.navigate('Login')
                                    }

                                }}>
                                <Text style={{
                                    fontSize: 17,
                                    fontFamily: 'EurostileBold'
                                }}>Ok</Text>
                            </TouchableOpacity>
                        </View>
                        {this.state.isShow &&
                            <FlatList
                                data={this.state.DATA}
                                renderItem={({ item }) => (
                                    this.MembershipPlan(item)
                                )}>
                            </FlatList>
                        }
                    
                </View>


            </ImageBackground>

        );
    }
    MembershipPlan = (item) => {
        return (
            <TouchableOpacity style={{
                height: 40,
                width: '50%',
                marginRight: 70,
                alignSelf: 'center',
                borderColor: 'black',
                borderWidth: 1,
                backgroundColor: APP_YELLOW,
                justifyContent: 'center',
                alignItems: "center",
            }}
                onPress={() => {
                    if (item.title == 'German') {
                        strings.setLanguage('de')
                    }
                    else if (item.title == 'French') {
                        strings.setLanguage('fr')
                    }
                    else if (item.title == 'Dutch') {
                        strings.setLanguage('nl')
                    }
                    else if (item.title == 'Poland') {
                        strings.setLanguage('pl')
                    }
                    else if (item.title == 'Russian') {
                        strings.setLanguage('cs')
                    }
                    else if (item.title == 'Spanish') {
                        strings.setLanguage('es')
                    }
                    this.setState({
                        isShow: false,
                        title: item.title
                    })
                }}>
                <Text style={{
                    fontSize: 17,
                    fontFamily: 'EurostileBold'
                }}>
                    {item.title}
                </Text>
            </TouchableOpacity>
        )
    }
}









// import React, { Component } from 'react';
// import { Text, View, SafeAreaView, Image, TextInput, ScrollView, 
//     TouchableOpacity, KeyboardAvoidingView, AsyncStorage, Platform, ActivityIndicator,
//      StatusBar, Dimensions, DeviceEventEmitter, PushNotificationIOS, ImageBackground,
//     FlatList } from 'react-native';
// import { APP_YELLOW, APP_BLUE, APP_LIGHT } from '../Component/colors';
// import { ApiCall, CallApi } from '../Component/ApiClient';
// import { NavigationActions } from 'react-navigation';
// import { strings } from './Localization'
// // import { FlatList } from 'react-native-gesture-handler';

// const DATA= [{
//     title: 'German'
//     // code: 'de'
// }, {
//     title: 'French'
//     // code: 'fr'
// }, {
//     title: 'Dutch'
//     // code: 'nl'
// },
// {
//     title: 'Poland'
//     // code: 'pl'
// }, {
//     title: 'Russian'
//     // code: 'cs'
// },
//     , {
//     title: 'Spanish'
//     // code: 'cs'
// }

// ]
// export default class Login extends Component {
//     constructor(props) {
//         super(props)

//         this.state = {
//             isshow: false,

//         }
//     }



//     // _onSetLanguageToItalian() {
//     //     if(strings.setLanguage('it')=='it'){
//     //         strings.setLanguage('it');
//     //         this.setState({});
//     //     }
//     //     else if(strings.setLanguage == 'en'){
//     //         strings.setLanguage('en');
//     //         this.setState({});
//     //     }

//     //   }
//     // componentDidMount() {
//     //     this.get('user_id')
//     //     AsyncStorage.getItem('user_id', (error, item) => {
//     //         if (item != null && item != '') {
//     //             // this.props.navigation.push('Home')
//     //             this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Home' })], 0)
//     //         }
//     //     })
//     // }
//     // async get(key) {
//     //     try {
//     //         const value = await AsyncStorage.getItem(key);
//     //         //alert(value)
//     //         if (value != null && value != '') {
//     //             this.setState({
//     //                 user_id: value
//     //             })
//     //         }
//     //     } catch (error) {

//     //     }
//     // }
//     // async save(key, value) {
//     //     try {
//     //         await AsyncStorage.setItem(key, value);
//     //     } catch (error) {
//     //         //   console.log("Error saving data" + error);
//     //     }
//     // }


//     render() {

//         return (

//             <ImageBackground style={{ flex: 1, }}
//                 resizeMode='stretch'
//                 source={require('../assets/bg.png')}>
//                 <StatusBar barStyle="light-content" />
//                 <View style={{
//                     flex: 1,
//                 }}>
//                     <View style={{
//                         height: Dimensions.get('window').height / 2.5,
//                         width: 250,
//                         alignSelf: 'center',
//                         justifyContent: 'center',
//                         marginTop: 40, marginLeft: 60
//                     }}>
//                         <Image style={{
//                             flex: 1,
//                             width: '100%',
//                             alignSelf: 'center',
//                             marginTop: 20
//                         }}
//                             resizeMode='contain'
//                             source={require('../assets/logo.png')}>
//                         </Image>
//                     </View>

//                     <TouchableOpacity style={{
//                         height: 40,
//                         width: '50%',
//                         alignSelf: 'center',
//                         backgroundColor: APP_YELLOW,
//                         justifyContent: 'center',
//                         alignItems: "center", marginTop: 40
//                     }}

//                     >
//                         <Text style={{
//                             fontSize: 17,
//                             fontFamily: 'EurostileBold'
//                         }}>
//                             Select Language
//                          </Text>
//                     </TouchableOpacity>
//                     <FlatList 
//                         data={DATA}
//                         renderItem={({ item }) => (
//                             <TouchableOpacity style={{
//                                 height: 40,
//                                 width: '50%',
//                                 alignSelf: 'center',
//                                 backgroundColor: APP_YELLOW,
//                                 justifyContent: 'center',
//                                 alignItems: "center", marginTop: 40
//                             }}>
//                                 <Text style={{
//                                     fontSize: 17,
//                                     fontFamily: 'EurostileBold'
//                                 }}>
//                                    {item.title}
//                                  </Text>
//                             </TouchableOpacity>
//                         )}>
//                     </FlatList>
//                 </View>
//             </ImageBackground>

//         );
//     }


// }






