import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#fff',
        marginBottom: 50,
    },
    item: {
        marginBottom: 10,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        borderColor: '#ddd',
        borderWidth: 0.5,
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
    buttonText: {
        color: '#000',
        textAlign: 'center',
    },
});