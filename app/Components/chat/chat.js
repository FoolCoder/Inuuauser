import React, { Component, Fragment } from 'react'
import { View, ImageBackground, Text, TouchableOpacity, TextInput, AppState, Image, SafeAreaView, FlatList, Alert, StyleSheet, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import { height, width, totalSize } from 'react-native-dimension'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import message from '@react-native-firebase/messaging'

import AsyncStorage from '@react-native-community/async-storage'

import { link } from '../../links/links'
import { mainColor } from '../../GlobleColor/GlobleColor'

import pic from '../../assets/user2.png'

import sign from '../../assets/imageB.jpeg'

export default class chatt extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      chat: [],
      message: '',
      vendor: {},
      customer: {},
      loader: true
    }
  }

  componentDidMount = async () => {
    this.open()

    AppState.addEventListener('change', this.handle)

    message().onMessage(async remoteMessage => {
      setTimeout(() => {
        this.open()
        console.log('123');
      }, 500);
    })
  }

  componentWillUnmount = () => {
    console.log('removed')
    AppState.removeEventListener('change', this.handle)
  }

  handle = (e) => {
    if (e === 'active') {
      this.open()
    }
  }

  open = async () => {
    let val = JSON.parse(await AsyncStorage.getItem('details'))
    let data = this.props.navigation.getParam('data')
    console.log(data)
    this.setState({
      vendor: data,
      customer: val,
      name: data.name
    })

    try {

      var data2 = {
        vendor: data._id, customer: val.id,
      }

      fetch(link + 'chat/getChat', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data2)
      })
        .then((response) => response.json())
        .then((responsejson) => {

          if (responsejson.type == 'success') {
            console.log(responsejson.result[0].messages)
            this.setState({
              chat: responsejson.result[0].messages.reverse(),
              loader: false
            })
          }

        }).catch((e) => {
          console.log(e)
          this.setState({
            loader: false
          })
        })

    } catch (e) {

    }
  }

  message = () => {
    try {
      if (this.state.message !== '') {

        var data = {
          vendor: this.state.vendor._id, customer: this.state.customer.id,
          text: this.state.message, from: 'customer'
        }

        this.setState({ message: '' })

        fetch(link + 'chat/sendMessage', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then((response) => response.json())
          .then((responsejson) => {

            console.log(responsejson)
            let array = { by: 'customer', text: data.text }
            this.setState({
              chat: [array, ...this.state.chat]
            }, () => {
              console.log(this.state.chat)
            })

          }).catch((e) => {
            Alert.alert(
              'Network',
              'Network failed'
            )
          })
      }
      else {
        Alert.alert(
          'Message',
          'Please type something'
        )
      }

    } catch (e) {
      console.log(e)
    }

  }

  _Flatlist = ({ item }) => {
    return (
      <View style={{ width: '90%', alignSelf: 'center' }}>

        {item.by == 'vendor' ?

          <View style={{ marginVertical: height(1.5), flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>

            <View style={{ padding: 10, borderRadius: 20, backgroundColor: '#6f6e6c', justifyContent: 'center', alignItems: 'center' }}>

              <Image style={{ height: 20, width: 20 }} source={pic} />

            </View>

            <View style={{ maxWidth: width(55), padding: 10, marginLeft: width(5), backgroundColor: '#d2d5cb', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>

              <Text style={{ fontSize: totalSize(1.9) }}>
                {item.text}
              </Text>
            </View>

          </View>

          : item.by == 'customer' ?
            <View style={{ marginVertical: height(1.5), flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>


              <View style={{ maxWidth: width(55), padding: 10, marginRight: width(5), backgroundColor: '#d2d5cb', borderRadius: 10 }}>

                <Text style={{ fontSize: totalSize(1.9) }}>
                  {item.text}
                </Text>
              </View>


              <View style={{ padding: 10, borderRadius: 20, backgroundColor: '#6f6e6c', justifyContent: 'center', alignItems: 'center' }}>

                <Image style={{ height: 20, width: 20 }} source={pic} />

              </View>

            </View>
            : null}

      </View>
    )
  }

  render() {
    return (
      <Fragment>

        <SafeAreaView style={{ flex: 1 }}>

          <ImageBackground
            // source={sign}
            style={{ flex: 1, backgroundColor: '#fff' }}>

            <View style={{ height: height(10) }}>

              <View style={{ height: height(10), width: '100%', position: 'absolute', zIndex: 1, borderBottomRightRadius: 10, borderBottomLeftRadius: 10, backgroundColor: mainColor }}>

                <View style={{ marginTop: height(5), width: '95%', flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-between', alignItems: 'center' }}>

                  <TouchableOpacity
                    onPress={() => this.props.navigation.goBack()}
                  >

                    <MaterialIcons name='arrow-back' size={30} color='#ffffff' />
                  </TouchableOpacity>

                  <TouchableOpacity
                  >

                    <Text style={{ fontSize: totalSize(2.5), fontWeight: 'bold', color: '#ffffff' }}>
                      {this.state.name}
                    </Text>

                  </TouchableOpacity>

                  <View style={{ height: 30, width: 30 }}>

                  </View>

                </View>

              </View>

            </View>

            {this.state.loader == true ?

              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                <ActivityIndicator size='large' color={mainColor} />

              </View>

              :

              <FlatList
                style={{ marginBottom: height(2) }}
                data={this.state.chat}
                keyExtractor={(item, index) => { return index.toString() }}
                renderItem={this._Flatlist}
                inverted
              />

            }

            <View style={{ height: height(7), backgroundColor: '#00000020', justifyContent: 'center', alignItems: 'center' }}>

              <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                <TextInput
                  placeholder='Say something'
                  onChangeText={(text) => this.setState({ message: text })}
                  value={this.state.message}
                  style={{ width: '90%' }}
                />

                <TouchableOpacity
                  onPress={() => this.message()}
                  style={{ height: 40, width: 40, justifyContent: 'center', alignItems: 'center' }}
                >
                  <MaterialIcons name='arrow-forward' size={20} />

                </TouchableOpacity>

              </View>

            </View>

          </ImageBackground>

        </SafeAreaView>

      </Fragment>
    )
  }
}