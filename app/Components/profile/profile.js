import React, { Component, Fragment } from 'react'
import { View, ImageBackground, Text, TouchableOpacity, PermissionsAndroid, TextInput, Modal, Image, SafeAreaView, ActivityIndicator, StyleSheet, Alert } from 'react-native'
import { height, width, totalSize } from 'react-native-dimension'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


import AsyncStorage from '@react-native-community/async-storage'

import { vendors } from '../../links/links'
import { mainColor } from '../../GlobleColor/GlobleColor'

import Header from '../header/header'

import user2 from '../../assets/user2.png'
import { ScrollView } from 'react-native-gesture-handler'

export default class profile extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      phoneNo: '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      editName: false
    }
  }

  componentDidMount = async () => {

    const val = JSON.parse(await AsyncStorage.getItem('details'))

    console.log(val)

    this.setState({
      name: val.name,
      email: val.email,
      phoneNo: val.phone
    })

  }


  render() {
    return (
      <Fragment>
        <SafeAreaView
          style={(styles.container, { backgroundColor: '#2ca0df' })}
        />
        <SafeAreaView style={styles.container}>

          <View style={{ flex: 1 }}>

            <Header
              drawer={() => this.props.navigation.openDrawer()}
              home={() => this.props.navigation.navigate('homet')}
              cart={() => this.props.navigation.navigate('cart')}
            />

            <View style={{ flex: 1 }}>

              <View style={{ padding: 20, marginTop: height(12), borderRadius: 50, alignSelf: 'center', backgroundColor: '#6f6e6c', justifyContent: 'center', alignItems: 'center' }}>

                <Image style={{ height: 40, width: 40 }} source={user2} />

              </View>

              <View style={{ width: width(95), alignSelf: 'center' }}>

                <View style={{
                  height: height(32), shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                  marginTop: height(2), backgroundColor: '#fff', borderRadius: 15
                }}>

                  <View style={{ width: width(85), marginTop: height(1), alignSelf: 'center' }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                      <Text style={styles.text}>
                        Personal Details
                    </Text>

                      <TouchableOpacity
                        onPress={() => this.setState({ editName: !this.state.editName })}
                      >

                        <Text style={[styles.text, { color: mainColor }]}>
                          EDIT
                      </Text>

                      </TouchableOpacity>

                    </View>

                    <Text style={[styles.text, { color: '#a2a2a2', marginTop: height(1) }]}>
                      Name
                  </Text>

                    <TextInput
                      editable={this.state.editName}
                      onChangeText={(text) => this.setState({ name: text })}
                      value={this.state.name}
                      style={[styles.textinput, { width: width(70), borderBottomWidth: 0.5, paddingVertical: 0, paddingHorizontal: 0 }]}
                    />

                    <Text style={[styles.text, { color: '#a2a2a2', marginTop: height(1) }]}>
                      Email
                  </Text>

                    <TextInput
                      editable={false}
                      value={this.state.email}
                      style={[styles.textinput, { width: width(70), borderBottomWidth: 0.5, paddingVertical: 0, paddingHorizontal: 0 }]}
                    />

                    <Text style={[styles.text, { color: '#a2a2a2', marginTop: height(1) }]}>
                      Phone no
                  </Text>

                    <TextInput
                      editable={false}
                      value={this.state.phoneNo}
                      style={[styles.textinput, { width: width(70), borderBottomWidth: 0.5, paddingVertical: 0, paddingHorizontal: 0 }]}
                    />

                  </View>

                </View>

                <View style={{ justifyContent: 'flex-end' }}>

                  <View style={{
                    height: height(32), shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    marginTop: height(2), zIndex: 1, backgroundColor: '#fff', borderRadius: 15
                  }}>

                    <View style={{ width: width(85), marginTop: height(1), alignSelf: 'center' }}>

                      <Text style={styles.text}>
                        Password
                    </Text>

                      <Text style={[styles.text, { color: '#a2a2a2', marginTop: height(1) }]}>
                        Current Password
                  </Text>

                      <TextInput
                        style={[styles.textinput, { width: width(70), borderBottomWidth: 0.5, paddingVertical: 0, paddingHorizontal: 0 }]}
                      />

                      <Text style={[styles.text, { color: '#a2a2a2', marginTop: height(1) }]}>
                        New Password
                  </Text>

                      <TextInput
                        style={[styles.textinput, { width: width(70), borderBottomWidth: 0.5, paddingVertical: 0, paddingHorizontal: 0 }]}
                      />

                      <Text style={[styles.text, { color: '#a2a2a2', marginTop: height(1) }]}>
                        Confirm Password
                  </Text>

                      <TextInput
                        style={[styles.textinput, { width: width(70), borderBottomWidth: 0.5, paddingVertical: 0, paddingHorizontal: 0 }]}
                      />

                    </View>

                  </View>

                  <TouchableOpacity
                    style={{
                      height: height(6),
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,

                      elevation: 5, width: width(30), borderRadius: 20, position: 'absolute', zIndex: 10000,
                      alignSelf: 'center', justifyContent: 'center',
                      alignItems: 'center', backgroundColor: mainColor
                    }}>

                    <Text style={{ fontSize: totalSize(2.5), color: '#fff' }}>
                      OK
                   </Text>

                  </TouchableOpacity>

                  <View style={{ height: height(4) }} />

                </View>

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
  text: {
    fontSize: totalSize(2),
    fontWeight: 'bold'
  },
  textinput: {
    fontSize: totalSize(1.8)
  }
})