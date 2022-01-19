import React, { useState } from 'react'
import { View, TextInput, Pressable } from 'react-native'
import styles from './styles'
import { Entypo, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { DataStore } from '@aws-amplify/datastore';
import { ChatRoom, Message } from '../../src/models';
import Auth from '@aws-amplify/auth';

export default function MessageInput({chatRoom}) {
    const [message, setMessage] = useState('');

    const send = async () => {
        // Send Message
        const user = await Auth.currentAuthenticatedUser();

        const newMessage = await DataStore.save( new Message({
            content: message,
            userID: user.attributes.sub,
            chatroomID: chatRoom.id,
        }))

        updateLastMessage(newMessage);

        setMessage('');
    }

    const updateLastMessage = async (newMessage) => {
        DataStore.save(ChatRoom.copyOf(chatRoom, updatedChatRoom => {
            updatedChatRoom.LastMessage = newMessage;
        }))
    }

    const onPress = () => {
        if (message){
            send();
        }
        else {
            alert('Please Enter a Message');
        }
    }

    return (
        <View style={styles.main}>
            <View style={styles.inputContainer}>
                <MaterialCommunityIcons name="sticker-emoji" size={24} color="grey" style={styles.icon} />

                <TextInput 
                    style={styles.input}

                    /** Binding of states */
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Aa"
                />
                
                <Entypo name="camera" size={24} color="grey" style={styles.icon} />
                <FontAwesome name="microphone" size={24} color="grey" style={styles.icon} />
            </View>

            <Pressable onPress={onPress} style={styles.buttonContainer}>
                <Ionicons name="md-send" size={24} color="white" />
            </Pressable>
        </View>
    )
}