import React, { Component, Fragment } from 'react'
import {
  View, ImageBackground, Text, TouchableOpacity,
  Keyboard, TextInput, Image, SafeAreaView,
  StyleSheet, FlatList, ActivityIndicator,
  Pressable
} from 'react-native'
import { height, width, totalSize } from 'react-native-dimension'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'

import AsyncStorage from '@react-native-community/async-storage'
import DropDownPicker from 'react-native-dropdown-picker';

import { vendors, link } from '../../links/links'
import { mainColor } from '../../GlobleColor/GlobleColor'

import Header from '../header/header'

import back from '../../assets/back.png'
import Open from '../../assets/Open.png'
import Close from '../../assets/Close.png'
import forword from '../../assets/forword.png'
import sign from '../../assets/imageB.jpeg'

import food from '../../assets/foodbackground.jpg'
import { ScrollView } from 'react-native-gesture-handler'

let items = [
  { name: 'All' },
  { name: 'African' },
  { name: 'American' },
  { name: 'Asian' },
  { name: 'BBQ' },
  { name: 'Burgers' },
  { name: 'Caribbean' },
  { name: 'Crepes' },
  { name: 'Craft Beer' },
  { name: 'Dessert' },
  { name: 'European' },
  { name: 'Indian' },
  { name: 'Chinese' },
  { name: 'Italian' },
  { name: 'Mexican' },
  { name: 'Middle Eastern' },
  { name: 'Pizza' },
  { name: 'Vegan' },
  { name: 'Salads' },
  { name: 'Japanese' },
  { name: 'Korean' },
  { name: 'Juices' },
  { name: 'Hot Drinks' },
  { name: 'Coffee' }
]

export default class nearVendors extends Component {
  constructor() {
    super()
    this.state = {
      user: {},
      selectedValue: '',
      nearVendor: [],
      nearVendorCopy: [],
      loader: true,
      categories: '',
      selectedItems: items,
      searchIV: false,
      loc: ''
    }
  }

  componentDidMount = async () => {
    console.log("ghgfhfhfghfhf")
    this.open()
  }

  open = async () => {
    const user = JSON.parse(await AsyncStorage.getItem('details'))

    console.log('Card Holder Details', user)

    const val = JSON.parse(await AsyncStorage.getItem('location'))

    fetch(vendors + '?lat=' + val.lat + '&lon=' + val.lon)
      .then((response) => response.json())
      .then(async (responseJson) => {

        console.log('near by vendeorrrrrrr', responseJson.result[0]);
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
          nearVendor: [...array],
          nearVendorCopy: [...array],
          user: user,
          loader: false,

        })
      }
      ).catch((e) => {
        this.setState({ loader: false })
      })
  }

  searchFilter = (text) => {
    this.setState({
      categories: text,
      selectedItems: items.filter(i =>
        i.name.toLowerCase().includes(text.toLowerCase()))
    })
  }

  reload = (item) => {
    let array = this.state.nearVendor.filter(e => {
      if (!e.startDate) {
        let check = false
        let data = item.favouriteVendors.map((q, i, a) => {
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
      }
    })
    this.setState({
      nearVendor: [...array],
    })
  }

  Favourite = async (item) => {

    let data = { customerId: this.state.user.id, vendorId: item._id }

    fetch(link + 'customer/makeFavourite', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then(async (responseJson) => {

        if (responseJson.type == 'success') {
          this.state.user.favouriteVendors.push(item._id)
          this.setState({
            user: this.state.user
          })
          await AsyncStorage.setItem('details', JSON.stringify(this.state.user))
          this.reload(this.state.user)
        }

      }).catch((e) => {
      })
  }

  unFavourite = async (item) => {

    let data = { customerId: this.state.user.id, vendorId: item._id }

    fetch(link + 'customer/makeunFavourite', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then(async (responseJson) => {

        if (responseJson.type == 'success') {
          let fav = this.state.user.favouriteVendors
          let val = fav.filter((e) => {
            if (e != item._id) {
              return e
            }
          })
          this.state.user.favouriteVendors = val
          this.setState({
            user: this.state.user
          })
          await AsyncStorage.setItem('details', JSON.stringify(this.state.user))
          this.reload(this.state.user)
        }

      }).catch((e) => {
      })
  }

  _Flatlist = ({ item }) => {
    if (!item.startDate) {
      return (
        <TouchableOpacity onPress={() => this.props.navigation.navigate('selectedV', {
          data: item
        })}

        >

          <ImageBackground
            source={{ uri: link + item.banner }}
            imageStyle={{ borderRadius: 15 }}
            style={{ height: height(23), width: width(90), alignSelf: 'center', marginTop: height(2) }}>

            <Image
              source={item.onlineStatus == true ? Open : Close}
              style={{ height: height(5), width: width(17), position: 'absolute', zIndex: 1, right: 0, top: height(1), resizeMode: 'contain' }}
            />

            <View style={{ flex: 1, borderRadius: 15, backgroundColor: mainColor + '90', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>


              <Image
                style={{ height: 80, width: 80, borderRadius: 40 }}
                source={{ uri: link + item.image }} />

              <View>

                <Text style={{ fontSize: totalSize(2.5), fontWeight: 'bold', color: '#ffffff' }}>
                  {item.name}
                </Text>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                  <MaterialIcons name='location-on' color='#ffffff' size={12} />

                  <View style={{ width: width(2) }} />

                  <Text
                    numberOfLines={1}
                    style={{ width: width(45), fontSize: totalSize(1.8), color: '#ffffff' }}>
                    {item.address}
                  </Text>

                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                  <MaterialCommunityIcons name='silverware-fork-knife' color='#ffffff' size={12} />

                  <View style={{ width: width(2) }} />

                  <Text style={{ fontSize: totalSize(1.8), color: '#ffffff' }}>
                    {item.foodType}
                  </Text>

                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                  <MaterialIcons name='access-time' color='#ffffff' size={12} />

                  <View style={{ width: width(2) }} />

                  <Text style={{ fontSize: totalSize(1.8), color: '#ffffff' }}>
                    {item.dayStartTime.hours} : {item.dayStartTime.minutes} - {item.dayEndTime.hours} : {item.dayEndTime.minutes}
                  </Text>

                </View>

              </View>

            </View>

            {item.favourite ?

              <TouchableOpacity
                onPress={() => this.unFavourite(item)}
                style={{ position: 'absolute', zIndex: 1, right: width(5), bottom: height(2) }}
              >

                {/* <AntDesign
                  name='star'
                  size={20}
                  color='#ffbb41'
                /> */}

              </TouchableOpacity>

              :

              <TouchableOpacity
                onPress={() => this.Favourite(item)}
                style={{ position: 'absolute', zIndex: 1, right: width(5), bottom: height(2) }}
              >
                <Text>
                  Ant AntDesign
                </Text>

                {/* <AntDesign
                  name='star'
                  size={20}
                  color='#aaa'
                /> */}

              </TouchableOpacity>

            }

          </ImageBackground>

        </TouchableOpacity>

      )
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
                profile={() => this.props.navigation.navigate('profile')}
              />

            </View>


            <View
              style={{ flex: 1, marginTop: height(1), backgroundColor: '#f1eff0', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>

              <View style={{ height: height(0.5), width: width(35), alignSelf: 'center', backgroundColor: '#bdbdbd' }}></View>

              <View
                onStartShouldSetResponder={(e) => {
                  this.setState({
                    searchIV: false
                  })
                  Keyboard.dismiss()
                }}
                onMoveShouldSetResponder={(e) => {
                  this.setState({
                    searchIV: false
                  })
                  Keyboard.dismiss()
                }}
                onResponderGrant={(e) => {
                  this.setState({
                    searchIV: false
                  })
                  Keyboard.dismiss()
                }}
                onResponderMove={(e) => {
                  this.setState({
                    searchIV: false
                  })
                  Keyboard.dismiss()
                }}
                style={{ width: width(90), alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: height(3) }}>

                <View style={{ width: width(45), flexDirection: 'row', alignItems: 'center' }}>

                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('home')}
                    style={{ width: width(10) }}
                  >
                    <Image
                      style={{ height: 18, width: 18 }}
                      source={back}
                    />
                  </TouchableOpacity>

                  <Text style={{ fontSize: totalSize(2.2) }}>
                    Near Vendors
                  </Text>

                </View>

                {/* <DropDownPicker
                  items={[
                    { label: 'African', value: 'African' },
                    { label: 'American', value: 'American' },
                    { label: 'Asian', value: 'Asian' },
                    { label: 'BBQ', value: 'BBQ' },
                    { label: 'Burgers', value: 'Burgers' },
                    { label: 'Caribbean', value: 'Caribbean' },
                    { label: 'Crepes', value: 'Crepes' },
                    { label: 'Craft Beer', value: 'Craft Beer' },
                    { label: 'Dessert', value: 'Dessert' },
                    { label: 'European', value: 'European' },
                    { label: 'Indian', value: 'Indian' },
                    { label: 'Chinese', value: 'Chinese' },
                    { label: 'Italian', value: 'Italian' },
                    { label: 'Mexican', value: 'Mexican' },
                    { label: 'Middle Eastern', value: 'Middle Eastern' },
                    { label: 'Pizza', value: 'Pizza' },
                    { label: 'Vegan', value: 'Vegan' },
                    { label: 'Salads', value: 'Salads' },
                    { label: 'Japanese', value: 'Japanese' },
                    { label: 'Korean', value: 'Korean' },
                    { label: 'Juices', value: 'Juices' },
                    { label: 'Hot Drinks', value: 'Hot Drinks' },
                    { label: 'Coffee', value: 'Coffee' }
                  ]}
                  labelStyle={{ fontSize: totalSize(1.45) }}
                  containerStyle={{ height: height(5), width: width(35) }}
                  style={{ backgroundColor: '#fff', borderWidth: 1 }}
                  placeholder='Categories'
                  itemStyle={{
                    justifyContent: 'flex-start'
                  }}
                  activeLabelStyle={{ fontWeight: 'bold' }}
                  dropDownStyle={{ backgroundColor: '#fff' }}
                  onChangeItem={item => this.setState({
                    categories: item
                  })}
                /> */}

              </View>

              <View
                style={{ position: 'absolute', zIndex: 2, top: height(2), right: width(5) }}>

                <View style={{ maxHeight: height(35) }}>

                  <View style={{ height: height(5), width: width(35), borderWidth: 1, borderColor: '#ccc', borderRadius: 5, backgroundColor: '#fff' }}>

                    <TextInput
                      placeholder='Categories'
                      onFocus={() => this.setState({ searchIV: true })}
                      value={this.state.categories}
                      onChangeText={(text) => this.searchFilter(text)}
                      style={{ width: width(30), paddingVertical: 0, alignSelf: 'center' }}
                    />

                  </View>

                  <TouchableOpacity style={{
                    width: width(20),
                    height: height(4),
                    marginTop: height(1),
                    borderWidth: 1,
                    backgroundColor: mainColor,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                    borderColor: '#ccc'
                  }}

                    onPress={() =>
                      this.open()}
                  >
                    <Text style={{
                      color: '#fff',
                      fontSize: totalSize(1.6)
                    }}>
                      Refresh
                    </Text>
                  </TouchableOpacity>

                  {this.state.searchIV == true ?

                    <ScrollView
                      style={{
                        maxHeight: height(30), borderRadius: 5,
                        backgroundColor: '#fff',
                      }}
                    >

                      {this.state.selectedItems.map((e) => {
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              this.setState({
                                categories: e.name,
                                searchIV: false
                              })
                              if (e.name == 'All') {
                                this.open()
                              }
                              else {
                                this.setState({
                                  nearVendor: this.state.nearVendorCopy.filter(item =>
                                    item.foodType.toLowerCase().includes(e.name.toLowerCase())
                                  )
                                })
                              }
                            }}
                            style={{ height: height(5), width: width(30), justifyContent: 'center', alignItems: 'center' }}
                          >

                            <Text style={{ fontSize: totalSize(1.5) }}>
                              {e.name}
                            </Text>

                          </TouchableOpacity>
                        )
                      })}
                    </ScrollView>

                    : null}

                </View>

              </View>

              {this.state.loader == true ?

                <View
                  onStartShouldSetResponder={(e) => {
                    this.setState({
                      searchIV: false
                    })
                    Keyboard.dismiss()
                  }}
                  onMoveShouldSetResponder={(e) => {
                    this.setState({
                      searchIV: false
                    })
                    Keyboard.dismiss()
                  }}
                  onResponderGrant={(e) => {
                    this.setState({
                      searchIV: false
                    })
                    Keyboard.dismiss()
                  }}
                  onResponderMove={(e) => {
                    this.setState({
                      searchIV: false
                    })
                    Keyboard.dismiss()
                  }}
                  style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                  <ActivityIndicator size='large' color={mainColor} />

                </View>

                :
                <View style={{
                  marginTop: height(5)
                }}>
                  <FlatList
                    onStartShouldSetResponder={(e) => {
                      this.setState({
                        searchIV: false
                      })
                      Keyboard.dismiss()
                    }}
                    onMoveShouldSetResponder={(e) => {
                      this.setState({
                        searchIV: false
                      })
                      Keyboard.dismiss()
                    }}
                    onResponderGrant={(e) => {
                      this.setState({
                        searchIV: false
                      })
                      Keyboard.dismiss()
                    }}
                    onResponderMove={(e) => {
                      this.setState({
                        searchIV: false
                      })
                      Keyboard.dismiss()
                    }}
                    data={this.state.nearVendor}
                    renderItem={this._Flatlist}
                  />
                </View>
              }

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