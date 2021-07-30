import React, { Component, Fragment } from 'react'
import { View, ImageBackground, Text, TouchableOpacity, TextInput, Image, SafeAreaView, StyleSheet } from 'react-native'
import { height, width, totalSize } from 'react-native-dimension'
import { NavigationEvents } from 'react-navigation'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import AsyncStorage from '@react-native-community/async-storage'

import user from '../../assets/user.png'

import { mainColor } from '../../GlobleColor/GlobleColor'

export default class header extends Component {

  constructor() {
    super()
    this.state = {
      point: false
    }
  }

  componentDidMount = async () => {

  }


  open = async () => {
    const val = JSON.parse(await AsyncStorage.getItem('cart'))
    if (val.length > 0) {
      this.setState({
        point: true
      })
    }
    else {
      this.setState({
        point: false
      })
    }
  }

  render() {
    return (

      <View style={{ height: height(10), width: '100%', position: 'absolute', zIndex: 1, borderBottomRightRadius: 10, borderBottomLeftRadius: 10, backgroundColor: mainColor }}>

        <NavigationEvents onDidFocus={() => this.open()} />

        <View style={{ height: height(9), width: width(95), flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-between', alignItems: 'flex-end' }}>

          <TouchableOpacity
            onPress={this.props.drawer}
          >

            <MaterialIcons name='menu' size={30} color='#ffffff' />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.props.home}
          >

            <MaterialIcons name='home' size={30} color='#ffffff' />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.props.cart}
          >

            {this.state.point == true ?

              <View style={{ height: 10, width: 10, borderRadius: 5, position: 'absolute', zIndex: 1, alignSelf: 'flex-end', backgroundColor: '#ec0101' }} />

              : null}

            <MaterialCommunityIcons name='cart' size={30} color='#ffffff' />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.props.profile}
            style={{ height: 30, width: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}>
            <Image style={{ height: 15, width: 15 }} source={user} />
          </TouchableOpacity>

        </View>

      </View>
    )
  }
}