import React, { Component, Fragment } from 'react'
import { View, ImageBackground, Text, TouchableOpacity, TextInput, Image, SafeAreaView, FlatList, StyleSheet, ActivityIndicator, Modal, Alert } from 'react-native'
import { height, width, totalSize } from 'react-native-dimension'

import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

import AsyncStorage from '@react-native-community/async-storage'

import visa from '../../assets/visa.png'
import masterCard from '../../assets/masterCard.png'

import { link } from '../../links/links'
import { mainColor } from '../../GlobleColor/GlobleColor'


export default class addCard extends Component {
  constructor() {
    super()
    this.state = {
      user: {},
      myCards: [{ name: 'Visa Card', owner: 'Junaid', code: '123354565', type: 'visa' },
      { name: 'Visa Card', owner: 'Junaid', code: '123354565', type: 'master' },
      { name: 'Visa Card', owner: 'Junaid', code: '123354565', type: 'visa' },
      { name: 'Visa Card', owner: 'Junaid', code: '123354565', type: 'visa' },
      { name: 'Visa Card', owner: 'Junaid', code: '123354565', type: 'master' },
      { name: 'Visa Card', owner: 'Junaid', code: '123354565', type: 'visa' }],
      newCardHOlderName: '',
      newCard: { valid: false },
      addCardModal: false,
      loader: false
    }
  }

  // {"status": {"cvc": "valid", "expiry": "valid", "number": "valid"}, "valid": true,
  //  "values": {"cvc": "222", "expiry": "11/25", "number": "4111 1111 1111 1111",
  //   "type": "visa"}}

  // {"email": "junaid@gmail.com", "id": "606d6862f0bbf304c85e1468", 
  // "name": "Junaid", "phone": "+923000000", "stripeId": "cus_JG2V6C6GFsRZWR"}

  componentDidMount = async () => {
    const val = JSON.parse(await AsyncStorage.getItem('details'))
    console.log(val)
    this.setState({ user: val })
  }

  addCardF = async () => {

    if (this.state.newCardHOlderName != '' && this.state.newCard.valid) {

      this.setState({ loader: true })

      const val = this.state.user

      let date = this.state.newCard.values.expiry.split('/')

      let card = {
        cardName: this.state.newCard.values.type, cardHolderName: this.state.newCardHOlderName,
        cardNumber: this.state.newCard.values.number, cvc: this.state.newCard.values.cvc,
        expMonth: date[0], expYear: 20 + date[1]
      }

      let data = { userID: this.state.user.id, stripeId: this.state.user.stripeId, card: card }

      console.log(data)


      fetch(link + 'customer/insertCard', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then((response) => response.json())
        .then(async (responseJson) => {
          console.log(responseJson)
          if (responseJson.type == 'success') {
            val.cards.push(responseJson.data)
            this.setState({ user: { ...val } })
            await AsyncStorage.setItem('details', JSON.stringify(val))
            this.setState({ addCardModal: false, loader: false })
          }
          else {
            alert('Failed')
            this.setState({ loader: false })
          }

        }).catch((e) => {
          this.setState({ loader: false })
        })

    }
    else {
      alert('Please fill all fields')
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

        <View style={{ width: '95%', alignSelf: 'center', marginVertical: height(0.5), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

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
        <SafeAreaView style={{ flex: 1 }}>

          <View style={{ flex: 1 }}>

            <View style={{ height: height(10), width: '100%', borderBottomRightRadius: 10, borderBottomLeftRadius: 10, backgroundColor: mainColor }}>

              <View style={{ marginTop: height(5), width: '95%', flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-between', alignItems: 'center' }}>

                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('cart')}
                >

                  <MaterialIcons name='arrow-back' size={30} color='#ffffff' />
                </TouchableOpacity>

                <TouchableOpacity
                >

                  <Text style={{ fontSize: totalSize(2.5), fontWeight: 'bold', color: '#ffffff' }}>
                    Add Card
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

              <View style={{ flex: 1 }}>

                <FlatList
                  style={{ maxHeight: height(75), flexGrow: 0 }}
                  data={this.state.user.cards}
                  renderItem={this._flatlist}
                />

                <TouchableOpacity
                  onPress={() => this.setState({ addCardModal: true })}
                  style={{ height: height(6), width: width(30), marginTop: height(3), alignSelf: 'center', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: mainColor, borderRadius: 5 }}
                >

                  <Text style={{ fontSize: totalSize(2.5), color: '#fff' }}>
                    Add
                  </Text>

                  <Ionicons name='add-circle-outline' color='#fff' size={20} style={{ marginLeft: width(1) }} />

                </TouchableOpacity>

              </View>

            }

            <Modal
              animationType='slide'
              visible={this.state.addCardModal}
              transparent
              onRequestClose={() => this.setState({ addCardModal: false })}
            >

              <View
                style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}
              >
                <View style={{ height: height(67), width: width(100), justifyContent: 'center', alignItems: 'center' }}>

                  <TouchableOpacity
                    onPress={() => this.setState({ addCardModal: false })}
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

                  <View style={{ height: height(65), width: width(95), backgroundColor: '#fff', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>

                    <View style={{ width: width(83) }}>

                      <Text style={{ fontSize: totalSize(1.7), fontWeight: 'bold' }}>
                        CARD HOLDER NAME
                      </Text>

                      <TextInput
                        placeholder='Example : John'
                        onChangeText={(text) => this.setState({ newCardHOlderName: text })}
                        style={{ height: height(7), width: width(60), paddingVertical: 0, borderBottomWidth: 1 }}
                      />

                    </View>

                    <View style={{ height: height(40), marginTop: height(2) }}>

                      <CreditCardInput

                        onChange={(e) => {
                          this.setState({ newCard: e })
                          // console.log(e)
                        }} />

                    </View>

                    <TouchableOpacity
                      onPress={() => this.addCardF()}
                      style={{ height: height(6), width: width(30), marginTop: height(3), alignSelf: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: mainColor, borderRadius: 5 }}
                    >

                      <Text style={{ fontSize: totalSize(2.5), color: '#fff' }}>
                        Save
                      </Text>

                    </TouchableOpacity>

                  </View>

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
  },
})