import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Pressable, Text } from 'react-native';
import { Auth } from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore'
import { MaterialIcons } from '@expo/vector-icons';

import { ChatRoom, ChatRoomUser } from '../src/models';
import ChatRoomItem from '../components/ChatRoomItems';

export default function TabOneScreen() {
  const [chatRooms, setChatRoom] = useState<ChatRoom[]>([]);

  useEffect(() => {
    const fetchChatRoom = async () => {
      const user = await Auth.currentAuthenticatedUser();

      const  chatRooms = (await DataStore.query(ChatRoomUser))
        .filter(chatRoomUser => chatRoomUser.user.id === user.attributes.sub)
        .map(chatRoomUser => chatRoomUser.chatRoom);

      setChatRoom(chatRooms);
    };

    fetchChatRoom();
  }, []);

  const logout = () => {
    Auth.signOut();
  }

  return (
    <View style={styles.page}>
      <FlatList 
        data={chatRooms} 
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
