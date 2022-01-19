/**
 * This is the chatroom component that is used by the application to render the user chat screen
 */
import React, { useState, useEffect } from 'react';
import { View, Text, Image, Pressable, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import styles from './styles';
import { Auth, DataStore } from 'aws-amplify';

import { ChatRoomUser, Message, User } from '../../src/models';

export default function ChatRoomItem({ chatRoom }){
    // const [users, setUsers] = useState<User[]>([]); // all users in chatroom
    const [user, setUser] = useState<User|null>(null); // all users in chatroom
    const [lastMessage, setLastMessage] = useState<Message|undefined>(); // all users in chatroom

    const navigation = useNavigation();

    useEffect(() => {
        const fetchUsers = async () => {
            const fetchedUsers = (await DataStore.query(ChatRoomUser))
                .filter(chatRoomUser => chatRoomUser.chatRoom.id === chatRoom.id)
                .map(chatRoomUser => chatRoomUser.user);
            
            // setUsers(chatRoomUsers);
            
            const authUser = await Auth.currentAuthenticatedUser();
            setUser(fetchedUsers.find(user => user.id !== authUser.attributes.sub) || null);
        };

        fetchUsers();
    }, []);

    console.log(chatRoom);

    useEffect(() => {
        if (!chatRoom.chatRoomLastMessageId){
            return;
        }

        DataStore.query(Message, chatRoom.chatRoomLastMessageId).then(setLastMessage);
    }, []);

    const onPress = () => {
        navigation.navigate('ChatRoom', { id: chatRoom.id });
    };

    if (!user){
        return <ActivityIndicator />
    };

    return(
        <Pressable onPress={onPress} style={styles.container}>
            <Image source={{uri: user.imageUri}} style={styles.image}/>

            {/** If the newMessages is greater than 0 then render */}
            {!!chatRoom.newMessages && <View style={styles.counterContainer}>
                <Text style={styles.counterText}>{chatRoom.newMessages}</Text>
            </View>}

            <View style={styles.chatBox}>
                <View style={styles.group}>
                    <Text style={styles.name}>{user.name}</Text>
                    <Text style={styles.text}>{lastMessage?.createdAt}</Text>
                </View>
                <Text numberOfLines={1} style={styles.text}>{lastMessage?.content}</Text>
            </View>
        </Pressable>
    );
}