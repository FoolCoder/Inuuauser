import React, { Component, Fragment } from 'react'
import { View, ImageBackground, Text, TouchableOpacity, TextInput, Image, SafeAreaView, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import { height, width, totalSize } from 'react-native-dimension'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import AsyncStorage from '@react-native-community/async-storage'

import { vendors, link } from '../../links/links'
import { mainColor } from '../../GlobleColor/GlobleColor'

import Header from '../header/header'

import user from '../../assets/user.png'
import user2 from '../../assets/user2.png'

import back from '../../assets/back.png'
import forword from '../../assets/forword.png'
import sign from '../../assets/imageB.jpeg'

import food from '../../assets/food2.png'

export default class nearVendors extends Component {
  constructor() {
    super()
    this.state = {
      selectedValue: '',
      nearVendor: [],
      loader: true
    }
  }

  componentDidMount = async () => {
    const val = JSON.parse(await AsyncStorage.getItem('location'))

    fetch(vendors + '?lat=' + val.lat + '&lon=' + val.lon)
      .then((response) => response.json())
      .then(async (responseJson) => {
        console.log('mmmarkkket', responseJson.result);
        this.setState({
          nearVendor: responseJson.result,
          loader: false
        })
      }
      )
  }

  _Flatlist = ({ item }) => {
    // console.log(item)
    if (item.startDate) {
      return (
        <TouchableOpacity onPress={() => this.props.navigation.navigate('eventV', {
          data: item
        })}>

          <ImageBackground
            source={food}
            imageStyle={{ borderRadius: 15 }}
            style={{ height: height(23), width: width(90), alignSelf: 'center', marginTop: height(2) }}>

            <View style={{ flex: 1, borderRadius: 15, backgroundColor: mainColor + '90', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>


              <Image style={{ height: 80, width: 80, borderRadius: 40 }} source={{ uri: link + item.image }} />


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

                  <MaterialIcons name='access-time' color='#ffffff' size={12} />

                  <View style={{ width: width(2) }} />

                  <Text style={{ fontSize: totalSize(1.8), color: '#ffffff' }}>
                    {item.startTime.hour} : {item.startTime.minute} - {item.endTime.hour} : {item.endTime.minute}
                  </Text>

                </View>

                {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                <MaterialIcons name='phone' color='#ffffff' size={12} />

                <View style={{ width: width(2) }} />

                <Text style={{ fontSize: totalSize(1.8), color: '#ffffff' }}>
                  {item.phone}
                </Text>

              </View> */}

              </View>

            </View>

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
              />

            </View>


            <View style={{ flex: 1, marginTop: height(1), backgroundColor: '#f1eff0', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>

              <View style={{ height: height(0.5), width: width(35), alignSelf: 'center', backgroundColor: '#bdbdbd' }}></View>

              <View style={{ width: width(90), alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: height(3) }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('home')}
                  style={{ width: width(10) }}
                >
                  <Image
                    style={{ height: 18, width: 18 }}
                    source={back}
                  />
                </TouchableOpacity>

                <Text style={{ fontSize: totalSize(2.5) }}>
                  Street Food Markets
                </Text>

                <View style={{ width: width(10) }}></View>

              </View>

              {this.state.loader == true ?

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <ActivityIndicator size='large' color={mainColor} />
                </View>

                :

                <FlatList
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