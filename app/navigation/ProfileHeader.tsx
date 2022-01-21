import { FontAwesome, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { DataStore, Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { useWindowDimensions, View, Image, Text, Pressable } from "react-native";
import { ChatRoomUser, User } from "../src/models";

const ProfileHeader = ({ id }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
      const fetchUsers = async () => {
        const authUser = await Auth.currentAuthenticatedUser();
  
        const currUser = (await DataStore.query(User))
                      .filter(user => user.id === authUser.attributes.sub)
                      .map(user => user);
  
        setUser(currUser[0]);
      };
  
      fetchUsers();
    }, []);
  
    const { width } = useWindowDimensions();
  
    return(
      <View style={{
        flexDirection: 'row', 
        justifyContent: 'space-between',
        width: width-80,
        padding: 10,
        alignItems: 'center',
      }}>
  
        <Pressable>
          <Image
            source={{uri: user?.imageUri}}
            style={{ width: 50, height: 50, borderRadius: 15, borderWidth: 1 }}
          />
        </Pressable>
        
        <Text style={{flex: 1, textAlign: 'left', fontWeight: 'bold', marginLeft: 10}}>{ user?.name }</Text>
      </View>
    )
};

export default ProfileHeader;