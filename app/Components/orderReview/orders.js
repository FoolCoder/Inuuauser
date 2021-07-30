import React, { Component, Fragment } from 'react'
import { View, ImageBackground, Text, TouchableOpacity, TextInput, Image, SafeAreaView, FlatList, StyleSheet, Dimensions } from 'react-native'
import { height, width, totalSize } from 'react-native-dimension'

import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import { mainColor } from '../../GlobleColor/GlobleColor'
import orderReview from './orderReviews'
import activeorders from './activeorders'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


const initialLayout = { width: Dimensions.get('window').width };

export default class orders extends Component {
  constructor() {
    super()
    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: 'Active' },
        { key: 'second', title: 'past' },
      ]
    }
  }

  // componentDidMount=()=>{
  //   try{
  //     console.log(this.props)
  //   }
  //   catch(e){
  //     console.log(e)
  //   }
  // }

  renderScene = SceneMap({
    first: activeorders,
    second: orderReview
  })

  _renderTabBar = props => {
    return (
      <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: '#ffffff' }}
        style={{ backgroundColor: mainColor }}
      />
    );
  };

  render() {
    return (
      <Fragment>

        <SafeAreaView style={{ flex: 1 }}>

          <View style={{ flex: 1 }}>

            <View style={{ height: height(7), width: '100%', backgroundColor: mainColor }}>

              <View style={{ marginTop: height(3), width: width(95), flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-between', alignItems: 'center' }}>

                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('home')}
                >

                  <MaterialIcons name='arrow-back' size={30} color='#ffffff' />
                </TouchableOpacity>

                <TouchableOpacity
                >

                  <Text style={{ fontSize: totalSize(2.5), fontWeight: 'bold', color: '#ffffff' }}>
                    Order
                 </Text>

                </TouchableOpacity>

                <View style={{ height: 30, width: 30 }}>

                </View>

              </View>

            </View>


            <TabView
              navigationState={this.state}
              renderScene={this.renderScene}
              onIndexChange={(index) => this.setState({ index: index })}
              initialLayout={initialLayout}
              renderTabBar={this._renderTabBar}
            />

          </View>

        </SafeAreaView>

      </Fragment>


    )
  }
}