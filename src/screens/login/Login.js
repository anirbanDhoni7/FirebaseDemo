import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import { setStringValue } from '../../components/AsyncStorage';
import { ASYNCSTORAGE_PARAMETERS } from '../../components/Constants';
import CustomButton from '../../components/CustomButton';
import loginStyles, { appTheme } from './Styles';

const Login = props => {
  const [isErrorPopup, setIsErrorPopup] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const navigation = useNavigation();
  const login = async () => {
    if (username?.trim() == '') {
      usernameRef.current?.focus();
      setIsErrorPopup(true);
      setErrorMsg('Please enter username');
      return;
    }
    if (password?.trim() == '') {
      passwordRef.current?.focus();
      setIsErrorPopup(true);
      setErrorMsg('Please enter password');
      return;
    }

    await setStringValue(ASYNCSTORAGE_PARAMETERS.USERNAME, username);
    await setStringValue(ASYNCSTORAGE_PARAMETERS.PASSWORD, password);
    await setStringValue(ASYNCSTORAGE_PARAMETERS.LOGIN_STATUS, '1');
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {
            name: "Home"
          }
        ]
      })
    );
  }
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
        <Text style={loginStyles.welcomeText}>Welcome To React Native</Text>
        <View style={loginStyles.gap} />
        <View style={loginStyles.gap} />
        <View style={loginStyles.gap} />
        <View style={loginStyles.gap} />
        <TextInput
          placeholder='Username'
          value={username}
          ref={usernameRef}
          onChangeText={text => {
            setUsername(text);
            setIsErrorPopup(false);
          }}
          autoCapitalize={"none"}
          placeholderTextColor={'#808080'}
          style={loginStyles.textFieldStyle}
        />
        <View style={loginStyles.gap} />
        <TextInput
          placeholder='Password'
          value={password}
          ref={passwordRef}
          onChangeText={text => {
            setPassword(text);
            setIsErrorPopup(false);
          }}
          autoCapitalize={"none"}
          placeholderTextColor={'#808080'}
          style={loginStyles.textFieldStyle}
          secureTextEntry
        />
        {isErrorPopup && <View style={{ height: 20 }} />}
        {
          isErrorPopup && (username == '' || password == '') &&
          <Text style={loginStyles.erroMsg}>{errorMsg}</Text>
        }
        <View style={loginStyles.gap} />
        <CustomButton
          text={"LOGIN"}
          color={appTheme}
          fontSize={15}
          style={{ width: '100%' }}
          borderRadius={10}
          onPress={login}
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
