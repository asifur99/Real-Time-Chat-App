import React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Message from '../components/Message'
import MessageInput from '../components/MessageInput';
import chatData from '../dummy-data/Chats'
import { useRoute, useNavigation } from '@react-navigation/core';

export default function ChatRoomScreen(){
    const route = useRoute();
    const navigation = useNavigation();

    alert("ID of ChatRoom: " + route.params?.id);

    navigation.setOptions({ title: 'Some Name' })

    return (
        <SafeAreaView style={styles.page}>
            <FlatList
                data={chatData.messages}
                renderItem={ ({item}) => <Message message={item} /> }
                /** the most recent message below and as we go up it will display the past message */
                inverted
            />
            <MessageInput />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: 'white',
        flex: 1,
    }
})