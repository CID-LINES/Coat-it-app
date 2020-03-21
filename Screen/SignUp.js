import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { APP_BLUE } from '../Component/colors'
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
            filePath:''
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



    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAvoidingView style={{ flex: 1 }}
                    behavior='padding' enabled>
                    <ScrollView style={{ flex: 1 }}>

                        <View style={{ flex: 1 }}>
                            <View style={{ height: 210, width: '100%', justifyContent: 'center' }}>
                                <TouchableOpacity style={{height: 120,
                                    width: 120,
                                    borderRadius: 60,
                                    alignSelf: 'center',}}
                                    onPress={() =>{
                                        this.chooseFile()
                                    }}>

                                <Image style={{
                                    height: 120,
                                    width: 120,
                                    borderRadius: 60,
                                    //alignSelf: 'center', 
                                }}
                                    source={this.state.filePath == '' ? require('../assets/placeholder.jpg'): this.state.filePath}>

                                </Image>
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                width: '100%',
                                marginTop: 20,
                                alignItems: 'center'
                            }}>
                                <Text style={{ width: '75%', }}>First name</Text>
                                <TextInput style={{
                                    height: 45,
                                    width: '80%',
                                    marginTop: 5,
                                    borderColor: 'gray',
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    padding: 5
                                }}
                                    value={this.state.firstname}
                                    onChangeText={(value) => { this.setState({ firstname: value }) }}
                                    placeholder='First Name'
                                    placeholderTextColor='gray'></TextInput>
                                <Text style={{
                                    width: '75%',
                                    marginTop: 10
                                }}>Last name</Text>
                                <TextInput style={{
                                    height: 45, width: '80%',
                                    marginTop: 5,
                                    borderColor: 'gray',
                                    borderWidth: 1,
                                    borderRadius: 10, padding: 5
                                }}
                                    value={this.state.lastname}
                                    onChangeText={(value) => { this.setState({ lastname: value }) }}
                                    placeholder='Last Name'
                                    placeholderTextColor='gray'>

                                </TextInput>
                                <Text style={{
                                    width: '75%',
                                    marginTop: 10
                                }}>Email</Text>
                                <TextInput style={{
                                    height: 45, width: '80%',
                                    marginTop: 5,
                                    borderColor: 'gray',
                                    borderWidth: 1,
                                    borderRadius: 10, padding: 5
                                }}
                                    value={this.state.email}
                                    onChangeText={(value) => { this.setState({ email: value }) }}
                                    placeholder='Email'
                                    placeholderTextColor='gray'></TextInput>

                                <Text style={{ width: '75%', marginTop: 10 }}>Phone No.</Text>
                                <TextInput style={{
                                    height: 45,
                                    width: '80%',
                                    marginTop: 5,
                                    borderColor: 'gray',
                                    borderWidth: 1,
                                    borderRadius: 10, padding: 5
                                }}
                                    value={this.state.phone}
                                    onChangeText={(value) => { this.setState({ phone: value }) }}
                                    placeholder='Phone no.'
                                    placeholderTextColor='gray'></TextInput>

                                <Text style={{ width: '75%', marginTop: 10 }}>Password</Text>
                                <TextInput style={{
                                    height: 45,
                                    width: '80%',
                                    marginTop: 5,
                                    borderColor: 'gray',
                                    borderWidth: 1,
                                    borderRadius: 10, padding: 5
                                }}
                                    value={this.state.password}
                                    onChangeText={(value) => { this.setState({ password: value }) }}
                                    placeholder='Password'
                                    placeholderTextColor='gray'></TextInput>
                            </View>

                            <TouchableOpacity style={{
                                height: 50, width: '60%',
                                backgroundColor: APP_BLUE,
                                marginTop: 20, alignSelf: 'center',
                                borderRadius: 25,

                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                                onPress={() => {
                                    this.props.navigation.navigate('Login')
                                }}>
                                <Text style={{
                                    fontSize: 18, fontWeight: '700',
                                    color: 'white'
                                }}>Submit</Text>

                            </TouchableOpacity>
                        </View>

                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}



