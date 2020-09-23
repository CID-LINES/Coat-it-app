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
  Platform,
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  Dimensions,
  ImageBackground,
} from "react-native";
import { APP_BLUE, APP_YELLOW } from "../Component/colors";
import { ApiCall, ApiCallWithImage } from "../Component/ApiClient";
import ImagePicker from "react-native-image-picker";
import { NavigationActions } from "react-navigation";
import { strings } from "./Localization";
import firebase from "react-native-firebase";

export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      phone: "",
      firstname: "",
      lastname: "",
      filePath: "",
      confirmpassword: "",
      isLoading: false,
    };
  }

  chooseFile = () => {
    var options = {
      title: "Select Image",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
      allowsEditing: true,
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log("Response = ", response);
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
        alert(response.customButton);
      } else {
        let source = response;
        this.setState({
          filePath: source,
        });
      }
    });
  };

  componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners();
    AsyncStorage.getItem("user_id", (error, item) => {
      if (item != null && item != "") {
        this.props.navigation.push("Home");
      }
    });
  }
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
  async createNotificationListeners() {
    // this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
    //     // Process your notification as required
    //     // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
    //      alert(JSON.stringify(notification))
    //   });
    // This listener triggered when notification has been received in foreground
    this.notificationListener = firebase
      .notifications()
      .onNotification((notification) => {
        const { title, body } = notification;
        // this.navigate(title, body)
      });

    // This listener triggered when app is in backgound and we click, tapped and opened notifiaction
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened((notificationOpen) => {
        const { title, body } = notificationOpen.notification;
        //this.navigate(title, body)
      });

    // This listener triggered when app is closed and we click,tapped and opened notification
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      //this.navigate(title, body)
    }
  }
  async save(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
      //alert(JSON.stringify(value))
    } catch (error) {
      // console.log("Error saving data" + error);
    }
  }

  SignUp = (fcmToken) => {
    this.setState({
      isLoading: true,
    });
    let body = new FormData();
    if (this.state.filePath.uri) {
      var photo = {
        uri: this.state.filePath.uri,
        type: "image/jpeg",
        name: "photo.jpg",
      };
    }
    body.append("avatar", photo);
    body.append("email", this.state.email);
    body.append("password", this.state.password);
    body.append("first_name", this.state.firstname);
    body.append("last_name", this.state.lastname);
    body.append("phone_no", this.state.phone);
    body.append("device_token", fcmToken + ""),
      body.append("device_type", Platform.OS == "android" ? "a" : "i");
    body.append("confirm_password", this.state.confirmpassword);

    fetch("http://18.156.66.145/public/api/auth/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        //  'Content-Type': 'application/json'
      },
      body: body,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.response.Status == true) {
          this.save("user_id", responseJson.response.id + "");
          this.save(
            "customer_id",
            responseJson.response.details.customer_id + ""
          );
          this.props.navigation.reset(
            [NavigationActions.navigate({ routeName: "CarDetail" })],
            0
          );
        } else {
          alert(responseJson.response.message);
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
      // <SafeAreaView style={{ flex: 1,}}>
      <ImageBackground
        style={{ flex: 1, backgroundColor: "black" }}
        resizeMode="stretch"
        //source={require('../assets/bg.png')}
      >
        <StatusBar barStyle="light-content" />
        <View style={{ flex: 1 }}>
          <View
            style={{
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
              height: 40,
              width: "100%",
              marginTop: Platform.OS === "ios" ? 25 : 7,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: APP_YELLOW,
                fontFamily: "EurostileBold",
              }}
            >
              Kenotek Coat IT
            </Text>
          </View>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior="padding"
            enabled={Platform.OS === "ios"}
            keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 0}
          >
            <ScrollView style={{ flex: 1 }}>
              <TouchableOpacity
                style={{
                  height: Dimensions.get("window").height / 3.5,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 10,
                }}
                onPress={() => {
                  this.chooseFile();
                }}
              >
                <View
                  style={{
                    flex: 1,
                    width: "95%",
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                  }}
                >
                  <Image
                    style={{
                      flex: 1,
                      width: "95%",
                    }}
                    resizeMode="cover"
                    source={
                      this.state.filePath == ""
                        ? require("../assets/placeholder.jpg")
                        : this.state.filePath
                    }
                  />
                </View>
                <View
                  style={{
                    height: 40,
                    width: "60%",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    bottom: 5,
                    flexDirection: "row",
                    right: 28,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "EurostileBold",
                      color: "white", //this.state.filePath == ''? 'black' : '#C0C0C0'
                    }}
                  >
                    Upload profile picture here
                  </Text>
                  <Image
                    style={{
                      height: 30,
                      width: 30,
                      marginLeft: 10,
                      tintColor: "white",
                      //this.state.filePath == "" ? "black" : "#C0C0C0",
                    }}
                    source={require("../assets/camera.png")}
                  />
                </View>
              </TouchableOpacity>
              <View
                style={{
                  width: "100%",
                  marginTop: 20,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    width: "80%",
                    color: "#C0C0C0",
                    fontFamily: "EurostileBold",
                  }}
                >
                  First name
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    width: "80%",
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{
                      height: 25,
                      tintColor: APP_YELLOW,
                      width: 25,
                    }}
                    source={require("../assets/user.png")}
                    resizeMode="cover"
                  />
                  <TextInput
                    style={{
                      height: 40,
                      width: "75%",
                      marginTop: 2,
                      borderRadius: 10,
                      padding: 5,
                      color: "#C0C0C0",
                    }}
                    value={this.state.firstname}
                    onChangeText={(value) => {
                      this.setState({ firstname: value });
                    }}
                    keyboardType="ascii-capable"
                    placeholder="Enter your first name"
                    placeholderTextColor="#C0C0C0"
                  />
                </View>
      
                <Text
                  style={{
                    width: "80%",
                    color: "#C0C0C0",
                    marginTop: 10,
                    fontFamily: "EurostileBold",
                  }}
                >
                  Last name
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    width: "80%",
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{
                      height: 25,
                      tintColor: APP_YELLOW,
                      width: 25,
                    }}
                    source={require("../assets/user.png")}
                    resizeMode="cover"
                  />
                  <TextInput
                    style={{
                      height: 40,
                      width: "75%",
                      marginTop: 2,
                      color: "#C0C0C0",
                      borderRadius: 10,
                      padding: 5,
                    }}
                    keyboardType="ascii-capable"
                    value={this.state.lastname}
                    onChangeText={(value) => {
                      this.setState({ lastname: value });
                    }}
                    placeholder="Enter your last name"
                    placeholderTextColor="#C0C0C0"
                  />
                </View>
            
                <Text
                  style={{
                    width: "80%",
                    marginTop: 10,
                    color: "#C0C0C0",
                    fontFamily: "EurostileBold",
                  }}
                >
                  Email
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    width: "80%",
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{
                      height: 25,
                      tintColor: APP_YELLOW,
                      width: 25,
                    }}
                    source={require("../assets/email.png")}
                    resizeMode="cover"
                  />
                  <TextInput
                    style={{
                      height: 40,
                      width: "75%",
                      marginTop: 2,
                      borderRadius: 10,
                      padding: 5,
                      color: "#C0C0C0",
                    }}
                    value={this.state.email}
                    onChangeText={(value) => {
                      this.setState({ email: value });
                    }}
                    keyboardType="ascii-capable"
                    placeholder="Enter your email"
                    placeholderTextColor="#C0C0C0"
                  />
                </View>

                <Text
                  style={{
                    width: "80%",
                    marginTop: 10,
                    color: "#C0C0C0",
                    fontFamily: "EurostileBold",
                  }}
                >
                  Phone No.
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    width: "80%",
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{
                      height: 25,
                      tintColor: APP_YELLOW,
                      width: 25,
                    }}
                    source={require("../assets/phone.png")}
                    resizeMode="cover"
                  />
                  <TextInput
                    style={{
                      height: 40,
                      width: "75%",
                      marginTop: 2,
                      borderRadius: 10,
                      padding: 5,
                      color: "#C0C0C0",
                    }}
                    value={this.state.phone}
                    onChangeText={(value) => {
                      this.setState({ phone: value });
                    }}
                    keyboardType="number-pad"
                    returnKeyType="done"
                    placeholder="Enter your phone no"
                    placeholderTextColor="#C0C0C0"
                  />
                </View>
                <Text
                  style={{
                    width: "80%",
                    marginTop: 10,
                    color: "#C0C0C0",
                    fontFamily: "EurostileBold",
                  }}
                >
                  Password
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    width: "80%",
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{
                      height: 25,
                      tintColor: APP_YELLOW,
                      width: 25,
                    }}
                    source={require("../assets/lock.png")}
                    resizeMode="cover"
                  />
                  <TextInput
                    style={{
                      height: 40,
                      width: "75%",
                      marginTop: 2,
                      color: "#C0C0C0",
                      borderRadius: 10,
                      padding: 5,
                    }}
                    secureTextEntry={true}
                    keyboardType="ascii-capable"
                    value={this.state.password}
                    onChangeText={(value) => {
                      this.setState({ password: value });
                    }}
                    placeholder="Enter your password"
                    placeholderTextColor="#C0C0C0"
                  />
                </View>
                <Text
                  style={{
                    width: "80%",
                    marginTop: 10,
                    color: "#C0C0C0",
                    fontFamily: "EurostileBold",
                  }}
                >
                  Confirm Password
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    width: "80%",
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{
                      height: 25,
                      tintColor: APP_YELLOW,
                      width: 25,
                    }}
                    source={require("../assets/lock.png")}
                    resizeMode="cover"
                  />
                  <TextInput
                    style={{
                      height: 40,
                      width: "75%",
                      marginTop: 2,
                      color: "#C0C0C0",
                      borderRadius: 10,
                      padding: 5,
                    }}
                    secureTextEntry={true}
                    keyboardType="ascii-capable"
                    value={this.state.confirmpassword}
                    onChangeText={(value) => {
                      this.setState({ confirmpassword: value });
                    }}
                    placeholder="Enter your Confirm password"
                    placeholderTextColor="#C0C0C0"
                  />
                </View>
              </View>

              <TouchableOpacity
                style={{
                  height: 50,
                  width: "60%",
                  backgroundColor: APP_YELLOW,
                  marginTop: 20,
                  alignSelf: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => {
                  this.signup();
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: "black",
                    fontFamily: "EurostileBold",
                  }}
                >
                  Submit
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("Login");
                }}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    marginTop: 5,
                    color: "gray",
                    marginBottom: 15,
                    marginTop: 10,
                    fontFamily: "EurostileBold",
                    color: "#C0C0C0",
                  }}
                >
                  Already have an account ?
                  <Text
                    style={{
                      alignSelf: "center",
                      color: APP_YELLOW,
                      fontFamily: "EurostileBold",
                    }}
                  >
                    {" "}
                    Login here
                  </Text>
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
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
      // </SafeAreaView>
    );
  }
  signup = async () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (this.state.firstname == "") {
      alert("Please enter the first name");
    } else if (this.state.lastname == "") {
      alert("Please enter the last name");
    } else if (this.state.email == "") {
      alert("Please enter the email");
    } else if (!reg.test(this.state.email)) {
      alert("Please enter the valid email");
    } else if (this.state.password == "") {
      alert("Please enter the password");
    } else if (this.state.confirmpassword == "") {
      alert("Please enter the confirm password");
    } else if (this.state.confirmpassword != this.state.password) {
      alert("Please enter the correct confirm password");
    } else if (this.state.phone == "") {
      alert("Please enter the phone number");
    } else {
      const value = await AsyncStorage.getItem("fcmToken");
      this.SignUp(value);
    }
  };
}
