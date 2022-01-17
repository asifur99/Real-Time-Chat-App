import * as React from 'react';
import { View, StyleSheet, FlatList, Pressable, Text } from 'react-native';
import {Auth} from 'aws-amplify';

import ChatRoomItem from '../components/ChatRoomItems';
import ChatRoomData from '../dummy-data/ChatRooms';
import { MaterialIcons } from '@expo/vector-icons';

export default function TabOneScreen() {

  const logout = () => {
    Auth.signOut();
  }

  return (
    <View style={styles.page}>
      <FlatList 
        data={ChatRoomData} 
        renderItem={({item}) => <ChatRoomItem chatRoom={item}/>} 
        showsVerticalScrollIndicator = {true}
      />

      <View style={styles.button}>
        <Pressable onPress={logout} style={styles.logout}>
          <MaterialIcons name="logout" size={24} color="black" />
        </Pressable>
      </View>
    
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1,
  },
  logout: {
    backgroundColor: 'darkorange',
    height: 50,
    width: 50,
    margin: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'flex-end',
  }
});
