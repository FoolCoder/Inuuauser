import React, { Component, Fragment } from 'react'
import { View, ImageBackground, Text, TouchableOpacity, TextInput, Image, SafeAreaView, StyleSheet, ScrollView, FlatList } from 'react-native'
import { height, width, totalSize } from 'react-native-dimension'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import AsyncStorage from '@react-native-community/async-storage'

import Header from '../header/header'

import { eventV, link } from '../../links/links'
import { mainColor } from '../../GlobleColor/GlobleColor'


import user from '../../assets/user.png'
import user2 from '../../assets/user2.png'

import back from '../../assets/back.png'
import forword from '../../assets/forword.png'
import sign from '../../assets/imageB.jpeg'

import food from '../../assets/foodbackground.jpg'
import burger from '../../assets/burger.jpg'
import shawarma from '../../assets/shawarma.jpg'

export default class selectedfood extends Component {
  constructor() {
    super()
    this.state = {
      _id: '',
      id: '',
      eventname: '',
      name: '',
      Quantity: 1,
      Price: 0,
      priceS: 0,
      rating: 5,
      description: '',
      image: '',
      selectedValue: '',
    }
  }

  componentDidMount = () => {
    try {
      console.log(this.props.navigation.getParam('data'));
      console.log('pppppppppp');
      console.log(this.props.navigation.getParam('price'));
      console.log(this.props.navigation.getParam('vendor'))
      console.log(this.props.navigation.getParam('event'))
      let price = this.props.navigation.getParam('price')
      let data = this.props.navigation.getParam('data')
      let _id = this.props.navigation.getParam('vendor')
      let event = this.props.navigation.getParam('event')

      if (price) {
        this.setState({
          event: event,
          _id: _id,
          id: data._id,
          name: data.name,
          Price: price,
          priceS: price,
          description: data.description,
          image: data.image
        })
      }
      else {
        this.setState({
          event: event,
          _id: _id,
          id: data._id,
          name: data.name,
          Price: data.price,
          priceS: data.price,
          description: data.description,
          image: data.image
        })
      }

    } catch (e) {
      console.log(e);
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

  placeorder = async () => {
    let val = JSON.parse(await AsyncStorage.getItem('cart'))

    await AsyncStorage.setItem('vendor', JSON.stringify(this.state._id))
    await AsyncStorage.setItem('event', JSON.stringify(this.state.event))

    let check = false

    var bar = new Promise((resolve, reject) => {
      val.forEach((value, index, array) => {
        console.log(value);
        if (index <= array.length - 1) {
          if (value.id == this.state.id) {
            value.quantity = value.quantity + this.state.Quantity
            check = true
            resolve();
          }

        }
      });
    });

    bar.then(() => {
    })

    if (check == true) {
      await AsyncStorage.setItem('cart', JSON.stringify(val))

      // await AsyncStorage.setItem('cart',JSON.stringify([]))

      this.props.navigation.goBack()
      this.props.navigation.navigate('cart')
    }
    else {
      val.push({
        id: this.state.id,
        name: this.state.name,
        price: this.state.priceS,
        quantity: this.state.Quantity,
        image: this.state.image
      })

      await AsyncStorage.setItem('cart', JSON.stringify(val))

      // await AsyncStorage.setItem('cart',JSON.stringify([]))

      this.props.navigation.goBack()
      this.props.navigation.navigate('cart')
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
                home={() => this.props.navigation.navigate('homet')}
                drawer={() => this.props.navigation.toggleDrawer()}
                cart={() => this.props.navigation.navigate('cart')}
              />

            </View>


            <ScrollView style={{ flex: 1, marginTop: height(1), backgroundColor: '#f1eff0', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>

              <View style={{ height: height(0.5), width: width(35), alignSelf: 'center', backgroundColor: '#bdbdbd' }}></View>
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
                style={{
                  width: width(12),
                  height: height(4),
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 8
                }}
              >
                <Image
                  style={{
                    height: 22, width: 22,
                  }}

                  source={back}
                />
              </TouchableOpacity>
              <ImageBackground
                style={{ height: height(40), width: width(100) }}
                source={{ uri: link + this.state.image }}


              />

              <View style={{ width: width(90), marginTop: height(3), alignSelf: 'center' }}>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                  <Text style={{ fontSize: totalSize(3) }}>
                    {this.state.name}
                  </Text>

                </View>



                <Text style={{ fontSize: totalSize(1.7) }}>
                  {this.state.description}
                </Text>

              </View>

              <View style={{ width: width(75), marginTop: height(10), alignSelf: 'center' }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                  <Text style={{ fontSize: totalSize(2) }}>
                    Quantity
                  </Text>

                  <View style={{ width: width(23), flexDirection: 'row', alignItems: 'center' }}>

                    <View >

                      <TouchableOpacity
                        onPress={() => this.minus()}
                      >

                        <MaterialIcons name='indeterminate-check-box' size={25} color={this.state.Quantity > 1 ? mainColor : '#bdbdbd'} />

                      </TouchableOpacity>

                    </View>

                    <View style={{ width: width(10), alignItems: 'center', backgroundColor: '#ffffff' }}>

                      <Text style={{ fontSize: totalSize(1.7) }}>
                        {this.state.Quantity}
                      </Text>

                    </View>

                    <View >

                      <TouchableOpacity
                        onPress={() => this.plus()}
                      >

                        <MaterialIcons name='add-box' size={25} color={mainColor} />
                      </TouchableOpacity>

                    </View>

                  </View>

                </View>

                <View style={{ marginTop: height(2), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                  <Text style={{ fontSize: totalSize(2) }}>
                    Price
                  </Text>

                  <View style={{ height: 25, width: width(23), borderWidth: 1, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center' }}>

                    <Text style={{ fontSize: totalSize(1.7) }}>
                      £{this.state.Price}
                    </Text>

                  </View>

                </View>

                <TouchableOpacity
                  onPress={() => this.placeorder()}
                  style={{ height: height(6), width: width(75), marginTop: height(8), borderRadius: 10, justifyContent: 'center', alignSelf: 'center', backgroundColor: mainColor }}>
                  <Text style={{ fontSize: totalSize(2.5), alignSelf: 'center', color: '#ffffff' }}>
                    Place Order
                  </Text>
                </TouchableOpacity>

              </View>

            </ScrollView>

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