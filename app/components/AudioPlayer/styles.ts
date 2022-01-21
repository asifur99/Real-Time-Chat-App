/**
* Styles Used by the Audio Player component
*/
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    audioContainer: {
        flexDirection: 'row',
        marginVertical: 10,
        padding: 10,
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'grey',
        backgroundColor: '#d6d5d2',
        borderRadius: 15,  
    },
    audioProgressB: {
        height: '50%',
        flex: 1,
        borderRadius: 5,
        margin: 5,
        backgroundColor: 'grey',
    },
    audioProgressF: {
        height: '100%',
        borderRadius: 5,
        backgroundColor: '#ff8000',
        position: 'absolute'
    }
});

export default styles;