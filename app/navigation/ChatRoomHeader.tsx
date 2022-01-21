import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { DataStore, Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { useWindowDimensions, View, Image, Text } from "react-native";
import { ChatRoomUser, User } from "../src/models";

const ChatRoomHeader = ({ id }) => {  
  const { width } = useWindowDimensions();

  const [user, setUser] = useState<User|null>(null);

  useEffect(() => {
    if (!id){
      return;
    }

    const fetchUsers = async () => {
      const fetchedUsers = (await DataStore.query(ChatRoomUser))
        .filter(chatRoomUser => chatRoomUser.chatRoom.id === id)
        .map(chatRoomUser => chatRoomUser.user);
      
      const authUser = await Auth.currentAuthenticatedUser();
      setUser(fetchedUsers.find(user => user.id !== authUser.attributes.sub) || null);
    };

    fetchUsers();
  }, []);

  return(
    <View style={{
      flexDirection: 'row', 
      justifyContent: 'space-between',
      width: width-80,
      padding: 10,
      alignItems: 'center',
    }}>

      <Image
        source={{uri: user?.imageUri}}
        style={{ width: 50, height: 50, borderRadius: 15 }}
      />
      <Text style={{flex: 1, marginLeft:10, fontWeight: 'bold'}}>{ user?.name }</Text>
      <FontAwesome name="video-camera" size={24} color="darkorange" style={{marginHorizontal: 30}} />
      <Ionicons name="call-sharp" size={24} color="darkorange" style={{marginHorizontal: 30}} />
    </View>
  )
};

export default ChatRoomHeader;