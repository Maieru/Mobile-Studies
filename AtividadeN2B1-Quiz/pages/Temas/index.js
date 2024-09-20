import { styles } from '../../styles/formularioStyles';
import { useEffect, useState } from 'react';
import { TemaDbService } from '../../services/Database/temaDbService';
import { StyleSheet, Text, Touchable, TouchableOpacity, View, FlatList } from 'react-native';

export default function ListarTemas({ route, navigation }) {

    const [temas, setTemas] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let temaDbService = new TemaDbService();
            setTemas(await temaDbService.getAllTemas());
        }

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
                    <FlatList
                        data={temas}
                        renderItem={({ item }) => (
                            <View style={styles.item}>
                                <Text style={styles.itemText}>{item.nome}</Text>
                            </View>
                        )}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
        </View>
    );
}