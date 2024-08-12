import React, {useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types';
import NetInfo from '@react-native-community/netinfo';
import styles from '../styles/OfflineScreenStyles';

type OfflineScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'OfflineScreen'>;
};

export default function OfflineScreen({navigation}: OfflineScreenProps) {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        navigation.replace('UsersTabs');
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/icons/success-image.png')}
        style={styles.image}
      />
      <Text style={styles.h1Text}>There is no internet connection</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace('UsersTabs')}>
        <Text style={styles.buttonText}>Try again</Text>
      </TouchableOpacity>
    </View>
  );
}
