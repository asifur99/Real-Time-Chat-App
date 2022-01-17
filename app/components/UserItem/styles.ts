/**
 * Styles Used by the ChatRoomItem component
 */
 import { StyleSheet } from 'react-native';

 const styles = StyleSheet.create({
     container: {
       flexDirection: 'row',
       padding: 12,
     },
     chatBox: {
       flex: 1,
       justifyContent: 'center',
     },
     image: {
       height: 50,
       width: 50,
       borderRadius: 20,
       marginRight: 10,
     },
     name: {
       fontWeight: 'bold',
       fontSize: 18,
       marginBottom: 3,
     },
     group: {
       flexDirection: 'row',
       justifyContent: 'space-between',
     },
 });
 
 export default styles;