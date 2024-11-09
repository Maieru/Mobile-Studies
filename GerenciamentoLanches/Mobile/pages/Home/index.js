import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Touchable, TouchableOpacity, View, Image } from 'react-native';
import { styles } from '../../styles/homeStyles';

export default function Home({ route, navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.containerComMargin}>                
                <Image source={require('../../assets/logoTrabalho.png')} style={styles.logo} />

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ListarAluno')}>
                    <Text style={styles.buttonText}>Cadastrar Alunos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ListarSolicitacoes')}>
                    <Text style={styles.buttonText}>Gerenciamento de Solicitacoes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EntregarLanche')}>
                    <Text style={styles.buttonText}>Entregar Lanches</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LanchesEntregues')}>
                    <Text style={styles.buttonText}>Visualizar Lanches Entregues</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}