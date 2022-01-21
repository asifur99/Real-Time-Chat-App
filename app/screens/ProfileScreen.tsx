import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import Profile from '../components/Profile';
import { useRoute } from '@react-navigation/core';
import { User } from '../src/models';

export default function ProfileScreen() {
  const [user, setUser] = useState<User|null>(null);

  const route = useRoute();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    if (!route.params?.id){
      alert("No User ID provided");
      return;
    }

    const user = await DataStore.query(User, route.params.id);

    if (!user) {
      console.error("Can't find chat room with this id");
    }
    else{
      setUser(user);
    }
  };

  return (
    <View style={styles.page}>
        <Profile user={user} />
    </View>
  );
}

const styles = StyleSheet.create({
    page: {
      backgroundColor: 'white',
      flex: 1,
    }
})