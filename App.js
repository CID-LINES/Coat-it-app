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
  Image, DeviceEventEmitter
} from 'react-native';

import Signup from './Screen/SignUp';
import Login from './Screen/Login';
import CarDetail from './Screen/CarDetail'
import Home from './Screen/Home'
import AddCar from './Screen/AddCar'
import Notification from './Screen/Notification'
import UserProfile from './Screen/UserProfile'
import { APP_BLUE, APP_LIGHT, APP_YELLOW } from "./Component/colors";
import DetailerCar from './Screen/DetailerCar'
import MyCars from './Screen/MyCars'
import Settings from './Screen/Settings'
import ServiceDetail from './Screen/ServiceDetail'
import DetailerList from './Screen/DetailerList';
import ChangePassword from './Screen/ChangePassword';
import DetailerLocation from './Screen/DetailerLocation';
import NotificationDetail from './Screen/NotificationDetail';
import EditCarDetail from './Screen/EditCarDetail'
import Payment from './Screen/Payment'
import PurchaseDetail from './Screen/PurchaseDetail'
import PastPurchaseDetail from './Screen/PastPurchaseDetail'
import EditProfile from './Screen/EditProfile'





const Tabnavigation =createBottomTabNavigator({
  Services: {screen: Home,
    navigationOptions: {
      tabBarLabel: 'Service',
      tabBarIcon: ({ tintColor }) => (
        <Image style={{ width: 30, height: 30, tintColor:tintColor,marginTop:10,marginBottom:5}}
          source={require('./assets/service-icon.png')}
          resizeMode={"contain"}>

        </Image>
      )
    }
  },
  Notification:{screen: Notification,
    navigationOptions: {
    tabBarLabel: 'Notification',
    tabBarIcon: ({ tintColor }) => (
      <Image style={{ width: 30, height: 30, tintColor:tintColor,marginTop:10,marginBottom:5}}
        source={require('./assets/notification-icon.png')}
        resizeMode={"contain"}>

      </Image>
    )
  }},
  Profile:{screen: UserProfile,
    navigationOptions: {
      tabBarLabel: 'User Profile',
      tabBarIcon: ({ tintColor }) => (
        <Image style={{ width: 30, height: 30, tintColor:tintColor,marginTop:10,marginBottom:5}}
          source={require('./assets/profile-icon.png')}
          resizeMode={"contain"}>

        </Image>
      )
    }},
 

  
},{
  tabBarOptions: {
    showIcon: true,
    inactiveTintColor:'white',
    activeTintColor: '#3f51B5',

    style: {height:45,

      // justifyContent:'center',
      backgroundColor: APP_YELLOW,
    }
  }

})
  const LoginNavigator = createStackNavigator({
    Login:{screen :Login },
    Signup: { screen: Signup },
    CarDetail : {screen : CarDetail},
    Home: {screen: Tabnavigation},
    AddCar :{screen :AddCar},
    DetailerCar:{screen :DetailerCar},
    MyCars:{screen: MyCars},
   Settings :{ screen : Settings},
   ServiceDetail:{screen :ServiceDetail},
   DetailerList:{screen:DetailerList},
  ChangePassword :{screen :ChangePassword},
  DetailerLocation :{screen:DetailerLocation},
  NotificationDetail:{screen :NotificationDetail},
  EditCarDetail:{screen :EditCarDetail},
  Payment:{screen :Payment},
  PurchaseDetail:{screen:PurchaseDetail},
  PastPurchaseDetail:{screen:PastPurchaseDetail},
  EditProfile:{screen:EditProfile}
    
  },
    {
      defaultNavigationOptions: {
        header: null
      }
    }
  );
 
  



const App = createAppContainer(LoginNavigator);

export default App;
