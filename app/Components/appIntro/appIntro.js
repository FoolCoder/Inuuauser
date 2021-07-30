import React, { Component, Fragment } from 'react'
import { View, ImageBackground, Text, TouchableOpacity, SafeAreaView, StyleSheet, StatusBar } from 'react-native'
import { height, width, totalSize } from 'react-native-dimension'
import { Pages } from 'react-native-pages'

import { mainColor } from '../../GlobleColor/GlobleColor'

import first from '../../assets/first.jpeg'
import second from '../../assets/second.jpeg'
import third from '../../assets/third.jpeg'

export default class splash extends Component {
  constructor() {
    super()
    this.state = {
      page: 0,
      back: first
    }
  }

  render() {
    return (
      <Fragment>
        <SafeAreaView
          style={(styles.container, { backgroundColor: '#2ca0df' })}
        />
        <SafeAreaView style={styles.container}>
          <StatusBar
            backgroundColor={mainColor}
          />
          <View style={{ flex: 1 }}>

            <Pages
              indicatorColor={mainColor}
            >
              <View style={{ flex: 1 }}>
                <ImageBackground style={{ flex: 1 }}
                  source={first}
                >

                  <View style={{ flex: 1, backgroundColor: '#00000075' }}>

                    <Text style={{ marginTop: height(40), fontSize: totalSize(5), fontWeight: 'bold', alignSelf: 'center', color: mainColor }}>
                      LOGIN
                </Text>

                    <Text style={{ marginTop: height(2), alignSelf: 'center', color: mainColor }}>
                      Ioream iosum jnsdlkac jlnkca xIkbnm
                </Text>

                    <Text style={{ marginTop: height(2), alignSelf: 'center', color: mainColor }}>
                      Ijnucanlx iknlak xljanka slx a
                </Text>



                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate('login')}
                      style={{ marginTop: height(30), width: width(10), alignSelf: 'center' }}>
                      <Text style={{ fontSize: totalSize(2.2), color: '#ffffff', alignSelf: 'center' }}>
                        Skip
              </Text>
                    </TouchableOpacity>

                  </View>

                </ImageBackground>


              </View>
              <View style={{ flex: 1 }}>

                <ImageBackground style={{ flex: 1 }}
                  source={second}
                >

                  <View style={{ flex: 1, backgroundColor: '#00000075' }}>

                    <Text style={{ marginTop: height(40), fontSize: totalSize(5), fontWeight: 'bold', alignSelf: 'center', color: '#59e1e8' }}>
                      ORDER
                </Text>

                    <Text style={{ marginTop: height(2), alignSelf: 'center', color: '#59e1e8' }}>
                      Ioream iosum jnsdlkac jlnkca xIkbnm
                </Text>

                    <Text style={{ marginTop: height(2), alignSelf: 'center', color: '#59e1e8' }}>
                      Ijnucanlx iknlak xljanka slx a
                </Text>



                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate('login')}
                      style={{ marginTop: height(30), width: width(10), alignSelf: 'center' }}>
                      <Text style={{ fontSize: totalSize(2.2), color: '#ffffff', alignSelf: 'center' }}>
                        Skip
              </Text>
                    </TouchableOpacity>

                  </View>

                </ImageBackground>

              </View>

              <View style={{ flex: 1 }}>

                <ImageBackground style={{ flex: 1 }}
                  source={third}
                >

                  <View style={{ flex: 1, backgroundColor: '#00000075' }}>

                    <Text style={{ marginTop: height(40), fontSize: totalSize(5), fontWeight: 'bold', alignSelf: 'center', color: '#59e1e8' }}>
                      ENJOY
                </Text>

                    <Text style={{ marginTop: height(2), alignSelf: 'center', color: '#59e1e8' }}>
                      Ioream iosum jnsdlkac jlnkca xIkbnm
                </Text>

                    <Text style={{ marginTop: height(2), alignSelf: 'center', color: '#59e1e8' }}>
                      Ijnucanlx iknlak xljanka slx a
                </Text>


                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate('login')}
                      style={{ marginTop: height(30), width: width(10), alignSelf: 'center' }}>
                      <Text style={{ fontSize: totalSize(2.2), color: '#ffffff', alignSelf: 'center' }}>
                        Skip
              </Text>
                    </TouchableOpacity>

                  </View>

                </ImageBackground>

              </View>

            </Pages>

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