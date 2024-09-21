import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#fff',
        height: '100%',
    },
    item: {
        marginBottom: 10,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 3,
        borderColor: '#bae6e3',
        borderWidth: 2,
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
    },
    button: {
        marginTop: 5,
        padding: 10,
        backgroundColor: '#bae6e3',
        borderRadius: 5,
    },
    deleteButton: {
        marginTop: 5,
        padding: 10,
        backgroundColor: '#d55',
        borderRadius: 5,
    },
    buttonText: {
        color: '#000',
        textAlign: 'center',
    },
    deleteButtonText: {
        color: '#fff',
        textAlign: 'center',
    },
    espacamento: {
        margin: 50,
    }
});