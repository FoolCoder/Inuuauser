import React, { Component, Fragment } from 'react'
import { View, ImageBackground, Text, TouchableOpacity, Picker, TextInput, Image, SafeAreaView, StyleSheet } from 'react-native'
import { height, width, totalSize } from 'react-native-dimension'

import { mainColor } from '../../GlobleColor/GlobleColor'

import back from '../../assets/back.png'
import forword from '../../assets/forword.png'
import sign from '../../assets/imageB.jpeg'

export default class fp extends Component {
  constructor() {
    super()
    this.state = {
      phoneNo: false,
      email: false,
      selectedValue: ''
    }
  }

  render() {
    return (
      <Fragment>
        <SafeAreaView
          style={(styles.container, { backgroundColor: '#2ca0df' })}
        />
        <SafeAreaView style={styles.container}>
          <View style={{ flex: 1, backgroundColor: '#dcdcdc' }}>

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
              style={{ flex: 1, backgroundColor: '#fff' }}>

              <Text style={{ marginTop: height(5), alignSelf: 'center', fontSize: totalSize(3) }}>
                Forget Password
              </Text>

              <Text style={{ marginTop: height(10), alignSelf: 'center' }}>
                Enter your Registered Number
              </Text>

              <View style={{ width: width(80), marginTop: height(10), alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                <View style={{ height: 50, width: 90, borderBottomWidth: 1 }}>

                  <Picker
                    mode='dropdown'
                    selectedValue={this.state.selectedValue}
                    style={{ height: 50, width: 100 }}
                    onValueChange={(itemValue, itemIndex) => this.setState({ selectedValue: itemValue })}
                  >
                    <Picker.Item label="+92" value="+92" />
                    <Picker.Item label="+93" value="+93" />
                  </Picker>

                </View>

                <TextInput
                  placeholder='Enter your number'
                  style={{ width: width(47), borderBottomWidth: 1 }}
                  keyboardType='number-pad'
                />

              </View>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('cc')}
                style={{ height: height(6), width: width(60), marginTop: height(7), borderRadius: 30, backgroundColor: mainColor, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}
              >
                <Text style={{ fontSize: totalSize(2.5), fontWeight: 'bold', color: '#ffffff' }}>
                  Send Code
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
  },
  default: {
    height: 15,
    width: 15,
    borderRadius: 7.5,
    borderWidth: 1
  },
  true: {
    height: 15,
    width: 15,
    borderRadius: 7.5,
    borderWidth: 2,
    backgroundColor: '#53e0eb'
  }
})