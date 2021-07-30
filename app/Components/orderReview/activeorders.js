import React, { Component, Fragment } from 'react'
import { View, ImageBackground, Text, TouchableOpacity, TextInput, Image, Modal, SafeAreaView, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import { height, width, totalSize } from 'react-native-dimension'
import { NavigationEvents } from 'react-navigation'
import moment from 'moment-timezone'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import AsyncStorage from '@react-native-community/async-storage'

import { link } from '../../links/links'
import { mainColor } from '../../GlobleColor/GlobleColor'

import Activeorder from '../orderReview/actorder'

export default class activeorder extends Component {
  constructor() {
    super()
    this.state = {
      visible: false,
      k: '',
      orderR: [],
      item: {},
      loader: true
    }
  }

  componentDidMount = async () => {

  }

  open = async () => {
    try {

      const val = JSON.parse(await AsyncStorage.getItem('details'))

      fetch(link + 'order/getUserOrders?customerId=' + val.id + '&orderStatus=pending')
        .then((response) => response.json())
        .then(async (responseJson) => {
          console.log(responseJson.result)
          let val = responseJson.result
          var val2 = val.map(e => {
            e.updatedAt = moment(e.updatedAt).format('DD-MMM-YYYY hh:mm a').toUpperCase();
            let food = ''
            e.items.map(q => {
              // console.log(q.item.name);
              food = q.item.name + ' ,' + food
            })

            e.food = food.slice(0, food.length - 1)
            return e
          })
          this.setState({
            orderR: val2,
            loader: false
          })
        })
    }
    catch (e) {
      console.log(e)
    }
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
              {item.vendor.name}
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
                {item.food}
              </Text>

              <Text style={{ fontSize: totalSize(1.5) }}>
                {item.updatedAt}
              </Text>

            </View>

            {item.orderStatus == 'requested' ?

              <Text style={{ fontSize: totalSize(1.5), color: '#000' }}>
                Requested
              </Text>

              :

              <TouchableOpacity
                onPress={() => this.setState({ item: item, visible: true })}
                style={{ height: height(4), width: width(17), justifyContent: 'center', alignItems: 'center', backgroundColor: mainColor }}
              >

                <Text style={{ fontSize: totalSize(1.5), color: '#fff' }}>
                  Details
              </Text>

              </TouchableOpacity>

            }

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

            {this.state.loader == true ?

              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                <ActivityIndicator size='large' color={mainColor} />

              </View>

              :

              <FlatList
                data={this.state.orderR}
                renderItem={this._flatlist}
              />

            }

            <Modal
              animationType='slide'
              visible={this.state.visible}
              transparent={false}
              onRequestClose={() => {
                this.setState({ visible: false })
                this.open()
              }}
            >

              <Activeorder
                back={() => {
                  this.setState({ visible: false })
                  this.open()
                }}
                data={this.state.item}
              />

            </Modal>

          </View>

        </SafeAreaView>

      </Fragment>


    )
  }
}