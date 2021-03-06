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
  SectionList,
  AsyncStorage,
  ActivityIndicator,
  Alert,
  RefreshControl,
  Dimensions,
  ImageBackground,
} from "react-native";
import { APP_YELLOW, APP_BLUE, APP_LIGHT, APP_GRAY } from "../Component/colors";
import { FlatList } from "react-native-gesture-handler";
import ImageLoad from "react-native-image-placeholder";
import moment from "moment";
import { ApiCall,CallGetApi } from "../Component/ApiClient";

export default class DetailerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "",
      DATA: [],
      isFetching: false,
      previewurl: null,
      searchText: "",
      filteredData: [],
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
            this.DetailerListApi();
          }
        );
      }
    } catch (error) {}
  }

  DetailerListApi = () => {
    this.setState({
      isLoading: true,
    });

    fetch(
      "http://18.156.66.145/public/api/request_accepted/" + this.state.user_id,
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
          this.setState({
            DATA: responseJson.response.details,
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

  onRefresh = () => {
    this.setState({ isFetching: true }, function() {
      this.DetailerListApi();
    });
  };

  search = (searchText) => {
    this.setState({ searchText: searchText });
    let filteredData = this.state.DATA.filter(function(item) {
      return item.first_name.toLowerCase().includes(searchText.toLowerCase());
    });
    this.setState({ filteredData: filteredData });
  };

  // searchDetailerApi = (name) => {
   
  //   fetch("http://18.156.66.145/public/api/search_detailer", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //      "name": name,
  //      "user_id": this.state.user_id +''
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((responseData) => {
  //        console.log("RESULTS HERE:", responseData);
  //       // if(responseData.status ==true){
  //       //   console.log("RESULTS HERE:", responseData);
  //       // }
  //       // else{
  //       //   alert(responseData.message)
  //       // }
       
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

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
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            alignSelf: "center",
            marginTop: Platform.OS === "ios" ? 25 : 7,
          }}
        >
          <TouchableOpacity
            style={{
              height: 25,
              width: 25,
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              left: 10,
            }}
            onPress={() => {
              this.props.navigation.goBack();
            }}
          >
            <Image
              style={{
                height: 25,
                width: 25,
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
                color: APP_YELLOW,
                fontFamily: "EurostileBold",
              }}
            >
              Detailers List
            </Text>
          </View>
        </View>
        <View
          style={{
            height: 40,
            width: "80%",
            borderColor: APP_YELLOW,
            alignItems: "center",
            borderWidth: 2,
            borderRadius: 10,
            alignSelf: "center",
            flexDirection: "row",
          }}
        >
          <Image
            style={{
              height: 20,
              marginLeft: 10,
              width: 20,
            }}
            resizeMode="contain"
            source={require("../assets/search-icon.png")}
          />
          <TextInput
            style={{
              height: 38,
              width: "86%",
              marginLeft: 10,
              color: "#C0C0C0",
            }}
            value={this.state.searchText}
            onChangeText={(searchText) => {
              this.search(searchText)
              // this.setState({
              //   searchText: searchText,
              // });
              // if (searchText == null || searchText == "") {

              // } 
              // else {
              //   this.searchDetailerApi(searchText);
              // }
            }}
            placeholder="Search"
            placeholderTextColor="#C0C0C0"
          />
        </View>
        {/* {this.state.DATA.length == 0 || this.state.DATA == null ?
                    <View style={{
                        width: '95%', 
                        flex: 1,
                        alignSelf: 'center',
                        justifyContent: "center",
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontSize: 22,
                            color: '#C0C0C0',
                            textAlign: 'center',
                            fontFamily: 'EurostileBold'
                        }}
                            numberOfLines={0}>
                            No detailers found, Please visit your latest detailer to get detailing!
                        </Text>
                    </View> :
                    <View style={{ flex: 1 }}> */}

        {this.state.DATA.length == 0 || this.state.DATA == null ? (
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
              No detailer available. Please use Add (+) option to add new
              detailer.
            </Text>
          </View>
        ) : (
          <FlatList
            style={{
              marginTop: 10,
              marginBottom: 20,
            }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                tintColor={APP_YELLOW}
                colors={["#D65050", "#D65050"]}
                refreshing={this.state.isFetching}
                onRefresh={this.onRefresh}
              />
            }
            data={
              //this.state.DATA
              this.state.searchText.length > 0
              ? this.state.filteredData
              : this.state.DATA
            }
            renderItem={({ item, index }) => this.DetailerList(item, index)}
          />
        )}
        {/* </View>} */}
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
            bottom: 20,
          }}
          onPress={() => {
            var detailer = [];
            this.state.DATA.map((item) => {
              if (item.id != null) {
                detailer.push(item.id);
              }
            });
            this.props.navigation.navigate("AddDetailer", {
              data: detailer,
            });
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
        {/* </ScrollView> */}

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
        {/* {
                    this.state.isShow &&
                    <TouchableOpacity style={{
                        position: 'absolute',
                        backgroundColor: '#000000aa',
                        //backgroundColor:'black',
                        top: 0,
                        bottom: 0, left: 0, right: 0,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }} onPress={() => {
                        this.setState({
                            previewurl:null,
                            isShow: false
                        })
                    }}>
                        <View style={{
                            height: 400,
                            width: '100%'
                        }}
                        >
                            <ImageLoad style={{ flex: 1, width: '100%' }}
                                resizeMode=
                                'cover'
                                source={{ uri 
                                :this.state.previewurl }}></ImageLoad>
               </View>

            </TouchableOpacity>
        } */}
      </ImageBackground>
      // </SafeAreaView`>
    );
  }

  DetailerList = (item, index) => {
    return (
      <TouchableOpacity
        style={{
          marginTop: 5,
          marginBottom: 5,
          width: "90%",
          alignSelf: "center",
          overflow: "hidden",
          flexDirection: "row",
        }}
        onPress={() => {
          if (item.request_accepted == 0) {
            alert("Your request is pending");
          } else {
            this.props.navigation.push("DetailerDetail", {
              detailer: item,
            });
          }
        }}
      >
        <View
          style={{
            height: 70,
            marginTop: 10,
            width: 70,
            marginLeft: 10,
            overflow: "hidden",
            borderRadius: 35,
          }}
        >
          <ImageLoad
            style={{
              height: 70,
              width: 70,
            }}
            resizeMode="cover"
            source={
              item.avatar == null
                ? require("../assets/placeholder.jpg")
                : { uri: item.avatar }
            }
          />
        </View>

        <View
          style={{
            width: "85%",

            //   marginLeft:20,
          }}
        >
          <View
            style={{
              //height:40,
              marginTop: 10,
              marginLeft: 10,
              flexDirection: "row",
              width: "90%",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                //width:'55%',
                fontFamily: "EurostileBold",

                color: APP_YELLOW,
              }}
              numberOfLines={0}
            >
              {item.first_name}
            </Text>
            {/* <Text style={{
                            marginTop: 5,
                            position: 'absolute',
                            right: 0,
                            fontFamily: Platform.OS === 'ios' ? 'EuroStyle' : 'EuroStyle Normal',
                            fontSize: 17,
                            marginBottom: 5,
                            color: '#C0C0C0',

                        }}>
                            {moment(item.created_at).format('DD-MM-YYYY')}</Text> */}
          </View>

          {item.request_accepted == 0 ? (
            <View
              style={{
                height: 30,
                width: "40%",
                //borderRadius: 5,
                marginTop: 8,
                marginLeft: 30,
                //alignSelf: 'flex-end',
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: APP_YELLOW,
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontFamily: "EurostileBold",
                }}
              >
                Pending
              </Text>
            </View>
          ) : (
            <TouchableOpacity
              style={{
                height: 30,
                width: "40%",
                //borderRadius: 5,
                marginTop: 8,
                marginLeft: 30,
                //alignSelf: 'flex-end',
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: APP_YELLOW,
              }}
              onPress={() => {
                this.props.navigation.navigate("PurchaseDetail", {
                  detailer: item.detailer_id,
                });
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontFamily: "EurostileBold",
                }}
              >
                Purchased
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };
}
