import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    containerComMargin: {
        margin: 20,
        width: '90%',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        justifyContent: 'flex-start'
    },
    containerNoventaPorcento: {
        width: '90%',
    },
    containerBotaoIncluir: {
        flex: 1,
    },
    containerInformacoes: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flexDirection: 'column',
    },
    containerListagem: {
        flex: 7,
        width: '100%',
    },
    containerListagemDentroDeCadastro: {
        flex: 2,
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
        borderColor: '#bae6e3',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
    },
    label: {
        fontSize: 20,
        margin: 10,
    },
    titulo: {
        fontSize: 30,
        alignSelf: 'center',
    },
    pickerContainer: {
        borderColor: '#bae6e3',
        borderWidth: 2,
        borderRadius: 10,
        marginBottom: 10,
        width: '100%',
        paddingTop: 0,
        padding: 5,
        paddingBottom: 15,
        
    },
    picker: {
        height: 40,
        backgroundColor: '#fff',
    },
});
