import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/resultadoStyles';

export default function Resultados({ route, navigation }) {
    const { respostas } = route.params;
    const totalPerguntas = respostas.length;
    const acertos = respostas.filter(resposta => resposta.acertou).length;
    const percentualAcertos = ((acertos / totalPerguntas) * 100).toFixed(2);

    return (
        <View style={styles.container}>
            <Text style={styles.titleLabel}>Resultados do Questionário</Text>
            <View style={styles.resultSummary}>
                <Text style={styles.summaryText}>Total de Perguntas: {totalPerguntas}</Text>
                <Text style={styles.summaryText}>Acertos: {acertos} ({percentualAcertos}%)</Text>
            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText} onPress={() => navigation.navigate("Home")}>Retornar para Tela Principal</Text>
            </TouchableOpacity> 
            <ScrollView>
                {respostas.map((resposta, index) => (
                    <View key={index} style={styles.resultadoContainer}>
                        <Text style={styles.label}>Pergunta: {resposta.pergunta}</Text>
                        <Text style={styles.label}>Sua Resposta: Alternativa {resposta.alternativaEscolhida}</Text>
                        <Text style={styles.label}>Resposta Correta: Alternativa {resposta.alternativaCorreta}</Text>
                        <Text style={styles.label}>Resultado: {resposta.acertou ? "Acertou" : "Errou"}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}