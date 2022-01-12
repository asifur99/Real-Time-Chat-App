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
    text: {
      color: '#8a8e94',
      fontSize: 16,
    },
    group: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    counterContainer: {
      backgroundColor: '#ff8000',
      width: 22,
      height: 22,
      borderRadius: 11,
      borderWidth: 1,
      borderColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      left: 48,
      top: 5,
    },
    counterText: {
      color: 'white',
      fontSize: 12,
    },
});

export default styles;