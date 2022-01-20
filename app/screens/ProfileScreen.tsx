import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';

export default function ProfileScreen() {

  return (
    <View style={styles.page}>
        <Text>Heoa</Text>
    </View>
  );
}


const styles = StyleSheet.create({
    page: {
        backgroundColor: 'white',
        flex: 1,
    }
})