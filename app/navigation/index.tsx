/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
*/
import * as React from 'react';

import NotFoundScreen from '../screens/NotFoundScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
 
/*-----------------------------------MY IMPORTS------------------------------------------*/
import HomeScreen from '../screens/HomeScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import UsersScreen from '../screens/UsersScreen';

import { ColorSchemeName } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import ChatRoomHeader from './ChatRoomHeader';
import HomeHeader from './HomeHeader';
/*---------------------------------------------------------------------------------------*/

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
* A root stack navigator is often used for displaying modals on top of all other content.
* https://reactnavigation.org/docs/modal
*/
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={({ route }) => ({
          headerTitle: () => <HomeHeader id={route.params?.id} />,
        })}
      />

      <Stack.Screen
        name="ChatRoom" 
        component={ChatRoomScreen} 
        options={( { route } ) => ({
          headerTitle: () => <ChatRoomHeader id={route.params?.id} />,
        })}
      />

      <Stack.Screen
        name="UsersScreen" 
        component={UsersScreen} 
        options={{
          title: "Users",
        }}
      />

      <Stack.Screen 
        name="NotFound" 
        component={NotFoundScreen} 
        options={{ 
          title: 'This page doesn\'t exist.',
          headerStyle: {
            backgroundColor: 'maroon',
          },
          headerTitleStyle: {
            color: 'white',
            fontSize: 25,
            fontWeight: 'bold',
          },
        }} 
      />
    </Stack.Navigator>
  );
}
 