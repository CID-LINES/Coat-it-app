


import {  createAppContainer,createSwitchNavigator } from "react-navigation"; 
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';


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
import ProductDetail from './Screen/ProductDetail';
import NotificationDetail from './Screen/NotificationDetail';
import EditCarDetail from './Screen/EditCarDetail'
import AddDetailer from './Screen/AddDetailer'
import PurchaseDetail from './Screen/PurchaseDetail'
import ForgetPassword from './Screen/ForgetPassword'
import EditProfile from './Screen/EditProfile'
import ProductList from './Screen/ProductList'
import DetailerDetail from './Screen/DetailerDetail'
import FavouriteProducts from './Screen/FavouriteProducts'
  //  import Welcome from './Screen/Welcome'
 

const Tabnavigation =createBottomTabNavigator({
  Services: {screen: Home,
    navigationOptions: {
      tabBarLabel: 'Services',
      tabBarIcon: ({ tintColor }) => (
        <Image style={{ width: 30,
           height: 30, 
           tintColor:tintColor,
           marginTop:10,
           marginBottom:10}}
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
      <Image style={{ width: 30, 
        height: 30, 
        tintColor:tintColor,
        marginTop:10,
        marginBottom:10}}
        source={require('./assets/notification-icon.png')}
        resizeMode={"contain"}>
      </Image>
    )
  }},
  ProductList:{screen: ProductList,
    navigationOptions: {
      tabBarLabel: 'Products',
      tabBarIcon: ({ tintColor }) => (
        <Image style={{ width: 30, 
          height: 30, tintColor:tintColor,
          marginTop:10,
          marginBottom:10}}
          source={require('./assets/product.png')}
          resizeMode={"contain"}>

        </Image>
      )
    }},

  Profile:{screen: UserProfile,
    navigationOptions: {
      tabBarLabel: 'User Profile',
      tabBarIcon: ({ tintColor }) => (
        <Image style={{ width: 30, 
          height: 30,
          tintColor:tintColor,
          marginTop:10,
          marginBottom:10}}
          source={require('./assets/profile-icon.png')}
          resizeMode={"contain"}>

        </Image>
      )
    }},
   
},{
  tabBarOptions: {
    showIcon: true,
    inactiveTintColor:'white',
    activeTintColor: 'black',
    labelStyle:{fontSize:15,
      fontFamily: 'EurostileBold'},
    style: {height:52,
      backgroundColor: APP_YELLOW,
    }
  }

})
  const LoginNavigator = createStackNavigator({
        // Welcome :{screen:Welcome},
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
  ProductDetail :{screen:ProductDetail},
  NotificationDetail:{screen :NotificationDetail},
  EditCarDetail:{screen :EditCarDetail},
  PurchaseDetail:{screen:PurchaseDetail},
  ForgetPassword:{screen:ForgetPassword},
  EditProfile:{screen:EditProfile},
  AddDetailer:{screen:AddDetailer},
  DetailerDetail: {screen:DetailerDetail},
  FavouriteProducts:{screen:FavouriteProducts}

  },
    {
      defaultNavigationOptions: {
        header: null
      }
    }
  );
 
  



const App = createAppContainer(LoginNavigator);

export default App;
