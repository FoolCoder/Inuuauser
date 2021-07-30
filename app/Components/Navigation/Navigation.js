import React from 'react'
import { Provider } from 'react-redux'

import configureStore from '../../store/reducers/configureStore'

import { connect } from 'react-redux'

import { setdetails } from '../../store/actions/index'

import { width } from 'react-native-dimension'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'


import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer'
//console.disableYellowBox = true;
LogBox.ignoreAllLogs(true)


import splash from '../../Components/splash/splash'

  //stack
  import login from '../../Components/login/login'
  import signup from '../../Components/signup/signup'
  import signupPC from '../../Components/signup/signupPC'
  import signupCC from '../../Components/signup/signupCC'
  import fp from '../../Components/forgetpassword/forgetpassword'
  import fph from '../../Components/forgetpassword/forgetphone'
  import cc from '../../Components/forgetpassword/confirmationCode'
  import np from '../../Components/forgetpassword/newPassword'
 

  //homestack

   import cart from '../../Components/cart/cart'
   import stripeP from '../../../PaymentScreen'
   import profile from '../profile/profile'
   import home from '../../Components/home/home'


  //vender stack

    import nearV from '../../Components/nearVendors/nearVendors'
    import selectedF from '../../Components/selectedfood/selectedfood'
    import orderP from '../../Components/orderPlaced/orderPlaced'
    import chat from '../../Components/chat/chat'
    import selectedV from '../../Components/selectedVendor/selectedVendor'   
    import reOrder from '../../Components/selectedVendor/reOrder'             // error react-native star rating/index.js 
    import vendorProfile from '../../Components/vendorProfile/vendorProfile'


   //event stack

    import event from '../../Components/events/events'
    import eventV from '../../Components/events/eventVendors'
    import esV from '../../Components/events/esVendor'
    import esvF from '../../Components/events/esvfood'
  //already call in vndr stck
  // import orderP from '../../Components/orderPlaced/orderPlaced'
  // import vendorProfile from '../../Components/vendorProfile/vendorProfile'
  // import chat from '../../Components/chat/chat'


//order stack

import orders from '../../Components/orderReview/orders'
import selectedOR from '../../Components/orderReview/selectedOR'



import notification from '../../Components/Notification/Notification'
import addCard from '../addCard/addCard'


import { Cdrawer } from '../../Components/CustomDrawer/CustomDrawer' //custom drawer

import appIntro from '../../Components/appIntro/appIntro'



import orderReview from '../../Components/orderReview/orderReviews'


import { LogBox } from 'react-native'

const stack = createStackNavigator(
  {
    login: login,
    signup: signup,
    signupPC: signupPC,
    signupCC: signupCC,
    fp: fp,
    fph: fph,
    cc: cc,
    np: np
  },
  {
    headerMode: 'none'
  }
)
 
const homeStack = createStackNavigator(
  {
    homet: home,
    cart: cart,
    stripeP: stripeP,
    profile: profile
  },
  {
    headerMode: 'none'
  }
)

const Vendorstack = createStackNavigator(
  {
    nearV: nearV,
    selectedV: selectedV,
    selectedF: selectedF,
    reOrder: reOrder,
    orderP: orderP,
    vProfile: vendorProfile,
    chat: chat
  },
  {
    headerMode: 'none'
  }
)

const Event = createStackNavigator(
  {
    event: event,
    eventV: eventV,
    esV: esV,
    esvF: esvF,
    orderP: orderP,
    vProfile: vendorProfile,
    chat: chat
  },
  {
    headerMode: 'none'
  }
)

const orderRstack = createStackNavigator(
  {
    orders: orders,
    selectedOR: selectedOR
  },
  {
    headerMode: 'none'
  }
)


const drawer = createDrawerNavigator(
  {
    home: {
      screen: homeStack,
      navigationOptions: {
        drawerLabel: 'Home',
        drawerIcon: <MaterialIcons name='home' size={25} color='#ffffff' />
      }

    },
    NearbyVendor: {
      screen: Vendorstack,
      navigationOptions: {
        drawerLabel: 'Nearby Vendors',
        drawerIcon: <MaterialIcons name='location-on' size={25} color='#ffffff' />
      }
    },
    Event: {
      screen: Event,
      navigationOptions: {
        drawerLabel: 'Street Food Market',
        drawerIcon: <MaterialIcons name='event-note' size={25} color='#ffffff' />
      }
    },
    orderR: {
      screen: orderRstack,
      navigationOptions: {
        drawerLabel: 'Order',
        drawerIcon: <MaterialCommunityIcons name='hamburger' size={25} color='#ffffff' />
      }
    },
    notification: {
      screen: notification,
      navigationOptions: {
        drawerLabel: 'Notifications',
        drawerIcon: <MaterialCommunityIcons name='bell' size={25} color='#ffffff' />
      }
    },
    addcard: {
      screen: addCard,
      navigationOptions: {
        drawerLabel: 'Add Card',
        drawerIcon: <EvilIcons name='credit-card' size={25} color='#ffffff' />
      }
    }, 
    logout: {
      screen: () => null,
      navigationOptions: {
        drawerLabel: 'Logout',
        drawerIcon: <SimpleLineIcons name='logout' size={20} color='#ffffff' />
      }
    },
  },
  {
    contentComponent: props => Cdrawer(props),
    drawerBackgroundColor: 'transparent',
    drawerWidth: width(70),
    contentOptions: {
      activeTintColor: '#ffffff',
      inactiveTintColor: '#ffffff',
    },
    initialRouteName: 'home'
  }
)

const Switc = createSwitchNavigator(
  {
    splash: splash,
    stack: stack,
    drawer: drawer
  },
  {
    initialRouteName: 'splash'
  }
)

export default createAppContainer(Switc)

// const mapstateToProps=state=>{
//   return{
//     name:state.details.name,
//     number:state.details.number
//   }
// }

// const mapDispatchToProps=dispatch=>{
//   return {
//     onSetDetails:(details)=>dispatch(setdetails(details))
//   }
// }

// const store =configureStore();

// export default class App extends React.Component {
//   render() {
//     return (
//       <Provider store={store}>
//         <Sw />
//       </Provider>
//     );
//   }
// }

// export default connect(mapstateToProps,mapDispatchToProps)(App);
