import { StyleSheet } from 'react-native';

export const defaultStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
    },
    verticalContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        rowGap: 10,
    },
    verticalContainerButtons: {
        flexDirection: 'column',
        alignItems: 'right',
        width: '49%', // O rowgap não conta
        rowGap: 10,
    },
    horizontalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        columnGap: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    icon: {
        fontSize: 150,
    },
    label: {
        fontSize: 15,
    },
    input: {
        width: '100%',
        height: 40,
        fontSize: 20,
        padding: 10,
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 10,
        textAlign: 'right',
        marginTop: 10,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#10a5b0',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
    },
    buttonText: {
        fontSize: 15,
    },
    resultado: {
        fontSize: 15,
        fontWeight: 'bold'
    }
});