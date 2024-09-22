import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Touchable, TouchableOpacity, View, TextInput, Alert } from 'react-native';
import { styles } from '../../styles/questionarioStyle';
import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { TemaDbService } from '../../services/Database/temaDbService';
import { PerguntaDbService } from '../../services/Database/perguntaDbService';
import Resultados from '../Resultados';

export default function Questionario({ route, navigation }) {
    const { perguntas } = route.params;
    const [indiceAtual, setIndiceAtual] = useState(0);
    const [respostaEscolhida, setRespostaEscolhida] = useState(null);
    const [acertos, setAcertos] = useState(0);
    const [respostas, setRespostas] = useState([]);

    const perguntaAtual = perguntas[indiceAtual];

    const salvarResposta = () => {
        if (respostaEscolhida == null) {
            Alert.alert('Erro', 'Nenhuma alternativa foi escolhida.');
            return;
        }

        const acertou = parseInt(respostaEscolhida) === parseInt(perguntaAtual.alternativaCorreta);

        const respostaAtual = {
            pergunta: perguntaAtual.textoPergunta,
            alternativaEscolhida: respostaEscolhida,
            alternativaCorreta: perguntaAtual.alternativaCorreta,
            acertou: acertou
        };

        setRespostas(prevRespostas => {
            const novasRespostas = [...prevRespostas, respostaAtual];

            if (acertou) {
                setAcertos(prevAcertos => prevAcertos + 1);
                Alert.alert('Correto!', 'Você acertou a pergunta.', [
                    { text: 'OK', onPress: () => avancarParaProxima(novasRespostas) }
                ]);
            } else {
                Alert.alert('Errado!', `Você errou a pergunta. A alternativa correta era: ${perguntaAtual.alternativaCorreta}.`, [
                    { text: 'OK', onPress: () => avancarParaProxima(novasRespostas) }
                ]);
            }

            return novasRespostas;
        });
    };

    const avancarParaProxima = (novasRespostas) => {
        if (indiceAtual + 1 < perguntas.length) {
            setIndiceAtual(indiceAtual + 1);
            setRespostaEscolhida(null);
        } else {
            Alert.alert(
                'Fim do questionário!',
                `Você acertou ${acertos + 1} de ${perguntas.length} perguntas.`,
                [
                    { text: "Ver Resultados", onPress: () => verResultados(novasRespostas) },
                    { text: "Jogar Novamente", onPress: () => navigation.goBack() }
                ]
            );
        }
    };

    const verResultados = (respostasFinalizadas) => {
        navigation.navigate('Resultados', { respostas: respostasFinalizadas });
    };

    function handleClick(resposta) {
        setRespostaEscolhida(resposta);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titleLabel}>Pergunta {indiceAtual + 1} de {perguntas.length}</Text>
            <View style={styles.perguntaContainer}>
                <Text style={styles.label}>{perguntaAtual.textoPergunta}</Text>
            </View>
            <TouchableOpacity onPress={() => handleClick(1)}>
                <View style={styles.alternativaContainer}>
                    <Text style={styles.label}>Alternativa 1</Text>
                    <Text style={styles.label}>{perguntaAtual.alternativa1}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleClick(2)}>
                <View style={styles.alternativaContainer}>
                    <Text style={styles.label}>Alternativa 2</Text>
                    <Text style={styles.label}>{perguntaAtual.alternativa2}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleClick(3)}>
                <View style={styles.alternativaContainer}>
                    <Text style={styles.label}>Alternativa 3</Text>
                    <Text style={styles.label}>{perguntaAtual.alternativa3}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleClick(4)}>
                <View style={styles.alternativaContainer}>
                    <Text style={styles.label}>Alternativa 4</Text>
                    <Text style={styles.label}>{perguntaAtual.alternativa4}</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={salvarResposta}>
                <Text style={styles.buttonText}>Salvar alternativa: {respostaEscolhida}</Text>
            </TouchableOpacity>
        </View>
    );
}