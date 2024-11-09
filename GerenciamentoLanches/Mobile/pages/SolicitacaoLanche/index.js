import { styles } from '../../styles/formularioStyles';
import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, Alert } from 'react-native';
import Listagem from '../../components/listagem';
import apiClient from '../../services/apiService';
import { useFocusEffect } from '@react-navigation/native';

export default function ListarSolicitacoes({ route, navigation }) {
    const [solicitacoes, setSolicitacoes] = useState([]);
    const [filtroData, setFiltroData] = useState('');

    const fetchData = async () => {
        var alunosSalvos = await apiClient.get('/aluno/filter/getAll');

        var solicitacoesSalvas = await apiClient.get('/solicitacaoLanche/filter/getAll');

        if (alunosSalvos) {
            solicitacoesSalvas.data.forEach(element => {
                var alunoAssociado = alunosSalvos.data.find(a => a.ra == element.codigoAluno);

                if (alunoAssociado)
                    element.nomeAluno = alunoAssociado.nome;
            }); 
        }


        setSolicitacoes(solicitacoesSalvas.data);
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
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SolicitacaoForm')}>
                        <Text style={styles.buttonText}>Incluir Solicitação</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerListagem}>
                    <Listagem dados={solicitacoes}
                        seletorDescricao={elemento => `${elemento.dataLiberacao} - ${elemento.nomeAluno} - ${elemento.quantidadeLanches}`}
                        seletorId={elemento => elemento.ra}
                        onEditar={elemento => navigation.navigate('SolicitacaoForm', { solicitacaoEditando: elemento })}
                        onExcluir={async elemento => {
                            await apiClient.delete(`/solicitacaoLanche/${elemento.id}`);
                            fetchData();
                        }}></Listagem>
                </View>
            </View>
        </View>
    );
}