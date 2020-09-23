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
  Alert,
  Share,
  AsyncStorage,
  ActivityIndicator,
  Dimensions,
  ImageBackground,
} from "react-native";
import { APP_BLUE, APP_LIGHT, APP_YELLOW, APP_GRAY } from "../Component/colors";
import { StackActions, NavigationActions } from "react-navigation";
import { CallGetApi } from "../Component/ApiClient";
import ImageLoad from "react-native-image-placeholder";
import { strings } from "./Localization";
//import { Platform } from 'react-native';
//import Share from 'react-native-share';

export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      isShow: false,
    };
  }

  componentDidMount() {
    this.load();
    this.props.navigation.addListener("willFocus", this.load);
  }
  load = () => {
    this.get("user_id");
  };

  async get(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      //alert(value)
      if (value != null && value != "") {
        this.setState(
          {
            user_id: value,
          },
          () => {
            this.UserDetailerApi();
          }
        );
      }
    } catch (error) {}
  }

  UserDetailerApi = () => {
    this.setState({
      isLoading: true,
    });

    fetch("http://18.156.66.145/public/api/userProfile/" + this.state.user_id, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        //  'Content-type':'multipart/form-data'
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(JSON.stringify(responseJson.response));
        if (responseJson.response.status == true) {
          this.setState({
            data: responseJson.response.userProfile,
          });
        }
        this.setState({
          isLoading: false,
        });
      })
      .catch((error) => {
        console.error(error);
        //  alert(error)
        //  callback({ data: error });
        //callback({error: true, data: error});
      });
  };

  render() {
    return (
      // <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ImageBackground
        style={{ flex: 1 }}
        resizeMode="stretch"
        source={require("../assets/bg.png")}
      >
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
          <View style={{ marginTop: Platform.OS === "ios" ? 30 : 7 }}>
            <View
              style={{
                height: 40,
                width: "95%",
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: APP_YELLOW,
                  fontFamily: "EurostileBold",
                }}
              >
                User Profile
                {/* {strings.userpr} */}
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
                this.props.navigation.navigate("Settings");
              }}
            >
              <Image
                style={{
                  height: 22,
                  width: 22,
                  tintColor: APP_YELLOW,
                }}
                resizeMode="contain"
                source={require("../assets/logout.png")}
              />
            </TouchableOpacity>
          </View>
          <ScrollView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  height: Dimensions.get("window").height / 4,
                  marginTop: 5,
                  width: "100%",
                  justifyContent: "center",
                  // backgroundColor:'pink'
                }}
              >
                <View
                  style={{
                    height: 150,
                    width: 150,
                    borderRadius: 90,
                    alignSelf: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        isShow: true,
                      });
                    }}
                  >
                    <ImageLoad
                      style={{
                        height: 150,
                        width: 150,
                      }}
                      resizeMode="cover"
                      source={
                        this.state.data.avatar == null
                          ? require("../assets/placeholder.jpg")
                          : { uri: this.state.data.avatar }
                      }
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={{
                    height: 40,
                    width: 40,
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: Dimensions.get("window").fontScale * 125,
                    marginTop: Dimensions.get("window").fontScale * -50,
                    alignSelf: "center",
                  }}
                  onPress={() => {
                    this.props.navigation.navigate("EditProfile", {
                      data: this.state.data,
                    });
                  }}
                >
                  <Image
                    style={{
                      height: 35,
                      width: 35,
                      marginLeft: 10,
                      tintColor: APP_GRAY,
                    }}
                    source={require("../assets/service-icon.png")}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: "90%",
                  justifyContent: "center",
                  alignSelf: "center",
                  marginTop: 10,
                  alignItems: "center",
                  borderRadius: 10,
                 
                }}
              >
                <View
                  style={{
                    alignItems: "flex-start",
                    marginLeft: 20,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      //justifyContent:'space-between',
                      // backgroundColor:'pink',
                      //width:'60%',
                     
                    }}
                  >
                    {/* <Image style={{
                                            height: 30,
                                            width: 30, tintColor: APP_YELLOW
                                        }}
                                            source={require('../assets/id.png')}></Image> */}
                    <View
                      style={{
                        alignItems: "flex-start",
                        marginLeft: 10,
                        justifyContent: "flex-start",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "EurostileBold",
                          fontSize: 17,
                          color: APP_YELLOW,
                        }}
                      >
                        Customer id
                        {/* {strings.cusId} */}
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          marginTop: 5,
                          fontFamily: "EurostileBold",
                          marginRight: 15,
                          color: "#C0C0C0",
                        }}
                        numberOfLines={0}
                      >
                        {this.state.data.customer_id}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 10,
                      // width:'60%',
                      // justifyContent:'space-between'
                    }}
                  >
                    {/* <Image style={{
                                            height: 25,
                                            width: 25, tintColor: APP_YELLOW
                                        }}
                                            source={require('../assets/user.png')}></Image> */}
                    <View style={{ marginLeft: 10 }}>
                      <Text
                        style={{
                          fontFamily: "EurostileBold",
                          fontSize: 17,
                          color: APP_YELLOW,
                        }}
                      >
                        Name
                        {/* {strings.name} */}
                      </Text>
                      <Text
                        style={{
                          color: "#C0C0C0",
                          fontSize: 17,
                          marginRight: 15,
                          fontFamily: "EurostileBold",
                        }}
                        numberOfLines={0}
                      >
                        {this.state.data.first_name} {this.state.data.last_name}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 10,
                      // width:'80%',justifyContent:'space-between'
                    }}
                  >
                    {/* <Image style={{
                                            height: 25,
                                            tintColor: APP_YELLOW,
                                            width: 25
                                        }}
                                            source={require('../assets/email.png')}></Image> */}
                    <View style={{ marginLeft: 10 }}>
                      <Text
                        style={{
                          fontFamily: "EurostileBold",
                          fontSize: 17,
                          color: APP_YELLOW,
                        }}
                      >
                        Email
                        {/* {strings.email} */}
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          marginRight: 15,
                          color: "#C0C0C0",
                          fontFamily: "EurostileBold",
                        }}
                        numberOfLines={0}
                      >
                        {this.state.data.email}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 10,
                      marginBottom: 10,
                      // width:'60%',justifyContent:'space-between'
                    }}
                  >
                    {/* <Image style={{
                                            height: 25,
                                            width: 25, tintColor: APP_YELLOW
                                        }}
                                            source={require('../assets/phone.png')}></Image> */}
                    <View style={{ marginLeft: 10 }}>
                      <Text
                        style={{
                          fontFamily: "EurostileBold",
                          fontSize: 17,
                          color: APP_YELLOW,
                        }}
                      >
                        Phone no
                        {/* {strings.pn} */}
                      </Text>
                      <Text
                        style={{
                          // marginRight: 15,
                          fontSize: 16,
                          color: "#C0C0C0",
                          fontFamily: "EurostileBold",
                        }}
                      >
                        {this.state.data.phone_no}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ marginTop: 10 }}>
                <TouchableOpacity
                  style={{
                    height: 40,
                    width: "60%",
                    alignItems: "center",
                    justifyContent: "center",
                    //borderRadius: 10,
                    alignSelf: "center",
                    backgroundColor: APP_YELLOW,
                  }}
                  onPress={() => {
                    this.props.navigation.navigate("DetailerList");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      color: "black",
                      fontFamily: "EurostileBold",
                    }}
                  >
                    My Detailer
                    {/* {strings.mydetailer} */}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    height: 40,
                    width: "60%",
                    marginTop: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    // borderRadius: 10,
                    alignSelf: "center",
                    backgroundColor: APP_YELLOW,
                  }}
                  onPress={() => {
                    this.props.navigation.navigate("MyCars");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: "EurostileBold",
                      color: "black",
                    }}
                  >
                    My Cars
                    {/* {strings.mycars} */}
                  </Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={{
                                    height: 40, width: '60%',
                                    marginTop: 10,
                                    alignItems: "center",
                                    justifyContent: 'center',
                                    borderRadius: 10,
                                    alignSelf: 'center',
                                    backgroundColor: APP_YELLOW, 
                                    marginBottom: 10

                                }}
                                   >
                                    <Text style={{
                                        fontSize: 18,
                                        color: 'black', 
                                        fontFamily: 'EurostileBold',
                                    }}>Settings</Text>
                                </TouchableOpacity> */}
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        {this.state.isShow && (
          <TouchableOpacity
            style={{
              position: "absolute",
              backgroundColor: "#000000aa",
              //backgroundColor:'black',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              this.setState({
                isShow: false,
              });
            }}
          >
            <View
              style={{
                height: Dimensions.get("window").height / 2,
                width: "100%",
              }}
            >
              <ImageLoad
                style={{
                  flex: 1,
                  width: "100%",
                }}
                resizeMode="cover"
                source={
                  this.state.data.avatar == null
                    ? require("../assets/placeholder.jpg")
                    : { uri: this.state.data.avatar }
                }
              />
            </View>
          </TouchableOpacity>
        )}
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
      // </SafeAreaView >
    );
  }
}
