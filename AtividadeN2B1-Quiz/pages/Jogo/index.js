import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Touchable, TouchableOpacity, View, TextInput, Alert } from 'react-native';
import { styles } from '../../styles/jogoStyles';
import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { TemaDbService } from '../../services/Database/temaDbService';
import { PerguntaDbService } from '../../services/Database/perguntaDbService';

export default function MenuJogar({ route, navigation }) {

    const [temas, setTemas] = useState([]);
    const [temaEscolhido, setTemaEscolhido] = useState(1);
    const [quantidadePerguntas, setQuantidadePerguntas] = useState();

    let temaDbService = new TemaDbService();
    let perguntaDbService = new PerguntaDbService();

    const fetchDataAsync = async () => {
        setTemas(await temaDbService.getAllTemas());
    };

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

    async function salvar() {

        if (!await validaTela())
            return;

        const perguntasPorTema = await perguntaDbService.getPerguntasByTemaId(temaEscolhido);
        const perguntasSelecionadas = selecionarPerguntasAleatorias(perguntasPorTema, parseInt(quantidadePerguntas, 10));

        console.log('perguntas:' + JSON.stringify(perguntasSelecionadas))
        navigation.navigate('Questionario', { perguntas: perguntasSelecionadas });
        Alert.alert('Iniciando questionário!');
    }

    function selecionarPerguntasAleatorias(perguntas, quantidade) {
        let perguntasSelecionadas = [];
        let copiaPerguntas = [...perguntas];

        for (let i = 0; i < quantidade; i++) {
            const indexAleatorio = Math.floor(Math.random() * copiaPerguntas.length);
            perguntasSelecionadas.push(copiaPerguntas[indexAleatorio]);
            copiaPerguntas.splice(indexAleatorio, 1);
        }
        return perguntasSelecionadas;
    }

    async function validaTela() {
        if (!temaEscolhido) {
            Alert.alert('Erro', 'Nenhum tema foi selecionado.');
            return false;
        }

        const quantidade = parseInt(quantidadePerguntas, 10);
        if (isNaN(quantidade) || quantidade <= 0) {
            Alert.alert('Erro', 'Informe uma quantidade de perguntas válida.');
            return false;
        }

        const perguntasDisponiveis = await perguntaDbService.getQuantidadePerguntaByTema(temaEscolhido);
        const numeroDePerguntas = perguntasDisponiveis[0].quantidade;
        if (quantidade > numeroDePerguntas) {
            Alert.alert('Erro', `O tema selecionado possui apenas ${numeroDePerguntas} perguntas disponíveis.`);
            return false;
        }

        return true;
    }

    return (<><View style={styles.container}>
        <Text style={styles.label}>Selecione o tema a ser jogado:</Text>
        <View style={styles.pickerContainer}>
            <Picker selectedValue={temaEscolhido}
                onValueChange={(itemValue, itemIndex) => setTemaEscolhido(itemValue)}
                mode='dropdown'
                style={styles.picker}>

                {temas.map((tema) => (
                    <Picker.Item key={tema.id} label={tema.nome} value={tema.id} />
                ))}
            </Picker>
        </View>
        <Text style={styles.label}>Selecione a quantidade de perguntas:</Text>
        <TextInput style={styles.textInput} keyboardType='numeric' onChangeText={text => setQuantidadePerguntas(text)} value={quantidadePerguntas}></TextInput>
        <TouchableOpacity style={styles.button} onPress={async () => await salvar()}>
            <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
    </View></>
    );
}