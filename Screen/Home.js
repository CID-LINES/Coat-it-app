import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
  ActivityIndicator,
  AsyncStorage,
  ImageBackground,
  RefreshControl,
  StatusBar,
  Alert,
  SectionList,
} from "react-native";
import { APP_YELLOW, APP_BLUE } from "../Component/colors";
import { FlatList } from "react-native-gesture-handler";
import ImageLoad from "react-native-image-placeholder";
import PushNotification from "react-native-push-notification";
import firebase, { messaging, notifications } from "react-native-firebase";
import { strings } from "./Localization";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { ApiCall, CallApi } from "../Component/ApiClient";
import { NavigationActions } from "react-navigation";
import { setupPushNotification } from "./root";


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: '',
      // isFetching: false,
      // text: [],
      // token: ''
      access_token: "",
      car: "",
      DATA: [],
      orders: [],
      user_id: "",
      id: "",
      isFetching: false,
    };
  }
  componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners();
    this.PushNotification = setupPushNotification(this._handleNotificationOpen);
    this.load();
    this.props.navigation.addListener("willFocus", this.load);
  }
  load = () => {
    this.get("user_id");
  };

  _handleNotificationOpen = (data) => {
    console.log(data.message);
    const { navigate } = this.props.navigation;
    if (data.message == "Accepted your request") {
      navigate("DetailerList");
    } else if (data.message == "Added new products") {
      navigate("ProductList");
    } else if (data.message == "Admin send notification") {
      navigate("Notification");
    }
  };

  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    // If Premission granted proceed towards token fetch
    if (enabled) {
      this.getToken();
    } else {
      // If permission hasn’t been granted to our app, request user in requestPermission method.
      this.requestPermission();
    }
  }
  async getToken() {
    let fcmToken = await AsyncStorage.getItem("fcmToken");
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem("fcmToken", fcmToken);
      }
    }
  }
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log("permission rejected");
    }
  }

  async get(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      const value2 = await AsyncStorage.getItem("fcmToken");
      //alert(value)
      if (value != null && value != "") {
        this.setState(
          {
            user_id: value,
          },
          () => {
            this.ServiceApi();
            this.tokenApi(value2);
          }
        );
      }
    } catch (error) {}
  }

  async createNotificationListeners() {
    // This listener triggered when notification has been  received in foreground
    this.notificationListener = firebase
      .notifications()
      .onNotification((notification) => {
        const { title, body, data } = notification;
        const localNotification = PushNotification.localNotification({
          title: title,
          message: body,
          soundName: "default",
          smallIcon: true,
          show_in_foreground: true,
        });
        return localNotification;
      }); 

    //This listener triggered when app is in backgound and we click, tapped and opened notifiaction
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened((notificationOpen) => {
        const { data } = notificationOpen.notification;
        console.log(data);
      });
    // // // This listener triggered when app is closed and we click,tapped and opened notification
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const { data } = notificationOpen.notification;
      const { navigate } = this.props.navigation;
      console.log(data);
      if (data.message == "Accepted your request") {
        navigate("DetailerList");
      } else if (data.message == "Added new products") {
        navigate("ProductList");
      } else if (data.message == "Admin send notification") {
        navigate("Notification");
      }
    }
  }

  tokenApi = (fcmToken) => {
    this.setState({
      isLoading: true,
    });
    CallApi(
      "update_device_token",
      {
        user_id: "" + this.state.user_id,
        device_type: Platform.OS == "android" ? "a" : "i",
        device_token: fcmToken,
      },
      (data) => {
        //console.log(JSON.stringify(data))
        if (!data.error) {
          if (data.data.response.status == true) {
          } else {
            //alert(data.data.response.message)
          }
        } else {
          //alert('Somthing went wrong')
        }
        this.setState({
          isLoading: false,
        });
        // alert(JSON.stringify(data))
        //nsole.log(data)
      }
    );
  };
  // PlanApi = () => {
  //     this.setState({
  //         isLoading: true
  //         // isFetching:true
  //     })

  //     fetch('http://18.156.66.145/public/api/plan/display',
  //         {
  //             method: 'GET',
  //             headers: {
  //                 Accept: 'application/json',
  //                 'Content-Type': 'application/json',

  //             }
  //         })
  //         .then((response) => response.json())
  //         .then((responseJson) => {
  //             //console.log(JSON.stringify(responseJson))
  //             if (responseJson.response.status == true) {
  //                 this.setState({
  //                     data: responseJson.response.data
  //                 })

  //             }
  //             this.setState({
  //                 isLoading: false,
  //                 isFetching: false
  //             })
  //         })
  //         .catch((error) => {
  //             console.error(error);
  //             //  alert(error)
  //             //  callback({ data: error });
  //             //callback({error: true, data: error});
  //         });
  // }

  FavouriteProducts = (id, service_id, Selected) => {
    var url = "";
    url =
      Selected == "0" ? "remove_favourite_service" : "store_favourite_service";
    console.log(url);
    CallApi(
      url,
      {
        user_id: "" + this.state.user_id,
        detailer_id: id + "",
        service_id: service_id + "",
      },
      (data) => {
        ///console.log(JSON.stringify(data));
        if (!data.error) {
          if (data.data.response.status == true) {
          } else {
            alert(data.data.response.message);
          }
        } else {
          alert("Somthing went wrong");
        }
      }
    );
  };
  ServiceApi = () => {
    this.setState({
      isLoading: true,
    });
    fetch(
      "http://18.156.66.145/public/api/service_of_detailer/" +
        "" +
        this.state.user_id,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(JSON.stringify(responseJson));
        if (responseJson.response.status == true) {
          var mainArr = [];
          //var title=[]
          responseJson.response.data.map((item) => {
            // if(item.detailer_name != null){
            //     title.push(item.detailer_name)
            // }
            var product = [];
            item.detailer_services.map((item) => {
              if (item != null) {
                product.push(item);
              }
            });
            var a = {
              id: item.detailer_id,
              detailer_name: item.detailer_name,
              data: product,
            };
            mainArr.push(a);
          });
          this.setState({
            orders: mainArr,
          });
          //console.log(JSON.stringify(mainArr))
        } else {
          alert(responseJson.response.message);
        }
        this.setState({
          isLoading: false,
          isFetching: false,
        });
      })
      .catch((error) => {
        console.error(error);
        //  alert(error)
        //  callback({ data: error });
        //callback({error: true, data: error});
      });
  };

  onRefresh = () => {
    this.setState({ isFetching: true }, function() {
      this.PlanApi();
    });
  };
  render() {
    return (
      // <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      // <ImageBackground style={{ flex: 1 }}
      //     resizeMode='stretch'
      //     source={require('../assets/bg.png')}>
      //     <StatusBar barStyle="light-content" />
      //     <View style={{ flex: 1 }}>
      //         <View style={{
      //             height: 40,
      //             width: "95%",
      //             alignSelf: 'center',
      //             justifyContent: 'center',
      //             alignItems: 'center',
      //             marginTop: Platform.OS === 'ios' ? 25 : 7
      //         }}>
      //             <Text style={{
      //                 fontSize: 18,
      //                 color: APP_YELLOW,
      //                 fontFamily: 'EurostileBold',
      //             }}>
      //                 Services
      //                 </Text>
      //         </View>
      //         <FlatList style={{ marginTop: 5 }}
      //             refreshControl={<RefreshControl
      //                 tintColor={APP_YELLOW}
      //                 colors={["#D65050", "#D65050"]}
      //                 refreshing={this.state.isFetching}
      //                 onRefresh={this.onRefresh}>
      //             </RefreshControl>}
      //             data={this.state.data}
      //             renderItem={({ item }) => (
      //                 this.MembershipPlan(item)
      //             )}>
      //         </FlatList>
      //     </View>

      //     {this.state.isLoading &&
      //         <View style={{
      //             position: 'absolute',
      //             backgroundColor: '#000000aa',
      //             top: 0,
      //             bottom: 0,
      //             left: 0,
      //             right: 0,
      //             alignItems: 'center',
      //             justifyContent: 'center'
      //         }}>
      //             <ActivityIndicator
      //                 animating={this.state.isLoading}
      //                 size='large'
      //                 color={APP_YELLOW}>
      //             </ActivityIndicator>
      //         </View>
      //     }
      // </ImageBackground>
      // </SafeAreaView >

      <ImageBackground
        style={{ flex: 1 }}
        resizeMode="stretch"
        source={require("../assets/bg.png")}
      >
        <StatusBar barStyle="light-content" />
        <View
          style={{
            height: 45,
            width: "95%",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            alignSelf: "center",
            marginTop: Platform.OS === "ios" ? 25 : 7,
          }}
        >
          <View
            style={{
              height: 35,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: "EurostileBold",
                color: APP_YELLOW,
              }}
            >
              Services
            </Text>
          </View>
          <TouchableOpacity
            style={{
              height: 35,
              width: 35,
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              right: 13,
              top: 3,
            }}
            onPress={() => {
              this.props.navigation.navigate("FavouriteServices");
            }}
          >
            <Image
              style={{
                height: 35,
                width: 35,
                tintColor: APP_YELLOW,
              }}
              resizeMode="contain"
              source={require("../assets/heart.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          {this.state.orders.length == null || this.state.orders == 0 ? (
            <View
              style={{
                width: "95%",
                height: "100%",
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  color: "#C0C0C0",
                  textAlign: "center",
                  fontFamily: "EurostileBold",
                }}
                numberOfLines={0}
              >
                No services found, Please first add the detailer!
              </Text>
            </View>
          ) : (
            <SectionList
              refreshControl={
                <RefreshControl
                  tintColor={APP_YELLOW}
                  colors={["#D65050", "#D65050"]}
                  refreshing={this.state.isFetching}
                  onRefresh={this.onRefresh}
                />
              }
              sections={this.state.orders}
              renderItem={({ item, index, section }) =>
                this.Services(item, index, section)
              }
              keyExtractor={(item, index) => item + index}
              renderSectionHeader={({ section: { detailer_name } }) => (
                <View
                  style={{
                    height: 40,
                  }}
                >
                  <View
                    style={{
                      height: 40,
                      width: "100%",
                      justifyContent: "center",
                      backgroundColor: APP_YELLOW,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        marginLeft: 10,
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      {detailer_name}
                    </Text>
                  </View>
                </View>
              )}
              stickySectionHeadersEnabled={true}
            />
          )}
        </View>
        {this.state.isLoading && (
          <View
            style={{
              position: "absolute",
              backgroundColor: "#000000aa",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator
              animating={this.state.isLoading}
              size="large"
              color={APP_YELLOW}
            />
          </View>
        )}
      </ImageBackground>
    );
  }
  Services = (item, index, section) => {
    return (
      <TouchableOpacity
        style={{
          marginTop: 5,
          marginBottom: 5,
          width: "95%",
          alignSelf: "center",
          overflow: "hidden",
        }}
        onPress={() => {
          var a = this.state.orders.indexOf(section);
          let item = this.state.orders[a];
          if (section.id == item.id) {
            var data = item.data;
            var _data = data[index];
            var service_id = _data.service_id;
            _data.is_favourite =
              _data.is_favourite != null
                ? _data.is_favourite == "1"
                  ? "0"
                  : "1"
                : true;
            data[index] = _data;
            section.data = data;
            var ad = [...this.state.orders];
            ad[a] = section;
            this.setState({
              orders: ad,
            });

            this.FavouriteProducts(item.id, service_id, _data.is_favourite);
          }
        }}
      >
        <View style={{ flexDirection: "column" }}>
          <View>
            <ImageLoad
              style={{
                height: Dimensions.get("window").height / 4,
                width: "100%",
              }}
              resizeMode="cover"
              source={
                item.image == null || item.image == 0
                  ? require("../assets/placeholder.jpg")
                  : { uri: item.image }
              }
            />
            <View
              style={{
                height: 40,
                width: 40,
                position: "absolute",
                bottom: 5,
                right: 5,
              }}
            >
              <View
                style={{
                  height: 40,
                  width: 40,
                  overflow: "hidden",
                }}
              >
                <Image
                  style={{
                    height: 40,
                    width: 40,
                    tintColor: item.is_favourite == "1" ? "red" : "white",
                  }}
                  resizeMode="contain"
                  source={require("../assets/heart.png")}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              marginLeft: 5,
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: "EurostileBold",
                color: "#C0C0C0",
              }}
            >
              {item.name.toUpperCase()}
            </Text>

            <Text
              style={{
                marginTop: 10,
                fontSize: 17,
                color: "#C0C0C0",
                fontFamily: "EurostileBold",
              }}
              numberOfLines={2}
            >
              {item.description}
            </Text>
            <Text
              style={{
                fontSize: 17,
                marginTop: 5,
                color: APP_YELLOW,
                fontFamily: "EurostileBold",
              }}
              onPress={() => Linking.openURL(item.video_link)}
            >
              {" "}
              {item.video_link}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              height: 30,
              width: "30%",
              marginTop: item.video_link == null ? 0 : 5,
              marginBottom: 10,
              alignSelf: "flex-end",
              marginRight: 10,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: APP_YELLOW,
            }}
            onPress={() => {
              this.props.navigation.navigate("ServiceDetail", {
                data: item,
              });
            }}
          >
            <Text
              style={{
                color: "black",
                fontFamily: "EurostileBold",
              }}
            >
              View details
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };
}

// import React, { Component } from "react";
// import {
//   Text,
//   View,
//   SafeAreaView,
//   Image,
//   TextInput,
//   ScrollView,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   AsyncStorage,
//   ActivityIndicator,
//   Alert,
//   RefreshControl,
//   Dimensions,
//   ImageBackground,
//   SectionList,
//   StatusBar,
//   Linking,
// } from "react-native";
// import { APP_YELLOW, APP_BLUE } from "../Component/colors";
// import { FlatList } from "react-native-gesture-handler";
// import { CallGetApi, CallApi } from "../Component/ApiClient";
// import { NavigationActions } from "react-navigation";
// import ImageLoad from "react-native-image-placeholder";
// import { setupPushNotification } from './root'

// export default class Home extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       access_token: "",
//       car: "",
//       DATA: [],
//       orders: [],
//       user_id: "",
//       id: "",
//       isFetching: false,
//     };
//   }

//   // componentDidMount() {
//   //   this.load();
//   //   this.props.navigation.addListener("willFocus", this.load);
//   // }
//   // load = () => {
//   //   this.get("user_id");
//   // };

//       componentDidMount() {
//         this.checkPermission();
//         this.createNotificationListeners();
//         this.PushNotification = setupPushNotification(this._handleNotificationOpen)
//         this.load()
//         this.props.navigation.addListener('willFocus', this.load)
//     }
//     load = () => {
//         this.get('user_id')

//     }

//     _handleNotificationOpen = (data) => {
//          console.log(data)
//         const { navigate } = this.props.navigation
//         if (data.type == 'Accepted your request') {
//             navigate("DetailerList")
//         }
//         else if (data.type == 'Added new products') {
//             navigate("ProductList")
//         }
//         else if (data.type == 'Admin send notification')
//          {
//             navigate('Notification')
//         }

//     }

//     // componentWillUnmount() {
//     //     this.notificationListener();
//     //     this.notificationOpenedListener();
//     // }

//     async checkPermission() {
//         const enabled = await firebase.messaging().hasPermission();
//         // If Premission granted proceed towards token fetch
//         if (enabled) {
//             this.getToken();
//         } else {
//             // If permission hasn’t been granted to our app, request user in requestPermission method.
//             this.requestPermission();
//         }
//     }
//     async getToken() {
//         let fcmToken = await AsyncStorage.getItem('fcmToken');
//         if (!fcmToken) {
//             fcmToken = await firebase.messaging().getToken();
//             if (fcmToken) {
//                 // user has a device token
//                 await AsyncStorage.setItem('fcmToken', fcmToken);

//             }
//         }
//     }
//     async requestPermission() {
//         try {
//             await firebase.messaging().requestPermission();
//             // User has authorised
//             this.getToken();
//         } catch (error) {
//             // User has rejected permissions
//             console.log('permission rejected');
//         }
//     }

//     async get(key) {
//         try {
//             const value = await AsyncStorage.getItem(key);
//             const value2 = await AsyncStorage.getItem("fcmToken");
//             //alert(value)
//             if (value != null && value != '') {
//                 this.setState({
//                     user_id: value
//                 }, () => {
//                     this.PlanApi()
//                     this.tokenApi(value2)
//                 })
//             }
//         } catch (error) {

//         }
//     }

//     async createNotificationListeners() {
//         // This listener triggered when notification has been  received in foreground
//         this.notificationListener = firebase.notifications().onNotification((notification) => {
//             const { title, body,data } = notification;
//             const localNotification = PushNotification.localNotification({
//                 title: title,
//                 message: body,
//                 soundName: 'default',
//                 smallIcon: true,
//                 show_in_foreground: true,
//             })
//             return localNotification;
//         });

//         //This listener triggered when app is in backgound and we click, tapped and opened notifiaction
//         this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
//             const { data } = notificationOpen.notification;
//             console.log(data)

//         });
//         // // // This listener triggered when app is closed and we click,tapped and opened notification
//         const notificationOpen = await firebase.notifications().getInitialNotification();
//         if (notificationOpen) {
//             const { data } = notificationOpen.notification;
//             const { navigate } = this.props.navigation
//             console.log(data)
//             if (data.type == 'Accepted your request') {
//                 navigate('DetailerList')
//             }
//             else if (data.type == 'Added new products') {
//                 navigate('ProductList')
//             }
//             else if (data.type == 'Admin send notification') {
//                 navigate('Notification')
//             }
//         }
//     }

//     tokenApi = (fcmToken) => {
//         this.setState({
//             isLoading: true
//         })
//         CallApi('update_device_token',
//             {
//                 'user_id': "" + this.state.user_id,
//                 'device_type': Platform.OS == 'android' ? 'a' : 'i',
//                 'device_token': fcmToken
//             },
//             (data) => {
//                 //console.log(JSON.stringify(data))
//                 if (!data.error) {
//                     if (data.data.response.status == true) {

//                     }
//                     else {
//                         //alert(data.data.response.message)
//                     }
//                 } else {
//                     //alert('Somthing went wrong')
//                 }
//                 this.setState({
//                     isLoading: false
//                 })
//                 // alert(JSON.stringify(data))
//                 //nsole.log(data)
//             })
//     }
//   async get(key) {
//     try {
//       const value = await AsyncStorage.getItem(key);
//       //alert(value)
//       if (value != null && value != "") {
//         this.setState(
//           {
//             user_id: value,
//           },
//           () => {
//             this.ServiceApi();
//           }
//         );
//       }
//     } catch (error) {}
//   }

//   FavouriteProducts = (id, service_id, Selected) => {
//     var url = "";
//     url = Selected == "0" ? "remove_favourite_service" : "store_favourite_service";
//     console.log(url);
//     CallApi(
//       url,
//       {
//         user_id: "" + this.state.user_id,
//         detailer_id: id + "",
//         service_id: service_id + "",
//       },
//       (data) => {
//         console.log(JSON.stringify(data));
//         if (!data.error) {
//           if (data.data.response.status == true) {
//           }
//           else {
//             alert(data.data.response.message);
//           }
//         } else {
//           alert("Somthing went wrong");
//         }
//       }
//     );
//   };
//   ServiceApi = () => {
//     this.setState({
//       isLoading: true,
//     });
//     fetch(
//       "http://18.156.66.145/public/api/service_of_detailer/" +
//         "" +
//         this.state.user_id,
//       {
//         method: "GET",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//       }
//     )
//       .then((response) => response.json())
//       .then((responseJson) => {
//         console.log(JSON.stringify(responseJson));
//         if (responseJson.response.status == true) {
//           var mainArr = [];
//           //var title=[]
//           responseJson.response.data.map((item) => {
//             // if(item.detailer_name != null){
//             //     title.push(item.detailer_name)
//             // }
//             var product = [];
//             item.detailer_services.map((item) => {
//               if (item != null) {
//                 product.push(item);
//               }
//             });
//             var a = {
//               id: item.detailer_id,
//               detailer_name: item.detailer_name,
//               data: product,
//             };
//             mainArr.push(a);
//           });
//           this.setState({
//             orders: mainArr,
//           });
//           //console.log(JSON.stringify(mainArr))
//         } else {
//           alert(responseJson.response.message);
//         }
//         this.setState({
//           isLoading: false,
//           isFetching: false,
//         });
//       })
//       .catch((error) => {
//         console.error(error);
//         //  alert(error)
//         //  callback({ data: error });
//         //callback({error: true, data: error});
//       });
//   };

//   onRefresh = () => {
//     this.setState({ isFetching: true }, function() {
//       this.ServiceApi();
//     });
//   };
//   render() {
//     return (
//       // <SafeAreaView style={{ flex: 1 }}>
//       <ImageBackground
//         style={{ flex: 1 }}
//         resizeMode="stretch"
//         source={require("../assets/bg.png")}>
//         <StatusBar barStyle="light-content" />
//         <View
//           style={{
//             height: 45,
//             width: "95%",
//             justifyContent: "center",
//             alignItems: "center",
//             flexDirection: "row",
//             alignSelf: "center",
//             marginTop: Platform.OS === "ios" ? 25 : 7,
//           }}
//         >
//           <View
//             style={{
//               height: 35,
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <Text
//               style={{
//                 fontSize: 18,
//                 fontFamily: "EurostileBold",
//                 color: APP_YELLOW,
//               }}
//             >
//               Services
//             </Text>
//           </View>
//           <TouchableOpacity
//             style={{
//               height: 35,
//               width: 35,
//               alignItems: "center",
//               justifyContent: "center",
//               position: "absolute",
//               right: 13,
//               top: 3,
//             }}
//             onPress={() => {
//               this.props.navigation.navigate("FavouriteServices");
//             }}
//           >
//             <Image
//               style={{
//                 height: 35,
//                 width: 35,
//                 tintColor: APP_YELLOW,
//               }}
//               resizeMode="contain"
//               source={require("../assets/heart.png")}
//             />
//           </TouchableOpacity>
//         </View>
//         <View style={{ flex: 1 }}>
//           {this.state.orders.length == null || this.state.orders == 0 ? (
//             <View
//               style={{
//                 width: "95%",
//                 height: "100%",
//                 alignSelf: "center",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <Text
//                 style={{
//                   fontSize: 22,
//                   color: "#C0C0C0",
//                   textAlign: "center",
//                   fontFamily: "EurostileBold",
//                 }}
//                 numberOfLines={0}
//               >
//                 No services found, Please first add the detailer!
//               </Text>
//             </View>
//           ) : (
//             <SectionList
//               refreshControl={
//                 <RefreshControl
//                   tintColor={APP_YELLOW}
//                   colors={["#D65050", "#D65050"]}
//                   refreshing={this.state.isFetching}
//                   onRefresh={this.onRefresh}
//                 />
//               }
//               sections={this.state.orders}
//               renderItem={({ item, index, section }) =>
//                 this.Services(item, index, section)
//               }
//               keyExtractor={(item, index) => item + index}
//               renderSectionHeader={({ section: { detailer_name } }) => (
//                 <View
//                   style={{
//                     height: 40,
//                   }}
//                 >
//                   <View
//                     style={{
//                       height: 40,
//                       width: "100%",
//                       justifyContent: "center",
//                       backgroundColor: APP_YELLOW,
//                     }}
//                   >
//                     <Text
//                       style={{
//                         fontSize: 18,
//                         marginLeft: 10,
//                         color: "black",
//                         fontWeight: "bold",
//                       }}
//                     >
//                       {detailer_name}
//                     </Text>
//                   </View>
//                 </View>
//               )}
//               stickySectionHeadersEnabled={true}
//             />
//           )}
//         </View>
//         {this.state.isLoading && (
//           <View
//             style={{
//               position: "absolute",
//               backgroundColor: "#000000aa",
//               top: 0,
//               bottom: 0,
//               left: 0,
//               right: 0,
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <ActivityIndicator
//               animating={this.state.isLoading}
//               size="large"
//               color={APP_YELLOW}
//             />
//           </View>
//         )}
//       </ImageBackground>
//       // </SafeAreaView>
//     );
//   }
//   Services = (item, index, section) => {
//     return (
//       <TouchableOpacity
//         style={{
//           marginTop: 5,
//           marginBottom: 5,
//           width: "95%",
//           alignSelf: "center",
//           overflow: "hidden",
//         }}
//         onPress={() => {
//           var a = this.state.orders.indexOf(section);
//           let item = this.state.orders[a];
//           if (section.id == item.id) {
//             var data = item.data;
//             var _data = data[index];
//             var service_id = _data.service_id;
//             _data.is_favourite =
//               _data.is_favourite != null
//                 ? _data.is_favourite == "1"
//                   ? "0"
//                   : "1"
//                 : true;
//             data[index] = _data;
//             section.data = data;
//             var ad = [...this.state.orders];
//             ad[a] = section;
//             this.setState({
//               orders: ad,
//             });

//             this.FavouriteProducts(item.id, service_id, _data.is_favourite);
//           }
//         }}
//       >
//         <View style={{ flexDirection: "column" }}>
//           <View>
//             <ImageLoad
//               style={{
//                 height: Dimensions.get("window").height / 4,
//                 width: "100%",
//               }}
//               resizeMode="cover"
//               source={
//                 item.image == null || item.image == 0
//                   ? require("../assets/placeholder.jpg")
//                   : { uri: item.image }
//               }
//             />
//             <View
//               style={{
//                 height: 40,
//                 width: 40,
//                 position: "absolute",
//                 bottom: 5,
//                 right: 5,
//               }}
//             >
//               <View
//                 style={{
//                   height: 40,
//                   width: 40,
//                   overflow: "hidden",
//                 }}
//               >
//                 <Image
//                   style={{
//                     height: 40,
//                     width: 40,
//                     tintColor: item.is_favourite == "1" ? "red" : "white",
//                   }}
//                   resizeMode="contain"
//                   source={require("../assets/heart.png")}
//                 />
//               </View>
//             </View>
//           </View>
//           <View
//             style={{
//               marginLeft: 5,
//               marginTop: 10,
//             }}
//           >
//             <Text
//               style={{
//                 fontSize: 18,
//                 fontFamily: "EurostileBold",
//                 color: "#C0C0C0",
//               }}
//             >
//               {item.name.toUpperCase()}
//             </Text>

//             <Text
//               style={{
//                 marginTop: 10,
//                 fontSize: 17,
//                 color: "#C0C0C0",
//                 fontFamily: "EurostileBold",
//               }}
//               numberOfLines={2}
//             >
//               {item.description}
//             </Text>
//             <Text
//               style={{
//                 fontSize: 17,
//                 marginTop: 5,
//                 color: APP_YELLOW,
//                 fontFamily: "EurostileBold",
//               }}
//               onPress={() => Linking.openURL(item.video_link)}
//             >
//               {" "}
//               {item.video_link}
//             </Text>
//           </View>
//           <TouchableOpacity
//             style={{
//               height: 30,
//               width: "30%",
//               marginTop: item.video_link == null ? 0 : 5,
//               marginBottom: 10,
//               alignSelf: "flex-end",
//               marginRight: 10,
//               alignItems: "center",
//               justifyContent: "center",
//               backgroundColor: APP_YELLOW,
//             }}
//             onPress={() => {
//               this.props.navigation.navigate("ServiceDetail", {
//                 data: item,
//               });
//             }}
//           >
//             <Text
//               style={{
//                 color: "black",
//                 fontFamily: "EurostileBold",
//               }}
//             >
//               View details
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </TouchableOpacity>
//     );
//   };
// }
