import React, { Component, Fragment } from 'react'
import { View, ImageBackground, Text, TouchableOpacity, TextInput, Image, SafeAreaView, StyleSheet } from 'react-native'
import { height, width, totalSize } from 'react-native-dimension'

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
              style={{ flex: 1 }}>

              <Text style={{ marginTop: height(5), alignSelf: 'center', fontSize: totalSize(3) }}>
                Enter Confirmation CODE
              </Text>

              <Text style={{ marginTop: height(5), alignSelf: 'center' }}>
                A CODE has been sent to your
              </Text>

              <Text style={{ alignSelf: 'center' }}>
                Mobile Number
              </Text>

              <View style={{ width: width(70), marginTop: height(5), alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                <TextInput
                  style={{ height: 60, width: 60, backgroundColor: '#ffffff', borderWidth: 1, borderRadius: 5 }}
                />

                <TextInput
                  style={{ height: 60, width: 60, backgroundColor: '#ffffff', borderWidth: 1, borderRadius: 5 }}
                />

                <TextInput
                  style={{ height: 60, width: 60, backgroundColor: '#ffffff', borderWidth: 1, borderRadius: 5 }}
                />

                <TextInput
                  style={{ height: 60, width: 60, backgroundColor: '#ffffff', borderWidth: 1, borderRadius: 5 }}
                />

              </View>

              <TouchableOpacity style={{ marginTop: height(5), alignSelf: 'center' }}>

                <Text style={{ fontSize: totalSize(2) }}>
                  Resend
              </Text>

              </TouchableOpacity>



              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('drawer')}
                style={{ height: height(6), width: width(60), marginTop: height(5), borderRadius: 30, backgroundColor: '#019ca0', alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}
              >
                <Text style={{ fontSize: totalSize(2.5), fontWeight: 'bold', color: '#ffffff' }}>
                  Submit
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