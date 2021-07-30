import React, { Component, Fragment, useState, useEffect } from 'react'
import { View, ImageBackground, Text, TouchableOpacity, Image, SafeAreaView, ScrollView, StyleSheet, Alert } from 'react-native'
import { height, width, totalSize } from 'react-native-dimension'
import { DrawerItems } from 'react-navigation-drawer'
import AsyncStorage from '@react-native-community/async-storage'

import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

import { mainColor } from '../../GlobleColor/GlobleColor'

import user2 from '../../assets/user2.png'

export const Cdrawer = (props) => {
  const [name, setname] = useState('John Doe')
  const [number, setnumber] = useState('San Francisco, CA')
  //  const data=useSelector((state)=>state)

  useEffect(() => {
    GoogleSignin.configure({
      //It is mandatory to call this method before attempting to call signIn()
      scopes: ['https://www.googleapis.com/auth/admin.directory.user'],
      // Repleace with your webClientId generated from Firebase console
      webClientId: '304029155739-f60g9jko5qufnsbi75pfb1oonmojri1a.apps.googleusercontent.com',
    });
    details()
  }, [])

  const details = async () => {
    const val = await AsyncStorage.getItem('details')
    const val2 = JSON.parse(val)

    setname(val2.name)
    setnumber(val2.phone)

  }

  const logout = async () => {

    let check = await AsyncStorage.getItem('FCM')

    // if(check=='0')
    // {

    try {
      await GoogleSignin.signOut()
      await AsyncStorage.clear()

    } catch (e) {
      console.log(e);
    }

    props.navigation.navigate('stack')

    // }
    // else{
    //   Alert.alert(
    //     'Cart',
    //     'Cannot logout without clear cart'
    //   )
    // }

  }

  return (
    <SafeAreaView style={{ height: height(100), width: width(70), borderTopRightRadius: 20, borderBottomRightRadius: 20, backgroundColor: mainColor }}>

      <View style={{ height: height(20), borderTopRightRadius: 20, backgroundColor: '#59e1e8' }}>

        <View style={{ height: height(20), width: width(60), alignSelf: 'center', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>

          <View style={{ height: 50, width: 50, borderRadius: 25, backgroundColor: '#6f6e6c', justifyContent: 'center', alignItems: 'center' }}>

            <Image style={{ height: 25, width: 25 }} source={user2} />

          </View>

          <View style={{ width: width(3) }} />

          <View>

            <Text style={{ fontSize: totalSize(2), fontWeight: 'bold', color: '#ffffff' }}>
              {name}
            </Text>

            <Text style={{ fontSize: totalSize(1.8), color: '#ffffff' }}>
              {number}
            </Text>

          </View>

        </View>


      </View>

      <ScrollView style={{ flex: 1 }}>

        <DrawerItems {...props}

          onItemPress={
            ({ route }) => {
              // props.navigation.navigate('stack')
              if (route.key == 'home' || route.key == 'NearbyVendor' || route.key == 'Event') {

                let lenght = route.routes.length - 1
                props.navigation.navigate(route.routes[lenght].routeName)

              }
              else if (route.key == 'notification' || route.key == 'orderR' || route.key == 'addcard') {

                props.navigation.navigate(route.routeName)
              }
              else {
                // props.navigation.navigate('stack')
                logout()
              }

            }
          }
        />
        {/* <TouchableOpacity
          onPress={() => logout()}
          style={{ height: height(6), width: width(62), alignSelf: 'center', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}
        >

          <SimpleLineIcons name='logout' size={25} color='#ffffff' />

          <Text style={{ fontSize: totalSize(1.8), marginLeft: width(8), fontWeight: 'bold', color: '#ffffff' }}>Logout</Text>

        </TouchableOpacity> */}

      </ScrollView>

    </SafeAreaView>
  )
}