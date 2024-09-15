import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20
    },
    image: {
        width: 300,
        height: 300,
    },
    palavraChutadaContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    palavraChutada: {
        fontSize: 30,
        margin: 10,
    },
    letraChutada: {
        fontSize: 15,
        margin: 5,
    },
    letraContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    botaoLetra: {
        backgroundColor: 'lightblue',
        padding: 10,
        margin: 5,
    },
});  