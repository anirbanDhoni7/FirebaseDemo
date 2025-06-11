import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StatusBar,
  Image,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Login from './src/screens/login/Login';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { appTheme } from './src/screens/login/Styles';

const Stack = createStackNavigator();

const App = props => {
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 3000);
  }, []);

  return (
    showSplash ?
      <>
        <StatusBar backgroundColor="#0095ba" />
        <Image
          source={require('./assets/rn-logo.png')}
          style={{
            flex: 1,
            width: Dimensions.get('window').width,
            height: (16 / 9) * Dimensions.get('window').width,
            resizeMode: 'repeat'
          }}
        />
      </>
      :
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"Login"}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        </Stack.Navigator> 
      </NavigationContainer>
  )
}

export default App;
