import { styles } from '../../styles/formularioStyles';
import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, Alert } from 'react-native';
import Listagem from '../../components/listagem';
import apiClient from '../../services/apiService';
import { useFocusEffect } from '@react-navigation/native';

export default function ListarAluno({ route, navigation }) {

    const [alunos, setAlunos] = useState([]);

    const fetchData = async () => {
        var alunos = await apiClient.get('/aluno/filter/getAll');
        setAlunos(alunos.data);
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
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AlunoForm')}>
                        <Text style={styles.buttonText}>Incluir Aluno</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerListagem}>
                    <Listagem dados={alunos}
                        seletorDescricao={elemento => `${elemento.ra} - ${elemento.nome}`}
                        seletorId={elemento => elemento.ra}
                        onEditar={elemento => navigation.navigate('AlunoForm', { alunoEditando: elemento })}
                        onExcluir={async elemento => {
                            await apiClient.delete(`/aluno/${elemento.ra}`);
                            fetchData();
                        }}></Listagem>
                </View>
            </View>
        </View>
    );
}