import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { DataStore, Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { useWindowDimensions, View, Image, Text, Pressable, StyleSheet, Modal } from "react-native";
import { User } from "../src/models";
import Profile from "../components/Profile";

const HomeHeader = ({ id }) => {
  const [user, setUser] = useState<User | null>(null);
  const [modal, setModal] = useState(false);

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

  const navigation = useNavigation();

  const logout = () => {
    Auth.signOut();
  }

  return(
    <View style={{
      flexDirection: 'row', 
      justifyContent: 'space-between',
      width: width-25,
      padding: 10,
      alignItems: 'center',
    }}>
      <Modal
        visible={modal}
        animationType='fade'
      >
        <View style={styles.close}>
          <MaterialIcons 
            name='close' 
            size={24} 
            onPress={() => setModal(false)} 
          />
        </View>

        <Profile user={user} />
      </Modal>

      <Pressable onPress={() => setModal(true)}>
        <Image
          source={{uri: user?.imageUri}}
          style={{ 
            width: 50, 
            height: 50, 
            borderRadius: 15,
            borderWidth: 1,
          }}
        />
      </Pressable>
      
      <Text style={{flex: 1, textAlign: 'center', fontWeight: 'bold'}}>Real-Time-Chat-App</Text>
      <Pressable onPress={() => navigation.navigate('UsersScreen')}  style={styles.btn}>
        <MaterialCommunityIcons name="circle-edit-outline" size={24} color="black" />
      </Pressable>

      <Pressable onPress={logout} style={styles.btn}>
        <MaterialIcons name="logout" size={24} color="black" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: 'darkorange',
    borderRadius: 15,
    height: 50,
    width: 50,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  close: {
    backgroundColor: 'darkorange',
    borderRadius: 10,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    marginHorizontal: '97%',
  },
});

export default HomeHeader;