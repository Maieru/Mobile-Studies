import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import { styles } from '../../styles/homeStyles';

export default function Home({ route, navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.containerComMargin}>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MenuJogar')}>
                    <Text style={styles.buttonText}>Iniciar Novo Jogo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ListarTemas')}>
                    <Text style={styles.buttonText}>Cadastrar Temas e Perguntas</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}