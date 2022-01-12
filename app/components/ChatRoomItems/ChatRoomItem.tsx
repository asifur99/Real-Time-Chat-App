/**
 * This is the chatroom component that is used by the application to render the user chat screen
 */
import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';

export default function ChatRoomItem(){
    return(
        <View style={styles.container}>
            <Image source={{ uri: 'https://brandyourself.com/blog/wp-content/uploads/linkedin-profile-picture-too-close.png' }} style={styles.image}/>
            <View style={styles.counterContainer}>
                <Text style={styles.counterText}>6</Text>
            </View>
            <View style={styles.chatBox}>
                <View style={styles.group}>
                    <Text style={styles.name}>Potato</Text>
                    <Text style={styles.text}>69:69 PM</Text>
                </View>
                <Text numberOfLines={1} style={styles.text}>This is a MESSAGE asjdhhsadvjahdjajdajhdhjagdjhahdbjhadjhlajhdghabdwadjhabdbjla,cjhajhcvjhcvjhcwjlhvcawjhvcawljhvwacjhlvjhcawvhjcwa!</Text>
            </View>
        </View>
    );
}