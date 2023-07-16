import React, { Component, Fragment } from 'react'
import {
  View, ImageBackground, Text, TouchableOpacity, PermissionsAndroid, TextInput, Modal,
  Image, SafeAreaView, ActivityIndicator, StyleSheet, StatusBar, Alert, FlatList
  , ScrollView
} from 'react-native'
import { height, width, totalSize } from 'react-native-dimension'

import { NavigationEvents } from 'react-navigation'
import Geocoder from 'react-native-geocoding';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import MapView, { PROVIDER_GOOGLE, Marker, Circle } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

import AsyncStorage from '@react-native-community/async-storage'

import { vendors, link } from '../../links/links'
import { mainColor } from '../../GlobleColor/GlobleColor';

import Header from '../header/header'

import point from '../../assets/point.png'
// import m1 from '../../assets/m1.jpg'
// import m2 from '../../assets/m2.jpg'
// import m3 from '../../assets/m3.png'
// import m4 from '../../assets/m4.png'
import a1 from '../../assets/asset1.png'
import a2 from '../../assets/asset2.png'
import a3 from '../../assets/asset3.png'
import a4 from '../../assets/asset4.png'


import vendor from '../../assets/vendor.png'
import vendorFavourite from '../../assets/vendorFavourite.png'

import events from '../../assets/events.png'
import sign from '../../assets/imageB.jpeg'
export default class fp extends Component {
  constructor() {
    // this.map = React.createRef()

    super()
    this.map = React.createRef(null)
    this.state = {
      user: {},
      visible: true,
      selectedValue: '',
      latitude: 70.78825,
      longitude: 35.4324,
      latitudeDelta: 10,
      longitudeDelta: 100,
      marker: false,
      vendorsmarker: false,
      nearVendor: [],
      homevendor: [],
      marketvendor: [],
      s: [],
      ss: [],
      length: '',
      activeOrder: [],
      checkAppload: false,
      mapsearch: '',
      mapsearcharray: [],
      loc: {
        lat: 0,
        lon: 0
      }
    }
  }

  componentDidMount = () => {
    // console.log('hhhyyyyuuuu');
    this.open2()
    this.open1()
    Geocoder.init(apikey);
  }

  open1 = async () => {
    const user = JSON.parse(await AsyncStorage.getItem('details'))

    // console.log('Card Holder Details', user)

    const val = JSON.parse(await AsyncStorage.getItem('location'))

    fetch(vendors + '?lat=' + val.lat + '&lon=' + val.lon)
      .then((response) => response.json())
      .then(async (responseJson) => {

        // console.log('near by vendeorrrrrrr', responseJson.result[0]);
        let array = responseJson.result.filter(e => {
          if (!e.startDate) {
            let check = false
            let data = user.favouriteVendors.map((q, i, a) => {
              if (q == e._id) {
                check = true
              }
            })
            if (check == true) {

              e.favourite = true
              return e
            }
            else {

              return e
            }
          }
        })
        this.setState({
          homevendor: [...array],
          nearVendorCopy: [...array],
          user: user,
          loader: false,

        })
      }
      ).catch((e) => {
        this.setState({ loader: false })
      })
  }
  open2 = async () => {
    const val = JSON.parse(await AsyncStorage.getItem('location'))

    fetch(vendors + '?lat=' + val.lat + '&lon=' + val.lon)
      .then((response) => response.json())
      .then(async (responseJson) => {
        let newData = responseJson.result.filter((data) => {
          console.log('sssssssssssssss', data.startDate)
          if (data.startDate) {
            return true
          }
          return false

        })

        console.log('mmmarkkketttttttttt', newData);
        this.setState({
          marketvendor: newData,

        })
      }
      )
  }
  open = async () => {
    try {

      const val = JSON.parse(await AsyncStorage.getItem('details'))

      fetch(link + 'order/getUserOrders?customerId=' + val.id + '&orderStatus=pending')
        .then((response) => response.json())
        .then(async (responseJson) => {
          // console.log('hhhhhhhhhhh', responseJson.result[0])
          this.setState({
            activeOrder: responseJson.result,
            user: val
          })
        })

      if (this.state.checkAppload) {
        let array = this.state.nearVendor.filter(e => {
          let check = false
          let data = val.favouriteVendors.map((q, i, a) => {
            if (q == e._id) {
              check = true
            }
          })
          if (check == true) {
            e.favourite = true
            return e
          }
          else {
            e.favourite = false
            return e
          }
        })
        this.setState({
          nearVendor: [...array],
          nearVendorCopy: [...array],
        })
      }
    }
    catch (e) {
      console.log(e)
    }
  }

  Mapload = () => {

    setTimeout(() => {

      this.setState({
        visible: false
      }, () => {
        this.refresh()
      })

    }, 2000);


  }

  refresh = async () => {

    const user = JSON.parse(await AsyncStorage.getItem('details'))

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {

        Geolocation.getCurrentPosition((pos) => {

          try {
            fetch(vendors + '?lat=' + pos.coords.latitude + '&lon=' + pos.coords.longitude)
              .then((response) => response.json())
              .then(async (responseJson) => {

                let position = { lat: pos.coords.latitude, lon: pos.coords.longitude }

                await AsyncStorage.setItem('location', JSON.stringify(position))
                // console.log('iiiiiiiii', responseJson.result[0]);

                let array = responseJson.result.filter(e => {
                  let check = false
                  let data = user.favouriteVendors.map((q, i, a) => {
                    if (q == e._id) {
                      check = true
                    }
                  })
                  if (check == true) {

                    e.favourite = true
                    return e
                  }
                  else {

                    return e
                  }
                })

                // console.log('arrrrrray', array[0])

                setTimeout(() => {

                  this.setState({
                    nearVendor: array,
                    ss: array,
                    s: array,
                    vendorsmarker: true,
                    checkAppload: true
                  })

                }, 100);
              }
              ).catch((e) => {
                Alert.alert(
                  'Network',
                  'Network failed'
                )
                console.log(e)
              })

          } catch (e) {
            console.log(e);
          }

          setTimeout(() => {
            this.map.animateToRegion({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
              latitudeDelta: 0.12,
              longitudeDelta: 0.12,

            }, 1500)

          }, 1000);



          setTimeout(() => {
            this.setState({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
              latitudeDelta: 0.12,
              longitudeDelta: 0.12,
              marker: true
            })
          }, 1000);


        }, (err) => {
          console.log(err);
          alert("turn on current location")
        })

      } else {
        console.log("Location permission denied");
      }

    } catch (e) {
      console.log(e)
    }
  }

  focus = () => {
    // this.map.fitToSuppliedMarkers(['a1','a2'],{
    //   edgePadding:{
    //     top: 50,
    // right: 50,
    // bottom: 50,
    // left: 50
    //   }
    // })
  }

  search = (text) => {

    if (this.state.length.length <= text.length) {
      this.setState({
        length: text
      })
      const newData = this.state.s.filter(item => {
        const itemData = item.name.toUpperCase()
        const textData = text.toUpperCase()
        return itemData.indexOf(textData) > -1
      })
      this.setState({
        s: newData,
        filter: text
      })
    }
    else {
      this.setState({ ss: this.state.nearVendor })
      setTimeout(() => {
        const newData = this.state.ss.filter(item => {
          const itemData = item.name.toUpperCase()
          const textData = text.toUpperCase()
          return itemData.indexOf(textData) > -1
        })
        this.setState({
          s: newData,
          filter: text
        })
      }, 20);
    }
  }
  vendorrenderItem = ({ item }) => {
    return (

      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('selectedV', {
          data: item
        })}
        style={{

          marginTop: height(2),
          marginHorizontal: width(2),
          alignItems: 'center',
          justifyContent: 'center',
          width: width(20),


        }}>

        <Image style={{
          width: 50,
          height: 50,
          borderRadius: 6

        }} source={{ uri: link + item.banner }} />
        <Text
          style={{
            // borderWidth: 1,
            width: width(18),
            height: height(4),
            textAlign: 'center'
          }}
          numberOfLines={1}
        >
          {item.name}
        </Text>
      </TouchableOpacity>

    )
  }
  marketrenderitem = ({ item }) => {
    return (

      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('eventV', {
          data: item
        })}
        style={{

          marginTop: height(2),
          marginHorizontal: width(2),
          alignItems: 'center',
          justifyContent: 'center',
          width: width(20),
          // borderWidth: 1,
          alignSelf: 'center'


        }}>

        <Image style={{
          width: 50,
          height: 50,
          borderRadius: 4
        }} source={{ uri: link + item.image }} />
        <Text
          style={{
            // borderWidth: 1,
            width: width(18),
            height: height(6),
            textAlign: 'center'
          }}
          numberOfLines={2}
        >
          {item.name}
        </Text>
      </TouchableOpacity>

    )
  }
  mapsearchlocation = async (text) => {
    this.setState({
      mapsearch: text
    })
    // console.log('mmmmmmm', this.state.mapsearch);
    try {

      const mapurl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=
    ${apikey}&input=${text}&types=(cities)`
      const result = await fetch(mapurl)
      const json = await result.json()

      // console.log('jjjjjjjjj', json)
      this.setState({
        mapsearcharray: json.predictions
      })
      // console.log('aaaaa', this.state.mapsearcharray); // setmapsearcharray(json.predictions)
    }
    catch (e) {
      alert('Network Problem')

    }

  }
  setlocmap = (item) => {
    this.setState({
      mapsearch: item,
      mapsearcharray: []
    })
    // setmapsearch(item)
    // setmapsearcharray([])

    try {
      Geocoder.from(item)
        .then(json => {
          var location = json.results[0].geometry.location;
          // setloc({ lat: location.lat, lon: location.lng })
          this.setState({
            loc: { lat: location.lat, lon: location.lng }
          })
          // console.log('lllllll', this.state.loc.lat);
          this.map.animateToRegion({
            latitude: this.state.loc.lat,
            longitude: this.state.loc.lon,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,

          }, 1500)

        })
        .catch(error => console.warn(error));
    }
    catch (e) {
      alert(e)
    }

  }
  render() {
    return (
      <Fragment>
        <SafeAreaView
          style={(styles.container, { backgroundColor: '#2ca0df' })}
        />
        <SafeAreaView style={styles.container}>
          <StatusBar
            backgroundColor={mainColor}
          />
          <View style={{ flex: 1 }}>

            <NavigationEvents
              onDidFocus={() => this.open()}
            />

            <Header
              drawer={() => this.props.navigation.openDrawer()}
              home={() => this.refresh()}
              cart={() => this.props.navigation.navigate('cart')}
              profile={() => this.props.navigation.navigate('profile')}
            />

            {
              this.state.homevendor.length > 0 ?
                <View style={{
                  position: 'absolute',
                  zIndex: 1,
                  marginTop: height(10),

                  width: width(100),
                  height: height(16),
                  backgroundColor: '#fff',
                  alignItems: 'center'



                }}>
                  <Text style={{
                    fontSize: totalSize(2)

                  }}>
                    Nearby Vendors
                  </Text>

                  <FlatList style={{

                  }}
                    data={this.state.homevendor}
                    horizontal


                    renderItem={this.vendorrenderItem}
                    keyExtractor={item => item.id}

                  />

                </View>
                :
                <View style={{
                  position: 'absolute',
                  zIndex: 1,
                  marginTop: height(10),

                  width: width(100),
                  height: height(16),
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  justifyContent: 'center'



                }}>
                  <Text>
                    There are no Vendors available
                  </Text>

                </View>
            }

            <View style={{
              height: height(5), width: width(80), marginTop: height(26.5), alignSelf: 'center',
              backgroundColor: '#ffffff', position: 'absolute', borderWidth: 1, borderColor: mainColor
              , zIndex: 1, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
            }}>




              <TextInput
                value={this.state.mapsearch}
                // onFocus={() => this.focus()}
                onChangeText={(text) => this.mapsearchlocation(text)}
                placeholder='Search location'
                style={{ width: width(70), paddingVertical: 0 }}
              />

              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    mapsearch: ''
                  })
                }}
                style={{
                  height: height(5), width: width(12), borderLeftWidth: 1, borderColor: mainColor,
                  justifyContent: 'center', alignItems: 'center'
                }}>

                <Text style={{
                  fontSize: totalSize(2)
                }}>
                  x
                </Text>

              </TouchableOpacity>

            </View>
            {this.state.mapsearcharray.length < 1 ?
              null :

              <ScrollView style={{ maxHeight: height(20), width: width(70), marginTop: height(32), borderWidth: 1, borderRadius: 5, position: 'absolute', zIndex: 1, alignSelf: 'center', backgroundColor: '#fff' }}>

                {this.state.mapsearcharray.map(item => {
                  return (
                    <TouchableOpacity
                      onPress={() => this.setlocmap(item.description)}
                      style={{ borderBottomWidth: 0.5 }}>

                      <Text style={{ fontSize: totalSize(2.5), fontFamily: 'BebasNeue-Regular', padding: 5 }}>
                        {item.description}
                      </Text>

                    </TouchableOpacity>
                  )
                })
                }

              </ScrollView>

            }

            <View style={styles.container2}>

              <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                ref={ref => this.map = ref}
                onMapReady={() => this.Mapload()}
                //showsUserLocation={true}
                initialRegion={{
                  latitude: this.state.latitude,
                  longitude: this.state.longitude,
                  latitudeDelta: this.state.latitudeDelta,
                  longitudeDelta: this.state.longitudeDelta,
                }}
              // initialRegion={{
              //   latitude: 37.78825,
              //   longitude: -122.4324,
              //   latitudeDelta: 10,
              //   longitudeDelta: 100,
              // }}
              >
                {this.state.marker == true ?
                  <Marker coordinate={{
                    latitude: this.state.latitude,
                    longitude: this.state.longitude
                  }}
                    title='Current Location'
                  >
                    <Image
                      source={point}
                      style={{ height: 35, width: 30 }}
                    />
                  </Marker>

                  : null}
                {this.state.loc == null ? null
                  :
                  <Marker coordinate={{
                    latitude: this.state.loc.lat,
                    longitude: this.state.loc.lon
                  }}
                    title='Current Location'
                  >
                    <Image
                      source={point}
                      style={{ height: 35, width: 30 }}
                    />
                  </Marker>


                }
                {this.state.loc == null ? null
                  :

                  <Circle
                    center={{
                      latitude: this.state.loc.lat,
                      longitude: this.state.loc.lon
                    }}
                    radius={5000}
                    fillColor='#00000060'
                    strokeWidth={0}
                  />


                }

                {this.state.vendorsmarker == true ?

                  <View>

                    {this.state.s.map(marker => (
                      <View>

                        {marker.startDate ?

                          <Marker
                            coordinate={{
                              latitude: parseFloat(marker.latitude),
                              longitude: parseFloat(marker.longitude)
                            }}
                            // tracksViewChanges={false}
                            identifier='a1'
                            title={marker.name}
                            description={'Distance ' + parseInt(marker.distance) + 'Km'}
                          >
                            <View>
                              <Image
                                source={events}
                                style={{ height: 35, width: 25 }}
                              />
                            </View>

                          </Marker>

                          :

                          marker.favourite ?

                            <Marker
                              coordinate={{
                                latitude: parseFloat(marker.latitude),
                                longitude: parseFloat(marker.longitude)
                              }}
                              // tracksViewChanges={false}
                              identifier='a2'
                              title={marker.name}
                              description={'Distance ' + parseInt(marker.distance) + 'Km'}
                            >
                              <View>
                                <Image
                                  source={vendorFavourite}
                                  style={{ height: 42, width: 30, resizeMode: 'contain' }}
                                />
                              </View>

                            </Marker>
                            :

                            <Marker
                              coordinate={{
                                latitude: parseFloat(marker.latitude),
                                longitude: parseFloat(marker.longitude)
                              }}
                              // tracksViewChanges={false}
                              identifier='a2'
                              title={marker.name}
                              description={'Distance ' + parseInt(marker.distance) + 'Km'}
                            >
                              <View>
                                <Image
                                  source={vendor}
                                  style={{ height: 35, width: 25 }}
                                />
                              </View>

                            </Marker>

                        }

                      </View>
                    ))}

                  </View>
                  : null}

                <Circle
                  center={{
                    latitude: this.state.latitude,
                    longitude: this.state.longitude
                  }}
                  radius={5000}
                  fillColor='#00000060'
                  strokeWidth={0}
                />

              </MapView>

              {

                this.state.marketvendor.length > 0 ?
                  <View style={{
                    position: 'absolute',
                    zIndex: 1,
                    marginTop: height(10),

                    width: width(100),
                    height: height(18),
                    backgroundColor: '#fff',
                    alignItems: 'center'



                  }}>
                    <Text style={{
                      marginTop: 4,
                      fontSize: totalSize(2)
                    }}>
                      Nearby Street Food Markets
                    </Text>
                    <FlatList style={{

                    }}
                      data={this.state.marketvendor}
                      horizontal


                      renderItem={this.marketrenderitem}
                      keyExtractor={item => item.id}

                    />
                  </View>
                  :
                  <View style={{
                    position: 'absolute',
                    zIndex: 1,
                    marginTop: height(10),

                    width: width(100),
                    height: height(16),
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center'



                  }}>
                    <Text>
                      There are no Street Food Markets available
                    </Text>

                  </View>
              }

              {this.state.activeOrder.length > 0 ?

                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('orders')}
                  style={{ height: height(7), width: width(40), position: 'absolute', bottom: height(3), justifyContent: 'center', alignItems: 'center', backgroundColor: mainColor, borderRadius: 10 }}
                >

                  <Text style={{ fontSize: totalSize(2), color: '#fff' }}>
                    View current order
                  </Text>

                </TouchableOpacity>

                : null}

            </View>


            <Modal
              animationType={'fade'}
              transparent={true}
              visible={this.state.visible}
            >
              <View style={{ flex: 1, backgroundColor: '#fff' }}>

                <Header
                />

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>


                  <ActivityIndicator size='large' color={mainColor} />

                  <Text style={{ fontSize: totalSize(2.5), width: '80%', marginTop: height(2), textAlign: 'center', color: mainColor }}>
                    Loading NearbyVendors {'&'} Streetfood Markets
                  </Text>


                </View>

              </View>
            </Modal>


          </View>
        </SafeAreaView>
      </Fragment >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  container2: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
})
