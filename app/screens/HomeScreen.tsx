import * as React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import ChatRoomItem from '../components/ChatRoomItems';
import ChatRoomData from '../dummy-data/ChatRooms';

export default function TabOneScreen() {
  return (
    <View style={styles.page}>
      <FlatList 
        data={ChatRoomData} 
        renderItem={({item}) => <ChatRoomItem chatRoom={item}/>} 
        showsVerticalScrollIndicator = {false}
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
