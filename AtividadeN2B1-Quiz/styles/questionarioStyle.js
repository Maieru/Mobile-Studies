import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    pickerContainer: {
        borderColor: '#bae6e3',
        borderWidth: 2,
        borderRadius: 10,
        marginBottom: 10,
        width: '90%',
        paddingTop: 0,
        padding: 5,
        paddingBottom: 15,
        alignSelf: 'center',
    },
    picker: {
        height: 40,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 20,
        margin: 10,
        alignSelf: 'center',
        marginVertical: 5,
    },
    titleLabel: {
        fontSize: 40,
        margin: 10,
        alignSelf: 'center',
        marginVertical: 5,
        color: '#000',
    },
    textInput: {
        height: 40,
        width: '90%',
        borderColor: '#bae6e3',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        alignSelf: 'center',
    },
    button: {
        backgroundColor: '#bae6e3',
        width: '90%',
        padding: 10,
        margin: 20,
        borderRadius: 10,
        alignItems: 'center',
        alignSelf: 'center',
    },
    buttonText: {
        fontSize: 20,
    },
    perguntaContainer: {
        backgroundColor: '#fff',
        width: '90%',
        alignSelf: 'center',
        alignContent: 'center',
    },
    alternativaContainer: {
        borderColor: '#bae6e3',
        borderWidth: 3,
        borderRadius: 10,
        backgroundColor: '#fff',
        width: '90%',
        alignSelf: 'center',
        alignContent: 'center',
        marginVertical: 15,
    },
});