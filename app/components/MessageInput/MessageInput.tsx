import React, { useEffect, useState } from 'react'
import { View, TextInput, Pressable, Platform, Image } from 'react-native'
import styles from './styles'
import { AntDesign, Entypo, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { DataStore } from '@aws-amplify/datastore';
import { ChatRoom, Message } from '../../src/models';
import { Auth, Storage } from 'aws-amplify';
import EmojiSelector from 'react-native-emoji-selector';
import * as ImagePicker from 'expo-image-picker';
import { v4 as uuid } from 'uuid';

export default function MessageInput({chatRoom}) {
    const [message, setMessage] = useState('');
    const [openEmoji, setOpenEmoji] = useState(false);
    const [image, setImage] = useState<string|null>(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web'){
                const libraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
                const photoPermission = await ImagePicker.requestCameraPermissionsAsync();

                if (libraryPermission !== "granted" || photoPermission !== "granted"){
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const reset = () => {
        setMessage('');
        setOpenEmoji(false);
        setImage(null);
        setProgress(0);
    }

    const send = async () => {
        // Send Message
        const user = await Auth.currentAuthenticatedUser();

        const newMessage = await DataStore.save( new Message({
            content: message,
            userID: user.attributes.sub,
            chatroomID: chatRoom.id,
        }))

        updateLastMessage(newMessage);

        reset();
    }

    const updateLastMessage = async (newMessage) => {
        DataStore.save(ChatRoom.copyOf(chatRoom, updatedChatRoom => {
            updatedChatRoom.LastMessage = newMessage;
        }))
    }

    const onPress = () => {
        if (image){
            sendImage();
        }
        else if (message){
            send();
        }
        else {
            alert('Please Enter a Message');
        }
    }

    // Pick Image
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const takePhoto = async () => {
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 3],
        });
        
        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const progressCallback = (progress) => {
        setProgress(progress.loaded/progress.total);
    }
    
    const sendImage = async () => {
        if (!image) {
            return;
        }
        
        const blob = await getBlob();
        const { key } = await Storage.put(`${uuid()}.png`, blob, { progressCallback });

        // send message
        const user = await Auth.currentAuthenticatedUser();

        const newMessage = await DataStore.save( new Message({
            content: message,
            image: key,
            userID: user.attributes.sub,
            chatroomID: chatRoom.id,
        }))

        updateLastMessage(newMessage);

        reset();
    }

    const getBlob =  async () => {
        if (!image) {
            return null;
        }

        const response = await fetch(image);
        const blob = await response.blob();

        return blob;
    }


    return (
        <View style={[styles.main, {height: openEmoji ? "50%" : "auto"}]}>
            
            {image && (
                <View style={styles.imageContainer}>
                    <Image 
                        source={{ uri: image}} 
                        style={{ 
                            width: 100, 
                            height: 100, 
                            margin: 5,
                            borderRadius: 10,
                        }}
                    />

                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'flex-start',
                            alignSelf: 'flex-end',
                            margin: 2,
                        }}
                    >
                        <View 
                            style={{ 
                                height: 4,
                                borderRadius: 5,
                                backgroundColor: '#ff8000', 
                                width: `${progress * 100}%`,
                            }}
                        >
                        </View>
                    </View>

                    <Pressable onPress={() => setImage(null)}>
                        <AntDesign 
                            name="closecircle" 
                            size={24} 
                            color="#ff8000" 
                            style={{
                                margin: 5,
                            }}
                        />
                    </Pressable>
                </View>
            )}

            <View style={styles.row}>
                <View style={styles.inputContainer}>
                    <Pressable onPress={() => setOpenEmoji((currentVal) => !currentVal)}>
                        <MaterialCommunityIcons name="sticker-emoji" size={24} color="grey" style={styles.icon} />
                    </Pressable>

                    <TextInput 
                        style={styles.input}

                        /** Binding of states */
                        value={message}
                        onChangeText={setMessage}
                        placeholder="Aa"
                    />
                    
                    <Pressable onPress={pickImage}>
                        <Entypo name="image" size={24} color="grey" style={styles.icon} />
                    </Pressable>

                    {/* <Pressable onPress={takePhoto}>
                        <Entypo name="camera" size={24} color="grey" style={styles.icon} />
                    </Pressable> */}

                    <FontAwesome name="microphone" size={24} color="grey" style={styles.icon} />
                </View>

                <Pressable onPress={onPress} style={styles.buttonContainer}>
                    <Ionicons name="md-send" size={24} color="white" />
                </Pressable>
            </View>

            {openEmoji && (<EmojiSelector 
                onEmojiSelected={(emoji) => setMessage(currentMessage => currentMessage + emoji)} 
                columns={40}
                showTabs={false}
            />)}
        </View>
    )
}