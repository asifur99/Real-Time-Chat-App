import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChatRoom, Message as MessageModel } from '../src/models';
import Message from '../components/Message'
import MessageInput from '../components/MessageInput';
import { useRoute, useNavigation } from '@react-navigation/core';
import { DataStore } from '@aws-amplify/datastore';
import { SortDirection } from 'aws-amplify';

export default function ChatRoomScreen(){
    const [messages, setMessages] = useState<MessageModel[]>([]);
    const [chatRoom, setChatRoom] = useState<ChatRoom|null>(null);

    const route = useRoute();
    const navigation = useNavigation();

    useEffect(() => {
        fetchChatRoom();
    }, []);

    useEffect(() => {
        fetchMessages();
    }, [chatRoom]);

    useEffect(() => {
        const subscription = DataStore.observe(MessageModel).subscribe(msg => {
            if (msg.model === MessageModel && msg.opType === 'INSERT') {
                setMessages(existingMessages => [ msg.element, ...existingMessages ]);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchChatRoom = async () => {
        if (!route.params?.id){
            alert("No Chatroom ID provided");
            return;
        }

        const chatRoom = await DataStore.query(ChatRoom, route.params.id);

        if (!chatRoom) {
            console.error("Can't find chat room with this id");
        }
        else{
            setChatRoom(chatRoom);
        }
    };

    const fetchMessages = async () => {
        if (!chatRoom){
            return;
        }

        const fetchMessages = await DataStore.query(MessageModel, 
            message => message.chatroomID("eq", chatRoom?.id),
            {
                sort: message => message.createdAt(SortDirection.DESCENDING),
            });
        setMessages(fetchMessages);
    }

    if (!chatRoom) {
        return <ActivityIndicator />
    }

    return (
        <SafeAreaView style={styles.page}>
            <FlatList
                data={messages}
                renderItem={ ({item}) => <Message message={item} /> }
                /** the most recent message below and as we go up it will display the past message */
                inverted
            />
            <MessageInput chatRoom={chatRoom} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: 'white',
        flex: 1,
    }
})