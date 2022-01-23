import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Auth } from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';

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

  return (
    <View style={styles.page}>
      <FlatList 
        data={chatRooms} 
        renderItem={({item}) => <ChatRoomItem chatRoom={item}/>} 
        showsVerticalScrollIndicator = {true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1,
  },
});
