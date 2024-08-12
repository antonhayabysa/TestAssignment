import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import NetInfo from '@react-native-community/netinfo';
import UsersTabNavigator from './src/screens/UsersTabNavigator';
import OfflineScreen from './src/screens/OfflineScreen';
import GetUsersScreen from './src/screens/GetUsersScreen';
import SignUpSuccessScreen from './src/screens/SignUpSuccessScreen';
import SignUpFailedScreen from './src/screens/SignUpFailedScreen';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {UserProvider} from './src/context/UserContext';

const Stack = createStackNavigator();

function App() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    SplashScreen.hide();

    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  if (isConnected === null) {
    return null;
  }

  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={isConnected ? 'UsersTabs' : 'OfflineScreen'}>
          <Stack.Screen
            name="UsersTabs"
            component={UsersTabNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="GetUsers"
            component={GetUsersScreen}
            options={{title: 'Users'}}
          />
          <Stack.Screen
            name="OfflineScreen"
            component={OfflineScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignUpSuccessScreen"
            component={SignUpSuccessScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignUpFailedScreen"
            component={SignUpFailedScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

AppRegistry.registerComponent(appName, () => App);
export default App;
