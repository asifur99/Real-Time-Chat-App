import React, { useEffect, useState } from 'react'
import { View, Text, Pressable, TextInput } from 'react-native'
import { User } from '../../src/models';
import styles from './styles'
import { Auth, DataStore } from 'aws-amplify';
import { Entypo } from '@expo/vector-icons';

export default function Profile({ user }) {
  const [imageUri, setImageUri] = useState('');
  const [status, setStatus] = useState('');
  const [save, setSave] = useState(false);

  useEffect(() => {
    setImageUri(user?.imageUri);
    setStatus(user?.status);
  }, [user])

  const sendUpdate = async () => {
    await DataStore.save(
      User.copyOf(user, updated => {
        updated.imageUri = imageUri;
        updated.status = status;
      })
    );

    setSave(true);
  };

  const updateSave = () => {
    setSave(false);
  };

  return(
    <View style={{ alignItems: 'center', padding: 10 }}>
      <View style={styles.container}>
        <View style={styles.element}>
          <Text style={styles.headings}>Name: { user?.name }</Text>
        </View>

        <View style={styles.element}>
          <Text style={styles.headings}>Image: </Text>

          <View style={styles.input}>
            <TextInput 
              value={ imageUri }
              placeholder = 'Aa'
              onChangeText={ setImageUri }
            />
          </View>
        </View>

        <View style={styles.element}>
          <Text style={styles.headings}>Status: </Text>

          <View style={styles.input}>
            <TextInput 
              value={ status }
              placeholder = 'Aa'
              onChangeText={ setStatus }
            />
          </View>
        </View>

        <Pressable onPressIn={sendUpdate} onPressOut={updateSave} style={[styles.element, {alignSelf: 'flex-end',}]}>
          <Entypo name="save" size={30} color={ save ? '#ff8000' : 'grey'} />
        </Pressable>
      </View>  
    </View>
  )
};