import React, { Component, Fragment } from 'react'
import { View, ImageBackground, Text, TouchableOpacity, TextInput, Image, SafeAreaView, StyleSheet, Dimensions } from 'react-native'
import { height, width, totalSize } from 'react-native-dimension'

import { TabView, SceneMap,TabBar } from 'react-native-tab-view';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import user from '../../assets/user.png'
import mail from '../../assets/mail.png'
import Icon from 'react-native-vector-icons/MaterialIcons';

const initialLayout = { width: Dimensions.get('window').width };

export default class splash extends Component {
  constructor() {
    super()
    this.state = {
      index: 0,
      routes:[
        { key: 'first',icon:<MaterialIcons name='menu' size={30} color='#ffffff'/> },
        { key: 'second',icon:<MaterialIcons name='home' size={30} color='#ffffff'/> },
        { key: 'third',icon: (<View style={{height:30,width:30,borderRadius:15,justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff'}}><Image style={{height:15,width:15}} source={user}/></View>) }
      ],
    }
  }

  renderScene=SceneMap({
    first:screen1,
    second:screen2,
    third:screen3
  })

  _renderIcon = ({ route, color }) => (
    route.icon
  );

  _renderTabBar = props => {
    return (
      <TabBar
        {...props}
        renderIcon={this._renderIcon}
        indicatorStyle={{backgroundColor:'#ffffff'}}
        style={{backgroundColor:'#099794',height:height(10)}}
        contentContainerStyle={{marginTop:height(3)}}
      />
    );
  };


  render() {
    return (
      <Fragment>
        <SafeAreaView
          style={(styles.container, { backgroundColor: '#2ca0df' })}
        />
        <SafeAreaView style={styles.container}>
          <View style={{ flex: 1 }}>

            <TabView
              navigationState={this.state}
              renderScene={this.renderScene}
              onIndexChange={(index)=>this.setState({index:index})}
              initialLayout={initialLayout}
              renderTabBar={this._renderTabBar}
            />
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

class screen1 extends Component {

  render(){
  return (
    <View style={{ flex: 1, backgroundColor: 'green' }}>

    </View>
  )
  }
}

class screen2 extends Component {
  render(){
  return (
    <View style={{ flex: 1, backgroundColor: 'red' }}>

    </View>
  )
  }
}
class screen3 extends Component {
  render(){
  return (
    <View style={{ flex: 1, backgroundColor: 'blue' }}>

    </View>
  )
  }
}