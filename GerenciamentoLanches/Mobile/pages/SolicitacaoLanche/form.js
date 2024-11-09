import { StyleSheet, Text, Touchable, TouchableOpacity, View, TextInput, Alert, Image } from 'react-native';
import { styles as formularioStyles } from '../../styles/formularioStyles';
import React, { useState, useEffect } from 'react';
import apiClient from '../../services/apiService';
import { Picker } from '@react-native-picker/picker';
import DateTimeInput from '../../components/DateTimeInput/index';
import { format } from 'date-fns';

export default function SolicitacaoForm({ route, navigation }) {
    const [id, setId] = useState(0);
    const [data, setData] = useState(new Date());
    const [quantidadeLanches, setQuantidadeLanches] = useState(0);
    const [codigoAluno, setCodigoAluno] = useState(0);
    const [imagemAtual, setImagemAtual] = useState('')

    const [edicao, setEdicao] = useState(false);
    const [alunos, setAlunos] = useState([]);

    const fetchData = async () => {
        var alunosSalvos = await apiClient.get('/aluno/filter/getAll');
        setAlunos(alunosSalvos.data);
    }

    useEffect(() => {
        const fetchDataAsync = async () => {
            await fetchData();
        };

        fetchDataAsync();

        if (route.params && route.params.solicitacaoEditando) {
            setId(route.params.solicitacaoEditando.id);
            setData(new Date(route.params.solicitacaoEditando.dataLiberacao));
            setQuantidadeLanches(route.params.solicitacaoEditando.quantidadeLanches);
            setCodigoAluno(route.params.solicitacaoEditando.codigoAluno);
            setEdicao(true);
        }
    }, []);

    async function salvar() {
        const solicitacao = {
            id: id,
            dataLiberacao: format(data, 'yyyy-MM-dd'),
            codigoAluno: codigoAluno,
            quantidadeLanches: quantidadeLanches
        };

        if (edicao) {
            var resposta = await apiClient.put(`/solicitacaoLanche/${id}`, solicitacao);

            if (resposta && resposta.status && resposta.status == 200) {
                navigation.navigate('ListarSolicitacoes');
            }
            else {
                Alert.alert("Erro!", "Não foi possível salvar a solicitação.");
            }
        } else {
            var resposta = await apiClient.post('/solicitacaoLanche', solicitacao);

            if (resposta && resposta.status && resposta.status == 200) {
                navigation.navigate('ListarSolicitacoes');
            }
            else {
                Alert.alert("Erro!", "Não foi possível salvar a solicitação.");
            }
        }
    }

    function mudaAluno(ra) {
        var aluno = alunos.find(a => a.ra == ra);

        if (aluno && aluno.foto)
            setImagemAtual(aluno.foto);
        else
            setImagemAtual(undefined);

        setCodigoAluno(ra);
    }

    return (
        <View style={formularioStyles.container}>
            <View style={formularioStyles.containerComMargin}>
                <View style={formularioStyles.containerInformacoes}>
                    <Text style={formularioStyles.label}>Codigo</Text>
                    <TextInput style={formularioStyles.textInput} onChangeText={text => setId(text)} value={id.toString()} keyboardType='numeric'></TextInput>
                    <Text style={formularioStyles.label}>Data Liberação</Text>
                    <DateTimeInput type={'date'} onSave={setData} theDate={data} />
                    <Text style={formularioStyles.label}>Quantidade Lanches</Text>
                    <TextInput style={formularioStyles.textInput} onChangeText={text => setQuantidadeLanches(text)} value={quantidadeLanches.toString()} keyboardType='numeric'></TextInput>
                    <Text style={formularioStyles.label}>Aluno</Text>
                    <Picker
                        selectedValue={codigoAluno}
                        onValueChange={(itemValue, itemIndex) => mudaAluno(itemValue)}
                        style={formularioStyles.picker}
                    >
                        {alunos.map((aluno) => (
                            <Picker.Item key={aluno.ra} label={aluno.nome} value={aluno.ra} />
                        ))}
                    </Picker>
                    {imagemAtual && <Image source={{ uri: `data:image/jpeg;base64,${imagemAtual}` }} style={formularioStyles.imagem} />}

                    <TouchableOpacity style={formularioStyles.button} onPress={async () => await salvar()}>
                        <Text style={formularioStyles.buttonText}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}