import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Image,
  ImageSourcePropType,
  Text,
  SafeAreaView,
  View,
} from 'react-native';
import UsersEmptyScreen from './UsersEmptyScreen';
import RegisterScreen from './RegisterScreen';
import GetUsersScreen from './GetUsersScreen';
import {useUser} from '../context/UserContext';
import tabIconStyles from '../styles/TabIconStyles';

import UserIcon from '../assets/icons/User.png';
import UserSignUpIcon from '../assets/icons/UserSignUp.png';

const Tab = createBottomTabNavigator();

const renderTabIconWithLabel = (
  source: ImageSourcePropType,
  label: string,
  color: string,
) => (
  <View style={tabIconStyles.tabItem}>
    <Image source={source} style={[tabIconStyles.icon, {tintColor: color}]} />
    <Text style={[tabIconStyles.tabLabel, {color}]}>{label}</Text>
  </View>
);

const UsersHeader = () => (
  <SafeAreaView style={tabIconStyles.header}>
    <Text style={tabIconStyles.headerText}>Working with GET request</Text>
  </SafeAreaView>
);

const RegisterHeader = () => (
  <SafeAreaView style={tabIconStyles.header}>
    <Text style={tabIconStyles.headerText}>Working with POST request</Text>
  </SafeAreaView>
);

const UsersTabNavigator = () => {
  const {isUserRegistered} = useUser();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="UsersScreen"
        component={isUserRegistered ? GetUsersScreen : UsersEmptyScreen}
        options={{
          header: UsersHeader,
          tabBarIcon: ({color}) =>
            renderTabIconWithLabel(UserIcon, 'Users', color),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          header: RegisterHeader,
          tabBarIcon: ({color}) =>
            renderTabIconWithLabel(UserSignUpIcon, 'Sign Up', color),
          tabBarLabel: () => null,
        }}
      />
    </Tab.Navigator>
  );
};

export default UsersTabNavigator;
