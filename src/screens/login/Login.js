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
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Login = props => {
  const [authenticated, setAuthenticated] = useState(false);
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
  const authenticate = async () => {

    const rnBiometrics = new ReactNativeBiometrics();
    let resultObject = await rnBiometrics.simplePrompt({ promptMessage: 'Confirm Fingerprint' });
    if (resultObject?.success) {
      setAuthenticated(true);
    }
    // TouchID.authenticate('RNAuthentication requires your fingerprint for verification ', optionalConfigObject)
    //   .then((success) => {
    //     if (success) {
    //       alert("Authenticated");
    //     }

    //   })
    //   .catch((error) => {

    //   });
  };
  useEffect(() => {
    setTimeout(() => {
      setAuthenticated(false);
    }, 3000);
  }, [authenticated]);
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
        {
          authenticated ?
            <View
              style={loginStyles.authenticationSuccessfulContainerStyle}
            >
              <Ionicons
                name='checkmark-circle'
                color={'#008000'}
                size={50}
              />
              <Text style={loginStyles.authSuccessfulTextStyle}>Successfully Authenticated</Text>
            </View>
            : 
            <CustomButton
              text={"AUTHENTICATE"}
              color={appTheme}
              fontSize={15}
              style={{ width: '100%' }}
              borderRadius={10}
              onPress={authenticate}
            />
        }
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
