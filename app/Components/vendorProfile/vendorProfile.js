import React, { Component, Fragment, useEffect } from 'react'
import { View, ImageBackground, Text, TouchableOpacity, Dimensions, Modal, TextInput, Image, ScrollView, SafeAreaView, StyleSheet, FlatList } from 'react-native'
import { height, width, totalSize } from 'react-native-dimension'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { WebView } from 'react-native-webview';

import AsyncStorage from '@react-native-community/async-storage'

import { vendors, link } from '../../links/links'
import { mainColor } from '../../GlobleColor/GlobleColor'

import StarRating from 'react-native-star-rating';

import foodR from '../../assets/foodrating.jpeg'
import foodbg from '../../assets/foodbackground.jpg'

import HGR from '../../assets/HGR.png'
import HGR1 from '../../assets/HGR1.png'
import HGR2 from '../../assets/HGR2.png'
import HGR3 from '../../assets/HGR3.png'
import HGR4 from '../../assets/HGR4.png'
import HGR5 from '../../assets/HGR5.png'
import instagram from '../../assets/instagram.png'

const initialLayout = { width: Dimensions.get('window').width }

export default class Vendorprofile extends Component {
  constructor() {
    super()
    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: 'Detail' },
        { key: 'second', title: 'Food Hygine Rating' },
        { key: 'third', title: 'Reviews' },
      ],
      banner: '',
      instagramPage: false
    }
  }


  componentDidMount = () => {
    try {

      let data = this.props.navigation.getParam('data')

      // console.log(data)

      this.setState({
        banner: data.banner,
      })

    }
    catch (e) {
      console.log(e)
    }

  }

  renderScene = SceneMap({
    first: Details,
    second: FHR,
    third: Reviews
  })

  _renderTabBar = props => {
    return (
      <TabBar
        {...props}
        renderLabel={({ route, focused }) => (
          <View style={{ marginHorizontal: width(5), alignItems: 'center' }}>
            <Text
              numberOfLines={1}
              style={{ fontSize: totalSize(2.1) }}>
              {route.title}
            </Text>
          </View>
        )}
        labelStyle={{ color: '#000' }}
        indicatorStyle={{ backgroundColor: '#000' }}
        style={{ backgroundColor: '#fff' }}
        tabStyle={{ width: 'auto' }}
        scrollEnabled
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


            <ImageBackground
              source={{ uri: link + this.state.banner }}
              style={{ height: height(35), width: '100%' }}
            >

              <View style={{ flex: 1, backgroundColor: '#00000075' }}>

                <View style={{ marginTop: height(3), width: '95%', flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-between', alignItems: 'center' }}>

                  <TouchableOpacity
                    onPress={() => this.props.navigation.goBack()}
                  >

                    <MaterialIcons name='arrow-back' size={30} color='#ffffff' />
                  </TouchableOpacity>

                  <TouchableOpacity
                  >

                    <Text style={{ fontSize: totalSize(2.5), fontWeight: 'bold', color: '#ffffff' }}>
                      Profile
                   </Text>

                  </TouchableOpacity>

                  <View style={{ height: 30, width: 30 }}>

                  </View>

                </View>

                <View style={{ height: height(35), width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>

                  <Text style={{ fontSize: totalSize(2.5), color: '#fff' }}>
                    {this.props.navigation.getParam('data').name}
                  </Text>

                  <TouchableOpacity
                    style={{ marginTop: height(2) }}
                    onPress={() => this.setState({ instagramPage: true })}
                  >

                    <Image
                      source={instagram}
                      style={{ height: height(6), width: width(40), resizeMode: 'center' }}
                    />

                  </TouchableOpacity>

                </View>

              </View>

            </ImageBackground>

            <TabView
              navigationState={this.state}
              renderScene={this.renderScene}
              onIndexChange={(index) => this.setState({ index: index })}
              initialLayout={initialLayout}
              renderTabBar={this._renderTabBar}
            />

            <Modal
              visible={this.state.instagramPage}
              onRequestClose={() => this.setState({ instagramPage: false })}
            >
              <WebView
                source={{ uri: 'https://www.instagram.com/love_food/?hl=en' }}
              // onMessage={this.onMessage}
              // onNavigationStateChange={data =>
              //   this.handleResponse(data)
              // }
              // injectedJavaScript={`document.f1.submit()`}
              />
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
  }
})

class Details extends Component {
  constructor() {
    super()
    this.state = {
      image: '',
      height: '',
      width: '',
      length: '',
      VendorP: {},
    }
  }

  componentDidMount = async () => {
    try {

      let data = JSON.parse(await AsyncStorage.getItem('PD'))

      // console.log(data)

      this.setState({
        image: data.image,
        height: data.dimension.height,
        width: data.dimension.width,
        length: data.dimension.length,
        VendorP: data,
      })

    }
    catch (e) {
      console.log(e)
    }

  }

  render() {

    return (

      <ScrollView style={{ flex: 1, backgroundColor: '#f1eff0' }}>


        <Text style={{ fontSize: totalSize(3), marginTop: height(3), alignSelf: 'center', fontWeight: 'bold' }}>
          Details
     </Text>

        <View style={{ width: width(95), marginTop: height(2), alignSelf: 'center', backgroundColor: '#fff', borderRadius: 15 }}>

          <View style={{ marginTop: height(2), width: width(95), alignItems: 'center' }}>

            <View style={{ width: width(85), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

              <Text style={{ fontSize: totalSize(2.2), fontWeight: 'bold' }}>
                Food type
               </Text>

              <Text style={{ fontSize: totalSize(2.2), width: width(25) }}>
                {this.state.VendorP.foodType}
              </Text>

            </View>

            <View style={{ height: height(2), width: width(95), borderBottomWidth: 1, borderColor: '#00000050' }} />

          </View>

          <View style={{ marginTop: height(2), width: width(95), alignItems: 'center' }}>

            <View style={{ width: width(85), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

              <Text style={{ fontSize: totalSize(2.2), fontWeight: 'bold' }}>
                Vendor Name
               </Text>

              <Text style={{ fontSize: totalSize(2.2), width: width(25) }}>
                {this.state.VendorP.name}
              </Text>

            </View>

            <View style={{ height: height(2), width: width(95), borderBottomWidth: 1, borderColor: '#00000050' }} />

          </View>

          <View style={{ marginTop: height(2), width: width(95), alignItems: 'center' }}>

            <View style={{ width: width(85), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

              <Text style={{ fontSize: totalSize(2.2), fontWeight: 'bold' }}>
                Setup
               </Text>

              <Text style={{ fontSize: totalSize(2.2), width: width(25) }}>
                {this.state.VendorP.setUp}
              </Text>

            </View>

            <View style={{ height: height(2), width: width(95), borderBottomWidth: 1, borderColor: '#00000050' }} />

          </View>

          <View style={{ marginTop: height(2), width: width(95), alignItems: 'center' }}>

            <View style={{ width: width(85), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

              <Text style={{ fontSize: totalSize(2.2), fontWeight: 'bold' }}>
                Food Packaging
               </Text>

              <Text style={{ fontSize: totalSize(2.2), width: width(25) }}>
                {this.state.VendorP.foodPackaging}
              </Text>

            </View>

            <View style={{ height: height(2), width: width(95), borderBottomWidth: 1, borderColor: '#00000050' }} />

          </View>

          <View style={{ marginTop: height(2), width: width(95), alignItems: 'center' }}>

            <View style={{ width: width(85), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

              <Text style={{ fontSize: totalSize(2.2), fontWeight: 'bold' }}>
                Weight
               </Text>

              <Text style={{ fontSize: totalSize(2.2), width: width(25) }}>
                {this.state.VendorP.weight}
              </Text>

            </View>

            <View style={{ height: height(2), width: width(95), borderBottomWidth: 1, borderColor: '#00000050' }} />

          </View>

          <View style={{ marginTop: height(2), width: width(95), alignItems: 'center' }}>

            <View style={{ width: width(85), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

              <Text style={{ fontSize: totalSize(2.2), fontWeight: 'bold' }}>
                Power Requirement
               </Text>

              <Text style={{ fontSize: totalSize(2.2), width: width(25) }}>
                {this.state.VendorP.powerRequirement}
              </Text>

            </View>

            <View style={{ height: height(2), width: width(95), borderBottomWidth: 1, borderColor: '#00000050' }} />

          </View>

          <View style={{ marginTop: height(2), width: width(95), alignItems: 'center' }}>

            <View style={{ width: width(85), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

              <Text style={{ fontSize: totalSize(2.2), fontWeight: 'bold' }}>
                Dimension
               </Text>

              <Text style={{ fontSize: totalSize(2.2), width: width(25) }}>
                {this.state.height} X {this.state.width} X {this.state.length}
              </Text>

            </View>

            {/* <View style={{ height: height(2), width: width(95), borderBottomWidth: 1, borderColor: '#00000050' }} /> */}

          </View>

          {/* <View style={{ marginTop: height(2), width: width(95), alignItems: 'center' }}>

            <View style={{ width: width(85), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

              <Text style={{ fontSize: totalSize(2.2), fontWeight: 'bold' }}>
                phone
            </Text>

              <Text style={{ fontSize: totalSize(2.2), width: width(25) }}>
                {this.state.VendorP.phone}
              </Text>

            </View>

            <View style={{ height: height(2), width: width(95), borderBottomWidth: 1, borderColor: '#00000050' }} />

          </View> */}

        </View>

        <View style={{ height: height(3) }} />

      </ScrollView>

    )
  }
}

class FHR extends Component {
  constructor() {
    super()
    this.state = {
      FHR: ''
    }
  }

  componentDidMount = async () => {
    try {

      let data = JSON.parse(await AsyncStorage.getItem('PD'))

      // console.log(data)

      let FHR = ''

      if (data.hygieneRating == 0) { FHR = HGR }
      else if (data.hygieneRating == 1) { FHR = HGR1 }
      else if (data.hygieneRating == 2) { FHR = HGR2 }
      else if (data.hygieneRating == 3) { FHR = HGR3 }
      else if (data.hygieneRating == 4) { FHR = HGR4 }
      else { FHR = HGR5 }

      this.setState({
        FHR: FHR
      })

    }
    catch (e) {
      console.log(e)
    }
  }


  render() {
    return (

      <ScrollView style={{ flex: 1, backgroundColor: '#f1eff0' }}>

        <Text style={{ fontSize: totalSize(3), marginTop: height(3), alignSelf: 'center', fontWeight: 'bold' }}>
          Food Hygiene Rating
      </Text>

        <View style={{
          height: height(45), shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5, width: width(95), marginTop: height(3), alignSelf: 'center', backgroundColor: '#fff', borderRadius: 15
        }}>

          <Image
            source={this.state.FHR}
            style={{ height: height(30), width: width(95), borderRadius: 15 }}
          />

          <Text style={{ fontSize: totalSize(2), width: width(70), marginTop: height(3), alignSelf: 'center' }}>

            This rating is based on official standard of food Authority.All terms and Condition Applies

          </Text>

        </View>

        <View style={{ height: height(3) }} />

      </ScrollView>
    )
  }

}

class Reviews extends Component {
  constructor() {
    super()
    this.state = {
      reviews: [],
    }
  }

  componentDidMount = async () => {
    try {

      let data = JSON.parse(await AsyncStorage.getItem('PD'))

      fetch(link + 'order/getReviewsByVendor?vendorId=' + data._id)
        .then((response) => response.json())
        .then(async (responseJson) => {
          // console.log(responseJson.result)
          let data = responseJson.result
          let array = []
          data.map(e => {
            let review = {
              name: e.customer.name, description: e.review.description,
              rating: e.review.rating
            }
            array.push(review)
          })
          // console.log(array.length)
          this.setState({
            reviews: array
          })
        })
    }
    catch (e) {
      console.log(e)
    }

  }

  _Flatlist = ({ item, index }) => {
    return (

      <View style={index == 0 ?
        { maxheight: height(30), minHeight: height(10), width: '100%', justifyContent: 'center' }
        :
        { maxheight: height(30), minHeight: height(10), width: '100%', borderTopWidth: 1, justifyContent: 'center' }
      }>

        <View style={{ width: '95%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>

          <View>

            <Text style={{ fontSize: totalSize(2.2), fontWeight: 'bold' }}>
              {item.name}
            </Text>

            <Text style={{ fontSize: totalSize(2) }}>
              {item.description}
            </Text>

          </View>

          <StarRating
            containerStyle={{ marginStart: width(2) }}
            fullStarColor='#0fa4ec'
            emptyStar={'star'}
            maxStars={5}
            rating={item.rating}
            starSize={15}
            disabled={true}
          />

        </View>

      </View>

    )
  }

  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#f1eff0' }}>

        <Text style={{ fontSize: totalSize(3), marginTop: height(3), alignSelf: 'center', fontWeight: 'bold' }}>
          Reviews
      </Text>

        <FlatList
          style={{
            marginTop: height(3), shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5, width: width(95), flexGrow: 0, alignSelf: 'center', backgroundColor: '#fff', borderRadius: 10
          }}
          keyExtractor={(item, index) => { return index.toString() }}
          data={this.state.reviews}
          nestedScrollEnabled={true}
          renderItem={this._Flatlist}
          nestedScrollEnabled={true}
        />

        <View style={{ height: height(3) }} />

      </ScrollView>
    )
  }
}