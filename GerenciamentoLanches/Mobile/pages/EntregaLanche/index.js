import { styles } from '../../styles/formularioStyles';
import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, Alert } from 'react-native';
import Listagem from '../../components/listagem';
import apiClient from '../../services/apiService';
import { useFocusEffect } from '@react-navigation/native';
import DateTimeInput from '../../components/DateTimeInput/index';
import { format } from 'date-fns';

export default function EntregarLanche({ route, navigation }) {
    const [solicitacoes, setSolicitacoes] = useState([]);
    const [data, setData] = useState(new Date());

    const fetchData = async () => {
        var alunosSalvos = await apiClient.get('/aluno/filter/getAll');

        var solicitacoesSalvas = await apiClient.get('/solicitacaoLanche/filter/getAllFromDateNaoEntregue/' + format(data, 'yyyy-MM-dd'));

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
    }, [data]);

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
                <View style={styles.containerListagem}>
                    <DateTimeInput type={'date'} onSave={setData} theDate={data} />
                    <Listagem dados={solicitacoes}
                        seletorDescricao={elemento => `${elemento.dataLiberacao} - ${elemento.nomeAluno} - Qtd. ${elemento.quantidadeLanches}`}
                        seletorId={elemento => elemento.ra}
                        onEditar={async elemento => {
                            var resposta = await apiClient.patch(`/solicitacaoLanche/setLancheEntregue/${elemento.id}`);

                            if (!(resposta && resposta.status && resposta.status == 200)) {
                                Alert.alert("Erro!", "Não foi possível salvar a solicitação.");
                            }

                            await fetchData();
                        }}
                        possuiExclusao={false}
                        textoBotaoEdicao='Marcar como Entregue'></Listagem>
                </View>
            </View>
        </View>
    );
}