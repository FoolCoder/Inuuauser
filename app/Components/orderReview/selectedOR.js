import React, { Component, Fragment } from 'react'
import { View, ImageBackground, Text, TouchableOpacity, TextInput, Image, SafeAreaView, ScrollView, FlatList, StyleSheet, Alert } from 'react-native'
import { height, width, totalSize } from 'react-native-dimension'
import moment from 'moment-timezone'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import StarRating from 'react-native-star-rating';

import { link } from '../../links/links'
import { mainColor } from '../../GlobleColor/GlobleColor'
import fbg from '../../assets/foodbackground.jpg'

export default class postReview extends Component {
  constructor() {
    super()
    this.state = {
      orderid: '',
      total: 20,
      rating: 0,
      review: '',
      orderReview: { vendorN: 'Round House Pizza', food: 'New year new me,Ranch,Burger' }
    }
  }

  componentDidMount = () => {
    try {

      // console.log(this.props.data)
      this.state.orderReview.vendorN = this.props.data.vendor.name
      this.state.orderReview.food = this.props.data.food

      this.setState({
        orderReview: this.state.orderReview,
        total: this.props.data.total,
        orderid: this.props.data._id
      })

      try {
        this.setState({
          rating: this.props.data.review.rating,
          review: this.props.data.review.description
        })
      }
      catch (e) {
        console.log(e)
      }
    }
    catch (e) {
      console.log(e)
    }

  }

  pReview = () => {

    if (this.state.rating > 0) {
      var data = {
        orderId: this.state.orderid,
        rating: this.state.rating,
        review: this.state.review
      }


      try {
        fetch(link + 'order/review', {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then((response) => response.json())
          .then((response) => {
            Alert.alert(
              'Review',
              'Review post successfully'
            )
          })
          .catch((e) => {
            console.log(e)
            Alert.alert(
              'Network',
              'Something went wrong'
            )
          })
      }
      catch (e) {
        console.log(e)
      }

    }
    else {
      Alert.alert(
        'Review',
        'Please fill rating'
      )
    }

  }

  render() {
    return (
      <Fragment>

        <SafeAreaView style={{ flex: 1 }}>

          <ScrollView style={{ flex: 1 }}>

            <View style={{ height: height(10), width: '100%', borderBottomRightRadius: 10, borderBottomLeftRadius: 10, backgroundColor: mainColor }}>

              <View style={{ marginTop: height(5), width: width(95), flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-between', alignItems: 'center' }}>

                <TouchableOpacity
                  onPress={this.props.back}
                >

                  <MaterialIcons name='arrow-back' size={30} color='#ffffff' />
                </TouchableOpacity>

                <TouchableOpacity
                >

                  <Text style={{ fontSize: totalSize(2.5), fontWeight: 'bold', color: '#ffffff' }}>
                    Order Reviews
                 </Text>

                </TouchableOpacity>

                <View style={{ height: 30, width: 30 }}>

                </View>

              </View>

            </View>

            <ImageBackground style={{ height: height(25), width: '100%' }}
              source={fbg}
            />

            <View style={{
              height: height(10),
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.20,
              shadowRadius: 1.41,

              elevation: 2, width: width(95), marginTop: height(1), alignSelf: 'center', justifyContent: 'center', backgroundColor: '#fff', borderRadius: 5
            }}>

              <View style={{ width: width(90), alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>

                <View>

                  <Text style={{ fontSize: totalSize(2), fontWeight: 'bold' }}>

                    {this.state.orderReview.vendorN}

                  </Text>

                  <Text style={{ fontSize: totalSize(1.5) }}>

                    {this.state.orderReview.food}

                  </Text>

                </View>

                <StarRating
                  fullStarColor='#f7b851'
                  emptyStar={'star'}
                  maxStars={5}
                  rating={this.state.rating}
                  starSize={20}
                  selectedStar={(rate) => this.setState({ rating: rate })}
                />

              </View>

            </View>

            <View style={{
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.20,
              shadowRadius: 1.41,

              elevation: 2, width: width(95), marginTop: height(2), alignSelf: 'center', backgroundColor: '#fff', justifyContent: 'center', borderRadius: 5
            }}>

              <TextInput
                onChangeText={(text) => this.setState({ review: text })}
                style={{ maxHeight: height(10), width: width(90), alignSelf: 'center' }}
                multiline={true}
                value={this.state.review}
                placeholder='Describe your experience'
              />

            </View>

            <View style={{
              height: height(10), shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.20,
              shadowRadius: 1.41,

              elevation: 2, width: width(95), marginTop: height(2), alignSelf: 'center', justifyContent: 'center', backgroundColor: '#fff', borderRadius: 5
            }}>

              <View style={{ width: width(90), alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                <Text style={{ fontSize: totalSize(1.7) }}>
                  Sub total
                </Text>

                <Text style={{ fontSize: totalSize(1.7) }}>
                  £{this.state.total.toFixed(2)}
                </Text>

              </View>



              <View style={{ width: width(90), marginTop: height(2), alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                <Text style={{ fontSize: totalSize(1.7) }}>
                  total
                </Text>

                <Text style={{ fontSize: totalSize(1.7) }}>
                  £{this.state.total.toFixed(2)}
                </Text>

              </View>

            </View>

            <TouchableOpacity
              delayPressIn={0}
              onPress={() => this.pReview()}

              style={{ height: height(7), width: width(60), marginTop: height(7), alignSelf: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: mainColor, borderRadius: 10 }}
            >

              <Text style={{ fontSize: totalSize(2.5), color: '#fff' }}>
                Post Review
              </Text>

            </TouchableOpacity>

          </ScrollView>

        </SafeAreaView>

      </Fragment>


    )
  }
}