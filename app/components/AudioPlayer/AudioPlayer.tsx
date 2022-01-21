import { AntDesign } from '@expo/vector-icons'
import { Audio, AVPlaybackStatus } from 'expo-av';
import React, { useEffect, useState } from 'react'
import { View, Pressable, Platform, Image } from 'react-native'
import styles from './styles'

export default function AudioPlayer({ soundURI }){
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [pause, setPause] = useState(true);
    const [audioProgress, setAudioProgress] = useState(0);

    useEffect(() => {
        loadSound();
        // unload sound
        if (sound) {
            sound.unloadAsync();
        }
    }, [soundURI]);

    const loadSound = async () =>{
        if (!soundURI){
            return;
        }
        
        const { sound } = await Audio.Sound.createAsync(
            { uri: soundURI },
            {},
            onPlaybackStatusUpdate
        );
        setSound(sound);
    }

    const playPauseSound = async () => {
        if (!sound){
            return;
        } 

        if (pause){
            console.log("Playing");
            await sound.playFromPositionAsync(0);
        }
        else {
            console.log("Stopped");
            await sound.playAsync();
        }
    };

    const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
        if (!status.isLoaded){
            return;
        }

        setAudioProgress(status.positionMillis / (status.durationMillis || 1));
        setPause(!status.isPlaying);
    };

    return(
        <View style={styles.audioContainer}>
        <Pressable onPress={playPauseSound}>
            <AntDesign 
                name={pause ? "playcircleo" : "pausecircleo"} 
                size={24} 
                color="grey"
            />
        </Pressable>

        <View style={styles.audioProgressB}>
            <View style={[styles.audioProgressF, { width: `${audioProgress * 100}%` }]}></View>
        </View>
    </View>
    )
};