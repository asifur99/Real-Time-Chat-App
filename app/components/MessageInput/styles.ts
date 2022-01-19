/**
* Styles Used by the Message Input component
*/
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    main: {
        padding: 10,
    },
    row: {
        flexDirection: 'row',
    },
    inputContainer: {
        backgroundColor: '#f2f2f2',
        flex: 1,
        marginRight: 10,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#dedede',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
    },
    buttonContainer: {
        width: 50,
        height: 50,
        backgroundColor: '#ff8000',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        flex: 1,
        marginHorizontal: 5,
    },
    icon: {
        marginHorizontal: 5,
    }
});

export default styles;