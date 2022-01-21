import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, useWindowDimensions } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../../src/models';

import styles from './styles';
import { Auth, Storage } from 'aws-amplify';
import { S3Image } from 'aws-amplify-react-native';
import AudioPlayer from '../AudioPlayer';

export default function Message({ message }) {
    const [user, setUser] = useState<User|undefined>();
    const [you, setYou] = useState<boolean>(false);
    const [soundURI, setSoundURI] = useState<any>(null);

    const { width } = useWindowDimensions();

    useEffect(() => {
        DataStore.query(User, message.userID).then(setUser);
    }, []);

    useEffect(() => {
        if (message.audio){
            Storage.get(message.audio).then(setSoundURI);
        }

    }, [message]);

    useEffect(() => {
        const check = async () => {
            if (!user){
                return;
            }

            const authenticatedUser = await Auth.currentAuthenticatedUser();
            setYou(user.id === authenticatedUser.attributes.sub);
        };

        check();
    }, [user]);

    if (!user){
        return <ActivityIndicator />
    };

    return (
        <View style={[
            styles.bubble, 
            you ? styles.send : styles.receive,
            { width: soundURI ? '65%' : 'auto' },
        ]}
        >
            {message.image && 
                <S3Image 
                    imgKey={message.image} 
                    style={{ 
                        width: width * 0.2, 
                        aspectRatio: 16/9,
                        marginBottom: 10,
                    }}
                    resizeMode="contain"
                />
            }

            { soundURI && (
                <AudioPlayer soundURI={soundURI} />
            )}
            
            <Text style={{ color: you ? 'black' : 'white'}}>{ message.content }</Text>
        </View>
    );
}
