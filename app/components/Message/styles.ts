/**
* Styles Used by the Message component
*/
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    bubble: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
        maxWidth: '65%',
    },
    send: {
        backgroundColor: 'lightgrey',
        marginLeft: 'auto',
        marginRight: 12,
        
    },
    receive: {
        backgroundColor: '#ff8000',
        marginLeft: 12,
        marginRight: 'auto',
    }
});

export default styles;