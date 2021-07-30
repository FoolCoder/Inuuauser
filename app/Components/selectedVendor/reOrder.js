import React, { Component, Fragment } from 'react'
import { View, ImageBackground, Text, TouchableOpacity, TextInput, Image, Modal, SafeAreaView, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import { height, width, totalSize } from 'react-native-dimension'
import { NavigationEvents } from 'react-navigation'
import moment from 'moment-timezone'

import message from '@react-native-firebase/messaging'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import AsyncStorage from '@react-native-community/async-storage'

import { link } from '../../links/links'
import { mainColor } from '../../GlobleColor/GlobleColor'

import SelectedOR from '../orderReview/selectedOR'

export default class reOrder extends Component {
  constructor() {
    super()
    this.state = {
      visible: false,
      vendor: {},
      k: '',
      orderR: [{ vendor: { name: 'abc' }, total: 20, food: 'New year New me , Ranch , Burger', updatedAt: '29-08-2021' },
      { vendor: { name: 'abc' }, total: 20, food: 'New year New me , Ranch , Burger', updatedAt: '29-08-2021' },
      { vendor: { name: 'abc' }, total: 20, food: 'New year New me , Ranch , Burger', updatedAt: '29-08-2021' },
      { vendor: { name: 'abc' }, total: 20, food: 'New year New me , Ranch , Burger', updatedAt: '29-08-2021' },
      { vendor: { name: 'abc' }, total: 20, food: 'New year New me , Ranch , Burger', updatedAt: '29-08-2021' },
      { vendor: { name: 'abc' }, total: 20, food: 'New year New me , Ranch , Burger', updatedAt: '29-08-2021' },
      { vendor: { name: 'abc' }, total: 20, food: 'New year New me , Ranch , Burger', updatedAt: '29-08-2021' },
      { vendor: { name: 'abc' }, total: 20, food: 'New year New me , Ranch , Burger', updatedAt: '29-08-2021' },
      { vendor: { name: 'abc' }, total: 20, food: 'New year New me , Ranch , Burger', updatedAt: '29-08-2021' },
      { vendor: { name: 'abc' }, total: 20, food: 'New year New me , Ranch , Burger', updatedAt: '29-08-2021' }],
      item: {},
      loader: true
    }
  }

  componentDidMount = async () => {

    this.open()

    message().onMessage(async remoteMessage => {
      setTimeout(() => {
        this.open()
        console.log('123');
      }, 500);
    })

  }

  open = async () => {
    try {

      let data = this.props.navigation.getParam('data')

      this.setState({ vendor: data })

      const val = JSON.parse(await AsyncStorage.getItem('details'))

      fetch(link + 'order/getUserOrders?customerId=' + val.id + '&orderStatus=delivered')
        .then((response) => response.json())
        .then(async (responseJson) => {

          let val = responseJson.result
          var val2 = val.filter(e => {

            if (data._id == e.vendor._id) {

              e.updatedAt = moment(e.updatedAt).format('DD-MMM-YYYY hh:mm a').toUpperCase();
              let food = ''
              e.items.map(q => {
                // console.log(q.item.name);
                food = q.item.name + ' ,' + food
              })

              e.food = food.slice(0, food.length - 1)
              return e

            }
          })
          console.log(val2)
          this.setState({
            orderR: val2,
            loader: false
          })
        }).catch((e) => {
          this.setState({
            loader: false
          })
        })
    }
    catch (e) {
      console.log(e)
    }
  }

  Reorder = async (item) => {

    await AsyncStorage.setItem('vendor', JSON.stringify(this.state.vendor))

    let val = item.items.map((e) => {

      if (e.item.soldOut == false) {

        return {
          id: e.item._id,
          name: e.item.name,
          price: parseFloat((e.item.price * (1 - e.item.discount / 100)).toFixed(2)),
          quantity: e.quantity,
          image: e.item.image
        }

      }
    })

    await AsyncStorage.setItem('cart', JSON.stringify(val))

    this.props.navigation.goBack()
    this.props.navigation.navigate('cart')

  }

  _flatlist = ({ item }) => {
    return (
      <View style={{
        height: height(12), shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2, width: width(95), marginVertical: height(1), alignSelf: 'center', borderRadius: 5, backgroundColor: '#fff'
      }}>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

          <View style={{ width: width(90), alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

            <Text style={{ fontSize: totalSize(1.7), fontWeight: 'bold' }}>
              {item.food}
            </Text>

            <Text style={{ fontSize: totalSize(1.7), fontWeight: 'bold' }}>
              £{item.total.toFixed(2)}
            </Text>

          </View>

          <View style={{ width: width(90), marginTop: height(1), alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

            <View>

              <Text
                numberOfLines={1}
                style={{ fontSize: totalSize(1.5) }}>
                {item.updatedAt}
              </Text>

            </View>

            <TouchableOpacity
              onPress={() => this.Reorder(item)}
              style={{ height: height(4), width: width(17), justifyContent: 'center', alignItems: 'center', backgroundColor: mainColor }}
            >

              <Text style={{ fontSize: totalSize(1.5), color: '#fff' }}>
                Reorder
              </Text>

            </TouchableOpacity>

          </View>

        </View>

      </View>
    )
  }

  render() {
    return (
      <Fragment>

        <SafeAreaView style={{ flex: 1 }}>

          <View style={{ flex: 1 }}>

            <NavigationEvents onDidFocus={() => this.open()} />

            <View style={{ height: height(10), width: '100%', borderBottomRightRadius: 10, borderBottomLeftRadius: 10, backgroundColor: mainColor }}>

              <View style={{ marginTop: height(5), width: '95%', flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-between', alignItems: 'center' }}>

                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}
                >

                  <MaterialIcons name='arrow-back' size={30} color='#ffffff' />
                </TouchableOpacity>

                <TouchableOpacity
                >

                  <Text style={{ fontSize: totalSize(2.5), fontWeight: 'bold', color: '#ffffff' }}>
                    Re-Order
                  </Text>

                </TouchableOpacity>

                <View style={{ height: 30, width: 30 }}>

                </View>

              </View>

            </View>

            {this.state.loader == true ?

              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                <ActivityIndicator size='large' color={mainColor} />

              </View>

              :

              <FlatList
                data={this.state.orderR}
                keyExtractor={(item, index) => { return index.toString() }}
                renderItem={this._flatlist}
              />

            }

          </View>

        </SafeAreaView>

      </Fragment>


    )
  }
}