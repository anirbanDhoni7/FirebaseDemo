import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
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
import Home from './src/screens/Home';
import SplashScreen from 'react-native-splash-screen';
import { getMyStringValue, setStringValue } from './src/components/AsyncStorage';
import WebViewComponent from './src/components/WebViewComponent';
import Products from './src/screens/Products';
import Firebase from '@react-native-firebase/app';

const Stack = createStackNavigator();

export default class App extends React.Component {
  state = {
    content: [],
    isLoading: false,
    showSplash: true,
    isLoggedIn: false
  };
  async componentDidMount() {
    SplashScreen.hide();
    getMyStringValue('loginStatus').then(r => {
      console.log(r);
      let isLoggedIn = JSON.parse(r).login;
      this.setState({isLoggedIn: isLoggedIn == 1});
    })
    setTimeout(() => {
      this.setState({ showSplash: false })
      // StatusBar.setHidden(false, 'slide');
    }, 3000);
  }
  render = () => (
    this.state.showSplash ?
      <>
        <StatusBar backgroundColor="#0095ba" />
        <ImageBackground
          source={require('./assets/india.png')}
          resizeMode='stretch'
          style={{
            flex: 1,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
          }}
        >
          <Image
            source={require('./android/app/src/main/res/drawable/launch_screen.jpg')}
            style={{
              flex: 1,
              width: Dimensions.get('window').width,
              height: (16 / 9) * Dimensions.get('window').width,
              resizeMode: 'contain',
            }}
          />
        </ImageBackground>
      </>
      : 
    <NavigationContainer>
      <Stack.Navigator initialRouteName={this.state.isLoggedIn ? "Products" : "Home"}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Products"
          component={Products}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WebViewComponent"
          component={WebViewComponent}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
