import React, { Component } from 'react';
import {
    Text, View, SafeAreaView, Image, TextInput, ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    StyleSheet,
    ActivityIndicator,
    AsyncStorage,
    Dimensions,
    ImageBackground
} from 'react-native';
import { APP_YELLOW, APP_BLUE, } from '../Component/colors'
import ImagePicker from 'react-native-image-picker';
import { CallApi } from '../Component/ApiClient';
import RNPickerSelect from 'react-native-picker-select';
import { NavigationActions } from 'react-navigation';
var year = new Date().getFullYear();



export default class CarDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filePath: '',
            Companyname: '',
            Modelname: '',
            Vehicleno: '',
            manufacture_year: '',
            user_id: '',
            DATA: []
        }
    }


    chooseFile = () => {
        var options = {
            title: 'Select Image',
            // customButtons: [
            //     { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
            // ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
                quality: 20

            },
            maxWidth: 500,
            maxHeight: 500,
            quality: 0.5,
            allowsEditing:true,
        };

        ImagePicker.showImagePicker(options, response => {

            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                let source = response;
                this.setState({
                    filePath: source,
                });


                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
            }
        });
    };

    componentDidMount() {
        this.get('user_id')
        this.manufactureyear()
    }
    manufactureyear = () => {
        var allyear = []
        //alert(JSON.stringify(year))
        for (var i = year; i >= 1945; i--) {
            allyear.push({
                label: i + '',
                value: i + ''
            })
        }

        this.setState({
            DATA: allyear
        })
    }

    async get(key) {
        try {
            const value = await AsyncStorage.getItem(key);
            // alert(value)
            if (value != null && value != '') {
                this.setState({
                    user_id: value
                }, () => {
                    // this.MycarApi()
                })
            }
        } catch (error) {

        }
    }

    async save(key, value) {

        try {
            await AsyncStorage.setItem(key, value);

            //alert(JSON.stringify(value))
        } catch (error) {
            //   console.log("Error saving data" + error);
        }
    }
    
    carDetailApi = () => {
        this.setState({
            isLoading: true
        })
        let body = new FormData();
        if (this.state.filePath.uri) {
            var photo = {
                uri: this.state.filePath.uri,
                type: 'image/jpeg',
                name: 'photo.jpg',
            };
        }
        // alert(this.state.brewery_id)
        body.append('image', photo);
        body.append('brand_name', this.state.Companyname)
        body.append('model_name', this.state.Modelname)
        body.append('vehicle_no', this.state.Vehicleno)
        body.append('manufacture_year', this.state.manufacture_year)
        body.append('user_id', "" + this.state.user_id)

        fetch('http://3.137.41.50/coatit/public/api/storedetails',

            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    //  'Content-Type': 'application/json'
                },
                body: body
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.response)
                if (responseJson.response.status == true) {
                    this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Home' })], 0)
                    // this.save('car_id',responseJson.response.carDetails.id +'')
                    alert('The details of the car has been saved')
                }

                else {
                    alert(responseJson.response.message)
                }
                this.setState({
                    isLoading: false

                })
            })
            .catch((error) => {
                console.error(error);
                //  alert(error)
                //  callback({ data: error });
                //callback({error: true, data: error});
            });
    }




    render() {
        return (
            // <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ImageBackground style={{ flex: 1, }}
                resizeMode='stretch'
                source={require('../assets/bg.png')}>
                <View style={{
                    height: 40, 
                    width: '95%',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginTop: Platform.OS === 'ios' ? 25 : 7
                }}>
                    {/* <TouchableOpacity style={{
                        height: 35,
                         width: 35,
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        left: 5

                    }}
                        onPress={() => {
                            this.props.navigation.goBack()
                        }}>
                        <Image style={{ height: 25, width: 25, tintColor: APP_YELLOW }}
                            resizeMode='contain'
                            source={require('../assets/back.png')}></Image>
                    </TouchableOpacity> */}
                    <View style={{
                        height: 35,
                        alignItems: 'center',
                        justifyContent: 'center',

                    }}>
                        <Text style={{
                            fontSize: 18,
                            color: APP_YELLOW,
                            fontFamily: 'EurostileBold'
                        }}>Car Detail</Text>
                    </View>
                </View>
                <KeyboardAvoidingView style={{ flex: 1 }}
                    behavior="padding" enabled={Platform.OS === 'ios'}
                    keyboardVerticalOffset={Platform.OS == 'ios' ? 0 : 0}>
                    <ScrollView style={{ flex: 1 }}>
                        <View style={{ flex: 1 }}>
                            <View style={{
                                height: Dimensions.get('window').height / 3.5,
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center'
                                // backgroundColor:'pink'
                            }}>
                                <TouchableOpacity style={{
                                    flex: 1,
                                    width: '95%',
                                    //borderRadius: 10,
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden'
                                }}
                                    onPress={() => {
                                        this.chooseFile()
                                    }}>
                                    <Image style={{
                                        flex: 1,
                                        width: '100%'
                                    }}
                                        resizeMode='cover'
                                        source={cache = "force-cache",
                                        this.state.filePath == '' ?
                                         require('../assets/placeholder.jpg') : 
                                         this.state.filePath}>
                                    </Image>
                                </TouchableOpacity>
                                <View style={{
                                    height: 40,
                                    //width: 40,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'absolute',
                                    flexDirection: 'row',
                                    bottom: 5,
                                    right: 18
                                }}>
                                    <Text style={{
                                        fontFamily: 'EurostileBold'
                                    }}>Upload car picture here</Text>
                                    <Image style={{
                                        height: 30,
                                        width: 30,
                                        tintColor: 'black',
                                        marginLeft: 10
                                    }}
                                        source={require('../assets/camera.png')}></Image>
                                </View>
                            </View>
                            <View style={{
                                width: '100%',
                                marginTop: 10
                            }}>
                                <Text style={{
                                    marginLeft: 35,
                                    color: '#C0C0C0',
                                    fontFamily: 'EurostileBold'
                                }}>
                                    Brand/Company Name</Text>
                                <TextInput style={{
                                    height: 40, width: '80%',
                                    padding: 5,
                                    alignSelf: 'center',
                                    color: '#C0C0C0'
                                }}
                                    placeholderTextColor='#C0C0C0'
                                    value={this.state.Companyname}
                                    keyboardType='ascii-capable'
                                    onChangeText={(value) => this.setState({ Companyname: value })}
                                    placeholder='Name'>
                                </TextInput>
                                {/* <View style={{
                                    height: 1, width: '80%',
                                    alignSelf: 'center',
                                    backgroundColor: '#C0C0C0'
                                }}></View> */}
                                <Text style={{
                                    marginLeft: 35,
                                    marginTop: 20,
                                    color: '#C0C0C0',
                                    fontFamily: 'EurostileBold'
                                }}>Model Name</Text>
                                <TextInput style={{
                                    height: 40,
                                    width: '80%',
                                    padding: 5,
                                    alignSelf: 'center',
                                    color: '#C0C0C0'
                                }}
                                    placeholderTextColor='#C0C0C0'
                                    keyboardType='ascii-capable'
                                    value={this.state.Modelname}
                                    onChangeText={(value) => this.setState({ Modelname: value })}
                                    placeholder='Model Name'>

                                </TextInput>
                                {/* <View style={{
                                    height: 1, width: '80%',
                                    alignSelf: 'center',
                                    backgroundColor: '#C0C0C0'
                                }}></View> */}
                                <Text style={{
                                    marginLeft: 35,
                                    fontFamily: 'EurostileBold',
                                    color: '#C0C0C0',
                                    marginTop: 20
                                }}>Vehicle No.</Text>
                                <TextInput style={{
                                    height: 40,
                                    width: '80%',
                                    padding: 5,
                                    alignSelf: 'center',
                                    color: '#C0C0C0'
                                }}
                                    placeholderTextColor='#C0C0C0'
                                    keyboardType='ascii-capable'
                                    value={this.state.Vehicleno}
                                    onChangeText={(value) => this.setState({ Vehicleno: value })}
                                    placeholder='Vehicle No.'>
                                </TextInput>
                                {/* <View style={{
                                    height: 1, 
                                    width: '80%',
                                    alignSelf: 'center',
                                    backgroundColor: '#C0C0C0'
                                }}></View> */}
                                <Text style={{
                                    marginLeft: 35,
                                    marginTop: 20,
                                    color: '#C0C0C0',
                                    fontFamily: 'EurostileBold',
                                }}>Year of Manufacture</Text>
                                <View style={{
                                    marginTop: 5,
                                    fontSize: 16,
                                    width: '80%',
                                    alignSelf: 'center',
                                    padding: 5,
                                    // paddingVertical: 12,
                                    height: 40,
                                    justifyContent: 'center',
                                    // paddingRight: 30, // to ensure the text is never behind the icon
                                }}>
                                    <RNPickerSelect
                                        style={{
                                            ...pickerSelectStyles,
                                            iconContainer: {
                                                top: 10,
                                                right: 12,
                                            },
                                        }}
                                        placeholder={{
                                            label: 'Manufacture Year',
                                            color: 'gray'
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
                            </View>
                            <TouchableOpacity style={{
                                height: 50,
                                width: '60%',
                                marginTop: 20,
                                alignSelf: 'center',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: 10,
                                backgroundColor: APP_YELLOW,
                                borderRadius: 10
                            }}
                                onPress={() => {
                                    this.CarDetail()
                                }}>
                                <Text style={{

                                    color: 'black',
                                    fontFamily: 'EurostileBold',
                                    fontSize: 18
                                }}>Submit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                height: 50,
                                width: '60%',
                                alignSelf: 'center',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: 10,
                                borderColor: APP_YELLOW,
                                borderWidth: 3,
                                borderRadius: 10
                            }}
                                onPress={() => {
                                    this.props.navigation.navigate('Home')
                                }}>
                                <Text style={{
                                    color: APP_YELLOW,
                                    fontFamily: 'EurostileBold',
                                    fontSize: 18
                                }}>Skip</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                {this.state.isLoading &&
                    <View style={{
                        position: 'absolute',
                        backgroundColor: '#000000aa',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
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
            </ImageBackground>
            // </SafeAreaView>
        );
    }
    CarDetail = () => {
        if (this.state.Companyname == '') {
            alert('Please enter the company name')
        } else if (this.state.Modelname == '') {
            alert("Please enter the model name")
        } else if (this.state.Vehicleno == '') {
            alert('Please enter the vehicle number')
        } else if (this.state.manufacture_year == '') {
            alert('Please enter the manufacture date')
        } else if (this.state.filePath == '') {
            alert('Image must be required')
        }
        else {
            this.carDetailApi()
        }
    }

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
        color: '#C0C0C0',
        // paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 5,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: APP_YELLOW,
        borderRadius: 4,
        color: '#C0C0C0',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
})



