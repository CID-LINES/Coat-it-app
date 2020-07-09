import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, AsyncStorage, ActivityIndicator, Alert, ImageBackground } from 'react-native';
import { APP_YELLOW, APP_BLUE, } from '../Component/colors'
import ImagePicker from 'react-native-image-picker';
import { NavigationActions, StackActions } from 'react-navigation';

export default class Settings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            user_id: ''
        }
        //console.log(JSON.stringify(this.state.data))
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
    async save(key, value) {

        try {
            await AsyncStorage.setItem(key, value);

            //alert(JSON.stringify(value))
        } catch (error) {
            //   console.log("Error saving data" + error);
        }
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
                        alignItems:'center',
                        justifyContent:'center',
                        position:'absolute',
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
                            fontSize: 20,
                            color: APP_YELLOW, 
                            fontFamily: 'EurostileBold',
                        }}>Settings</Text>
                    </View>
                </View>
                <TouchableOpacity style={{
                    height: 40,
                    width: '60%',
                    marginTop: 20,
                    alignItems: "center",
                    justifyContent: 'center',
                    borderRadius: 10, 
                    alignSelf: 'center',
                    backgroundColor: APP_YELLOW
                }}
                    onPress={() => {
                        this.props.navigation.navigate('ChangePassword')
                    }}>
                    <Text style={{
                        fontSize: 18,
                        color: 'black',
                        fontFamily: 'EurostileBold',
                    }}>Change Password</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    height: 40, 
                    width: '60%',
                    marginTop: 10, 
                    marginBottom: 10,
                    alignItems: "center", 
                    justifyContent: 'center',
                    borderRadius: 10, 
                    alignSelf: 'center',
                    backgroundColor: APP_YELLOW
                }}
                    // onPress={() => {
                    //     this.props.navigation.navigate('Login')
                    // }}
                    onPress={() => {
                        Alert.alert(
                            'Logout',
                            'Are you sure you want to logout?',
                            [
                                {
                                    fontFamily: 'EurostileBold',
                                    text: 'Logout', onPress: () => {
                                        this.save('user_id', '')
                                        //this.props.navigation.navigate('Login')

                                        const resetAction = StackActions.reset({
                                            index: 0,
                                            key: null,
                                            actions: [NavigationActions.navigate({ routeName: 'Login' })],
                                        });
                                        this.props.navigation.dispatch(resetAction);
                                    }
                                },
                                {
                                    fontFamily: 'EurostileBold',
                                    text: 'Cancel',
                                    style: 'cancel',
                                }],
                            { cancelable: false },
                        );
                    }}
                >
                    <Text style={{
                        fontSize: 18,
                        color: 'black', fontFamily: 'EurostileBold',
                    }}>Logout</Text>
                </TouchableOpacity>
               
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



