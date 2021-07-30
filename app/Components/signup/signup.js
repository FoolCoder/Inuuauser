import React, { Component, Fragment } from 'react'
import { View, ImageBackground, Text, TouchableOpacity, TextInput, Image, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import { height, width, totalSize } from 'react-native-dimension'

import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
import { LoginManager, AccessToken, LoginButton, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

import { mainColor } from '../../GlobleColor/GlobleColor'

import mail from '../../assets/mail.png'
import password from '../../assets/password.png'
import user from '../../assets/user.png'
import back from '../../assets/back.png'
import facebook from '../../assets/facebook.png'
import goole from '../../assets/google.png'
import sign from '../../assets/imageB.jpeg'

export default class signup extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      cpassword: ''
    }
  }

 

 passwordValidate = (password)=>{
if(password.length < 8){
  return false;
}else{
  return true
}
 }


  componentDidMount = () => {
    GoogleSignin.configure({
      //It is mandatory to call this method before attempting to call signIn()
      scopes: ['https://www.googleapis.com/auth/userinfo.profile'],
      // Repleace with your webClientId generated from Firebase console
      webClientId: '304029155739-f60g9jko5qufnsbi75pfb1oonmojri1a.apps.googleusercontent.com',
    });
  }

  signup = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (this.state.name && this.state.email && this.state.password && this.state.cpassword) {
      if (reg.test(this.state.email) === true) {
        
        var passwordValidate= this.passwordValidate(this.state.password);
        if(passwordValidate){
 

        if (this.state.password == this.state.cpassword) {
          this.props.navigation.navigate('signupPC',
            {
              data: {
                name: this.state.name, email: this.state.email.toLowerCase(),
                password: this.state.password, provider: 'local'
              }
            })
        }
        else {
          alert('Password not match')
        }
     
      }else{
        alert("Password length must be greater than 7 character")
      }
     
      }
      else {
        alert('Email invalid')
      }
    }
    else {
      alert('Please Fill all fields')
    }

  }

  facebook = async () => {

    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    const token = data.accessToken.toString()

    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id, name,email, first_name, last_name',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      { token, parameters: PROFILE_REQUEST_PARAMS },
      (error, result) => {
        if (error) {
          console.log('login info has error: ' + error);
        } else {
          console.log('result:', result);
          this.props.navigation.navigate('signupPC',
            {
              data: {
                name: result.name, email: result.email.toLowerCase(),
                password: result.id, provider: 'facebook'
              }
            })
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  }

  google = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        //Check if device has Google Play Services installed.
        //Always resolves to true on iOS.
        showPlayServicesUpdateDialog: true,
      });

      // const { idToken } = await GoogleSignin.signIn()
      // Create a Google credential with the token

      const userInfo = await GoogleSignin.signIn();

      if (!userInfo) {

      }
      else {
        this.props.navigation.navigate('signupPC', {
          data: {
            name: userInfo.user.name, email: userInfo.user.email.toLowerCase(),
            password: userInfo.user.id, provider: 'google'
          }
        })
        await GoogleSignin.signOut()
      };
    } catch (error) {
      console.log('Message', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log('Some Other Error Happened');
      }
    }
  }

  render() {
    return (
      <Fragment>
        <SafeAreaView
          style={(styles.container, { backgroundColor: '#2ca0df' })}
        />
        <SafeAreaView style={styles.container}>

          <ScrollView>

            <ImageBackground style={{ flex: 1 }}
            // source={sign}
            >

              <View style={{ width: width(90), alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: height(3) }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}
                  style={{ width: width(10) }}
                >
                  <Image
                    style={{ height: 25, width: 25 }}
                    source={back}
                  />
                </TouchableOpacity>

                <Text style={{ fontSize: totalSize(3.2) }}>
                  Create an Account
              </Text>

                <View style={{ width: width(10) }}></View>

              </View>

              <View style={{ height: height(8), width: width(85), marginTop: height(4), justifyContent: 'center', borderWidth: 1, borderColor: '#000', backgroundColor: '#ffffff', alignSelf: 'center' }}>

                <View style={{ width: width(80), flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center' }}>

                  <Image style={{ height: 25, width: 25, alignSelf: 'center' }}
                    source={user}
                  />

                  <TextInput
                    placeholder='Full Name'
                    placeholderTextColor='#555'
                    onChangeText={(name) => this.setState({ name: name })}
                    style={{ fontSize: totalSize(2.5), width: width(70) }}
                  />

                </View>

              </View>

              <View style={{ height: height(8), width: width(85), marginTop: height(3), justifyContent: 'center', borderWidth: 1, borderColor: '#000', backgroundColor: '#ffffff', alignSelf: 'center' }}>

                <View style={{ width: width(80), flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center' }}>

                  <Image style={{ height: 25, width: 25, alignSelf: 'center' }}
                    source={mail}
                  />

                  <TextInput
                    placeholder='Email'
                    placeholderTextColor='#555'
                    onChangeText={(email) => this.setState({ email: email })}
                    style={{ fontSize: totalSize(2.5), width: width(70) }}
                  />

                </View>

              </View>

              <View style={{ height: height(8), width: width(85), marginTop: height(3), justifyContent: 'center', borderWidth: 1, borderColor: '#000', backgroundColor: '#ffffff', alignSelf: 'center' }}>

                <View style={{ width: width(80), flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center' }}>

                  <Image style={{ height: 25, width: 25, alignSelf: 'center' }}
                    source={password}
                  />

                  <TextInput
                    placeholder='Password'
                    placeholderTextColor='#555'
                    secureTextEntry
                    onChangeText={(password) => this.setState({ password: password })}
                    style={{ fontSize: totalSize(2.5), width: width(70) }}
                  />

                </View>

              </View>

              <View style={{ height: height(8), width: width(85), marginTop: height(3), justifyContent: 'center', borderWidth: 1, borderColor: '#000', backgroundColor: '#ffffff', alignSelf: 'center' }}>

                <View style={{ width: width(80), flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center' }}>

                  <Image style={{ height: 25, width: 25, alignSelf: 'center' }}
                    source={password}
                  />

                  <TextInput
                    placeholder='Confirm Password'
                    placeholderTextColor='#555'
                    secureTextEntry
                    onChangeText={(cpassword) => this.setState({ cpassword: cpassword })}
                    style={{ fontSize: totalSize(2.5), width: width(70) }}
                  />

                </View>

              </View>

              <Text style={{ marginTop: height(2), alignSelf: 'center' }}>
                By creating an account you agree to you
            </Text>

              <Text style={{ alignSelf: 'center' }}>
                Terms of Service and Privacy Policy
            </Text>

              <TouchableOpacity
                onPress={() => this.signup()}
                style={{ height: height(7), width: width(60), marginTop: height(2), borderRadius: 50, justifyContent: 'center', alignSelf: 'center', backgroundColor: mainColor }}>
                <Text style={{ fontSize: totalSize(3), alignSelf: 'center', color: '#ffffff' }}>
                  Signup
              </Text>
              </TouchableOpacity>

              <Text style={{ fontSize: totalSize(2), marginTop: height(2), alignSelf: 'center' }}>
                OR
            </Text>


              <View style={{ width: width(22), marginTop: height(2), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>

                <TouchableOpacity
                  onPress={() => this.facebook()}
                  style={{ height: 35, width: 35, borderRadius: 17.5, backgroundColor: '#428ff3', justifyContent: 'center' }}
                >
                  <Image
                    style={{ height: 15, width: 15, alignSelf: 'center' }}
                    source={facebook}
                  />

                </TouchableOpacity>

                <View style={{ width: width(10) }} />

                <TouchableOpacity
                  onPress={() => this.google()}
                  style={{ height: 35, width: 35, borderRadius: 17.5, backgroundColor: '#e2251f', justifyContent: 'center' }}
                >
                  <Image
                    style={{ height: 20, width: 20, alignSelf: 'center' }}
                    source={goole}
                  />

                </TouchableOpacity>
              </View>

            </ImageBackground>

          </ScrollView>

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