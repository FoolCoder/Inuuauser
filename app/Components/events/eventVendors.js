import React, { Component, Fragment } from 'react'
import { View, ImageBackground, Text, TouchableOpacity, TextInput, Keyboard, Image, ScrollView, SafeAreaView, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import { height, width, totalSize } from 'react-native-dimension'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import AsyncStorage from '@react-native-community/async-storage'

import { eventV, link } from '../../links/links'
import { mainColor } from '../../GlobleColor/GlobleColor'

import Header from '../header/header'

import user from '../../assets/user.png'
import user2 from '../../assets/user2.png'

import back from '../../assets/back.png'
import Open from '../../assets/Open.png'
import Close from '../../assets/Close.png'
import forword from '../../assets/forword.png'
import sign from '../../assets/imageB.jpeg'

import food from '../../assets/foodbackground.jpg'

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
      selectedValue: '',
      nearVendor: [],
      nearVendorCopy: [],
      loader: true,
      categories: '',
      selectedItems: items,
      searchIV: false
    }
  }

  componentDidMount = async () => {
    try {
      let data = this.props.navigation.getParam('data')

      console.log(data)

      fetch(eventV + data._id)
        .then((response) => response.json())
        .then(async (responseJson) => {
          console.log(responseJson.result.vendors);
          this.setState({
            nearVendor: responseJson.result.vendors,
            nearVendorCopy: responseJson.result.vendors,
            event: data.name,
            loader: false
          })
        }
        )

    } catch (e) {
      console.log(e);
    }
  }

  searchFilter = (text) => {
    this.setState({
      categories: text,
      selectedItems: items.filter(i =>
        i.name.toLowerCase().includes(text.toLowerCase()))
    })
  }

  _Flatlist = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('esV', {
        data: item.vendor,
        event: this.props.navigation.getParam('data')
      })}>


        <ImageBackground
          source={food}
          imageStyle={{ borderRadius: 15 }}
          style={{ height: height(23), width: width(90), alignSelf: 'center', marginTop: height(2) }}>

          <Image
            source={item.vendor.onlineStatus == true ? Open : Close}
            style={{ height: height(5), width: width(17), position: 'absolute', zIndex: 1, right: 0, top: height(1), resizeMode: 'contain' }}
          />

          <View style={{ flex: 1, borderRadius: 15, backgroundColor: mainColor + '90', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>


            <Image style={{ height: 80, width: 80, borderRadius: 40 }} source={{ uri: link + item.vendor.image }} />


            <View>

              <Text style={{ fontSize: totalSize(2.5), fontWeight: 'bold', color: '#ffffff' }}>
                {item.vendor.name}
              </Text>

              {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                <MaterialIcons name='location-on' color='#ffffff' size={12} />

                <View style={{ width: width(2) }} />

                <Text
                  numberOfLines={1}
                  style={{ width: width(45), fontSize: totalSize(1.8), color: '#ffffff' }}>
                  {item.vendor.address}
                </Text>

              </View> */}

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                <MaterialCommunityIcons name='silverware-fork-knife' color='#ffffff' size={12} />

                <View style={{ width: width(2) }} />

                <Text style={{ fontSize: totalSize(1.8), width: width(35), color: '#ffffff' }}>
                  {item.vendor.foodType}
                </Text>

              </View>

            </View>

          </View>

          {/* <TouchableOpacity
            style={{ position: 'absolute', zIndex: 1, right: width(5), bottom: height(2) }}
          >

            <AntDesign
              name='star'
              size={20}
              color='#aaa'
            />

          </TouchableOpacity> */}

        </ImageBackground>

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
                    onPress={() => this.props.navigation.goBack()}
                    style={{ width: width(10) }}
                  >
                    <Image
                      style={{ height: 18, width: 18 }}
                      source={back}
                    />
                  </TouchableOpacity>

                  <Text style={{ fontSize: totalSize(2.5) }}>
                    {this.state.event}
                  </Text>

                </View>

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

                  {this.state.searchIV == true ?

                    <ScrollView
                      style={{ maxHeight: height(30), borderRadius: 5, backgroundColor: '#fff' }}
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
                                this.setState({
                                  nearVendor: this.state.nearVendorCopy
                                })
                              }
                              else {
                                this.setState({
                                  nearVendor: this.state.nearVendorCopy.filter(item =>
                                    item.vendor.foodType.toLowerCase().includes(e.name.toLowerCase())
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