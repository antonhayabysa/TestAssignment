import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from '../styles/UsersEmptyScreenStyles';

export default function UsersEmptyScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/icons/success-image-2.png')}
        style={styles.image}
      />
      <Text style={styles.text}>There are no users yet</Text>
    </View>
  );
}
