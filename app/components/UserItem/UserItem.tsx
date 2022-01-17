/**
 * This is the user screen component that is used by the application to render the users screen
 */
 import React from 'react';
 import { View, Text, Image, Pressable } from 'react-native';
 import { useNavigation } from '@react-navigation/core';
 import styles from './styles';
 
 export default function UserItem({ user }) {
     const navigation = useNavigation();
 
     const onPress = () => {
         //Create a chatroom
     }
 
     return(
         <Pressable onPress={onPress} style={styles.container}>
             <Image source={{uri: user.imageUri}} style={styles.image}/>
 
             <View style={styles.chatBox}>
                 <View style={styles.group}>
                     <Text style={styles.name}>{user.name}</Text>
                 </View>
             </View>
         </Pressable>
     );
 }