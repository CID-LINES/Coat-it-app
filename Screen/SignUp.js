import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator, AsyncStorage } from 'react-native';
import { APP_BLUE } from '../Component/colors'
import{ApiCall, ApiCallWithImage} from '../Component/ApiClient'
import ImagePicker from 'react-native-image-picker';
import { StackActions, NavigationActions } from 'react-navigation';
export default class SignUp extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            phone: '',
            firstname: '',
            lastname: '',
            filePath:'',
            isLoading:false
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


    componentDidMount(){
        AsyncStorage.getItem('user_id',(error,item)=>{
            if(item!=null&&item!=''){
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
        var photo = {
            uri: this.state.filePath.uri,
            type: 'image/jpeg',
            name: 'photo.jpg',
        };
        // alert(this.state.brewery_id)
        body.append('avatar', photo);
        body.append('email', this.state.email)
        body.append('password', this.state.password)
        body.append('first_name', this.state.firstname)
        body.append('last_name', this.state.lastname,)
        body.append('phone_no', this.state.phone)

        fetch('http://3.137.41.50/coatit/public/api/auth/signup', 
     
        {
            method: 'POST',
            headers: {
             Accept: 'application/json', 
                'Content-Type': 'multipart/form-data',
               //  'Content-Type': 'application/json'
            },
            body:body
        })
            .then((response) => response.json())
            .then((responseJson) => {
               console.log(responseJson.response)
               if(responseJson.response.Status == true){
                this.save('user_id',responseJson.response.id+'')

                const resetAction = StackActions.reset({
                    index: 0,
                    key: null,
                    actions: [NavigationActions.navigate({ routeName: 'CarDetail' })],
                });
                this.props.navigation.dispatch(resetAction);
                alert(responseJson.response.message)
                //this.props.navigation.replace('CarDetail') 

               }
              this.setState({
                  isLoading:false

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
                {/* <KeyboardAvoidingView style={{ flex: 1 }}
                    behavior='padding' enabled ={Platform.OS='ios'}>  */}
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
                                    // maxHeight:100
                                    //alignSelf: 'center', 
                                }}
                                resizeMethod='resize'
                                    source={this.state.filePath == '' ? 
                                    require('../assets/placeholder.jpg'): 
                                    this.state.filePath}>

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
                                    onChangeText={(value) => {this.setState({ firstname: value }) }}
                                    keyboardType='ascii-capable'
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
                                keyboardType='ascii-capable'
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
                                    onChangeText={(value) => { this.setState({ email: value })}}
                                    keyboardType='ascii-capable'
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
                                    onChangeText={(value) => { this.setState({ phone: value })}}
                                    keyboardType='number-pad'
                                    returnKeyType='done'
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
                                secureTextEntry={true}
                                keyboardType='ascii-capable'
                                    value={this.state.password}
                                    onChangeText={(value) => { this.setState({ password: value }) }}
                                    placeholder='Password'
                                    placeholderTextColor='gray'></TextInput>
                            </View>

                            <TouchableOpacity style={{
                                height: 50, width: '60%',
                                backgroundColor: APP_BLUE,
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
                                    fontSize: 18, fontWeight: '700',
                                    color: 'white'
                                }}>Submit</Text>
                                

                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                height: 50, width: '60%',
                               // backgroundColor: APP_BLUE,
                                marginTop: 10,
                                 alignSelf: 'center',
                                borderRadius: 10,
                                marginBottom:10,
                                borderColor:APP_BLUE,
                                borderWidth:2,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                                onPress={() => {
                                    this.props.navigation.navigate('Login')
                               
                                }}>
                                <Text style={{
                                    fontSize: 18, fontWeight: '700',
                                    color: APP_BLUE
                                }}>Login</Text>
                                

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
    signup=()=>{
        if(this.state.firstname == '')
        {
            alert('Please enter the first name')
        }else if(this.state.lastname== ''){
            alert('Please enter the last name')
        }else if(this.state.email == ''){
            alert('Please enter the email')
        }else if(this.state.password==''){
            alert('Please enter the password')
        }else if(this.state.phone == ''){
            alert('Please enter the phone number')
        }else{
            this.SignUp()
        }
    }
}



