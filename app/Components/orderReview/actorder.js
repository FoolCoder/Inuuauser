import React, { Component, Fragment } from 'react'
import { View, ImageBackground, Text, TouchableOpacity, TextInput, ScrollView, Image, Modal, SafeAreaView, FlatList, StyleSheet, Dimensions, Alert, ActivityIndicator } from 'react-native'
import { height, width, totalSize } from 'react-native-dimension'
import moment from 'moment-timezone'
import AsyncStorage from '@react-native-community/async-storage'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import MapView, { PROVIDER_GOOGLE, Marker, Circle } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from 'react-native-geolocation-service'

import { link } from '../../links/links'
import { mainColor } from '../../GlobleColor/GlobleColor'
import Orderchat from './orderChat'

import fbg from '../../assets/foodbackground.jpg'

import point from '../../assets/point.png'

import vendor from '../../assets/vendor.png'
import events from '../../assets/events.png'

const webapikey = 'AIzaSyBg5Oiq1XSgi6DgJdgK7vQCKqOrp0r6F3w'

export default class actorder extends Component {
  constructor() {
    super()
    this.state = {
      visibleMap: false,
      visibleChat: false,
      status: 'unpaid',
      deliveryC: 20,
      tax: 2,
      total: 20,
      rating: 0,
      item: [],
      k: '',
      updatedAt: '',
      orderReview: { vendorN: 'Round House Pizza', food: 'New year new me,Ranch,Burger', phone: '5654' },
      location: { lat: 33.05214564, lon: 73.5465584, latD: 0.005, lonD: 0.005 },
      vendorLOC: { lat: 33.54654, lon: 77.654654 },
      mode: 'DRIVING',
      distance: '',
      duration: '',
      routeText: 'Start Travel',
      start: false,
      fromEvent: false
    }
  }

  componentDidMount = async () => {
    console.log(this.props.data)


    this.state.orderReview.vendorN = this.props.data.vendor.name
    this.state.orderReview.phone = this.props.data.vendor.phone
    this.state.orderReview.food = this.props.data.food
    let time = moment(this.props.data.updatedAt).format('DD-MMM-YYYY hh:mm a').toUpperCase();

    if (this.props.data.paid == true) {
      this.setState({ status: 'PAID' })
    }
    else {
      this.setState({ status: 'UNPAID' })
    }

    this.currentLocation()

    this.state.vendorLOC.lat = this.props.data.vendor.latitude
    this.state.vendorLOC.lon = this.props.data.vendor.longitude

    this.setState({
      orderReview: this.state.orderReview,
      updatedAt: time,
      total: this.props.data.total,
      item: this.props.data.items,
      vendorLOC: this.state.vendorLOC,
      fromEvent: this.props.data.fromEvent
    })

  }

  currentLocation = async () => {
    // this.state.location.lat = this.state.location.lat + 0.0001
    // this.state.location.lon = this.state.location.lon + 0.0001

    // this.setState({
    //   location: this.state.location
    // })
    Geolocation.getCurrentPosition((pos) => {

      this.state.location.lat = pos.coords.latitude
      this.state.location.lon = pos.coords.longitude

      this.setState({
        location: this.state.location
      })
    }, (err) => {
      console.log(err);
      alert("turn on current location")
    })
  }

  animateToRegion = () => {
    try {

      this.map.animateToRegion({
        latitude: this.state.location.lat,
        longitude: this.state.location.lon,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
      }, 1000)

    }
    catch (e) {
      console.log(e)
    }
  }

  mapFit = async () => {
    this.setState({
      visibleMap: true
    })

    this.mapanimation()

  }

  mapanimation = () => {
    try {

      setTimeout(() => {
        this.map.fitToSuppliedMarkers(['a1', 'a2'], {

          edgePadding: {
            top: 200,
            right: 50,
            bottom: 50,
            left: 50
          }
        })
      }, 1000);
    }
    catch (e) {
      console.log(e)
    }
  }

  travel = () => {

    if (this.state.start == true) {
      this.currentLocation()
      this.animateToRegion()

      setTimeout(() => {
        this.travel()
        console.log(this.state.location)
      }, 2000)
    }
    else if (this.state.start == false && this.state.visibleMap == true) {
      this.mapanimation()
    }

  }

  // distanceTime = async () => {
  //   // console.log(this.state.mode)
  //   try {
  //     const mapurl = `https://maps.googleapis.com/maps/api/distancematrix/json?&units=metric
  //     &origins=${this.state.location.lat},${this.state.location.lon}
  //     &destinations=${this.state.vendorLOC.lat},${this.state.vendorLOC.lon}
  //     &mode=${this.state.mode}
  //     &key=${webapikey}`
  //     const result = await fetch(mapurl)
  //     const json = await result.json()
  //       .then((e) => {
  //         e.rows.map((e) => {

  //           e.elements.map((q, i) => {
  //             console.log(q)
  //           })

  //         })
  //       }).catch((e)=>{
  //         console.log(e)
  //       })


  //   } catch (e) {
  //     alert('Network Problem')
  //   }

  // }

  bottomView = () => {
    if (this.state.distance == '') {
      return (
        <ActivityIndicator color={mainColor} size='large' />
      )
    }
    else if (this.state.distance == 'error') {
      return (
        <Text style={{ fontSize: totalSize(2.5), fontWeight: 'bold', color: '#ff6666' }}>
          Route not avaiable
        </Text>
      )
    }
    else {
      return (

        <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

          <View>

            <View style={{ flexDirection: 'row' }}>

              <Text style={{ fontSize: totalSize(2.3), fontWeight: 'bold' }}>
                Distance :
              </Text>

              <Text style={{ fontSize: totalSize(2.3), marginLeft: width(1) }}>
                {this.state.distance} Km
              </Text>

            </View>

            <View style={{ flexDirection: 'row' }}>

              <Text style={{ fontSize: totalSize(2.3), fontWeight: 'bold' }}>
                Duration :
              </Text>

              <Text style={{ fontSize: totalSize(2.3), marginLeft: width(1) }}>
                {this.state.duration} Min
              </Text>

            </View>

          </View>

          {this.state.start == false ?

            <TouchableOpacity
              onPress={() => {
                this.setState({ start: true })
                setTimeout(() => {
                  this.travel()
                }, 100);
              }}
              style={{ height: height(5), width: width(35), justifyContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: mainColor }}
            >

              <Text style={{ fontSize: totalSize(2.2), color: '#fff' }}>
                Start Travel
            </Text>

            </TouchableOpacity>

            :

            <TouchableOpacity
              onPress={() => this.setState({ start: false })}
              style={{ height: height(5), width: width(35), justifyContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: mainColor }}
            >

              <Text style={{ fontSize: totalSize(2.2), color: '#fff' }}>
                Stop
            </Text>

            </TouchableOpacity>

          }

        </View>
      )
    }
  }

  _Flatlist = ({ item }) => {
    return (

      <View style={{ height: height(12), width: width(90), margin: 10, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', alignSelf: 'center', backgroundColor: '#e8e8e8', borderRadius: 15 }}>

        <Image
          style={{ height: 70, borderColor: '#000', width: 80, borderRadius: 10, resizeMode: 'contain' }}
          source={{ uri: link + item.item.image }}
        />

        <View style={{ width: width(35), marginStart: width(2) }}>

          <Text style={{ fontSize: totalSize(2.5), fontWeight: 'bold', color: '#868887' }}>
            {item.item.name}
          </Text>

          <Text style={{ fontSize: totalSize(2.5), color: '#868887' }}>
            £{(item.item.price * (1 - (item.item.discount / 100))).toFixed(2)}
          </Text>

        </View>

        <View style={{ width: width(22) }}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

            <View style={{ width: width(23), flexDirection: 'row', alignItems: 'center' }}>

              <Text style={{ fontSize: totalSize(2), color: '#868887' }}>
                Quantity
              </Text>

              <View style={{ width: width(7), alignItems: 'center' }}>

                <Text style={{ fontSize: totalSize(2), color: '#868887' }}>
                  {item.quantity}
                </Text>

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

        <SafeAreaView style={{ flex: 1 }}>

          <View style={{ flex: 1 }}>

            <View style={{ height: height(10), width: '100%', backgroundColor: mainColor }}>

              <View style={{ marginTop: height(5), width: width(95), flexDirection: 'row', alignSelf: 'center', borderBottomEndRadius: 8, borderBottomStartRadius: 8, justifyContent: 'space-between', alignItems: 'center' }}>

                <TouchableOpacity
                  onPress={this.props.back}
                >

                  <MaterialIcons name='arrow-back' size={30} color='#ffffff' />
                </TouchableOpacity>

                <TouchableOpacity
                >

                  <Text style={{ fontSize: totalSize(2.5), fontWeight: 'bold', color: '#ffffff' }}>
                    Active Order
                 </Text>

                </TouchableOpacity>

                <View style={{ height: 30, width: 30 }}>

                </View>

              </View>

            </View>

            <ScrollView>

              <Image
                source={fbg}
                style={{ height: height(20), width: '100%' }}
              />

              <View style={{
                height: height(14),
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.20,
                shadowRadius: 1.41,

                elevation: 2, width: width(95), marginTop: height(1), alignSelf: 'center', justifyContent: 'center', backgroundColor: '#fff', borderRadius: 5
              }}>

                <View style={{ width: width(90), alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                  <View>

                    <Text style={{ fontSize: totalSize(2), fontWeight: 'bold' }}>

                      {this.state.orderReview.vendorN}

                    </Text>

                    <Text style={{ fontSize: totalSize(1.5) }}>

                      {this.state.orderReview.phone}

                    </Text>

                    <Text style={{ fontSize: totalSize(1.5) }}>

                      {this.state.orderReview.food}

                    </Text>

                    <Text style={{ fontSize: totalSize(1.5) }}>

                      {this.state.updatedAt}

                    </Text>

                  </View>

                  <TouchableOpacity
                    onPress={() => this.setState({ visibleChat: true })}
                    style={{ height: height(4), width: width(30), alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: mainColor }}
                  >

                    <Text style={{ fontSize: totalSize(2.2), color: '#fff' }}>
                      Chat
                  </Text>

                  </TouchableOpacity>

                </View>

              </View>

              <Text style={{ fontSize: totalSize(2.5), fontWeight: 'bold', color: '#056e00', marginTop: height(2), alignSelf: 'center' }}>
                {(50 - moment(moment.utc()).diff(this.state.updatedAt, 'minutes') < 0) ? "Order ready soon" :
                  50 - moment(moment.utc()).diff(this.state.updatedAt, 'minutes') + 'min remains'
                }
              </Text>

              <FlatList
                data={this.state.item}
                // nestedScrollEnabled={true}
                keyExtractor={(item, index) => { return index.toString() }}
                style={{ width: width(95), marginTop: height(2), alignSelf: 'center', backgroundColor: mainColor, borderRadius: 10 }}
                renderItem={this._Flatlist}
              />

              <View style={{
                height: height(15), shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.20,
                shadowRadius: 1.41,

                elevation: 2, width: width(95), marginTop: height(2), alignSelf: 'center', justifyContent: 'center', backgroundColor: mainColor, borderRadius: 10
              }}>

                <View style={{ width: width(90), alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                  <Text style={{ fontSize: totalSize(1.7), color: '#fff' }}>
                    Status
                </Text>

                  <Text style={{ fontSize: totalSize(1.7), color: '#fff' }}>
                    {this.state.status}
                  </Text>

                </View>

                <View style={{ width: width(90), marginTop: height(2), alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                  <Text style={{ fontSize: totalSize(1.7), color: '#fff' }}>
                    Sub total
                </Text>

                  <Text style={{ fontSize: totalSize(1.7), color: '#fff' }}>
                    £{this.state.total.toFixed(2)}
                  </Text>

                </View>

                <View style={{ width: width(90), marginTop: height(2), alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                  <Text style={{ fontSize: totalSize(1.7), color: '#fff' }}>
                    total
                </Text>

                  <Text style={{ fontSize: totalSize(1.7), color: '#fff' }}>
                    £{this.state.total.toFixed(2)}
                  </Text>

                </View>

              </View>

              <TouchableOpacity
                onPress={() => this.mapFit()}
                style={{ height: height(6), width: width(50), marginTop: height(2), alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: mainColor }}
              >

                <Text style={{ fontSize: totalSize(2.2), color: '#fff' }}>
                  Get Direction
                  </Text>

              </TouchableOpacity>

            </ScrollView>

            <Modal
              animationType='slide'
              visible={this.state.visibleChat}
              transparent={false}
              onRequestClose={() => {
                this.setState({ visibleChat: false })
              }}
            >

              <Orderchat
                back={() => {
                  this.setState({ visibleChat: false })
                }}
                data={this.props.data}
              />

            </Modal>

            <Modal
              animationType='slide'
              visible={this.state.visibleMap}
              transparent={false}
              onRequestClose={() => {
                this.setState({ visibleMap: false, start: false })
              }}
            >
              <View style={{ flex: 1 }}>

                <View style={{ height: height(15), width: '95%', alignSelf: 'center', position: 'absolute', zIndex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ mode: 'DRIVING' })
                    }}
                    style={
                      this.state.mode == 'DRIVING'
                        ?
                        { backgroundColor: mainColor, borderWidth: 0.1, borderRadius: 100 }
                        :
                        { backgroundColor: '#fff', borderWidth: 0.1, borderRadius: 100 }}
                  >

                    <MaterialCommunityIcons name='car' size={40}
                      color={this.state.mode == 'DRIVING' ? '#fff' : '#000'}
                      style={{ padding: 10 }} />

                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ mode: 'BICYCLING' })
                    }}
                    style={
                      this.state.mode == 'BICYCLING'
                        ?
                        { backgroundColor: mainColor, borderWidth: 0.1, borderRadius: 100 }
                        :
                        { backgroundColor: '#fff', borderWidth: 0.1, borderRadius: 100 }}
                  >

                    <MaterialCommunityIcons name='bicycle' size={40}
                      color={this.state.mode == 'BICYCLING' ? '#fff' : '#000'}
                      style={{ padding: 10 }} />

                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ mode: 'TRANSIT' })
                    }}
                    style={
                      this.state.mode == 'TRANSIT'
                        ?
                        { backgroundColor: mainColor, borderWidth: 0.1, borderRadius: 100 }
                        :
                        { backgroundColor: '#fff', borderWidth: 0.1, borderRadius: 100 }}
                  >

                    <MaterialCommunityIcons name='bus' size={40}
                      color={this.state.mode == 'TRANSIT' ? '#fff' : '#000'}
                      style={{ padding: 10 }} />

                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ mode: 'WALKING' })
                    }}
                    style={
                      this.state.mode == 'WALKING'
                        ?
                        { backgroundColor: mainColor, borderWidth: 0.1, borderRadius: 100 }
                        :
                        { backgroundColor: '#fff', borderWidth: 0.1, borderRadius: 100 }}
                  >

                    <MaterialCommunityIcons name='walk' size={40}
                      color={this.state.mode == 'WALKING' ? '#fff' : '#000'}
                      style={{ padding: 10 }} />

                  </TouchableOpacity>

                </View>

                <MapView
                  provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                  style={{ flex: 1 }}
                  showsUserLocation
                  initialRegion={{
                    latitude: this.state.location.lat,
                    longitude: this.state.location.lon
                    , latitudeDelta: 0.5, longitudeDelta: 0.5
                  }}
                  ref={ref => this.map = ref}
                // showsUserLocation={true}

                >
                  <Marker coordinate={{
                    latitude: this.state.location.lat,
                    longitude: this.state.location.lon
                  }}
                    identifier='a1'
                    title='Current Location'
                  >
                    <Image
                      source={point}
                      style={{ height: 25, width: 25 }}
                    />
                  </Marker>

                  <Marker
                    coordinate={{
                      latitude: parseFloat(this.state.vendorLOC.lat),
                      longitude: parseFloat(this.state.vendorLOC.lon)
                    }}
                    identifier='a2'
                    title={this.state.orderReview.vendorN}
                  >
                    <Image
                      source={this.state.fromEvent == true ? events : vendor}
                      style={{ height: 35, width: 25 }}
                    />

                  </Marker>

                  <MapViewDirections
                    // 'BICYCLING''DRIVING''TRANSIT''WALKING'
                    mode={this.state.mode}
                    resetOnChange={false}
                    origin={{
                      latitude: this.state.location.lat,
                      longitude: this.state.location.lon
                    }}
                    destination={{
                      latitude: this.state.vendorLOC.lat,
                      longitude: this.state.vendorLOC.lon
                    }}
                    strokeWidth={4}
                    strokeColor={mainColor}
                    apikey={webapikey}

                    onReady={(e) => {
                      this.setState({
                        distance: e.distance.toFixed(2),
                        duration: e.duration.toFixed(0)
                      })
                      // console.log(e)
                    }}
                    onError={(e) => {
                      this.setState({
                        distance: 'error'
                      })
                    }}
                  />

                </MapView>

                <View style={{ height: height(10), width: '100%', justifyContent: 'center', alignItems: 'center' }}>

                  {this.bottomView()}

                </View>

              </View>

            </Modal>

          </View>

        </SafeAreaView>

      </Fragment>


    )
  }
}