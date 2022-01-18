import React, { useState } from 'react'
import { View, TextInput, Pressable } from 'react-native'
import styles from './styles'
import { Entypo, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function MessageInput() {
    const [message, setMessage] = useState('');

    const send = () => {
        alert('Sending: ' + message);
        setMessage('');
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