import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { APP_YELLOW, APP_BLUE, } from '../Component/colors';
import ImagePicker from 'react-native-image-picker';

export default class AddCar extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
                <KeyboardAvoidingView style={{flex:1}}
                behavior='padding'enabled>
                     <View style={{
                        height: 40, width: '95%',
                        justifyContent: 'center',
                        flexDirection:'row',
                        alignSelf: 'center',
                    }}>
                        <TouchableOpacity style={{
                            height: 35, width: 35,
                            alignItems: 'center', 
                            justifyContent: 'center',
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
                            }}>My Cars</Text>
                        </View>
                    </View>
                <ScrollView style={{flex:1}}>
                <View style={{flex:1}}>
                    <View style={{height:250,
                        width:'100%',justifyContent:'center',
                        // backgroundColor:'pink'
                        }}>
                            <TouchableOpacity style={{
                                height:120,
                            width:120,
                            backgroundColor:'gray',
                            borderRadius:75,
                            alignSelf:'center',
                            
                            justifyContent:'center',overflow:'hidden'}}
                           onPress={() =>this.chooseFile()}>
                            <Image style={{height:120,width:120}}
                            resizeMode='cover'
                            source={this.state.filePath == '' ? require('../assets/placeholder.jpg'): this.state.filePath}></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={{width:'100%'}}>
                            <Text style={{marginLeft:35,fontWeight:'800'}}>Car Name</Text>
                            <TextInput style={{height:40,width:'80%',
                                padding:5,
                        alignSelf:'center'}}
                        //placeholderTextColor='black'
                        placeholder='Car Name'></TextInput>
                        <View style={{height:1,width:'80%',
                        alignSelf:'center',
                        backgroundColor:'gray'}}></View>
                        <Text style={{marginLeft:35,fontWeight:'800',marginTop:20}}>Car Color</Text>
                            <TextInput style={{height:40,width:'80%',
                                padding:5,
                        alignSelf:'center'}}
                        //placeholderTextColor='black'
                        placeholder='Car Color'></TextInput>
                        <View style={{height:1,width:'80%',
                        alignSelf:'center',
                        backgroundColor:'gray'}}></View>
                        <Text style={{marginLeft:35,fontWeight:'800',marginTop:20}}>Vehicle No.</Text>
                            <TextInput style={{height:40,width:'80%',
                                padding:5,
                        alignSelf:'center'}}
                        //placeholderTextColor='black'
                        placeholder='Vehicle No.'></TextInput>
                        <View style={{height:1,width:'80%',
                        alignSelf:'center',
                        backgroundColor:'gray'}}></View>
                         <Text style={{marginLeft:35,fontWeight:'800',marginTop:20}}>chassis No.</Text>
                            <TextInput style={{height:40,width:'80%',
                                padding:5,
                        alignSelf:'center'}}
                        //placeholderTextColor='black'
                        placeholder='chassis No'></TextInput>
                        <View style={{height:1,width:'80%',
                        alignSelf:'center',
                        backgroundColor:'gray'}}></View>

                        </View>
                        <TouchableOpacity style={{height:50,width:'60%',
                        marginTop:20,alignSelf:'center',alignItems:'center',
                        justifyContent:'center',
                    backgroundColor:APP_BLUE,borderRadius:25}}
                    
                    onPress={() =>{
                        this.props.navigation.navigate('MyCars')
                    }}>
                        <Text style={{fontWeight:'700',color:'white',
                    fontSize:18}}>Submit</Text>
                    </TouchableOpacity>
                </View>
                </ScrollView>
                </KeyboardAvoidingView>

            </SafeAreaView>
        );
    }
}



