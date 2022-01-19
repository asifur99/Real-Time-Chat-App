import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../../src/models';

import styles from './styles';
import { Auth } from 'aws-amplify';

export default function Message({ message }) {
    const [user, setUser] = useState<User|undefined>();
    const [you, setYou] = useState<boolean>(false);

    useEffect(() => {
        DataStore.query(User, message.userID).then(setUser);
    }, [])

    useEffect(() => {
        const check = async () => {
            if (!user){
                return;
            }

            const authenticatedUser = await Auth.currentAuthenticatedUser();
            setYou(user.id === authenticatedUser.attributes.sub);
        };

        check();
    }, [user])

    if (!user){
        return <ActivityIndicator />
    }

    return (
        <View style={
            [styles.bubble, you ? styles.send : styles.receive]}>
            <Text style={{ color: you ? 'black' : 'white'}}>{ message.content }</Text>
        </View>
    )
}
