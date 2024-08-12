import React from 'react';
import {
  Text,
  Button,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import styles from '../styles/SignUpFailedScreenStyles';

export default function SignUpFailedScreen({navigation}: any) {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.navigate('RegisterScreen')}>
        <Image
          source={require('../assets/icons/close-2.png')}
          style={styles.closeIcon}
        />
      </TouchableOpacity>
      <Image
        source={require('../assets/icons/success-image-4.png')}
        style={styles.image}
      />
      <Text style={styles.h1Text}>That email is already registered</Text>
      <Button
        title="Try again"
        onPress={() => navigation.navigate('RegisterScreen')}
      />
    </SafeAreaView>
  );
}
