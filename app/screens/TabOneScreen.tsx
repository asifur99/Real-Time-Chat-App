import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import ChatRoomItem from '../components/ChatRoomItems';
import ChatRoomData from '../dummy-data/ChatRooms';

const c1 = ChatRoomData[0];
const c2 = ChatRoomData[1];


export default function TabOneScreen() {
  return (
    <View style={styles.page}>
      <ChatRoomItem chatRoom = {c1} />
      <ChatRoomItem chatRoom = {c2} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1,
  },
});
