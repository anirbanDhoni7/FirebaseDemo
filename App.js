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
import { getMyStringValue } from './src/components/AsyncStorage';
import Login from './src/screens/login/Login';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/screens/home/Home';
import Profile from './src/screens/profile/Profile';
import Settings from './src/screens/settings/Settings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { appTheme } from './src/screens/login/Styles';
import { ASYNCSTORAGE_PARAMETERS } from './src/components/Constants';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const HomeTabs = () => (
  <BottomTab.Navigator
    initialRouteName='Home'
    tabBarOptions={{
      activeTintColor: appTheme,
      inactiveTintColor: '#808080',
      labelStyle: {
        fontSize: 15
      },
      labelPosition: 'beside-icon',
      style: {
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center'
      }
    }}
  >
    <BottomTab.Screen name="Home" component={Home}
      options={{
        tabBarBadgeStyle: { flex: 1 },
        tabBarLabel: "DASHBOARD",
        tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
      }} />
    <BottomTab.Screen name="Profile" component={Profile} options={{
      tabBarLabel: "PROFILE",
      tabBarBadgeStyle: { flex: 1 },
      tabBarIcon: ({ color, size }) => <Ionicons name="person" color={color} size={size} />,
    }} />
    <BottomTab.Screen name="Settings" component={Settings} options={{
      tabBarLabel: "SETTINGS",
      tabBarBadgeStyle: { flex: 1 },
      tabBarIcon: ({ color, size }) => <Ionicons name="settings" color={color} size={size} />,
    }} />
  </BottomTab.Navigator>
)

const App = props => {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [initialRoute, setInitialRoute] = useState('');
  useEffect(() => {
    // SplashScreen.hide();
    getMyStringValue(ASYNCSTORAGE_PARAMETERS.LOGIN_STATUS).then(event => {
      if (event == null) {
        setInitialRoute('Login')
      } else {
        setInitialRoute('Home')
      }
    })
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
        <Stack.Navigator initialRouteName={initialRoute}>
          {
            (initialRoute == 'Home' || initialRoute == '') ?
              <>
                <Stack.Screen
                  name="Home"
                  component={HomeTabs}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Login"
                  component={Login}
                  options={{ headerShown: false }}
                />
              </> :
              <>
                <Stack.Screen
                  name="Login"
                  component={Login}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Home"
                  component={HomeTabs}
                  options={{ headerShown: false }}
                />
              </>
          }
        </Stack.Navigator> 
      </NavigationContainer>
  )
}

export default App;
