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
import { Audio } from 'expo-av';
import AudioPlayer from '../AudioPlayer';

export default function MessageInput({chatRoom}) {
    const [message, setMessage] = useState('');
    const [openEmoji, setOpenEmoji] = useState(false);
    const [image, setImage] = useState<string|null>(null);
    const [progress, setProgress] = useState(0);
    const [recording, setRecording] = useState<Audio.Recording | null>(null);
    const [soundURI, setSoundURI] = useState<string|null>(null);


    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web'){
                const libraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
                const photoPermission = await ImagePicker.requestCameraPermissionsAsync();
                const audioPermission = await Audio.requestPermissionsAsync();

                if (libraryPermission || photoPermission || audioPermission){
                    alert('Sorry, we need these permissions to make this work!');
                }
            }
        })();
    }, []);

    const reset = () => {
        setMessage('');
        setOpenEmoji(false);
        setImage(null);
        setProgress(0);
        setSoundURI(null);
    };

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
    };

    const updateLastMessage = async (newMessage) => {
        DataStore.save(ChatRoom.copyOf(chatRoom, updatedChatRoom => {
            updatedChatRoom.LastMessage = newMessage;
        }))
    };

    const onPress = () => {
        if (image){
            sendImage();
        }
        else if (soundURI){
            sendAudio();
        }
        else if (message){
            send();
        }
        else {
            alert('Please Enter a Message');
        }
    };

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
    };
    
    const sendImage = async () => {
        if (!image) {
            return;
        }
        
        const blob = await getBlob(image);
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
    };

    const getBlob =  async (item: string) => {
        const response = await fetch(item);
        const blob = await response.blob();

        return blob;
    };

    // Audio
    async function startRecording() {
        try {
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            }); 
            console.log('Starting recording..');
            const { recording } = await Audio.Recording.createAsync(
                Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
            );
            setRecording(recording);
            console.log('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    };
    
    async function stopRecording() {
        console.log('Recording stopped!');
        if (!recording) {
            return;
        }

        setRecording(null);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI(); 
        console.log('Recording stopped and stored at', uri);

        if (!uri){
            return;
        }

        setSoundURI(uri);
    };

    const sendAudio = async () => {
        if (!soundURI) {
            return;
        }
        
        const uri = soundURI.split('.');
        const extension = uri[uri.length - 1];
        const blob = await getBlob(soundURI);
        const { key } = await Storage.put(`${uuid()}.${extension}`, blob, { progressCallback });

        // send message
        const user = await Auth.currentAuthenticatedUser();

        const newMessage = await DataStore.save( new Message({
            content: message,
            audio: key,
            userID: user.attributes.sub,
            chatroomID: chatRoom.id,
        }))

        updateLastMessage(newMessage);

        reset();
    };

    return (
        <View style={[styles.main, {height: openEmoji ? "50%" : "auto"}]}>
            
            {image && (
                <View style={styles.imageContainer}>
                    <Image 
                        source={{ uri: image}} 
                        style={styles.imgStyle}
                    />

                    <View style={styles.imgProgressView}>
                        <View style={[styles.imgProgress,  {width: `${progress * 100}%`}]}></View>
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

            { soundURI && <AudioPlayer soundURI={soundURI}/>}

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

                    <Pressable onPressIn={startRecording} onPressOut={stopRecording}>
                        <FontAwesome 
                            name="microphone" 
                            size={24} 
                            color={recording ? "#ff8000" : "grey"}
                            style={styles.icon} 
                        />
                    </Pressable>
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