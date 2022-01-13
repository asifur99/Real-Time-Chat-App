import React from 'react'
import { View, Text } from 'react-native'

import styles from './styles';

const send = 'lightgrey';
const receive = '#ff8000';

const myID = 'u1';

export default function Message({ message }) {
    const you = message.user.id == myID;

    return (
        <View style={
            [styles.bubble, you ? styles.send : styles.receive]}>
            <Text style={{ color: you ? 'black' : 'white'}}>{ message.content }</Text>
        </View>
    )
}
