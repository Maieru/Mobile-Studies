import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerComMargin: {
        margin: 20,
        width: '90%',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    containerBotaoIncluir: {
        flex: 1,
    },
    containerListagem: {
        flex: 7,
        width: '100%',
    },
    button: {
        backgroundColor: '#bae6e3',
        width: '100%',
        padding: 10,
        margin: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 20,
    },
    textInput: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    },
    label: {
        fontSize: 20,
        margin: 10,
    },
});
