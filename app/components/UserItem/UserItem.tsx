/**
 * This is the user screen component that is used by the application to render the users screen
 */
import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import styles from './styles';
import { ChatRoom, ChatRoomUser, User } from '../../src/models';
import { DataStore } from '@aws-amplify/datastore';
import { Auth } from 'aws-amplify';
 
export default function UserItem({ user }) {
    const navigation = useNavigation();

    const onPress = async () => {
        // connect authenticated/current user with the room
        const authenticatedUser = await Auth.currentAuthenticatedUser();
        const currentUser = await DataStore.query(User, authenticatedUser.attributes.sub);
        
        const findChat = (await DataStore.query(ChatRoomUser)).filter(obj => obj.user.id === user.id).map(obj => obj.chatRoom.id);
        const findChatCurr = (await DataStore.query(ChatRoomUser)).filter(obj => obj.user.id === currentUser.id).map(obj => obj.chatRoom.id);

        // Filtering the rooms to check if a room already exists
        const filteredArray = findChat.filter(value => findChatCurr.includes(value));

        console.log(filteredArray)

        // Ignore if trying to make a chatroom with themselves
        if (currentUser.id === user.id) {
            alert("Cannot Start a Chat with Yourself");
        }
        // No chatroom found with the specified person
        else if (filteredArray.length === 0){
            // Create a chatroom
            const newChatRoom = await DataStore.save(new ChatRoom({newMessages: 0}));
      
            await DataStore.save(new ChatRoomUser({
                user: currentUser,
                chatRoom: newChatRoom
            }));

            // connect authenticated/current user with the room 
            await DataStore.save(new ChatRoomUser({
                user,
                chatRoom: newChatRoom
            }));

            navigation.navigate('ChatRoom', { id: newChatRoom.id });
        }
        // Redirect to the existing chat room
        else if (filteredArray.length > 0){
            navigation.navigate('ChatRoom', { id: filteredArray[0] });
        }
    }

    return(
        <Pressable onPress={onPress} style={styles.container}>
            <Image source={{uri: user.imageUri}} style={styles.image}/>

            <View style={styles.chatBox}>
                <View style={styles.group}>
                    <Text style={styles.name}>{user.name}</Text>
                    <Text numberOfLines={1} style={[styles.status, { width: 150 }]}>{user.status}</Text>
                </View>
            </View>
        </Pressable>
    );
}