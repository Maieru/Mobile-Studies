import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    containerParent: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    verticalContainer: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 30,
    },
    horizontalContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 30,
    },
    box: {
        width: 75,
        height: 75,
        backgroundColor: 'white',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'black',
    },
    text: {
        fontSize: 30,
    }
});