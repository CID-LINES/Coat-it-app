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
  AsyncStorage,
  ActivityIndicator,
  Alert,
  RefreshControl,
  Dimensions,
  FlatList,
  ImageBackground,
} from "react-native";
import { APP_YELLOW, APP_BLUE } from "../Component/colors";
// import {  } from "react-native-gesture-handler";
import { CallGetApi } from "../Component/ApiClient";
import { NavigationActions } from "react-navigation";
import ImageLoad from "react-native-image-placeholder";

const DATA = [
  {
    title: "Swift",
    // image:require('../assets/car')
  },
  {
    title: "Swift",
    // image:require('../assets/car')
  },
  {
    title: "Swift",
    // image:require('../assets/car')
  },
];

export default class MyCars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: "",
      car: "",
      user_id: "",
      id: "",
      isFetching: false,
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
      // alert(value)
      if (value != null && value != "") {
        this.setState(
          {
            user_id: value,
          },
          () => {
            this.MycarApi();
          }
        );
      }
    } catch (error) {}
  }

  MycarApi = () => {
    this.setState({
      isLoading: true,
    });
    fetch(
      "http://18.156.66.145/public/api/cardetails/" + this.state.user_id + "",
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
        console.log(JSON.stringify(responseJson.response));
        if (responseJson.response.status == true) {
          // this.save('car_id',responseJson.response.carDetails.id +'' )
          this.setState({
            car: responseJson.response.carDetails,
          });
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

  DeletecarApi = (id, index) => {
    this.setState({
      isLoading: true,
    });

    fetch("http://18.156.66.145/public/api/delete_car/" + "" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(JSON.stringify(responseJson));
        if (responseJson.response.status == true) {
          var item = this.state.car;
          item.splice(index, 1);
          this.setState({
            car: item,
          });
          alert(responseJson.response.message);
        }
        this.setState({
          isLoading: false,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  onRefresh = () => {
    this.setState({ isFetching: true }, function() {
      this.MycarApi();
    });
  };

  render() {
    return (
      // <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        style={{ flex: 1 }}
        resizeMode="stretch"
        source={require("../assets/bg.png")}
      >
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
          <TouchableOpacity
            style={{
              height: 35,
              width: 35,
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              left: 5,
            }}
            onPress={() => {
              this.props.navigation.goBack();
            }}
          >
            <Image
              style={{
                height: 20,
                width: 20,
                tintColor: APP_YELLOW,
              }}
              resizeMode="contain"
              source={require("../assets/back.png")}
            />
          </TouchableOpacity>
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
              My Cars
            </Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          {this.state.car.length == null || this.state.car == 0 ? (
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
                No car available. Please use Add (+) option to add car.
              </Text>
            </View>
          ) : (
            <FlatList
              style={{
                flex: 1,
                marginTop: 10,
                marginBottom: 20,
              }}
              refreshControl={
                <RefreshControl
                  tintColor={APP_YELLOW}
                  colors={["#D65050", "#D65050"]}
                  refreshing={this.state.isFetching}
                  onRefresh={this.onRefresh}
                />
              }
              data={this.state.car}
              renderItem={({ item, index }) => this.MyCars(item, index)}
            />
          )}
          <TouchableOpacity
            style={{
              height: 60,
              width: 60,
              borderRadius: 30,
              backgroundColor: APP_YELLOW,
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              alignContent: "flex-end",
              right: 20,
              bottom: 40,
            }}
            onPress={() => {
              this.props.navigation.navigate("AddCar");
            }}
          >
            <Image
              style={{
                height: 35,
                width: 35,
                tintColor: "white",
              }}
              resizeMode="contain"
              source={require("../assets/plus-icon.png")}
            />
          </TouchableOpacity>
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
  MyCars = (item, index) => {
    return (
      <TouchableOpacity
        style={{
          // height: 120,
          marginTop: 5,
          marginBottom: 5,
          width: "95%",
          //borderRadius: 10,
          alignSelf: "center",
          overflow: "hidden",
        }}
        onPress={() => {
         
          this.props.navigation.navigate("EditCarDetail", {
            data: item,
          });
        }}
      >
        <View style={{ flexDirection: "column" }}>
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
              marginLeft: 5,
              marginTop: 10,
              // alignItems:'center',
              // justifyContent:'center'
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "700",
                  fontFamily: "EurostileBold",
                  color: "#C0C0C0",
                }}
              >
                {item.brand_name}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  position: "absolute",
                  right: 5,
                  fontFamily: "EurostileBold",
                  color: "#C0C0C0",
                }}
              >
                {item.model_name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
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
                {item.vehicle_no}
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  color: "#C0C0C0",
                   position: "absolute",
                  right: 5,
                  fontFamily: "EurostileBold",
                }}
              >
                {item.manufacture_year}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                height: 25,
                width: 25,
                marginTop: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                Alert.alert(
                  "Remove item",
                  "Are you sure you want to remove this car?",
                  [
                    {
                      text: "Remove",
                      onPress: () => {
                        this.DeletecarApi(item.id, index);
                      },
                    },
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                  ],
                  { cancelable: false }
                );
              }}
            >
              <Image
                style={{
                  height: 24,
                  width: 24,
                  tintColor: "#C0C0C0",
                }}
                source={require("../assets/delete-icon.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
}
