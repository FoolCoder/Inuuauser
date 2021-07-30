import React, { Component, Fragment } from 'react'
import { View, ImageBackground, Text, TouchableOpacity, TextInput, Image, SafeAreaView, StyleSheet } from 'react-native'
import { height, width, totalSize } from 'react-native-dimension'

import { mainColor } from '../../GlobleColor/GlobleColor'

import back from '../../assets/back.png'
import forword from '../../assets/forword.png'

export default class fp extends Component {
  constructor() {
    super()
    this.state = {
      phoneNo: false,
      email: false
    }
  }

  forword = () => {
    if (this.state.phoneNo == true) {
      this.props.navigation.navigate('fph')
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

            <View style={{ flex: 1 }}>

              <Text style={{ marginTop: height(5), alignSelf: 'center', fontSize: totalSize(3) }}>
                Forgot Password
              </Text>

              <TouchableOpacity
                onPress={() => this.setState({ phoneNo: true, email: false })}
                style={{ width: width(70), marginTop: height(10), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center' }}>

                <View style={this.state.phoneNo == true ? styles.true : styles.default}></View>

                <Text style={{ width: width(60) }}>
                  Reset Password via Phone Number
              </Text>

              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.setState({ email: true, phoneNo: false })}
                style={{ width: width(70), marginTop: height(4), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center' }}>

                <View style={this.state.email == true ? styles.true : styles.default}></View>

                <Text style={{ width: width(60) }}>
                  Reset Password via Email
              </Text>

              </TouchableOpacity>

              <View style={{ marginTop: height(10), width: width(70), alignSelf: 'center' }}>

                <TouchableOpacity
                  onPress={() => this.forword()}
                  style={{ padding: 10, borderRadius: 20, backgroundColor: mainColor, alignSelf: 'flex-end', justifyContent: 'center', alignItems: 'center' }}
                >

                  <Image
                    style={{ height: 18, width: 18 }}
                    source={forword}
                  />

                </TouchableOpacity>

              </View>

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