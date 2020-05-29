import React, { Component } from 'react';
import {
    Text, View, SafeAreaView, Image, TextInput, ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    StyleSheet,
    ActivityIndicator,
    AsyncStorage
} from 'react-native';
import { APP_YELLOW, APP_BLUE, } from '../Component/colors'
import ImagePicker from 'react-native-image-picker';
import { CallApi } from '../Component/ApiClient';
import RNPickerSelect from 'react-native-picker-select';



const DATA = [
    { label: '2020', value: '2020' },
    { label: '2019', value: '2019' },
    { label: '2018', value: '2018' },
    { label: '2017', value: '2017' },
    { label: '2016', value: '2016' },
    { label: '2015', value: '2015' },
    { label: '2014', value: '2014' },
    { label: '2013', value: '2013' },
    { label: '2012', value: '2012' },
    { label: '2011', value: '2011' },
    { label: '2010', value: '2010' },
    { label: '2009', value: '2009' },
    { label: '2008', value: '2008' },
    { label: '2007', value: '2007' },
    { label: '2006', value: '2006' },
    { label: '2005', value: '2005' },
    { label: '2004', value: '2016' },
    { label: '2003', value: '2003' },
    { label: '2002', value: '2002' },
    { label: '2001', value: '2001' },
    { label: '2000', value: '2000' },
    { label: '1999', value: '1999' },
    { label: '1998', value: '1998' },
    { label: '1997', value: '1997' },
    { label: '1996', value: '1996' },
    { label: '1995', value: '1995' },
    { label: '1994', value: '1994' },
    { label: '1993', value: '1993' },
    { label: '1992', value: '1992' },
    { label: '1991', value: '1991' },
    { label: '1990', value: '1990' },
    { label: '1989', value: '1989' },
    { label: '1988', value: '1988' },
    { label: '1987', value: '1987' },
    { label: '1986', value: '1986' },
    { label: '1985', value: '1985' },
    { label: '1984', value: '1984' },
    { label: '1983', value: '1983' },
    { label: '1982', value: '1982' },
    { label: '1981', value: '1981' },
    { label: '1980', value: '1980' },
];
export default class CarDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filePath: '',
            Companyname: '',
            Modelname: '',
            Vehicleno: '',
            manufacture_year: '',
            user_id: ''
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
            maxWidth: 300,
            maxHeight: 300,
            quality: 0.5
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
        if(this.state.filePath.uri){
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
                    this.props.navigation.replace('Home')
                    // this.save('car_id',responseJson.response.carDetails.id +'')
                    alert('The details of the car has been saved')
                }
                else{
                    alert('image must be requried')
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
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{
                    height: 40, width: '95%',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignSelf: 'center',
                    backgroundColor: 'white'
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
                            fontSize: 18, fontWeight: '700',
                            color: APP_YELLOW
                        }}>Car Detail</Text>
                    </View>
                </View>
                <KeyboardAvoidingView style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
                    <ScrollView style={{ flex: 1 }}>
                        <View style={{ flex: 1 }}>
                            <View style={{
                                height: 180,
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center'
                                // backgroundColor:'pink'
                            }}>
                                <TouchableOpacity style={{
                                    height: 180,
                                    width: '95%',

                                    borderRadius: 10,
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden'
                                }}
                                    onPress={() => {
                                        this.chooseFile()
                                    }}>
                                    <Image style={{ height: 180, width: '100%' }}
                                        resizeMode='cover'
                                        source={cache = "force-cache",
                                            this.state.filePath == '' ? require('../assets/placeholder.jpg') : this.state.filePath}>

                                    </Image>
                                </TouchableOpacity>
                                <View style={{
                                    height: 40, width: 40,
                                    alignItems: 'center', justifyContent: 'center',
                                    position: 'absolute', bottom: 5,
                                    right: 18
                                }}>
                                    <Image style={{
                                        height: 30, width: 30,
                                        tintColor: 'black'
                                    }}

                                        source={require('../assets/camera.png')}></Image>
                                </View>
                            </View>
                            <View style={{ width: '100%', marginTop: 10 }}>
                                <Text style={{ marginLeft: 35, fontWeight: '600', }}>Brand/Company Name</Text>
                                <TextInput style={{
                                    height: 40, width: '80%',
                                    padding: 5,
                                    alignSelf: 'center'
                                }}
                                    placeholderTextColor='gray'
                                    value={this.state.Companyname}
                                    keyboardType='ascii-capable'
                                    onChangeText={(value) => this.setState({ Companyname: value })}
                                    placeholder='Name'></TextInput>
                                <View style={{
                                    height: 1, width: '80%',
                                    alignSelf: 'center',
                                    backgroundColor: 'gray'
                                }}></View>
                                <Text style={{
                                    marginLeft: 35,
                                    fontWeight: '600',
                                    marginTop: 20
                                }}>Model Name</Text>
                                <TextInput style={{
                                    height: 40, width: '80%',
                                    padding: 5,
                                    alignSelf: 'center'
                                }}
                                    placeholderTextColor='gray'
                                    keyboardType='ascii-capable'
                                    value={this.state.Modelname}
                                    onChangeText={(value) => this.setState({ Modelname: value })}
                                    placeholder='Model Name'>

                                </TextInput>
                                <View style={{
                                    height: 1, width: '80%',
                                    alignSelf: 'center',
                                    backgroundColor: 'gray'
                                }}></View>
                                <Text style={{
                                    marginLeft: 35, fontWeight: '600',
                                    marginTop: 20
                                }}>Vehicle No.</Text>
                                <TextInput style={{
                                    height: 40, width: '80%',
                                    padding: 5,
                                    alignSelf: 'center'
                                }}
                                    placeholderTextColor='gray'
                                    keyboardType='ascii-capable'
                                    value={this.state.Vehicleno}
                                    onChangeText={(value) => this.setState({ Vehicleno: value })}
                                    placeholder='Vehicle No.'></TextInput>
                                <View style={{
                                    height: 1, width: '80%',
                                    alignSelf: 'center',
                                    backgroundColor: 'gray'
                                }}></View>
                                <Text style={{
                                    marginLeft: 35, fontWeight: '600',
                                    marginTop: 20
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

                                        items={DATA}
                                        onValueChange={(value) => {
                                            this.setState({
                                                manufacture_year: value,
                                            });
                                        }}
                                        value={this.state.manufacture_year}
                                    />
                                </View>
                                {/* <TextInput style={{
                                    height: 40, width: '80%',
                                    padding: 5,
                                    alignSelf: 'center'
                                }}
                                    placeholderTextColor='gray'
                                    keyboardType='ascii-capable'
                                    value={this.state.yearofmanufacture}
                                    onChangeText={(value) => this.setState({ yearofmanufacture: value })}
                                    placeholder='Manufacture year'></TextInput> */}
                                <View style={{
                                    height: 1, width: '80%',
                                    alignSelf: 'center',
                                    backgroundColor: 'gray'
                                }}></View>

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
                                    fontWeight: '700', color: 'white',
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
                                    fontWeight: '700', color: APP_YELLOW,
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
                        bottom: 0, left: 0, right: 0,
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
            </SafeAreaView>
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
        } else {
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
        color: 'black',
        // paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: APP_YELLOW,
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
})



