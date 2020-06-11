import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator, AsyncStorage, StatusBar, Dimensions, ImageBackground } from 'react-native';
import { APP_BLUE, APP_YELLOW } from '../Component/colors'
import { ApiCall, ApiCallWithImage } from '../Component/ApiClient'
import ImagePicker from 'react-native-image-picker';

export default class SignUp extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            phone: '',
            firstname: '',
            lastname: '',
            filePath: '',
            isLoading: false
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
            }
        });
    };


    componentDidMount() {
        AsyncStorage.getItem('user_id', (error, item) => {
            if (item != null && item != '') {
                this.props.navigation.push('Home')
            }
        })
    }

    async save(key, value) {

        try {
            await AsyncStorage.setItem(key, value);

            //alert(JSON.stringify(value))
        } catch (error) {
            //   console.log("Error saving data" + error);
        }
    }


    SignUp = () => {
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
        body.append('avatar', photo);
        body.append('email', this.state.email)
        body.append('password', this.state.password)
        body.append('first_name', this.state.firstname)
        body.append('last_name', this.state.lastname)
        body.append('phone_no', this.state.phone)

        fetch('http://3.137.41.50/coatit/public/api/auth/signup',
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
                    this.save('user_id', responseJson.response.id + '')
                    this.props.navigation.replace('CarDetail')
                    
                }
            alert(responseJson.response.message)
                
                this.setState({
                    isLoading: false

                })
            })
            .catch((error) => {
                console.error(message);
                //  alert(error)
                //  callback({ data: error });
                //callback({error: true, data: error});
            });
    }




    render() {
        return (
            // <SafeAreaView style={{ flex: 1,}}>
                    <ImageBackground style={{ flex: 1 ,}}
                   resizeMode='stretch'
                        source={require('../assets/bg.png')}>
                <StatusBar barStyle="light-content" />
              
                        <View style={{ flex: 1,}}>
                            <View style={{
                                alignSelf: 'center',
                                alignItems: 'center', 
                                justifyContent: 'center',
                                height: 40,
                                 width: '100%',
                                 marginTop:Platform.OS==='ios'?25:7
                            }}>
                                <Text style={{
                                    fontSize: 20,
                                    color: APP_YELLOW,
                                    fontFamily:'EurostileBold'
                                }}>Kenotek Coat IT</Text>
                            </View>
                            <KeyboardAvoidingView style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
                    <ScrollView style={{ flex: 1 }}>
                            <View style={{
                                height: Dimensions.get('window').height/3.5,
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 10
                            }}>
                                <TouchableOpacity style={{
                                    flex:1,
                                    width: '95%',
                                    borderRadius: 60,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: 'center',
                                }}
                                    onPress={() => {
                                        this.chooseFile()
                                    }}>

                                    <Image style={{
                                       
                                        flex:1,
                                        width: '95%',
                                        borderRadius: 10,
                                        // maxHeight:100
                                        //alignSelf: 'center', 
                                    }}
                                        resizeMode='cover' source={this.state.filePath == '' ?
                                            require('../assets/placeholder.jpg') :
                                            this.state.filePath}>

                                    </Image>
                                </TouchableOpacity>
                                <View style={{height:40,width:40,
                                alignItems:'center',
                                justifyContent:'center',
                                position:'absolute',
                                bottom:5,
                                right:28}}>
                                    <Image style={{height:30,width:30,
                                    tintColor:'black'}}
                                    
                                    source={require('../assets/camera.png')}></Image>
                                </View>
                            </View>
                            <View style={{
                                width: '100%',
                                marginTop: 20,
                                alignItems: 'center'
                            }}>
                                <Text style={{ width: '80%',
                                 color:'white',
                                 fontFamily:'EurostileBold' }}>First name</Text>
                                <TextInput style={{
                                    height: 40,
                                    width: '80%',
                                    marginTop: 2,
                                    //borderColor: 'gray',
                                    //borderWidth: 1,
                                    borderRadius: 10,
                                    padding: 5,color:'white'
                                }}
                                    value={this.state.firstname}
                                    onChangeText={(value) => { this.setState({ firstname: value }) }}
                                    keyboardType='ascii-capable'
                                    placeholder='Enter your first name'
                                    placeholderTextColor='lightgray'>

                                    </TextInput>
                                <View style={{
                                    height: 1,
                                    width: '80%', 
                                    backgroundColor: 'white'
                                }}></View>
                                <Text style={{
                                    width: '80%',
                                   color:'white',
                                    marginTop: 10,
                                    fontFamily:'EurostileBold',
                                }}>Last name</Text>
                                <TextInput style={{
                                    height: 40,
                                    width: '80%',
                                    marginTop: 2,
                                    color:'white',
                                    borderRadius: 10,
                                     padding: 5
                                }}
                                    keyboardType='ascii-capable'
                                    value={this.state.lastname}
                                    onChangeText={(value) => { this.setState({ lastname: value }) }}
                                    placeholder='Enter your last name'
                                    placeholderTextColor='lightgray'>

                                </TextInput>
                                <View style={{
                                    height: 1,
                                    width: '80%', backgroundColor: 'white'
                                }}></View>
                                <Text style={{
                                    width: '80%',
                                    marginTop: 10,
                                   color:'white',
                                    fontFamily:'EurostileBold',
                                }}>Email</Text>
                                <TextInput style={{
                                    height: 40,
                                    width: '80%',
                                    marginTop: 2,
                                    // borderColor: 'gray',
                                    // borderWidth: 1,
                                    borderRadius: 10, padding: 5,
                                    color:'white'
                                }}
                                    value={this.state.email}
                                    onChangeText={(value) => { this.setState({ email: value }) }}
                                    keyboardType='ascii-capable'
                                    placeholder='Enter your email'
                                    placeholderTextColor='lightgray'>

                                    </TextInput>
                                <View style={{
                                    height: 1,
                                    width: '80%',
                                     backgroundColor: 'white'
                                }}></View>

                                <Text style={{
                                    width: '80%', marginTop: 10,
                                   color:'white',
                                    fontFamily:'EurostileBold',
                                }}>Phone No.</Text>
                                <TextInput style={{
                                    height: 40,
                                    width: '80%',
                                    marginTop: 2,
                                    // borderColor: 'gray',
                                    // borderWidth: 1,
                                    borderRadius: 10, padding: 5,
                                    color:'white'
                                }}
                                    value={this.state.phone}
                                    onChangeText={(value) => { this.setState({ phone: value }) }}
                                    keyboardType='number-pad'
                                    returnKeyType='done'
                                    placeholder='Enter your phone no'
                                    placeholderTextColor='lightgray'></TextInput>
                                <View style={{
                                    height: 1,
                                    width: '80%', backgroundColor: 'white'
                                }}></View>

                                <Text style={{
                                    width: '80%', 
                                    marginTop: 10,
                                    color:'white',
                                    fontFamily:'EurostileBold',
                                }}>Password</Text>
                                <TextInput style={{
                                    height: 40,
                                    width: '80%',
                                    marginTop: 2,
                                    color:'white',
                                    borderRadius: 10, 
                                    padding: 5
                                }}
                                    secureTextEntry={true}
                                    keyboardType='ascii-capable'
                                    value={this.state.password}
                                    onChangeText={(value) => { this.setState({ password: value }) }}
                                    placeholder='Enter your password'
                                    placeholderTextColor='lightgray'>

                                    </TextInput>
                                <View style={{
                                    height: 1,
                                    width: '80%', backgroundColor: 'white'
                                }}></View>
                            </View>

                            <TouchableOpacity style={{
                                height: 50, width: '60%',
                                backgroundColor: APP_YELLOW,
                                marginTop: 20,
                                alignSelf: 'center',
                                borderRadius: 10,
                                // marginBottom:10,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                                onPress={() => {
                                    //this.props.navigation.navigate('Login')
                                    this.signup()
                                }}>
                                <Text style={{
                                    fontSize: 18, 
                                    color: 'white',
                                    fontFamily:'EurostileBold',
                                }}>Submit</Text>


                            </TouchableOpacity>
                            {/* <TouchableOpacity style={{
                                height: 50, width: '60%',
                               // backgroundColor: APP_BLUE,
                                marginTop: 10,
                                 alignSelf: 'center',
                                borderRadius: 10,
                                marginBottom:10,
                                borderColor:APP_YELLOW,
                                borderWidth:2,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                                onPress={() => {
                                    this.props.navigation.navigate('Login')
                               
                                }}>
                                <Text style={{
                                    fontSize: 18, fontWeight: '700',
                                    color: APP_YELLOW
                                }}>Login</Text>
                                

                            </TouchableOpacity> */}

                            <TouchableOpacity onPress={() => {
                                this.props.navigation.navigate('Login')
                            }}>
                                <Text
                                    style={{
                                        alignSelf: 'center',
                                         marginTop: 5,
                                        color: 'gray', 
                                        marginBottom: 15,
                                        marginTop: 10,
                                        fontFamily:'EurostileBold',
                                        color:'white'
                                    }}>
                                    Already have an account ?<Text style={{
                                        alignSelf: 'center', 
                                        color: APP_YELLOW,
                                       fontFamily:'EurostileBold',
                                    }}> Login here</Text></Text>
                            </TouchableOpacity>
                            </ScrollView>
                </KeyboardAvoidingView>
                        </View>

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
    signup = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (this.state.firstname == '') {
            alert('Please enter the first name')
        } else if (this.state.lastname == '') {
            alert('Please enter the last name')
        }
        else if (this.state.email == '') {
            alert('Please enter the email')
        } else if (!reg.test(this.state.email)) {
            alert('Please enter the valid email')
        }
        else if (this.state.password == '') {
            alert('Please enter the password')
        } else if (this.state.phone == '') {
            alert('Please enter the phone number')
        } else {
            this.SignUp()
        }
    }
}



