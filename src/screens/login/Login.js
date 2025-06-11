import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import CustomButton from '../../components/CustomButton';
import loginStyles, { appTheme } from './Styles';
import TouchID from 'react-native-touch-id';

const Login = props => {
  const [biometryType, setBiometryType] = useState('');
  const optionalConfigObject = {
    title: 'RNAuthentication',
    imageColor: '#B69377', // Android
    imageErrorColor: '#B69377',// Android
    sensorDescription: 'Touch Sensor', // Android
    sensorErrorDescription: 'Failed', // Android
    cancelText: 'Cancel', // Android
    fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
    unifiedErrors: false, // use unified error messages (default false)
    passcodeFallback: true // iOS: allows the device to fall back to using the passcode if faceid or touch is not available. This does not mean that if touchid or faceid fails the first few times, it will revert to a passcode; rather, if the former are not enrolled, then it will use the passcode.
  };
  const authenticate = () => {
    TouchID.authenticate('RNAuthentication requires your fingerprint for verification ', optionalConfigObject)
      .then((success) => {
        if (success) {
          alert("Authenticated");
        }

      })
      .catch((error) => {

      });
  };
  useEffect(() => {
    TouchID.isSupported(optionalConfigObject)
      .then(biometryType => {

        // Success code
        if (biometryType === 'FaceID') {
          setBiometryType('FaceID');
        } else {
          setBiometryType('TouchID');
        }
      })
      .catch(error => {
        // Failure code
        console.log(error);
      });
  }, []);
  return (
    <SafeAreaView style={loginStyles.container}>
      <StatusBar backgroundColor={appTheme} />
      <ScrollView
        style={loginStyles.scrollContainer}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={true}
      >
        <Image
          source={require('../../../assets/rn-logo.png')}
          style={loginStyles.logoStyle}
        />
        <View style={loginStyles.gap} />
        <Text style={loginStyles.welcomeText}>RNAuthentication</Text>
        <View style={loginStyles.gap} />
        <View style={loginStyles.gap} />
        <View style={loginStyles.gap} />
        <View style={loginStyles.gap} />
        <View style={loginStyles.gap} />
        <CustomButton
          text={"AUTHENTICATE"}
          color={appTheme}
          fontSize={15}
          style={{ width: '100%' }}
          borderRadius={10}
          onPress={authenticate}
        />
        <View style={loginStyles.gap} />
        <View style={loginStyles.gap} />
        <View style={loginStyles.gap} />
        <View style={loginStyles.gap} />
        <View style={loginStyles.gap} />
      </ScrollView>
    </SafeAreaView>
  )
};

export default Login;
