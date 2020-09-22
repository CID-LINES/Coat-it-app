import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, AsyncStorage, ActivityIndicator, Alert, Dimensions, ImageBackground, ImageEditor } from 'react-native';
import { APP_YELLOW, APP_BLUE, } from '../Component/colors'
import ImagePicker from 'react-native-image-picker';
import { NavigationActions, StackActions } from 'react-navigation';
import ImageLoad from 'react-native-image-placeholder';

export default class EditProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: props.navigation.state.params.data,
            phone: props.navigation.state.params.data.phone_no,
            firstname: props.navigation.state.params.data.first_name,
            lastname: props.navigation.state.params.data.last_name,
            filePath: props.navigation.state.params.data.avatar,
            isLoading: false,
            user_id: ''
        }
        //console.log(JSON.stringify(this.state.data))
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
                    filePath: source.uri,
                });
            }
        });
    };


    async save(key, value) {

        try {
            await AsyncStorage.setItem(key, value);
            //alert(JSON.stringify(value))
        } catch (error) {
            //   console.log("Error saving data" + error);
        }
    }

    componentDidMount() {
        this.load()
        this.props.navigation.addListener('willFocus', this.load)
    }
    load = () => {
        this.get('user_id')
    }

    async get(key) {
        try {
            const value = await AsyncStorage.getItem(key);
            //alert(value)
            if (value != null && value != '') {
                this.setState({
                    user_id: value
                }, () => {
                    //this.MycarApi()
                })
            }
        } catch (error) {

        }
    }


    updateProfile = () => {
        this.setState({
            isLoading: true
        })
        let body = new FormData();
        var photo = {
            uri: this.state.filePath,
            type: 'image/jpeg',
            name: 'photo.jpg',
        };
        // alert(this.state.brewery_id)
        body.append('avatar', photo);
        body.append('first_name', this.state.firstname)
        body.append('last_name', this.state.lastname)
        body.append('phone_no', this.state.phone)

        fetch('http://18.156.66.145/public/api/updateProfile/' + '' + this.state.user_id,

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
                if (responseJson.response.Status == true) {
                    this.props.navigation.dispatch(
                        NavigationActions.navigate({ routeName: "Home" })
                    );
                    alert('Update profile successfully')

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
            // <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground style={{ flex: 1, }}
                resizeMode='stretch'
                source={require('../assets/bg.png')}>
                <View style={{
                    height: 45, 
                    width: '95%',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginTop: Platform.OS === 'ios' ? 25 : 7
                }}>
                    <TouchableOpacity style={{
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
                        <Image style={{
                            height: 20,
                            width: 20,
                            tintColor: APP_YELLOW
                        }}
                            resizeMode='contain'
                            source={require('../assets/back.png')}></Image>
                    </TouchableOpacity>
                    <View style={{
                        height: 35,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Text style={{
                            fontSize: 18,
                            fontFamily: 'EurostileBold',
                            color: APP_YELLOW
                        }}>Edit Profile
                        </Text>
                    </View>
                </View>
                <KeyboardAvoidingView style={{ flex: 1 }}
                    behavior="padding" enabled={Platform.OS === 'ios'}
                    keyboardVerticalOffset={Platform.OS == 'ios' ? 0 : 0}>
                    <ScrollView style={{ flex: 1 }}>
                        <View style={{ flex: 1 }}>
                            <View style={{
                                height: Dimensions.get('window').height / 3,
                                marginTop: 10,
                                width: '100%',
                                justifyContent: 'center'
                            }}>
                                <TouchableOpacity style={{
                                    flex: 1,
                                    width: '95%',
                                    //borderRadius: 10,
                                    alignSelf: 'center',
                                    overflow: 'hidden'
                                }}
                                    onPress={() => {
                                        this.chooseFile()
                                    }}>

                                    <ImageLoad style={{
                                        // height: 130,
                                        flex: 1,
                                    }}
                                        resizeMode='cover'
                                        source={this.state.filePath == null ?
                                            require('../assets/placeholder.jpg'):
                                            {uri: this.state.filePath }}>
                                    </ImageLoad>
                                </TouchableOpacity>

                                <View style={{
                                    height: 40,
                                    width: '60%',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'absolute',
                                    bottom: 5,
                                    right: 18
                                }}>
                                    <Text style={{ fontFamily: 'EurostileBold' }}>Upload profile picture here</Text>
                                    <Image style={{
                                        height: 30, width: 30,
                                        marginLeft: 10,
                                        tintColor: 'black'
                                    }}
                                        source={require('../assets/camera.png')}></Image>
                                </View>
                            </View>
                            <View style={{
                                width: '100%',
                                marginTop: 20,
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    width: '78%',
                                    color: '#C0C0C0',
                                    fontFamily: 'EurostileBold'
                                }}>First name</Text>
                                <View style={{
                                    flexDirection: 'row',
                                    width: '80%',
                                    alignItems: "center"
                                }}>
                                    <Image style={{
                                        height: 25,
                                        tintColor: APP_YELLOW,
                                        width: 25
                                    }}
                                        source={require('../assets/user.png')}
                                        resizeMode='cover'>
                                    </Image>
                                    <TextInput style={{
                                        height: 40,
                                        width: '75%',
                                        marginTop: 2,
                                        padding: 5,
                                        color: '#C0C0C0'
                                    }}
                                        value={this.state.firstname}
                                        onChangeText={(value) => { this.setState({ firstname: value }) }}
                                        keyboardType='ascii-capable'
                                        placeholder='First Name'
                                        placeholderTextColor='#C0C0C0'></TextInput>
                                </View>
                                {/* <View style={{
                                    height: 1,
                                    width: '80%', backgroundColor: '#C0C0C0'
                                }}></View> */}
                                <Text style={{
                                    width: '78%',
                                    marginTop: 10,
                                    color: '#C0C0C0',
                                    fontFamily: 'EurostileBold',
                                }}>Last name</Text>
                                <View style={{
                                    flexDirection: 'row',
                                    width: '80%',
                                    alignItems: "center"
                                }}>
                                    <Image style={{
                                        height: 25,
                                        tintColor: APP_YELLOW,
                                        width: 25
                                    }}
                                        source={require('../assets/user.png')}
                                        resizeMode='cover'
                                    ></Image>
                                    <TextInput style={{
                                        height: 40,
                                        width: '75%',
                                        marginTop: 2,
                                        // borderColor: 'gray',
                                        // borderWidth: 1,
                                        // borderRadius: 10,
                                        padding: 5,
                                        color: '#C0C0C0'
                                    }}
                                        keyboardType='ascii-capable'
                                        value={this.state.lastname}
                                        onChangeText={(value) => { this.setState({ lastname: value }) }}
                                        placeholder='Last Name'
                                        placeholderTextColor='#C0C0C0'>

                                    </TextInput>
                                </View>
                                {/* <View style={{
                                    height: 1,
                                    width: '80%', backgroundColor: '#C0C0C0'
                                }}></View> */}

                                <Text style={{
                                    width: '78%',
                                    marginTop: 10,
                                    fontFamily: 'EurostileBold',
                                    color: '#C0C0C0'
                                }}>Phone No.</Text>
                                <View style={{
                                    flexDirection: 'row',
                                    width: '80%',
                                    alignItems: "center"
                                }}>
                                    <Image style={{
                                        height: 25,
                                        tintColor: APP_YELLOW,
                                        width: 25
                                    }}
                                        source={require('../assets/phone.png')}
                                        resizeMode='cover'
                                    ></Image>
                                    <TextInput style={{
                                        height: 40,
                                        width: '75%',
                                        marginTop: 2,
                                        padding: 5,
                                        color: '#C0C0C0'
                                    }}
                                        value={this.state.phone}
                                        onChangeText={(value) => { this.setState({ phone: value }) }}
                                        keyboardType='number-pad'
                                        returnKeyType='done'
                                        placeholder='Phone no.'
                                        placeholderTextColor='#C0C0C0'>
                                    </TextInput>
                                </View>
                                {/* <View style={{
                                    height: 1,
                                    width: '80%', 
                                    backgroundColor: '#C0C0C0'
                                }}></View> */}
                            </View>
                            <TouchableOpacity style={{
                                height: 50, width: '60%',
                                backgroundColor: APP_YELLOW,
                                marginTop: 20,
                                alignSelf: 'center',
                                //borderRadius: 10,
                                // marginBottom:10,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                                onPress={() => {
                                    this.updateProfile()

                                }}>
                                <Text style={{
                                    fontSize: 18,
                                    fontFamily: 'EurostileBold',
                                    color: 'black'
                                }}>Submit</Text>
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
            </ImageBackground>
            // </SafeAreaView>

        );
    }
}



