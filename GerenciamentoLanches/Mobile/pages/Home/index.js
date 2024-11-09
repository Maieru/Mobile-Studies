import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Touchable, TouchableOpacity, View, Image } from 'react-native';
import { styles } from '../../styles/homeStyles';

export default function Home({ route, navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.containerComMargin}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ListarSolicitacoes')}>
                    <Text style={styles.buttonText}>Gerenciamento de Lanches</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ListarAluno')}>
                    <Text style={styles.buttonText}>Cadastrar Alunos</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}