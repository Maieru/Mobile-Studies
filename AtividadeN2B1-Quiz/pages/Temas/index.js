import { styles } from '../../styles/formularioStyles';
import React, { useState, useEffect } from 'react';
import { TemaDbService } from '../../services/Database/temaDbService';
import { Text, TouchableOpacity, View, Alert } from 'react-native';
import Listagem from '../../components/listagem';
import { useFocusEffect } from '@react-navigation/native';

export default function ListarTemas({ route, navigation }) {

    const [temas, setTemas] = useState([]);

    const fetchData = async () => {
        let temaDbService = new TemaDbService();
        setTemas(await temaDbService.getAllTemas());
    }

    useEffect(() => {
        const fetchDataAsync = async () => {
            await fetchData();
        };
        fetchDataAsync();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            const fetchDataAsync = async () => {
                await fetchData();
            };
            fetchDataAsync();
        }, [])
    );


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
                        seletorId={elemento => elemento.id}
                        onEditar={elemento => navigation.navigate('TemaForm', { temaEditando: elemento })}
                        onExcluir={async elemento => {
                            let temaDbService = new TemaDbService();

                            if (await temaDbService.deleteTema(elemento.id) > 0)
                                Alert.alert('Tema excluído com sucesso');

                            fetchData();
                        }}></Listagem>
                </View>
            </View>
        </View>
    );
}