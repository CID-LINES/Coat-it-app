// // /**
// //  * Sample React Native App
// //  * https://github.com/facebook/react-native
// //  *
// //  * @format
// //  * @flow
// //  */


import {  createAppContainer,createSwitchNavigator } from "react-navigation"; 
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
//import {} from 'rea'


import React from 'react';
import {
  Image
} from 'react-native';

import Signup from './Screen/SignUp';
import Login from './Screen/Login';
import CarDetail from './Screen/CarDetail'
import Home from './Screen/Home'
import AddCar from './Screen/AddCar'
import Notification from './Screen/Notification'
import UserProfile from './Screen/UserProfile'
import { APP_BLUE, APP_LIGHT } from "./Component/colors";
import Purchase from './Screen/Purchase'
import MyCars from './Screen/MyCars'
import Settings from './Screen/Settings'
import ServiceDetail from './Screen/ServiceDetail'
import DetailerList from './Screen/DetailerList';
import ChangePassword from './Screen/ChangePassword'



const Tabnavigation =createBottomTabNavigator({
  Services: {screen: Home,
    navigationOptions: {
      tabBarLabel: ' ',
      tabBarIcon: ({ tintColor }) => (
        <Image style={{ width: 30, height: 30, tintColor:tintColor,marginTop:10}}
          source={require('./assets/service-icon.png')}
          resizeMode={"contain"}>

        </Image>
      )
    }
  },
  Notification:{screen: Notification,
    navigationOptions: {
    tabBarLabel: ' ',
    tabBarIcon: ({ tintColor }) => (
      <Image style={{ width: 30, height: 30, tintColor:tintColor,marginTop:10}}
        source={require('./assets/notification-icon.png')}
        resizeMode={"contain"}>

      </Image>
    )
  }},
  Profile:{screen: UserProfile,
    navigationOptions: {
      tabBarLabel: ' ',
      tabBarIcon: ({ tintColor }) => (
        <Image style={{ width: 30, height: 30, tintColor:tintColor,marginTop:10}}
          source={require('./assets/profile-icon.png')}
          resizeMode={"contain"}>

        </Image>
      )
    }},
 

  
},{
  tabBarOptions: {
    showIcon: true,
    //inactiveTintColor:'white',
    activeTintColor: APP_BLUE,

    style: {height:45,

      // justifyContent:'center',
      //backgroundColor: APP_LIGHT,
    }
  }

})
  const LoginNavigator = createStackNavigator({
    Signup: { screen: Signup },
    Login:{screen :Login },
    CarDetail : {screen : CarDetail},
    Home: {screen: Tabnavigation},
    AddCar :{screen :AddCar},
    Purchase:{screen :Purchase},
    MyCars:{screen: MyCars},
    Settings :{ screen : Settings},
  ServiceDetail:{screen :ServiceDetail},
  DetailerList:{screen:DetailerList},
  ChangePassword :{screen :ChangePassword}
    
  },
    {
      defaultNavigationOptions: {
        header: null
      }
    }
  );

  



const App = createAppContainer(LoginNavigator);

export default App;
