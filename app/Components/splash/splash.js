import React, { Component, Fragment } from 'react'
import { View, ImageBackground, Text, SafeAreaView, Alert, StyleSheet, StatusBar } from 'react-native'
import { height, width, totalSize } from 'react-native-dimension'
import messaging from '@react-native-firebase/messaging'

import AsyncStorage from '@react-native-community/async-storage'

import splas from '../../assets/innuasplash.jpeg'

import { mainColor } from '../../GlobleColor/GlobleColor'

export default class splash extends Component {

  componentDidMount = async () => {

    const val = await AsyncStorage.getItem('details')

    if (val == null) {

      setTimeout(() => {
        this.props.navigation.navigate('login')
      }, 3000);

    }
    else {

      setTimeout(() => {
        this.props.navigation.navigate('home')
      }, 3000);

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
          <ImageBackground style={{ flex: 1 }} source={splas}>
            {/* <TouchableOpacity style={{ marginTop: height(22), height: height(40), width: width(60), alignSelf: 'center' }}
            //onPress={()=>alert('ture')}
            >

            </TouchableOpacity> */}
            <Text style={{
              textAlign: 'center',
              alignSelf: 'center',
              marginTop: height(62),
              fontSize: totalSize(3),
              color: '#fff'
            }}>
              Find & Pick Up Street Food

            </Text>
          </ImageBackground>
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