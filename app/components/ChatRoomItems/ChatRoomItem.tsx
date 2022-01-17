/**
 * This is the chatroom component that is used by the application to render the user chat screen
 */
import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import styles from './styles';

export default function ChatRoomItem({ chatRoom }){
    const user = chatRoom.users[1]; 
    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate('ChatRoom', { id: chatRoom.id });
    }

    return(
        <Pressable onPress={onPress} style={styles.container}>
            <Image source={{uri: user.imageUri}} style={styles.image}/>

            {/** If the newMessages is greater than 0 then render */}
            {(chatRoom.newMessages > 0) && <View style={styles.counterContainer}>
                <Text style={styles.counterText}>{chatRoom.newMessages}</Text>
            </View>}

            <View style={styles.chatBox}>
                <View style={styles.group}>
                    <Text style={styles.name}>{user.name}</Text>
                    <Text style={styles.text}>{chatRoom.lastMessage.createdAt}</Text>
                </View>
                <Text numberOfLines={1} style={styles.text}>{chatRoom.lastMessage.content}</Text>
            </View>
        </Pressable>
    );
}