import React, { Component, Fragment } from 'react'
import {
  View, ImageBackground, Text, TouchableOpacity, TextInput, Image, SafeAreaView, StyleSheet,
  ScrollView
} from 'react-native'
import { height, width, totalSize } from 'react-native-dimension'
import { Picker } from '@react-native-picker/picker';
import { link } from '../../links/links'
import { mainColor } from '../../GlobleColor/GlobleColor'
import back from '../../assets/back.png'
import forword from '../../assets/forword.png'
import sign from '../../assets/imageB.jpeg'
// import ScrollPicker from "react-native-fen-wheel-scroll-picker";

export default class signupPC extends Component {
  phonecode = [
    {
      label: '+92',
      value: '+92'
    },
    {
      label: '+44',
      value: '+44'
    },

  ]
  constructor() {
    super()
    this.state = {
      phoneNo: '',
      data: {},
      selectedValue: '+92'
    }
  }




  send = () => {
    try {
      var phone = this.state.selectedValue + this.state.phoneNo
      let data = this.props.navigation.state.params.data
      let data2 = { name: data.name, password: data.password, email: data.email, phone: phone }

      //console.log(data2)
      try {
        fetch(link + 'customer/signup', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data2)
        })
          .then((response) => response.json())
          .then((Data) => {
            if (Data.type == 'failure') {
              alert(Data.result)
            }
            else {
              alert(Data.result)
              this.props.navigation.pop(2)
            }

          })
          .catch((err) => {
            console.log("Error" + err);
          })
      } catch (error) {
        alert('two' + error)
        console.log("Error" + err);
      }

    } catch (e) {
      console.log("Error" + e);
    }

  }

  render() {
    return (
      <Fragment>
        <SafeAreaView
          style={(styles.container, { backgroundColor: '#2ca0df' })}
        />
        <SafeAreaView style={styles.container}>
          <View style={{ flex: 1 }}>

            {/* <View style={{ width: width(90), alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: height(3) }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
                style={{ width: width(10) }}
              >
                <Image
                  style={{ height: 25, width: 25 }}
                  source={back}
                />
              </TouchableOpacity>

            </View> */}

            <ImageBackground
              // source={sign}
              style={{ flex: 1 }}>

              <Text style={{ marginTop: height(5), alignSelf: 'center', fontSize: totalSize(3) }}>
                Enter Mobile Number
              </Text>

              <Text style={{ alignSelf: 'center', fontSize: totalSize(3) }}>
                to Continue
              </Text>

              <Text style={{ marginTop: height(10), alignSelf: 'center' }}>
                Number which is currently in your use
              </Text>


              <View style={{
                width: width(80), marginTop: height(10), alignSelf: 'center',
                flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',

              }}>


                <View style={{
                  borderBottomWidth: 1,

                  width: width(25),
                  height: height(6)
                }}>



                  <Picker
                    mode='dropdown'
                    selectedValue={this.state.selectedValue}
                    style={{ height: 50, width: 100 }}
                    onValueChange={(itemValue, itemIndex) => this.setState({ selectedValue: itemValue })}
                  >

                    {
                      this.phonecode.map(e =>

                        <Picker label={e.label} value={e.value} />

                      )
                    }

                  </Picker>

                </View>

                <TextInput
                  placeholder='Enter your number'
                  onChangeText={(phoneNo) => this.setState({ phoneNo: phoneNo })}
                  style={{ width: width(47), borderBottomWidth: 1 }}
                  keyboardType='number-pad'
                />

              </View>

              <TouchableOpacity
                onPress={() => this.send()}
                style={{ height: height(6), width: width(60), marginTop: height(7), borderRadius: 30, backgroundColor: mainColor, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}
              >
                <Text style={{ fontSize: totalSize(2.5), fontWeight: 'bold', color: '#ffffff' }}>
                  Continue
                </Text>

              </TouchableOpacity>

            </ImageBackground>


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