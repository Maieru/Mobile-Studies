import { StyleSheet, Text, TouchableOpacity, ScrollView, View } from 'react-native';
import { styles } from '../../styles/listagemStyles';

export default function Listagem({ dados, seletorDescricao, seletorId, onEditar, onExcluir }) {
    return (
        <ScrollView style={[styles.container]}>
            {dados.map((element, index) => (
                <View key={seletorId(element)} style={styles.item}>
                    <Text style={styles.text}>{seletorDescricao(element)}</Text>
                    <TouchableOpacity style={styles.button} onPress={() => onEditar(element)}>
                        <Text style={styles.buttonText}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => onExcluir(element)}>
                        <Text style={styles.buttonText}>Excluir</Text>
                    </TouchableOpacity>
                </View>
            ))}
            <View style={styles.espacamento}></View>
        </ScrollView>
    );
}