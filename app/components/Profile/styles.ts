/**
* Styles Used by the Audio Player component
*/
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 10,
        backgroundColor: '#dedede',
        borderRadius: 15,
    },
    element: {
        padding: 10,
        flexDirection: 'row',
    },
    input: {
        flex: 1,
        fontSize: 16,
        borderWidth: 1,
        width: '70%',
    },
    headings: {
        fontWeight: 'bold',
        fontSize: 18,
    }
});

export default styles;