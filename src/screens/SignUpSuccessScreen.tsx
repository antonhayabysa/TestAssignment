import React, {useEffect} from 'react';
import {Text, Button, Image, TouchableOpacity} from 'react-native';
import {useUser} from '../context/UserContext';
import styles from '../styles/SignUpSuccessScreenStyles';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function SignUpSuccessScreen({navigation}: any) {
  const {setIsUserRegistered} = useUser();

  useEffect(() => {
    setIsUserRegistered(true);
  }, [setIsUserRegistered]);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() =>
          navigation.navigate('UsersTabs', {screen: 'UsersScreen'})
        }>
        <Image
          source={require('../assets/icons/close-2.png')}
          style={styles.closeIcon}
        />
      </TouchableOpacity>
      <Image
        source={require('../assets/icons/success-image-3.png')}
        style={styles.image}
      />
      <Text style={styles.h1Text}>User successfully registered</Text>
      <Button
        title="Got it"
        onPress={() =>
          navigation.navigate('UsersTabs', {screen: 'UsersScreen'})
        }
      />
    </SafeAreaView>
  );
}
