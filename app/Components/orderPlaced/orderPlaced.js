import React, { Component, Fragment } from 'react'
import { View, ImageBackground, Text, TouchableOpacity, TextInput, Image, SafeAreaView, StyleSheet, FlatList } from 'react-native'
import { height, width, totalSize } from 'react-native-dimension'


import Header from '../header/header'

import user from '../../assets/user.png'
import user2 from '../../assets/user2.png'

import back from '../../assets/back.png'
import forword from '../../assets/forword.png'
import sign from '../../assets/imageB.jpeg'

import food from '../../assets/foodbackground.jpg'
import burger from '../../assets/burger.jpg'
import shawarma from '../../assets/shawarma.jpg'
import chat from '../../assets/chat.png'

export default class selectedVendor extends Component {
  constructor() {
    super()
    this.state = {
      Quantity: 1,
      Price: 15,
      priceS: 15,
      rating:5,
      selectedValue: '',
      nearVendor: {
        name: 'Andrew', address: 'Street #6, San Francisco, CA'
        , phoneNo: '+123 456 789 234', pic: user2, time: '5 min'
      }
    }
  }

  minus = () => {
    let price = this.state.priceS
    if (this.state.Quantity > 1) {
      this.setState({
        Quantity: this.state.Quantity - 1,
        Price: (this.state.Quantity - 1) * price
      })
    }
  }
  plus = () => {
    let price = this.state.priceS
    if (this.state.Quantity <= 10) {
      this.setState({
        Quantity: this.state.Quantity + 1,
        Price: (this.state.Quantity + 1) * price
      })
    }
  }

  render() {
    return (
      <Fragment>
        <SafeAreaView
          style={(styles.container, { backgroundColor: '#2ca0df' })}
        />
        <SafeAreaView style={styles.container}>
          <View style={{ flex: 1, backgroundColor: '#d2d5cb' }}>

            <View style={{ height: height(10) }}>

              <Header
                home={() => this.props.navigation.navigate('home')}
                drawer={() => this.props.navigation.toggleDrawer()}
                cart={()=>this.props.navigation.navigate('cart')}
                />

            </View>


            <View style={{ flex: 1, marginTop: height(1), backgroundColor: '#f1eff0', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>

              <View style={{ height: height(0.5), width: width(35), alignSelf: 'center', backgroundColor: '#bdbdbd' }}></View>

              <ImageBackground
                style={{ height: height(40), width: width(100) }}
                source={food}
              />

              <View style={{ width: width(90), marginTop: height(3), alignSelf: 'center' }}>

                <Text style={{ fontSize: totalSize(3) }}>
                  Shawarma
              </Text>

                <Text style={{ fontSize: totalSize(1.7) }}>
                  Full of taste and filled with Spicy chicken
              </Text>

              <Text style={{ marginTop:height(8),fontSize: totalSize(1.7) }}>
                  Your Order has been placed. On completion will be notified
              </Text>

              </View>

              <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('chat')}
                  style={{ height: height(6),width:width(75), marginTop: height(15), borderRadius: 10,flexDirection:'row',justifyContent:'center',alignItems:'center', alignSelf: 'center', backgroundColor: '#099794' }}>
                  
                  <Image style={{height:15,width:15,marginTop:height(0.5)}} source={chat}/>

                  <View style={{width:width(4)}}/>

                  <Text style={{ fontSize: totalSize(2.5), alignSelf: 'center', color: '#ffffff' }}>
                    Message
              </Text>

                </TouchableOpacity>

            </View>

          </View>

        </SafeAreaView>

      </Fragment>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  }
})