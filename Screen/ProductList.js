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
  ImageBackground,
  SectionList,
  StatusBar,
  Linking,
} from "react-native";
import { APP_YELLOW, APP_BLUE } from "../Component/colors";
import { FlatList } from "react-native-gesture-handler";
import { CallGetApi, CallApi } from "../Component/ApiClient";
import { NavigationActions } from "react-navigation";
import ImageLoad from "react-native-image-placeholder";

export default class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
            this.ProductApi();
          }
        );
      }
    } catch (error) {}
  }

  FavouriteProducts = (id, product_id, Selected) => {
    var url = "";
    url = Selected == "0" ? "remove_favourite" : "store_favourite_products";
    console.log(url);
    CallApi(
      url,
      {
        user_id: "" + this.state.user_id,
        detailer_id: id,
        product_id: product_id,
      },
      (data) => {
        console.log(JSON.stringify(data));
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
  ProductApi = () => {
    this.setState({
      isLoading: true,
    });
    fetch(
      "http://18.156.66.145/public/api/products_list/" +
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
        console.log(JSON.stringify(responseJson));
        if (responseJson.response.status == true) {
          var mainArr = [];
          //var title=[]
          responseJson.response.data.map((item) => {
            // if(item.detailer_name != null){
            //     title.push(item.detailer_name)
            // }
            var product = [];
            item.detailer_products.map((item) => {
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
    this.setState({ isFetching: true }, function () {
      this.ProductApi();
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
              Products
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
              this.props.navigation.navigate("FavouriteProducts");
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
                   No products found, Please first add the detailer!
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
                ></RefreshControl>
              }
              sections={this.state.orders}
              renderItem={({ item, index, section }) =>
             
                this.Products(item, index, section)
              }
              keyExtractor={(item, index) => item + index}
              renderSectionHeader={({ section: { detailer_name, index } }) => (
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
            ></ActivityIndicator>
          </View>
        )}
      </ImageBackground>
      // </SafeAreaView>
    );
  }
  Products = (item, index, section) => {
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
            var product_id = _data.product_id;
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

            this.FavouriteProducts(item.id, product_id, _data.is_favourite);
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
            ></ImageLoad>
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
                }}>
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
              //borderRadius: 5,
              marginBottom: 10,
              alignSelf: "flex-end",
              marginRight: 10,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: APP_YELLOW,
            }}
            onPress={() => {
              this.props.navigation.navigate("ProductDetail", {
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
