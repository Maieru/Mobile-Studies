import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Touchable, TouchableOpacity, View, TextInput, Alert } from 'react-native';
import { styles as listagemStyles } from '../../styles/listagemStyles';
import { styles as formularioStyles } from '../../styles/formularioStyles';
import React, { useState, useEffect } from 'react';
import { TemaDbService } from '../../services/Database/temaDbService';
import { PerguntaDbService } from '../../services/Database/perguntaDbService';
import Listagem from '../../components/listagem';
import { useFocusEffect } from '@react-navigation/native';

export default function TemaForm({ route, navigation }) {
    const [id, setId] = useState(0);
    const [edicao, setEdicao] = useState(false);
    const [descricao, setDescricao] = useState('');
    const [perguntas, setPerguntas] = useState([]);

    useEffect(() => {
        if (route.params && route.params.temaEditando) {
            const fetchDataAsync = async () => {
                await carregaPerguntas();
            };

            setId(route.params.temaEditando.id);
            setDescricao(route.params.temaEditando.nome);
            setEdicao(true);
            fetchDataAsync();
        }
        else {
            let temaDbService = new TemaDbService();
            const fetchDataAsync = async () => {
                setId(await temaDbService.getNextAvailableId());
            };
            fetchDataAsync();
        }
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            const fetchDataAsync = async () => {
                await carregaPerguntas();
            };
            fetchDataAsync();
        }, [])
    );

    const carregaPerguntas = async () => {
        if (route.params) {
            let perguntaDbService = new PerguntaDbService();
            setPerguntas(await perguntaDbService.getPerguntasByTemaId(route.params.temaEditando.id));
        }
    }

    async function salvar() {
        let temaDbService = new TemaDbService();

        if (!await valida(temaDbService))
            return;

        const tema = {
            id: id,
            nome: descricao,
        };

        if (edicao) {
            if (await temaDbService.updateTema(tema) > 0) {
                Alert.alert('Tema atualizado com sucesso');
                navigation.navigate('ListarTemas');
            }
            else {
                Alert.alert('Erro ao atualizar tema');
            }
        }
        else {
            if (await temaDbService.insertTema(tema)) {
                Alert.alert('Tema inserido com sucesso');
                navigation.navigate('ListarTemas');
            }
            else {
                Alert.alert('Erro ao inserir tema');
            }
        }
    }

    async function valida(dbService) {
        if (id === 0) {
            Alert.alert('Preencha o id');
            return false;
        }

        if (isNaN(id)) {
            Alert.alert('Id deve ser um número. Preenche ele direito, pangaré.');
            return false;
        }

        if (id) {
            if (await dbService.getTemaById(id) != null && !edicao) {
                Alert.alert('Id já cadastrado');
                return;
            }
        }

        if (descricao === '') {
            Alert.alert('Preencha a descrição');
            return false;
        }

        return true;
    }

    return (
        <View style={formularioStyles.container}>
            <View style={formularioStyles.containerComMargin}>
                <View style={formularioStyles.containerInformacoes}>
                    <Text style={formularioStyles.label}>Id</Text>
                    <TextInput style={formularioStyles.textInput} onChangeText={text => setId(text)} value={id.toString()} keyboardType='numeric'></TextInput>
                    <Text style={formularioStyles.label}>Descrição</Text>
                    <TextInput style={formularioStyles.textInput} onChangeText={text => setDescricao(text)} value={descricao}></TextInput>
                    <TouchableOpacity style={formularioStyles.button} onPress={async () => await salvar()}>
                        <Text style={formularioStyles.buttonText}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {
                edicao &&
                <View style={formularioStyles.containerListagemDentroDeCadastro}>
                    <View style={formularioStyles.container}>
                        <Text style={formularioStyles.titulo}>Perguntas</Text>
                        <View style={formularioStyles.containerNoventaPorcento}>
                            <TouchableOpacity style={formularioStyles.button} onPress={() => navigation.navigate('PerguntasForms', { temaId: id, temaDescricao: descricao })}>
                                <Text style={formularioStyles.buttonText}>Incluir Pergunta</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={listagemStyles.containerListagem}>
                            <Listagem dados={perguntas}
                                seletorDescricao={elemento => `${elemento.id} - ${elemento.textoPergunta}`}
                                seletorId={elemento => elemento.id}
                                onEditar={elemento => navigation.navigate('PerguntasForms', { temaId: id, temaDescricao: descricao, perguntaEditando: elemento })}
                                onExcluir={async elemento => {
                                    let perguntaDbService = new PerguntaDbService();

                                    if (await perguntaDbService.deletePergunta(elemento.id) > 0)
                                        Alert.alert('Pergunta excluído com sucesso');

                                    carregaPerguntas();
                                }}></Listagem>
                        </View>
                    </View>
                </View>
            }
        </View>
    );
}