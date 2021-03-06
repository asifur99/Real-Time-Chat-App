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
    },
    imageContainer: {
        flexDirection: 'row',
        marginVertical: 10,
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 15,
    },
    imgStyle: { 
        width: 100, 
        height: 100, 
        margin: 5,
        borderRadius: 10,
    },
    imgProgressView: {
        flex: 1,
        justifyContent: 'flex-start',
        alignSelf: 'flex-end',
        margin: 2,
    },
    imgProgress: { 
        height: 4,
        borderRadius: 5,
        backgroundColor: '#ff8000',
    },
});

export default styles;