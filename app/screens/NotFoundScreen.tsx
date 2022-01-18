import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import { Entypo } from '@expo/vector-icons';

import { RootStackScreenProps } from '../types';

export default function NotFoundScreen({ navigation }: RootStackScreenProps<'NotFound'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This screen doesn't exist.</Text>
      <TouchableOpacity onPress={() => navigation.replace('Home')} style={styles.btn}>
        <Entypo name="home" size={42} color="white" />
      </TouchableOpacity>
      <Text style={styles.linkText}>Click the button to go to home screen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    padding: 20,
    fontSize: 25,
    fontWeight: 'bold',
  },
  linkText: {
    fontSize: 18,
    color: 'maroon',
    padding: 13,
  },
  btn: {
    padding: 10, 
    borderWidth: 1, 
    borderRadius: 15, 
    borderColor: '#ff8000',
    backgroundColor: '#ff8000'
  }
});
