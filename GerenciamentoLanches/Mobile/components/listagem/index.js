import { StyleSheet, Text, TouchableOpacity, ScrollView, View, Alert } from 'react-native';
import { styles } from '../../styles/listagemStyles';

export default function Listagem({ dados, seletorDescricao, seletorId, onEditar, onExcluir }) {
    const confirmarExclusao = (element) => {
        Alert.alert(
            "Confirmação",
            "Você tem certeza que deseja excluir este item?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Excluir",
                    onPress: () => onExcluir(element),
                    style: "destructive"
                }
            ],
            { cancelable: true }
        );
    };
    return (
        <ScrollView style={[styles.container]}>
            {dados.map((element, index) => (
                <View key={seletorId(element)} style={styles.item}>
                    <Text style={styles.text}>{seletorDescricao(element)}</Text>
                    <TouchableOpacity style={styles.button} onPress={() => onEditar(element)}>
                        <Text style={styles.buttonText}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteButton} onPress={() => confirmarExclusao(element)}>
                        <Text style={styles.deleteButtonText}>Excluir</Text>
                    </TouchableOpacity>
                </View>
            ))}
            <View style={styles.espacamento}></View>
        </ScrollView>
    );
}