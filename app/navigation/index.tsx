/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

/*-----------------------------------MY IMPORTS------------------------------------------*/
import HomeScreen from '../screens/HomeScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import { ColorSchemeName, View, Image, Text, useWindowDimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
        options={{ headerTitle: HomeHeader }}
      />

      <Stack.Screen 
        name="ChatRoom" 
        component={ChatRoomScreen} 
        options={{ 
          headerTitle: ChatHeader,
        }}
      />

      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

const HomeHeader = () => {
  const { width } = useWindowDimensions();

  return(
    <View style={{
      flexDirection: 'row', 
      justifyContent: 'space-between',
      width: width-25,
      padding: 10,
      alignItems: 'center',
    }}>

      <Image
        source={{uri: 'https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters/large/800/Bob-ParrMr-Incredible.The-Incredibles.webp'}}
        style={{ width: 50, height: 50, borderRadius: 15 }}
      />
      <Text style={{flex: 1, textAlign: 'center', fontWeight: 'bold'}}>Real-Time-Chat-App</Text>
      <MaterialCommunityIcons name="circle-edit-outline" size={24} color="darkorange" style={{marginHorizontal: 30}} />
    </View>
  )
}

const ChatHeader = (props) => {
  const { width } = useWindowDimensions();

  console.log(props);

  return(
    <View style={{
      flexDirection: 'row', 
      justifyContent: 'space-between',
      width: width-80,
      padding: 10,
      alignItems: 'center',
    }}>

      <Image
        source={{uri: 'https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters/large/800/Bob-ParrMr-Incredible.The-Incredibles.webp'}}
        style={{ width: 50, height: 50, borderRadius: 15 }}
      />
      <Text style={{flex: 1, marginLeft:10, fontWeight: 'bold'}}>{ props.children }</Text>
      <MaterialCommunityIcons name="circle-edit-outline" size={24} color="darkorange" style={{marginHorizontal: 30}} />
    </View>
  )
}