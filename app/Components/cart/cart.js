import React, { Component, Fragment } from 'react'
import { View, ImageBackground, Text, TextInput, TouchableOpacity, Platform, Alert, Modal, ActivityIndicator, Image, SafeAreaView, StyleSheet, ScrollView, FlatList } from 'react-native'
import { height, width, totalSize } from 'react-native-dimension'
import { NavigationEvents } from 'react-navigation'

import { WebView } from 'react-native-webview';
import { showNotification } from '../../Notification/Notification'
import message from '@react-native-firebase/messaging'

import moment from 'moment-timezone'

import DateTimePicker from '@react-native-community/datetimepicker'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Header from '../header/header'
import back from '../../assets/back.png'
import AsyncStorage from '@react-native-community/async-storage'

import { socket } from '../Socket/socket'

import { link } from '../../links/links'
import { mainColor } from '../../GlobleColor/GlobleColor'

import visa from '../../assets/visa.png'
import masterCard from '../../assets/masterCard.png'


export default class selectedVendor extends Component {

  constructor() {
    super()
    this.state = {
      user: {},
      customerid: '',
      event: '',
      eventId: '',
      vendor: '',
      vendorId: '',
      vendorMO: 0,
      visible: false,
      PreOrder: false,
      CheckPreOrder: false,
      date: new Date(),
      time: new Date(),
      showDate: false,
      showTime: false,
      visible2: false,
      Allergy: '',
      Allergytext: 'Allergy Notes',
      subtotal: 0,
      total: 0,
      load: true,
      item: [],
      showModal: false,
      val: '',
      loader: false,
      socketM: undefined,
      checkoutB: 'Checkout',
      cardIndex: -1,
      cardDetail: null,
    }

  }

  componentDidMount = async () => {

    let val = await AsyncStorage.getItem('vendor')
    let val2 = await AsyncStorage.getItem('event')

    // console.log(val);
    // console.log(val2);
    console.log(this.props.navigation.getParam('data'));
    console.log('ppppppppp');
    console.log(this.props.navigation.getParam('price'));
    console.log('vvvvvvvvvvv');
    console.log(this.props.navigation.getParam('vendor'))
    console.log('eeeeeeeee');
    console.log(this.props.navigation.getParam('event'))

    try {

      let customerid = JSON.parse(await AsyncStorage.getItem('details'))

      this.setState({ user: customerid })

      const s = socket(customerid.id)

      this.setState({
        socketM: s
      })

      this.state.socketM.on('requestResponse', async (data) => {
        this.setState({ loader: false })
        console.log(data)
        if (data.type == true) {

          Alert.alert(
            'Cart',
            data.msg
          )

          await AsyncStorage.setItem('cart', JSON.stringify([]))
          await AsyncStorage.setItem('vendor', '')
          await AsyncStorage.setItem('event', '')
          this.props.navigation.goBack()
          this.props.navigation.navigate('orders')

        }
        else {

          Alert.alert(
            'Cart',
            'Network Problem'
          )
        }

      })

    } catch (e) {
      console.log(e)
    }

    message().onMessage(async remoteMessage => {
      setTimeout(() => {
        this.open()
        // console.log('123');
      }, 500);
    })
  }

  open = async () => {

    let customerid = JSON.parse(await AsyncStorage.getItem('details'))
    let val2 = JSON.parse(await AsyncStorage.getItem('vendor'))
    let val3 = JSON.parse(await AsyncStorage.getItem('event'))

    // console.log(val2)
    // console.log(val3)

    if (val3 != null) {
      this.setState({
        vendor: val2.name,
        vendorId: val2._id,
        vendorMO: val2.minimumOrderPrice,
        event: val3.name,
        eventId: val3._id
      })
    }
    else if (val2 != null) {
      this.setState({
        vendor: val2.name,
        vendorId: val2._id,
        vendorMO: val2.minimumOrderPrice,
      })
    }

    let val = JSON.parse(await AsyncStorage.getItem('cart'))
    console.log(val)
    this.setState({
      customerid: customerid.id,
      item: val,
      subtotal: 0,
      total: 0,
    })

    let subtotal = this.state.subtotal
    let total = this.state.total
    val.map(item => {
      subtotal = subtotal + item.price * item.quantity
      total = total + item.price * item.quantity
      this.setState({
        subtotal: subtotal,
        total: total
      })
    })
    this.setState({
      load: false
    })
  }

  minus = async (item, index) => {
    let cart = this.state.item
    let subtotal = this.state.subtotal
    let total = this.state.total

    subtotal = subtotal - item.price
    total = total - item.price
    cart[index].quantity = cart[index].quantity - 1
    this.setState({
      item: cart,
      subtotal: subtotal,
      total: total
    })

    if (cart[index].quantity < 1) {
      cart.splice(index, 1)
      this.setState({
        item: cart
      })
    }

    await AsyncStorage.setItem('cart', JSON.stringify(this.state.item))

    if (this.state.item.length < 1) {
      await AsyncStorage.setItem('vendor', '')
      await AsyncStorage.setItem('event', '')
      this.props.navigation.goBack()
    }
  }
  plus = async (item, index) => {
    let cart = this.state.item
    let subtotal = this.state.subtotal
    let total = this.state.total
    if (cart[index].quantity < 10) {
      subtotal = subtotal + item.price
      total = total + item.price
      cart[index].quantity = cart[index].quantity + 1
      this.setState({
        item: cart,
        subtotal: subtotal,
        total: total
      })
    }
    await AsyncStorage.setItem('cart', JSON.stringify(this.state.item))
  }

  save = () => {
    if (this.state.Allergy.length > 0) {

      this.setState({
        Allergytext: this.state.Allergy,
        visible: false
      })

    } else {
      this.setState({
        Allergytext: 'Allergy Notes',
        visible: false
      })
    }

  }

  checkout = async () => {
    try {

      var data = {}

      if (this.state.CheckPreOrder == false) {

        if (this.state.vendorId != '' && this.state.eventId != '') {

          data = {
            subtotal: this.state.subtotal.toFixed(2), total: this.state.total.toFixed(2), vendorId: this.state.vendorId
            , eventId: this.state.eventId, fromEvent: true, allergen: this.state.Allergytext
            , customerId: this.state.customerid, item: this.state.item, card: this.state.cardDetail
            , type: 'normal'
          }

        }
        else {
          data = {
            subtotal: this.state.subtotal.toFixed(2), total: this.state.total.toFixed(2), vendorId: this.state.vendorId
            , eventId: null, fromEvent: false, allergen: this.state.Allergytext
            , customerId: this.state.customerid, item: this.state.item, card: this.state.cardDetail
            , type: 'normal'
          }
        }

      }
      else {

        if (this.state.vendorId != '' && this.state.eventId != '') {

          data = {
            subtotal: this.state.subtotal.toFixed(2), total: this.state.total.toFixed(2), vendorId: this.state.vendorId
            , eventId: this.state.eventId, fromEvent: true, allergen: this.state.Allergytext
            , customerId: this.state.customerid, item: this.state.item, card: this.state.cardDetail
            , type: 'preorder', time: this.state.time, date: this.state.date
          }

        }
        else {
          data = {
            subtotal: this.state.subtotal.toFixed(2), total: this.state.total.toFixed(2), vendorId: this.state.vendorId
            , eventId: null, fromEvent: false, allergen: this.state.Allergytext
            , customerId: this.state.customerid, item: this.state.item, card: this.state.cardDetail
            , type: 'preorder', time: this.state.time, date: this.state.date
          }
        }

      }

      this.setState({
        loader: true
      })

      this.state.socketM.emit('checkout', data)

      // console.log(await message().getToken())

      // showNotification('innuaa','hi')

    } catch (e) {
      console.log(e)
    }
  }

  _Flatlist = ({ item, index }) => {
    return (

      <View style={{ height: height(12), width: width(90), margin: 10, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', alignSelf: 'center', backgroundColor: '#e8e8e8', borderRadius: 15 }}>

        <Image
          style={{ height: 70, borderColor: '#000', width: 80, borderRadius: 10, resizeMode: 'contain' }}
          source={{ uri: link + item.image }}
        />

        <View style={{ width: width(40), marginStart: width(2) }}>

          <Text style={{ fontSize: totalSize(2.5), fontWeight: 'bold', color: '#868887' }}>
            {item.name}
          </Text>

          <Text style={{ fontSize: totalSize(2.5), color: '#868887' }}>
            £{item.price}
          </Text>

        </View>

        <View style={{ width: width(22) }}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

            <View style={{ width: width(23), flexDirection: 'row', alignItems: 'center' }}>

              <View >

                <TouchableOpacity
                  style={{ borderRadius: 2, backgroundColor: '#fff' }}
                  onPress={() => this.minus(item, index)}
                >

                  <MaterialCommunityIcons name='minus' size={25} color='#000' />

                </TouchableOpacity>

              </View>

              <View style={{ width: width(7), alignItems: 'center' }}>

                <Text style={{ fontSize: totalSize(2) }}>
                  {item.quantity}
                </Text>

              </View>

              <View >

                <TouchableOpacity
                  style={{ borderRadius: 2, backgroundColor: '#fff' }}
                  onPress={() => this.plus(item, index)}
                >

                  <MaterialIcons name='add' size={25} color='#000' />
                </TouchableOpacity>

              </View>

            </View>

          </View>

        </View>

      </View>
    )
  }

  render() {
    return (
      <Fragment>
        <SafeAreaView
          style={(styles.container, { backgroundColor: '#2ca0df' })}
        />
        <SafeAreaView style={styles.container}>
          <View style={{ flex: 1 }}>

            <View style={{ height: height(10) }}>

              <Header
                home={() => this.props.navigation.navigate('homet')}
                profile={() => this.props.navigation.navigate('profile')}
                drawer={() => this.props.navigation.toggleDrawer()}
              />

            </View>

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
            <NavigationEvents onDidFocus={() => this.open()} />

            {this.state.item.length > 0 ?

              <View style={{ flex: 1 }}>

                <View style={{ width: width(95), marginTop: height(2), alignSelf: 'center' }}>

                  <View style={{ justifyContent: 'center' }}>


                    <Text style={{
                      fontSize: totalSize(2.75), fontWeight: 'bold',
                      color: mainColor
                    }}>

                      {this.state.vendor}

                    </Text>

                    {this.state.event ?

                      <Text style={{ fontSize: totalSize(2.25), fontWeight: 'bold', color: mainColor }}>

                        {this.state.event}

                      </Text>

                      : null}

                  </View>

                  <TouchableOpacity
                    onPress={() => this.setState({ visible: true })}
                    style={{ height: height(5), marginTop: height(2), borderRadius: 5, justifyContent: 'center', backgroundColor: mainColor }}
                  >
                    <Text
                      numberOfLines={1}
                      style={{ fontSize: totalSize(1.8), width: width(90), alignSelf: 'center', color: '#fff' }}>
                      {this.state.Allergytext}
                    </Text>

                  </TouchableOpacity>

                </View>

                <FlatList
                  style={{ width: width(95), maxHeight: height(30), flexGrow: 0, marginTop: height(2), alignSelf: 'center', backgroundColor: mainColor, borderRadius: 10 }}
                  data={this.state.item}
                  renderItem={this._Flatlist}
                />

                <TouchableOpacity
                  onPress={async () => {
                    let val = JSON.parse(await AsyncStorage.getItem('event'))
                    if (val == null) {
                      this.props.navigation.navigate('selectedV', {
                        data: JSON.parse(await AsyncStorage.getItem('vendor'))
                      })
                    }
                    else {
                      this.props.navigation.navigate('esV', {
                        data: JSON.parse(await AsyncStorage.getItem('vendor')),
                        event: val
                      })
                    }
                  }
                  }
                  style={{
                    height: height(5), shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5, width: width(35), marginTop: height(2), alignSelf: 'center', borderRadius: 10, backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
                  }}
                >

                  <Text style={{ fontSize: totalSize(2) }}>
                    Add more
                  </Text>

                  <Ionicons
                    name='add-circle-outline'
                    color='#000'
                    size={25}
                    style={{ marginLeft: width(1) }}
                  />

                  <Image />

                </TouchableOpacity>

                <View style={{ width: width(95), marginTop: height(2), alignSelf: 'center', backgroundColor: mainColor, borderRadius: 10 }}>

                  <View style={{ width: width(80), paddingVertical: height(1), alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                    <View style={{ width: width(40), alignItems: 'center' }}>

                      <Text style={{ fontSize: totalSize(2.2), color: '#fff' }}>
                        Sub Total
                      </Text>

                    </View>

                    <Text style={{ fontSize: totalSize(2.2), color: '#fff' }}>
                      £{this.state.subtotal.toFixed(2)}
                    </Text>

                  </View>


                  <View style={{ width: width(80), paddingVertical: height(1), alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                    <View style={{ width: width(40), alignItems: 'center' }}>

                      <Text style={{ fontSize: totalSize(2.2), color: '#fff' }}>
                        Total
                      </Text>

                    </View>

                    <Text style={{ fontSize: totalSize(2.2), color: '#fff' }}>
                      £{this.state.total.toFixed(2)}
                    </Text>

                  </View>

                </View>

                <View style={{ width: width(90), alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>

                  <TouchableOpacity
                    onPress={async () => {
                      await AsyncStorage.setItem('cart', JSON.stringify([]))
                      await AsyncStorage.setItem('vendor', '')
                      await AsyncStorage.setItem('event', '')
                      this.props.navigation.goBack()
                    }}
                    style={{ height: height(5), width: width(40), marginTop: height(2), justifyContent: 'center', alignItems: 'center', borderRadius: 5, backgroundColor: '#d5585b' }}
                  >

                    <Text style={{ fontSize: totalSize(2), color: '#fff' }}>
                      Clear Cart
                    </Text>

                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => this.setState({ PreOrder: true })}
                    style={{ height: height(5), width: width(40), marginTop: height(2), justifyContent: 'center', alignItems: 'center', borderRadius: 5, backgroundColor: '#308ee3' }}
                  >

                    <Text style={{ fontSize: totalSize(2), color: '#fff' }}>
                      Pre-Order
                    </Text>

                  </TouchableOpacity>

                </View>

                <TouchableOpacity
                  onPress={() => {
                    if (this.state.vendorMO <= this.state.total)
                      this.setState({
                        CheckPreOrder: false,
                        visible2: true
                      })
                    else {
                      Alert.alert(
                        'Cart',
                        'Minimum order atleast £' + this.state.vendorMO
                      )
                    }
                  }
                  }
                  style={{ height: height(7), width: width(60), marginTop: height(3), alignSelf: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: mainColor, borderRadius: 10 }}
                >

                  <Text style={{ fontSize: totalSize(2.5), color: '#fff' }}>
                    {this.state.checkoutB}
                  </Text>

                </TouchableOpacity>

              </View>

              :

              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                {this.state.load == true ?
                  <ActivityIndicator size='large' color={mainColor} />
                  :

                  <Text style={{ fontSize: totalSize(3), color: mainColor }}>
                    Cart is Empty
                  </Text>

                }
              </View>
            }

            <Modal
              animationType={'slide'}
              transparent={true}
              visible={this.state.visible}
              onRequestClose={() => this.setState({ visible: false })}
            >
              <View style={{ flex: 1, backgroundColor: '#fff' }}>

                <View style={{
                  height: height(7), shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,

                  elevation: 5, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#dfdfdf', flexDirection: 'row', alignItems: 'center'
                }}>

                  <TouchableOpacity
                    onPress={() => this.setState({ visible: false })}
                    style={{ width: width(10), marginLeft: width(3), borderRadius: 20, alignItems: 'center' }}>

                    <MaterialIcons name='keyboard-backspace' size={20} color={mainColor} />

                  </TouchableOpacity>

                  <Text style={{ fontSize: totalSize(2), marginLeft: width(3) }}>
                    Allergy Note
                  </Text>

                </View>

                <View style={{ width: width(90), alignSelf: 'center' }}>

                  <Text style={{ fontSize: totalSize(1.8), marginTop: height(2), color: '#a2a2a2' }}>
                    Allergy Note
                  </Text>

                  <TextInput
                    multiline
                    value={this.state.Allergy}
                    onChangeText={(text) => this.setState({ Allergy: text })}
                    style={{ borderBottomWidth: 1, paddingVertical: 0, borderBottomColor: mainColor }}
                  />

                  <Text style={{ fontSize: totalSize(1.8), marginTop: height(2), color: '#a2a2a2' }}>
                    E.g no pickles please
                  </Text>

                  <TouchableOpacity
                    onPress={() => this.save()}
                    style={{ height: height(7), width: width(85), marginTop: height(2), borderRadius: 10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: mainColor }}>

                    <Text style={{ fontSize: totalSize(2), color: '#fff' }}>
                      Save
                    </Text>

                  </TouchableOpacity>

                </View>

              </View>

            </Modal>

            <Modal
              animationType={'slide'}
              transparent={true}
              visible={this.state.PreOrder}
              onRequestClose={() => this.setState({ PreOrder: false })}
            >

              <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>

                <View style={{ height: height(37), width: width(85), justifyContent: 'center', alignItems: 'center' }}>

                  <TouchableOpacity
                    onPress={() => this.setState({ PreOrder: false })}
                    style={{
                      height: 30, shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,

                      elevation: 5, width: 30, borderRadius: 15, position: 'absolute', zIndex: 1, right: 0, top: 0, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center'
                    }}
                  >

                    <Text style={{ textAlign: 'center', fontSize: totalSize(2.2), color: '#ec7a81', fontWeight: 'bold' }}>
                      X
                    </Text>

                  </TouchableOpacity>

                  <View style={{ height: height(35), width: width(80), backgroundColor: '#fff', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>

                    <Text style={{ fontSize: totalSize(3), fontWeight: 'bold', color: mainColor }}>
                      Pre-Order
                    </Text>

                    <View style={{ marginTop: height(4), flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                      <TouchableOpacity
                        onPress={() => this.setState({ showDate: true })}
                        style={{ height: height(4.5), width: width(35), borderWidth: 1, borderColor: mainColor, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>

                        <Text style={{ fontSize: totalSize(1.7) }}>

                          {moment(this.state.date).format('DD-MM-YYYY')}

                        </Text>

                      </TouchableOpacity>

                      <MaterialIcons name='event-note' size={30} color={mainColor} style={{ marginLeft: width(2) }} />

                    </View>

                    <View style={{ marginTop: height(2), flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                      <TouchableOpacity
                        onPress={() => this.setState({ showTime: true })}
                        style={{ height: height(4.5), width: width(35), borderWidth: 1, borderColor: mainColor, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>

                        <Text style={{ fontSize: totalSize(1.7) }}>

                          {moment(this.state.time).format('hh-mm a').toUpperCase()}

                        </Text>

                      </TouchableOpacity>

                      <MaterialIcons name='access-time' size={30} color={mainColor} style={{ marginLeft: width(2) }} />

                    </View>

                    {this.state.showDate ?

                      <DateTimePicker
                        testID="dateTimePicker"
                        value={this.state.date}
                        mode='date'
                        minimumDate={new Date()}
                        is24Hour={true}
                        display="default"
                        onChange={(event, selectedDate) => {

                          this.setState({ showDate: false })

                          if (this.state.time < new Date() && this.state.time.getDate() == selectedDate.getDate()) {

                          }
                          else {
                            const currentDate = selectedDate || this.state.date
                            this.setState({ date: currentDate })
                          }
                        }}
                      />
                      : null}

                    {this.state.showTime ?

                      <DateTimePicker
                        testID="dateTimePicker"
                        value={this.state.time}
                        mode='time'
                        minimumDate={new Date()}
                        is24Hour={true}
                        display="default"
                        onChange={(event, selectedDate) => {

                          this.setState({ showTime: false })

                          if (selectedDate < new Date() && this.state.time.getDate() == this.state.date.getDate()) {
                            let l = this.state.date.setDate(this.state.date.getDate() + 1)
                            this.setState({
                              data: new Date(l)
                            })
                          }
                          const currentDate = selectedDate || this.state.time
                          this.setState({ time: currentDate })
                        }}
                      />
                      : null}

                    <TouchableOpacity
                      onPress={() => {
                        if (this.state.vendorMO <= this.state.total)
                          this.setState({
                            CheckPreOrder: true,
                            visible2: true
                          })
                        else {
                          Alert.alert(
                            'Cart',
                            'Minimum order atleast £' + this.state.vendorMO
                          )
                        }
                      }}
                      style={{ height: height(5), width: width(30), marginTop: height(4), alignSelf: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: mainColor, borderRadius: 5 }}
                    >

                      <Text style={{ fontSize: totalSize(2), color: '#fff' }}>
                        PROCEED
                      </Text>

                    </TouchableOpacity>

                  </View>

                </View>

              </View>

            </Modal>

            <Modal
              animationType={'slide'}
              transparent={true}
              visible={this.state.visible2}
              onRequestClose={() => this.setState({ visible2: false })}
            >

              <View style={{ flex: 1, backgroundColor: '#fff' }}>

                <View style={{ height: height(10), width: '100%', borderBottomRightRadius: 10, borderBottomLeftRadius: 10, backgroundColor: mainColor }}>

                  <View style={{ marginTop: height(5), width: '95%', flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-between', alignItems: 'center' }}>

                    <TouchableOpacity
                      onPress={() => this.setState({ visible2: false })}
                    >

                      <MaterialIcons name='arrow-back' size={30} color='#ffffff' />
                    </TouchableOpacity>

                    <TouchableOpacity
                    >

                      <Text style={{ fontSize: totalSize(2.5), fontWeight: 'bold', color: '#ffffff' }}>
                        Select Card
                      </Text>

                    </TouchableOpacity>

                    <View style={{ height: 30, width: 30 }}>

                    </View>

                  </View>

                </View>

                <View style={{ flex: 1 }}>

                  <FlatList
                    style={{ maxHeight: height(75), flexGrow: 0 }}
                    data={this.state.user.cards}
                    renderItem={({ item, index }) => (
                      <View style={{
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 1,
                        },
                        shadowOpacity: 0.20,
                        shadowRadius: 1.41,

                        elevation: 2, width: '95%', marginVertical: height(1), justifyContent: 'center', alignSelf: 'center', borderRadius: 5, backgroundColor: index == this.state.cardIndex ? '#9cfbff' : '#fff'
                      }}>

                        <TouchableOpacity
                          onPress={() => {
                            this.setState({
                              cardIndex: index,
                              cardDetail: item
                            })
                          }}
                          style={{ width: '95%', alignSelf: 'center', marginVertical: height(0.5), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                          <Image
                            source={item.cardName == 'visa' ? visa : masterCard}
                            style={{ height: 40, width: 60 }}
                          />

                          <View style={{ width: '75%' }}>

                            <Text style={{ fontSize: totalSize(2.5) }}>

                              {item.cardName.toUpperCase()}

                            </Text>

                            <Text style={{ fontSize: totalSize(1.5) }}>

                              {item.cardHolderName}

                            </Text>

                            <Text style={{ fontSize: totalSize(1.5) }}>

                              **** **** **** {item.cardNumber[15] + item.cardNumber[16] + item.cardNumber[17] + item.cardNumber[18]}

                            </Text>

                          </View>

                        </TouchableOpacity>

                      </View>
                    )}
                  />

                  <TouchableOpacity
                    onPress={() => {
                      if (this.state.cardDetail != null) {
                        this.checkout()
                      }
                      else {
                        alert('Please select card')
                      }
                    }}
                    style={{ height: height(6), width: width(40), marginTop: height(3), alignSelf: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: mainColor, borderRadius: 5 }}
                  >

                    <Text style={{ fontSize: totalSize(2.5), color: '#fff' }}>
                      Proceed
                    </Text>

                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('addcard')

                    }}
                    style={{ height: height(6), width: width(40), marginTop: height(3), alignSelf: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: mainColor, borderRadius: 5 }}
                  >

                    <Text style={{ fontSize: totalSize(2.5), color: '#fff' }}>
                      Add Card
                    </Text>

                  </TouchableOpacity>

                </View>

              </View>

            </Modal>

            <Modal
              animationType={'fade'}
              transparent={true}
              visible={this.state.loader}
            >
              <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>

                <ActivityIndicator size='large' color='#fff' />

              </View>

            </Modal>

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