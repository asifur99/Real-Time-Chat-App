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
        // TODO: dont create a new chat room if one already exists
        // Query chatroom and charusers and filter on user id

        // Create a chatroom
        const newChatRoom = await DataStore.save(new ChatRoom({newMessages: 0}));

        // connect authenticated/current user with the room
        const authenticatedUser = await Auth.currentAuthenticatedUser();
        const currentUser = await DataStore.query(User, authenticatedUser.attributes.sub);
        
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