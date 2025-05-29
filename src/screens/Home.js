import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Linking,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../components/Header';
import HeadingTitleComponent from '../components/HeadingTitleComponent';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import CountryPicker from 'react-native-country-picker-modal';
import { CommonActions } from '@react-navigation/native';
import { setStringValue } from '../components/AsyncStorage';

export default class Home extends React.Component {
  state = {
    content: [],
    isLoading: false,
    mobile: '',
    isErrorPopup: false,
    openCountryPicker: false,
    selectedCountry: {"callingCode": ["1"], "cca2": "CA", "currency": ["CAD"], "flag": "flag-ca", "name": "Canada", "region": "Americas", "subregion": "North America"}, 
    errorMsg: '', 
    otp: '',
    otpSendResult: {}
  };

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.setState({
        content: [],
        mobile: '',
        isLoading: false,
        isErrorPopup: false,
        openCountryPicker: false,
        otpSendResult: {},
        selectedCountry: {"callingCode": ["1"], "cca2": "CA", "currency": ["CAD"], "flag": "flag-ca", "name": "Canada", "region": "Americas", "subregion": "North America"}, 
        errorMsg: '', 
        otp: ''
      })
    });
  }
  render = () => (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Header
        title={"Sign In Screen"}
        disabled
      />
      <ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={true}
      >
        <View style={{height: 20}} />
        <View
          style={{
              flex: 1,
              flexDirection: 'row',
              paddingHorizontal: 20
          }}
      >
          <CountryPicker
              countryCode={this.state.selectedCountry.cca2}
              withCallingCode={this.state.selectedCountry.callingCode[0]}
              withFlagButton={false}
              withFlag={true}
              containerButtonStyle={{
                  paddingVertical: 12,
                  borderColor: '#000',
                  paddingHorizontal: 10,
                  borderWidth: 1,
                  borderRadius: 10
              }}
              theme={{
                  onBackgroundTextColor: '#808080',
                  fontSize: 23
              }}
              withFilter={false}
              withCallingCodeButton={true}
              withCountryNameButton={false}
              onSelect={country =>{
                  this.setState({selectedCountry: country})
              }}
              visible={this.state.openCountryPicker}
          />
          <Text
          style={{
              fontSize: 24,
              color: '#808080',
              paddingVertical: 12
          }}> - </Text>
          <TextInput
              placeholder='Enter Mobile Number'
              keyboardType='phone-pad'
              value={this.state.mobile}
              onChangeText={text => this.setState({mobile: text})}
              placeholderTextColor={'#808080'}
              style={{
                  width: '80%',
                  fontSize: 24,
                  color:'#808080',
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: '#000'
              }}
          />
      </View>
        {
          Object.keys(this.state.otpSendResult).length > 0 &&
          <TextInput
            placeholder='Enter OTP'
            keyboardType='phone-pad'
            value={this.state.otp}
            onChangeText={text => this.setState({otp: text})}
            placeholderTextColor={'#808080'}
            style={{
                width: '90%',
                fontSize: 24,
                color:'#808080',
                margin: 20,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: '#000'
            }}
          />
        }
        {this.state.isErrorPopup && <View style={{height: 20}} />}
        {
          this.state.isErrorPopup &&
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              marginHorizontal: 20,
              backgroundColor: '#ff0000',
              borderRadius: 10,
            }}
          >

            <HeadingTitleComponent
              iconType={'alert-circle-outline'}
              pointIconColor="#fff"
              iconSize={25}
              fontSize={16}
              fontColor="#fff"
              headingTitle={this.state.errorMsg}
            />
          </View>
        }
        <View style={{height: 20}} />
        <CustomButton
          text={Object.keys(this.state.otpSendResult).length > 0 ? "Sign In" : "Get OTP"}
          color={"#0095ba"}
          fontSize={15}
          isLoading={this.state.isLoading}
          style={{width: '95%'}}
          borderRadius={10}
          onPress={() => undefined}
        />
        <View style={{height: 100}} />
      </ScrollView>
    </SafeAreaView>
  );
}
