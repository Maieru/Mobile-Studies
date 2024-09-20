import { styles } from '../../styles/formularioStyles';
import { useEffect, useState } from 'react';
import { TemaDbService } from '../../services/Database/temaDbService';
import { StyleSheet, Text, Touchable, TouchableOpacity, View, FlatList } from 'react-native';
import Listagem from '../../components/listagem';

export default function ListarTemas({ route, navigation }) {

    const [temas, setTemas] = useState([]);

    const fetchData = async () => {
        let temaDbService = new TemaDbService();
        setTemas(await temaDbService.getAllTemas());
    }

    useEffect(() => {
        fetchData();

        return () => { };
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.containerComMargin}>
                <View style={styles.containerBotaoIncluir}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TemaForm')}>
                        <Text style={styles.buttonText}>Incluir Tema</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerListagem}>
                    <Listagem dados={temas}
                        seletorDescricao={elemento => `${elemento.id} - ${elemento.nome}`}
                        seletorId={elemento => elemento.id}></Listagem>
                </View>
            </View>
        </View>
    );
}