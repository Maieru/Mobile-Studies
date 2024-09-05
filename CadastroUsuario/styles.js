import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 30
    },
    verticalContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    text: {
        fontSize: 20,
        color: 'black',
    },
    textInput: {
        width: '100%',
        height: 40,
        margin: 12,
        fontSize: 20,
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        textAlign: 'right',
        marginTop: 10,
    },
    botao: {
        backgroundColor: '#1141f1',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    containerHorizontal: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        columnGap: 10,
    },
    senha: {
        height: 40,
        fontSize: 20,
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        textAlign: 'right',
        marginTop: 10,
        flex: 9
    },
    visualizarSenha: {
        flex: 1,
        margin: 10,
        marginTop: 10,
    },
    espacoVertical: {
        height: 10
    }
});
