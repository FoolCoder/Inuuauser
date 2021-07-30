import React, { Component, Fragment } from 'react'
import { View, ImageBackground, Text, TouchableOpacity, TextInput, Alert, Image, SafeAreaView, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import { height, width, totalSize } from 'react-native-dimension'
import { NavigationEvents } from 'react-navigation'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import StarRating from 'react-native-star-rating';

import Header from '../header/header'

import { link, vendorlist } from '../../links/links'
import { mainColor } from '../../GlobleColor/GlobleColor'

import user from '../../assets/user.png'
import user2 from '../../assets/user2.png'

import back from '../../assets/back.png'
import forword from '../../assets/forword.png'
import sign from '../../assets/imageB.jpeg'

import food from '../../assets/foodbackground.jpg'
import burger from '../../assets/burger.jpg'
import check2 from '../../assets/check2.png'
import AsyncStorage from '@react-native-community/async-storage';

export default class selectedVendor extends Component {
  constructor() {
    super()
    this.state = {
      selectedValue: '',
      rating: 5.0,
      nearVendor: {},
      availableItems: [],
      _id: '',
      event: {},
      loader: true
    }
  }

  componentDidMount = async () => {
    try {
      let data = this.props.navigation.getParam('data')
      let cart = JSON.parse(await AsyncStorage.getItem('cart'))
      let event = JSON.parse(await AsyncStorage.getItem('event'))

      let eventProp = this.props.navigation.getParam('event')

      // console.log(eventProp)

      // console.log(cart)

      fetch(vendorlist + data._id)
        .then((response) => response.json())
        .then(async (responseJson) => {

          let val = []

          if (event != null) {
            val = responseJson.result.map((e, i, a) => {
              let check = false
              cart.map((q, i, a) => {
                if (e._id == q.id) {
                  check = true
                }
              })
              if (check == true) {
                e.inCart = true
                return e
              }
              else {
                e.inCart = false
                return e
              }
            })
          }
          else {
            val = responseJson.result
          }
          // console.log(val)
          this.setState({
            availableItems: [...val],
            rating: responseJson.average,
            event: eventProp,
            loader: false,
            inCart: true
          })

        }
        ).catch((e) => {

        })

      let nearVendor = this.state.nearVendor
      nearVendor._id = data._id
      nearVendor.name = data.name
      nearVendor.address = data.address
      nearVendor.foodType = data.foodType
      nearVendor.image = data.image
      nearVendor.minimumOrderPrice = data.minimumOrderPrice
      this.setState({
        nearVendor: nearVendor
      })
    } catch (e) {
      console.log('tag', e);
    }
  }

  open = async () => {

    let event = JSON.parse(await AsyncStorage.getItem('event'))

    if (event != null) {

      if (this.state.inCart) {

        let cart = JSON.parse(await AsyncStorage.getItem('cart'))

        console.log(cart)

        let val = this.state.availableItems.map((e, i, a) => {
          let check = false
          cart.map((q, i, a) => {
            if (e._id == q.id) {
              check = true
            }
          })
          if (check == true) {
            e.inCart = true
            return e
          }
          else {
            e.inCart = false
            return e
          }
        })
        console.log(val)
        this.setState({
          availableItems: [...val]
        })
      }

    }

  }

  nextpage = async (item) => {
    let val = JSON.parse(await AsyncStorage.getItem('vendor'))
    let val2 = JSON.parse(await AsyncStorage.getItem('event'))

    if (val2 == null) {

      if (val == null) {
        if (item.discount > 0) {
          let price = parseFloat((item.price * (1 - item.discount / 100)).toFixed(2))
          this.props.navigation.navigate('esvF', {
            data: item,
            price: price,
            vendor: this.state.nearVendor,
            event: this.state.event
          })
        }
        else {
          this.props.navigation.navigate('esvF', {
            data: item,
            vendor: this.state.nearVendor,
            event: this.state.event
          })
        }

      }
      // else if (val._id == this.state.nearVendor._id) {
      //   if (item.discount > 0) {
      //     let price = parseFloat((item.price * (1 - item.discount / 100)).toFixed(2))
      //     this.props.navigation.navigate('esvF', {
      //       data: item,
      //       price: price,
      //       vendor: this.state.nearVendor,
      //       event:this.state.event
      //     })
      //   }
      //   else {
      //     this.props.navigation.navigate('esvF', {
      //       data: item,
      //       vendor: this.state.nearVendor,
      //       event:this.state.event
      //     })
      //   }

      // }
      else {
        Alert.alert(
          'Cart',
          'Please clear cart in order to proceed new cart'
        )
      }
    }
    else if (val2.name == this.state.event.name) {
      if (val == null) {
        if (item.discount > 0) {
          let price = parseFloat((item.price * (1 - item.discount / 100)).toFixed(2))
          this.props.navigation.navigate('esvF', {
            data: item,
            price: price,
            vendor: this.state.nearVendor,
            event: this.state.event
          })
        }
        else {
          this.props.navigation.navigate('esvF', {
            data: item,
            vendor: this.state.nearVendor,
            event: this.state.event
          })
        }

      }
      else if (val._id == this.state.nearVendor._id) {
        if (item.discount > 0) {
          let price = parseFloat((item.price * (1 - item.discount / 100)).toFixed(2))
          this.props.navigation.navigate('esvF', {
            data: item,
            price: price,
            vendor: this.state.nearVendor,
            event: this.state.event
          })
        }
        else {
          this.props.navigation.navigate('esvF', {
            data: item,
            vendor: this.state.nearVendor,
            event: this.state.event
          })
        }

      }
      else {
        Alert.alert(
          'Cart',
          'Please clear cart in order to proceed new cart'
        )
      }
    }
    else {
      Alert.alert(
        'Cart',
        'Please clear cart in order to proceed new cart'
      )
    }


  }

  _Flatlist = ({ item }) => {
    return (
      <TouchableOpacity
        disabled={item.soldOut == true ? true : false}
        onPress={() => this.nextpage(item)}
        style={{ height: height(20), width: width(35), marginTop: height(2), marginHorizontal: width(3.5), borderWidth: 1, borderColor: '#bdbdbd', backgroundColor: '#ffffff', borderRadius: 10 }}>

        <Image
          style={{ height: height(10), width: width(34.5), borderRadius: 10 }}
          source={{ uri: link + item.image }} />

        {item.discount > 0 ?

          <View style={{ height: height(3), width: width(15), alignSelf: 'flex-end', position: 'absolute', zIndex: 1, borderRadius: 10, backgroundColor: '#ec0101', justifyContent: 'center', alignItems: 'center' }}>

            <Text style={{ fontSize: totalSize(2), color: '#fff' }}>
              - {item.discount}%
            </Text>

          </View>

          : null}

        {item.inCart ?

          <Image
            source={check2}
            style={{ height: 20, width: 20, position: 'absolute', top: 0, left: 0 }}
          />

          : null
        }

        <View style={{ width: width(30), marginTop: height(1), alignItems: 'center', alignSelf: 'center' }}>

          <Text style={{ fontSize: totalSize(1.9) }}>
            {item.name}
          </Text>

          {item.discount > 0 ?
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

              <Text

                style={{ textDecorationLine: 'line-through', color: '#ec0101', fontSize: totalSize(1.9) }}>
                £{item.price}
              </Text>

              <Text

                style={{ marginLeft: width(2), fontSize: totalSize(1.9) }}>
                £{(item.price * (1 - (item.discount / 100))).toFixed(2)}
              </Text>


            </View>

            : <Text style={{ fontSize: totalSize(1.9) }}>
              £{item.price}
            </Text>}

        </View>

        {item.soldOut == true ?
          <View style={{ height: '100%', width: '100%', position: 'absolute', zIndex: 1, backgroundColor: '#00000080', justifyContent: 'center', alignItems: 'center', borderRadius: 8 }}>

            <Text style={{ fontSize: totalSize(2.2), color: '#fff' }}>
              Sold out
            </Text>

          </View>
          : null}

      </TouchableOpacity>
    )
  }

  render() {
    return (
      <Fragment>
        <SafeAreaView
          style={(styles.container, { backgroundColor: '#2ca0df' })}
        />
        <SafeAreaView style={styles.container}>

          <NavigationEvents onDidBlur={() => this.open()} />

          <View style={{ flex: 1, backgroundColor: '#d2d5cb' }}>

            <View style={{ height: height(10) }}>

              <Header
                home={() => this.props.navigation.navigate('homet')}
                drawer={() => this.props.navigation.toggleDrawer()}
                cart={() => this.props.navigation.navigate('cart')}
              />

            </View>


            <View style={{ flex: 1, marginTop: height(1), backgroundColor: '#f1eff0', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>

              <View style={{ height: height(0.5), width: width(35), alignSelf: 'center', backgroundColor: '#bdbdbd' }}></View>

              <View style={{ width: width(90), alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: height(3) }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}
                  style={{ width: width(10) }}
                >
                  <Image
                    style={{ height: 18, width: 18 }}
                    source={back}
                  />
                </TouchableOpacity>

                <Text style={{ fontSize: totalSize(2.5), width: width(25), textAlign: 'right' }}>
                  Vendors
                </Text>

                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('vProfile', {
                    data: this.props.navigation.getParam('data')
                  })}
                  style={{ height: height(3), width: width(17), justifyContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: mainColor }}
                >

                  <Text style={{ fontSize: totalSize(1.7), color: '#fff' }}>
                    Profile
                  </Text>

                </TouchableOpacity>

              </View>

              <View style={{ height: height(22), width: width(85), alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>

                <Image style={{ height: 80, width: 80, borderRadius: 40 }} source={{ uri: link + this.state.nearVendor.image }} />

                <View>

                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <Text style={{ fontSize: totalSize(2.5), fontWeight: 'bold' }}>
                      {this.state.nearVendor.name}
                    </Text>

                    <StarRating
                      containerStyle={{ marginStart: width(2) }}
                      fullStarColor='#f7b851'
                      maxStars={1}
                      rating={1}
                      starSize={15}
                    />

                    <Text style={{ fontSize: totalSize(2), marginStart: width(1), color: '#f7b851' }}>
                      {this.state.rating.toFixed(1)}
                    </Text>

                  </View>


                  {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <MaterialIcons name='location-on' size={12} />

                    <View style={{ width: width(2) }} />

                    <Text
                      numberOfLines={1}
                      style={{ width: width(45), fontSize: totalSize(1.8) }}>
                      {this.state.nearVendor.address}
                    esv
                  </View> */}

                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <MaterialCommunityIcons name='silverware-fork-knife' size={12} />

                    <View style={{ width: width(2) }} />

                    <Text style={{ fontSize: totalSize(1.8) }}>
                      {this.state.nearVendor.foodType}
                    </Text>

                  </View>

                  {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <MaterialIcons name='directions-run' size={12} />

                    <View style={{ width: width(2) }} />

                    <Text style={{ fontSize: totalSize(1.8) }}>
                      5 min
                    </Text>

                  </View> */}

                </View>

              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('chat', {
                    data: this.props.navigation.getParam('data')
                  })}
                  style={{ height: height(4), width: width(30), alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: '#4abd68' }}
                >

                  <Text style={{ fontSize: totalSize(2.2), color: '#fff' }}>
                    Chat
                  </Text>

                </TouchableOpacity>

                {/* <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('reOrder', {
                    // data: this.props.navigation.getParam('data')
                  })}
                  style={{ height: height(4), width: width(30), marginLeft: width(5), alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: mainColor }}
                >

                  <Text style={{ fontSize: totalSize(2), color: '#fff' }}>
                    Re-Order
                 </Text>

                </TouchableOpacity> */}

              </View>

              <View style={{ borderTopWidth: 1, marginTop: height(2), borderColor: '#d2d5cb', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>

                <Text style={{ fontSize: totalSize(2.5), marginTop: height(2), alignSelf: 'center' }}>
                  Available items
                </Text>

                {this.state.loader == true ?

                  <View style={{ height: height(20), justifyContent: 'center', alignItems: 'center' }}>

                    <ActivityIndicator size='large' color={mainColor} />

                  </View>

                  :

                  <FlatList
                    style={{ height: height(45), width: width(85), alignSelf: 'center' }}
                    numColumns={2}
                    data={this.state.availableItems}
                    renderItem={this._Flatlist}
                  />

                }

              </View>

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