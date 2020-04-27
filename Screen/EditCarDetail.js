import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, AsyncStorage, ActivityIndicator } from 'react-native';
import { APP_YELLOW, APP_BLUE, } from '../Component/colors'
import ImagePicker from 'react-native-image-picker';
import { NavigationActions, StackActions } from 'react-navigation';

export default class EditCarDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filePath: props.navigation.state.params.data.image,
            user_id:props.navigation.state.params.data.id,
            brand_name: props.navigation.state.params.data.brand_name,
            model_name:props.navigation.state.params.data.model_name,
            vehicle_no:props.navigation.state.params.data.vehicle_no,
            manufacture_year:props.navigation.state.params.data.manufacture_year,
            data:props.navigation.state.params.data
        }
        //alert(JSON.stringify(this.state.data))
    }


    chooseFile = () => {
        var options = {
            title: 'Select Image',
           
            storageOptions: {
                skipBackup: true,
                path: 'images',
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
                    filePath: source.uri,
                });


               
            }
        });
    };

    // componentDidMount() {

    //     this.get('user_id')
    // }

    // async get(key) {
    //     try {
    //         const value = await AsyncStorage.getItem(key);
    //        // alert(value)
    //         if (value != null && value != '') {
    //             this.setState({
    //                 user_id: value
    //             }, () => {
    //                // this.userDetaildApi()
    //             })
    //         }
    //     } catch (error) {

    //     }
    // }

    editDetailApi = () => {
        this.setState({
            isLoading: true
        })
        let body = new FormData();
        var photo = {
            uri: this.state.filePath,
            type: 'image/jpeg',
            name: 'photo.jpg',
        };
         //alert(this.state.brewery_id)
        body.append('image', photo);
        body.append('brand_name', this.state.brand_name)
        body.append('model_name', this.state.model_name)
        body.append('vehicle_no', this.state.vehicle_no)
        body.append('manufacture_year', this.state.manufacture_year)
        // body.append('phone_no', this.state.phone)

        fetch('http://3.137.41.50/coatit/public/api/updatedetails/'+this.state.user_id,

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
               
                if (responseJson.response.status == true) {  
                    console.log(responseJson.response)
                    // const resetAction = StackActions.reset({
                    //     index: 0,
                    //     key: null,
                    //     actions: [NavigationActions.navigate({ routeName: 'MyCars' })],
                    // });
                    // this.props.navigation.dispatch(resetAction);
                
                    this.props.navigation.navigate('MyCars')
                   // this.save('car_id',responseJson.response.carDetails.id +'')
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
            <SafeAreaView style={{ flex: 1 }}>


                <View style={{
                    height: 40, width: '95%',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignSelf: 'center',
                    marginTop: 10
                }}>
                    <TouchableOpacity style={{
                        height: 35, width: 35,
                        alignItems: 'center', justifyContent: 'center',
                        position: 'absolute', left: 5


                    }}
                        onPress={() => {
                            this.props.navigation.goBack()
                        }}>
                        <Image style={{ height: 25, width: 25, tintColor: APP_BLUE }}
                            resizeMode='contain'
                            source={require('../assets/back.png')}></Image>

                    </TouchableOpacity>
                    <View style={{
                        height: 35,
                        alignItems: 'center', justifyContent: 'center',

                    }}>
                        <Text style={{
                            fontSize: 18, fontWeight: '700',
                            color: APP_BLUE
                        }}>Car Detail</Text>
                    </View>
                </View>
                {/* <KeyboardAvoidingView style={{ flex: 1 }}
                    behavior='padding' enabled> */}
                    <ScrollView style={{ flex: 1 }}>
                        <View style={{ flex: 1 }}>
                            <View style={{
                                height: 250,
                                width: '100%', justifyContent: 'center',
                                // backgroundColor:'pink'
                            }}>
                                <TouchableOpacity style={{
                                    height: 120,
                                    width: 120,
                                   // backgroundColor: 'gray',
                                    borderRadius: 60,
                                    alignSelf: 'center',

                                    justifyContent: 'center', overflow: 'hidden'
                                }}
                                    onPress={() => {
                                        this.chooseFile()
                                    }}>
                                    <Image style={{ height: 120, width: 120 }}
                                        resizeMode='cover'
                                        source={{uri:this.state.filePath}}></Image>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '100%' }}>
                                <Text style={{ marginLeft: 35, fontWeight: '800' }}>Brand/Company Name</Text>
                                <TextInput style={{
                                    height: 40, width: '80%',
                                    padding: 5,
                                    alignSelf: 'center'
                                }}
                                    placeholderTextColor='gray'
                                    keyboardType='ascii-capable'
                                    value={this.state.brand_name}
                                    onChangeText={(value)=>this.setState({brand_name:value})}
                                    keyboardType='ascii-capable'
                                    placeholder='Name'></TextInput>
                                <View style={{
                                    height: 1, width: '80%',
                                    alignSelf: 'center',
                                    backgroundColor: 'gray'
                                }}></View>
                                <Text style={{ marginLeft: 35, fontWeight: '800', marginTop: 20 }}>Model Name</Text>
                                <TextInput style={{
                                    height: 40, width: '80%',
                                    padding: 5,
                                    alignSelf: 'center'
                                }}
                                    placeholderTextColor='gray'
                                    keyboardType='ascii-capable'
                                    value={this.state.model_name}
                                    onChangeText={(value)=>this.setState({model_name:value})}
                                    keyboardType='ascii-capable'
                                    placeholder='Model Name'></TextInput>
                                <View style={{
                                    height: 1, width: '80%',
                                    alignSelf: 'center',
                                    backgroundColor: 'gray'
                                }}></View>
                                <Text style={{
                                    marginLeft: 35, fontWeight: '800',
                                    marginTop: 20
                                }}>Vehicle No.</Text>
                                <TextInput style={{
                                    height: 40, width: '80%',
                                    padding: 5,
                                    alignSelf: 'center'
                                }}
                                    placeholderTextColor='gray'
                                    keyboardType='ascii-capable'
                                    value={this.state.vehicle_no}
                                    onChangeText={(value)=>this.setState({vehicle_no:value})}
                                    keyboardType='ascii-capable'
                                    placeholder='Vehicle No.'></TextInput>
                                <View style={{
                                    height: 1, width: '80%',
                                    alignSelf: 'center',
                                    backgroundColor: 'gray'
                                }}></View>
                                <Text style={{
                                    marginLeft: 35, fontWeight: '800',
                                    marginTop: 20
                                }}>Year of Manufacture</Text>
                                <TextInput style={{
                                    height: 40, width: '80%',
                                    padding: 5,
                                    alignSelf: 'center'
                                }}
                                    placeholderTextColor='gray'
                                    value={this.state.manufacture_year}
                                    keyboardType='ascii-capable'
                                    onChangeText={(value)=>this.setState({manufacture_year:value})}
                                    keyboardType='ascii-capable'
                                    placeholder='Manufacture year'></TextInput>
                                <View style={{
                                    height: 1, width: '80%',
                                    alignSelf: 'center',
                                    backgroundColor: 'gray'
                                }}></View>

                            </View>
                            <TouchableOpacity style={{
                                height: 50, width: '60%',
                                marginTop: 20, alignSelf: 'center', alignItems: 'center',
                                justifyContent: 'center',marginBottom:10,
                                backgroundColor: APP_BLUE, borderRadius: 10
                            }}
                                onPress={() => {
                                    this.EditCarDetail()
                                }}>
                                <Text style={{
                                    fontWeight: '700', color: 'white',
                                    fontSize: 18
                                }}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                {/* </KeyboardAvoidingView> */}
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

                            color={APP_BLUE}
                        ></ActivityIndicator>

                    </View>
                }
            </SafeAreaView>
        );
    }
    EditCarDetail=()=>{
        if (this.state.brand_name == '') {
            alert('Please enter the company name')
        } else if (this.state.model_name == '') {
            alert("Please enter the model name")
        } else if (this.state.vehicle_no == '') {
            alert('Please enter the vehicle number')
        } else if (this.state.manufacture_year == '') {
            alert('Please enter the manufacture date')
        } else {
            this.editDetailApi()
        }
    }
    
}



