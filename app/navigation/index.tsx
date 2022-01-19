/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
 import * as React from 'react';
 
 import NotFoundScreen from '../screens/NotFoundScreen';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
 import LinkingConfiguration from './LinkingConfiguration';
 
 /*-----------------------------------MY IMPORTS------------------------------------------*/
 import HomeScreen from '../screens/HomeScreen';
 import ChatRoomScreen from '../screens/ChatRoomScreen';
 import UsersScreen from '../screens/UsersScreen';
 
 import { ColorSchemeName, View, Image, Text, useWindowDimensions, Pressable } from 'react-native';
 import { MaterialCommunityIcons } from '@expo/vector-icons';
 import { NavigationContainer, DefaultTheme, DarkTheme, useNavigation } from '@react-navigation/native';
 import ChatRoomHeader from './ChatRoomHeader';
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
 
const HomeHeader = () => {
  const { width } = useWindowDimensions();

  const navigation = useNavigation();

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
      <Pressable onPress={() => navigation.navigate('UsersScreen')}>
        <MaterialCommunityIcons name="circle-edit-outline" size={24} color="darkorange" style={{marginHorizontal: 30}} />
      </Pressable>
    </View>
  )
}
 