import React, { Component, Fragment } from 'react'
import { View, ImageBackground, Text, TouchableOpacity, TextInput, Image, SafeAreaView, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import { height, width, totalSize } from 'react-native-dimension'
import { NavigationEvents } from 'react-navigation'
import moment from 'moment-timezone'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import AsyncStorage from '@react-native-community/async-storage'

import { link } from '../../links/links'
import { mainColor } from '../../GlobleColor/GlobleColor'


export default class notification extends Component {
  constructor() {
    super()
    this.state = {
      orderHistory: [],
      loader: true
    }
  }

  componentDidMount = () => {
    this.open()
  }

  open = async () => {
    try {

      const val = JSON.parse(await AsyncStorage.getItem('details'))

      // console.log(val)

      fetch(link + 'notification/getCustomerNotifications?customerId=' + val.id)
        .then((response) => response.json())
        .then(async (responseJson) => {
          if (responseJson.type == 'success') {
            console.log(responseJson.result[0].vendor);
            let data = responseJson.result
            let data2 = data.map(e => {
              e.address = e.vendor.address
              return e
            })
            this.setState({
              orderHistory: data2.reverse(),
              loader: false
            })
          }
          else {
            this.setState({
              loader: false
            })
          }

        }).catch((e) => {
          this.setState({
            loader: false
          })
        })

    } catch (e) {

    }

  }

  _flatlist = ({ item }) => {
    return (
      <View style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2, width: '95%', marginVertical: height(1), justifyContent: 'center', alignSelf: 'center', borderRadius: 5, backgroundColor: '#fff'
      }}>

        <View style={{ width: '95%', paddingVertical: height(1), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center' }}>

          <View style={{ width: '65%' }}>

            <Text
              numberOfLines={2}
              style={{ fontSize: totalSize(1.7) }}>
              {item.text}
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

              <MaterialIcons name='location-on' size={12} />

              <View style={{ width: width(2) }} />

              <Text
                numberOfLines={1}
                style={{ fontSize: totalSize(1.7) }}>
                {item.address}
              </Text>

            </View>

          </View>

          <View>

            <Text style={{ fontSize: totalSize(1.7) }}>
              {moment(item.createdAt).fromNow()}
            </Text>

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
                    Notification
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
                data={this.state.orderHistory}
                renderItem={this._flatlist}
              />

            }

          </View>

        </SafeAreaView>

      </Fragment>


    )
  }
}