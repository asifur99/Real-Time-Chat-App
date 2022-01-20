/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

 import { LinkingOptions } from '@react-navigation/native';
 import * as Linking from 'expo-linking';
 import { ChatRoom } from '../src/models';
 
 import { RootStackParamList } from '../types';
 
 const linking: LinkingOptions<RootStackParamList> = {
   prefixes: [Linking.makeUrl('/')],
   config: {
     screens: {
       Root: {
         screens: {
           Home: {
             screens: {
               HomeScreen: 'Home',
             },
           },
           ChatRoom: {
             screens: {
               ChatRoomScreen: 'ChatRoom',
             },
           },
           UsersScreen: {
             screens: {
               UsersScreen: 'UsersScreen',
             },
           },
           ProfileScreen: {
            screens: {
              ProfileScreen: 'Profile',
            },
          },
         },
       },
       NotFound: '*',
     },
   },
 };
 
export default linking; 