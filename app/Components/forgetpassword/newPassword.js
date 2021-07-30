import React, { Component, Fragment } from 'react'
import { View, ImageBackground, Text, TouchableOpacity, TextInput, Image, SafeAreaView, StyleSheet, Modal } from 'react-native'
import { height, width, totalSize } from 'react-native-dimension'

import back from '../../assets/back.png'
import forword from '../../assets/forword.png'
import sign from '../../assets/imageB.jpeg'
import password from '../../assets/password.png'
import check from '../../assets/check.png'

export default class fp extends Component {
  constructor() {
    super()
    this.state = {
      visible: false
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
              source={sign}
              style={{ flex:1 }}>

              <Text style={{ marginTop: height(5), alignSelf: 'center', fontSize: totalSize(3) }}>
                New Password
              </Text>


              <View style={{ height: height(8), width: width(75), marginTop: height(7), justifyContent: 'center', borderWidth: 1, borderColor: '#bdbdbd', backgroundColor: '#ffffff', alignSelf: 'center' }}>

                <View style={{ width: width(70), flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center' }}>

                  <Image style={{ height: 25, width: 25, alignSelf: 'center' }}
                    source={password}
                  />

                  <TextInput
                    placeholder='New Password'
                    placeholderTextColor='#cfcfcf'
                    style={{ color: '#cfcfcf', fontSize: totalSize(2.5), width: width(60) }}
                  />

                </View>

              </View>


              <View style={{ height: height(8), width: width(75), marginTop: height(3), justifyContent: 'center', borderWidth: 1, borderColor: '#bdbdbd', backgroundColor: '#ffffff', alignSelf: 'center' }}>

                <View style={{ width: width(70), flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center' }}>

                  <Image style={{ height: 25, width: 25, alignSelf: 'center' }}
                    source={password}
                  />

                  <TextInput
                    placeholder='Confirm Password'
                    placeholderTextColor='#cfcfcf'
                    style={{ color: '#cfcfcf', fontSize: totalSize(2.5), width: width(60) }}
                  />

                </View>

              </View>

              <TouchableOpacity
              onPress={()=>this.setState({visible:true})}
                style={{ height: height(6), width: width(60), marginTop: height(5), borderRadius: 30, backgroundColor: '#019ca0', alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}
              >
                <Text style={{ fontSize: totalSize(2.5), fontWeight: 'bold', color: '#ffffff' }}>
                  Change Password
                </Text>

              </TouchableOpacity>

            </ImageBackground>

            <Modal
              animationType={'fade'}
              transparent={true}
              visible={this.state.visible}
            >
              <View style={{ flex: 1, backgroundColor: '#dcdcdc' }}>

                <ImageBackground
                  source={sign}
                  resizeMode='stretch'
                  style={{ height: height(45), width: width(90), marginTop: height(25), alignSelf: 'center' }}>

                  <Text style={{ marginTop: height(4), fontSize: totalSize(3.5), alignSelf: 'center' }}>
                    Password
                </Text>

                  <Text style={{ fontSize: totalSize(3.5), alignSelf: 'center' }}>
                    Changed
                </Text>

                  <Image
                    style={{ height: 70, width: 70, marginTop: height(3), alignSelf: 'center' }}
                    source={check}
                  />

                  <TouchableOpacity
                  onPress={()=>this.setState({visible:false})}
                    style={{ height: height(6), width: width(60), marginTop: height(5), borderRadius: 30, backgroundColor: '#019ca0', alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}
                  >
                    <Text style={{ fontSize: totalSize(2.5), fontWeight: 'bold', color: '#ffffff' }}>
                      Sign in
                </Text>

                  </TouchableOpacity>

                </ImageBackground>
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