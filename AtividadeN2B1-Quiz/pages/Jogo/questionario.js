import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Touchable, TouchableOpacity, View, TextInput, Alert } from 'react-native';
import { styles } from '../../styles/questionarioStyle';
import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { TemaDbService } from '../../services/Database/temaDbService';
import { PerguntaDbService } from '../../services/Database/perguntaDbService';

export default function Questionario({ route, navigation }) {
    const { perguntas } = route.params;
    const [indiceAtual, setIndiceAtual] = useState(0);
    const [respostaEscolhida, setRespostaEscolhida] = useState(null);
    const [acertos, setAcertos] = useState(0);

    const perguntaAtual = perguntas[indiceAtual];

    const salvarResposta = () => {
        if(respostaEscolhida == null)
        {
            Alert.alert('Erro', 'Nenhuma alternativa foi escolhida.')
            return;
        }

        if (parseInt(respostaEscolhida) === parseInt(perguntaAtual.alternativaCorreta)) {
            setAcertos(acertos + 1);
            Alert.alert('Correto!', 'Você acertou a pergunta.');
        } else {
            Alert.alert('Errado!', `Você errou a pergunta, a alternativa correta era: ${perguntaAtual.alternativaCorreta}.`);
        }

        if (indiceAtual + 1 < perguntas.length) {
            setIndiceAtual(indiceAtual + 1);
            setRespostaEscolhida(null);
        } else {
            Alert.alert(`Fim do questionário!`, `Você acertou ${acertos} de ${perguntas.length} perguntas.`);
            //navigation.goBack();
        }

        limpaVariaveis();
    };

    function limpaVariaveis(){
        setRespostaEscolhida(null);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titleLabel}>Pergunta {indiceAtual + 1} de {perguntas.length}</Text>
            <View style={styles.perguntaContainer}>
                <Text style={styles.label}>{perguntaAtual.textoPergunta}</Text>
            </View>
            <View style={styles.alternativaContainer}>
                <Text style={styles.label}>Alternativa 1</Text>
                <Text style={styles.label}>{perguntaAtual.alternativa1}</Text>
            </View>
            <View style={styles.alternativaContainer}>
                <Text style={styles.label}>Alternativa 2</Text>
                <Text style={styles.label}>{perguntaAtual.alternativa2}</Text>
            </View>

            <View style={styles.alternativaContainer}>
                <Text style={styles.label}>Alternativa 3</Text>
                <Text style={styles.label}>{perguntaAtual.alternativa3}</Text>
            </View>

            <View style={styles.alternativaContainer}>
                <Text style={styles.label}>Alternativa 4</Text>
                <Text style={styles.label}>{perguntaAtual.alternativa4}</Text>
            </View>

            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={respostaEscolhida}
                    onValueChange={(itemValue) => setRespostaEscolhida(itemValue)}
                    mode='dropdown'
                    style={styles.picker}
                >
                    <Picker.Item label="Selecione uma alternativa" value={null} />
                    <Picker.Item label={perguntaAtual.alternativa1} value="1" />
                    <Picker.Item label={perguntaAtual.alternativa2} value="2" />
                    <Picker.Item label={perguntaAtual.alternativa3} value="3" />
                    <Picker.Item label={perguntaAtual.alternativa4} value="4" />
                </Picker>
            </View>

            <TouchableOpacity style={styles.button} onPress={salvarResposta}>
                <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
        </View>
    );
}