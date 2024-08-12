import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types';
import styles from '../styles/GetUsersScreenStyles';

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  photo: string;
  registration_timestamp: number;
};

type GetUsersScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'GetUsers'>;
};

export default function GetUsersScreen({navigation}: GetUsersScreenProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get<{
        success: boolean;
        page: number;
        total_pages: number;
        total_users: number;
        count: number;
        links: {next_url: string | null; prev_url: string | null};
        users: User[];
      }>(
        `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=10`,
      );

      if (response.data.success) {
        setUsers(prevUsers => [...prevUsers, ...response.data.users]);
      } else {
        console.error('Error fetching users: Response not successful');
      }
    } catch (error: any) {
      console.error('Error fetching users:', error.message || error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers, page]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        console.error('No internet connection detected');
        navigation.navigate('OfflineScreen');
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  const loadMore = () => {
    if (!loading) {
      setPage(page + 1);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item: {id: any}, index: any) => `${item.id}-${index}`}
        renderItem={({item}) => (
          <View style={styles.userContainer}>
            <Image source={{uri: item.photo}} style={styles.userImage} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.userPosition}>{item.position}</Text>
              <Text style={styles.userEmail}>{item.email}</Text>
              <Text style={styles.userPhone}>{item.phone}</Text>
            </View>
          </View>
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
