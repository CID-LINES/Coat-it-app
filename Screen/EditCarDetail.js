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
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";
import { APP_YELLOW, APP_BLUE } from "../Component/colors";
import ImagePicker from "react-native-image-picker";
import { NavigationActions } from "react-navigation";
import RNPickerSelect from "react-native-picker-select";
import ImageLoad from "react-native-image-placeholder";

var year = new Date().getFullYear();
const DATA = [
  { label: "2020", value: "2020" },
  { label: "2019", value: "2019" },
  { label: "2018", value: "2018" },
  { label: "2017", value: "2017" },
  { label: "2016", value: "2016" },
  { label: "2015", value: "2015" },
  { label: "2014", value: "2014" },
  { label: "2013", value: "2013" },
  { label: "2012", value: "2012" },
  { label: "2011", value: "2011" },
  { label: "2010", value: "2010" },
  { label: "2009", value: "2009" },
  { label: "2008", value: "2008" },
  { label: "2007", value: "2007" },
  { label: "2006", value: "2006" },
  { label: "2005", value: "2005" },
  { label: "2004", value: "2016" },
  { label: "2003", value: "2003" },
  { label: "2002", value: "2002" },
  { label: "2001", value: "2001" },
  { label: "2000", value: "2000" },
  { label: "1999", value: "1999" },
  { label: "1998", value: "1998" },
  { label: "1997", value: "1997" },
  { label: "1996", value: "1996" },
  { label: "1995", value: "1995" },
  { label: "1994", value: "1994" },
  { label: "1993", value: "1993" },
  { label: "1992", value: "1992" },
  { label: "1991", value: "1991" },
  { label: "1990", value: "1990" },
  { label: "1989", value: "1989" },
  { label: "1988", value: "1988" },
  { label: "1987", value: "1987" },
  { label: "1986", value: "1986" },
  { label: "1985", value: "1985" },
  { label: "1984", value: "1984" },
  { label: "1983", value: "1983" },
  { label: "1982", value: "1982" },
  { label: "1981", value: "1981" },
  { label: "1980", value: "1980" },
];

export default class EditCarDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filePath: props.navigation.state.params.data.image,
      user_id: props.navigation.state.params.data.id,
      brand_name: props.navigation.state.params.data.brand_name,
      model_name: props.navigation.state.params.data.model_name,
      vehicle_no: props.navigation.state.params.data.vehicle_no,
      manufacture_year: props.navigation.state.params.data.manufacture_year,
      data: props.navigation.state.params.data,
      DATA: [],
    };
    //  console.log(JSON.stringify(this.state.data))
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
          filePath: source.uri,
        });
      }
    });
  };
  componentDidMount() {
    this.manufactureyear();
  }

  manufactureyear = () => {
    var allyear = [];
    //alert(JSON.stringify(year))
    for (var i = year; i >= 1945; i--) {
      allyear.push({
        label: i + "",
        value: i + "",
      });
    }
    this.setState({
      DATA: allyear,
    });
  };

  editDetailApi = () => {
    this.setState({
      isLoading: true,
    });
    let body = new FormData();
    var photo = {
      uri: this.state.filePath,
      type: "image/jpeg",
      name: "photo.jpg",
    };
    //alert(this.state.brewery_id)
    body.append("image", photo);
    body.append("brand_name", this.state.brand_name);
    body.append("model_name", this.state.model_name);
    body.append("vehicle_no", this.state.vehicle_no);
    body.append("manufacture_year", this.state.manufacture_year);
    // body.append('phone_no', this.state.phone)

    fetch(
      "http://18.156.66.145/public/api/updatedetails/" + this.state.user_id,

      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          //  'Content-Type': 'application/json'
        },
        body: body,
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.response.status == true) {
          console.log(responseJson.response);
          this.props.navigation.dispatch(
            NavigationActions.navigate({ routeName: "MyCars" })
          );
          //this.props.navigation.push('MyCars')

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
            flexDirection: "row",
            alignItems: "center",
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
                color: APP_YELLOW,
                fontFamily: "EurostileBold",
              }}
            >
              Car Detail
            </Text>
          </View>
        </View>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior="padding"
          enabled={Platform.OS === "ios"}
          keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 0}
        >
          <ScrollView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={{
                  height: Dimensions.get("window").height / 3.5,
                  width: "100%",
                  justifyContent: "center",
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
                    // backgroundColor: 'gray',
                    //borderRadius: 10,
                    alignSelf: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}>
                  <ImageLoad
                    style={{
                      flex: 1,
                      width: "100%",
                    }}
                    resizeMode="stretch"
                    source={{ uri: this.state.filePath }}
                  />
                </View>
                <View
                  style={{
                    height: 40,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    bottom: 5,
                    right: 18,
                  }}
                >
                  <Text style={{ fontFamily: "EurostileBold", color: "white" }}>
                    Upload car picture here
                  </Text>
                  <Image
                    style={{
                      marginLeft: 10,
                      height: 30,
                      width: 30,
                      tintColor: "white",
                    }}
                    source={require("../assets/camera.png")}
                  />
                </View>
              </TouchableOpacity>
              <View
                style={{
                  width: "100%",
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    marginLeft: 35,
                    fontFamily: "EurostileBold",
                    color: "#C0C0C0",
                  }}
                >
                  Brand
                </Text>
                <TextInput
                  style={{
                    height: 40,
                    width: "80%",
                    padding: 5,
                    color: "#C0C0C0",
                    alignSelf: "center",
                  }}
                  placeholderTextColor="#C0C0C0"
                  keyboardType="ascii-capable"
                  value={this.state.brand_name}
                  onChangeText={(value) => this.setState({ brand_name: value })}
                  keyboardType="ascii-capable"
                  placeholder="Brand"
                />
                {/* <View style={{
                                    height: 1, width: '80%',
                                    alignSelf: 'center',
                                    backgroundColor: '#C0C0C0'
                                }}></View> */}
                <Text
                  style={{
                    marginLeft: 35,
                    marginTop: 10,
                    color: "#C0C0C0",
                    fontFamily: "EurostileBold",
                  }}
                >
                  Model
                </Text>
                <TextInput
                  style={{
                    height: 40,
                    width: "80%",
                    padding: 5,
                    alignSelf: "center",
                    color: "#C0C0C0",
                  }}
                  placeholderTextColor="#C0C0C0"
                  keyboardType="ascii-capable"
                  value={this.state.model_name}
                  onChangeText={(value) => this.setState({ model_name: value })}
                  keyboardType="ascii-capable"
                  placeholder="Model"
                />
                {/* <View style={{
                                    height: 1, width: '80%',
                                    alignSelf: 'center',
                                    backgroundColor: '#C0C0C0'
                                }}></View> */}
                <Text
                  style={{
                    marginLeft: 35,
                    marginTop: 10,
                    fontFamily: "EurostileBold",
                    color: "#C0C0C0",
                  }}
                >
                 License Plate
                </Text>
                <TextInput
                  style={{
                    height: 40,
                    width: "80%",
                    padding: 5,
                    alignSelf: "center",
                    color: "#C0C0C0",
                  }}
                  placeholderTextColor="#C0C0C0"
                  keyboardType="ascii-capable"
                  value={this.state.vehicle_no}
                  onChangeText={(value) => this.setState({ vehicle_no: value })}
                  keyboardType="ascii-capable"
                  placeholder="License Plate"
                />
                {/* <View style={{
                                    height: 1, width: '80%',
                                    alignSelf: 'center',
                                    backgroundColor: '#C0C0C0'
                                }}></View> */}
                <Text
                  style={{
                    marginLeft: 35,
                    marginTop: 10,
                    color: "#C0C0C0",
                    fontFamily: "EurostileBold",
                  }}
                >
                  Year of Manufacture
                </Text>
                {/* <TextInput style={{
                                    height: 40, width: '80%',
                                    padding: 5,
                                    alignSelf: 'center'
                                }}
                                    placeholderTextColor='gray'
                                    value={this.state.manufacture_year}
                                    keyboardType='ascii-capable'
                                    onChangeText={(value)=>this.setState({manufacture_year:value})}
                                    keyboardType='ascii-capable'
                                    placeholder='Manufacture year'></TextInput> */}

                <View
                  style={{
                    fontSize: 16,
                    width: "80%",
                    alignSelf: "center",
                    padding: 5,
                    // paddingVertical: 12,
                    height: 30,
                    justifyContent: "center",
                    // paddingRight: 30, // to ensure the text is never behind the icon
                  }}
                >
                  <RNPickerSelect
                    style={{
                      ...pickerSelectStyles,
                      iconContainer: {
                        top: 10,
                        right: 12,
                      },
                    }}
                    placeholder={{
                      label: "Year of Manufacture",
                      color: "gray",
                    }}
                    items={this.state.DATA}
                    onValueChange={(value) => {
                      this.setState({
                        manufacture_year: value,
                      });
                    }}
                    value={this.state.manufacture_year}
                  />
                </View>
                {/* <View style={{
                                    height: 1, width: '80%',
                                    alignSelf: 'center',
                                    backgroundColor: '#C0C0C0'
                                }}></View> */}
              </View>
              <TouchableOpacity
                style={{
                  height: 50,
                  width: "60%",
                  marginTop: 20,
                  alignSelf: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 10,
                  backgroundColor: APP_YELLOW,
                  //borderRadius: 10
                }}
                onPress={() => {
                  this.EditCarDetail();
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontSize: 18,
                    fontFamily: "EurostileBold",
                  }}
                >
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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
  EditCarDetail = () => {
    if (this.state.brand_name == "") {
      alert("Please enter the company name");
    } else if (this.state.model_name == "") {
      alert("Please enter the model name");
    } else if (this.state.vehicle_no == "") {
      alert("Please enter the vehicle number");
    } else if (this.state.manufacture_year == "") {
      alert("Please enter the manufacture date");
    } else {
      this.editDetailApi();
    }
  };
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    // marginTop: 10,
    fontSize: 16,
    // paddingVertical: 12,
    // paddingHorizontal: 7,
    // borderWidth: 1,
    // borderColor: colors.APPCOLOR,
    // borderRadius: 4,
    color: "#C0C0C0",
    // paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    // fontSize: 16,
    // paddingHorizontal: 10,
    // paddingVertical: 8,
    padding: 2,
    borderWidth: 1,
    borderColor: APP_YELLOW,
    borderRadius: 4,
    color: "#C0C0C0",
    // paddingRight: 30,
    // to ensure the text is never behind the icon
  },
});
