import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { useEffect, useState } from 'react';

export default function App() {
  const [matrixJogoVelha, setMatrixJogoVelha] = useState(['', '', '', '', '', '', '', '', '']);
  const [jogadorAtual, setJogadorAtual] = useState('X');

  useEffect(() => {
    // Botei só pra atualizar a tela. Complicado :/
    return () => {
      console.log('Jogo da Velha finalizado');
    }
  }, [matrixJogoVelha]);

  function jogar(posicao) {
    if (matrixJogoVelha[posicao] === '') {
      matrixJogoVelha[posicao] = jogadorAtual;
      setJogadorAtual(jogadorAtual === 'X' ? 'O' : 'X');
    }

    if (avaliaVitoria() !== '') {
      Alert.alert(`Jogador ${avaliaVitoria()} ganhou!`);
      setMatrixJogoVelha(['', '', '', '', '', '', '', '', '']);
    }

    if (avaliaEmpate()) {
      Alert.alert('Deu empate');
      setMatrixJogoVelha(['', '', '', '', '', '', '', '', '']);
    }
  }

  function avaliaVitoria() {
    if (matrixJogoVelha[0] === matrixJogoVelha[1] && matrixJogoVelha[1] === matrixJogoVelha[2] && matrixJogoVelha[0] !== '') {
      return matrixJogoVelha[0];
    }

    if (matrixJogoVelha[3] === matrixJogoVelha[4] && matrixJogoVelha[4] === matrixJogoVelha[5] && matrixJogoVelha[3] !== '') {
      return matrixJogoVelha[3];
    }

    if (matrixJogoVelha[6] === matrixJogoVelha[7] && matrixJogoVelha[7] === matrixJogoVelha[8] && matrixJogoVelha[6] !== '') {
      return matrixJogoVelha[6];
    }

    if (matrixJogoVelha[0] === matrixJogoVelha[3] && matrixJogoVelha[3] === matrixJogoVelha[6] && matrixJogoVelha[0] !== '') {
      return matrixJogoVelha[0];
    }

    if (matrixJogoVelha[1] === matrixJogoVelha[4] && matrixJogoVelha[4] === matrixJogoVelha[7] && matrixJogoVelha[1] !== '') {
      return matrixJogoVelha[1];
    }

    if (matrixJogoVelha[2] === matrixJogoVelha[5] && matrixJogoVelha[5] === matrixJogoVelha[8] && matrixJogoVelha[2] !== '') {
      return matrixJogoVelha[2];
    }

    if (matrixJogoVelha[0] === matrixJogoVelha[4] && matrixJogoVelha[4] === matrixJogoVelha[8] && matrixJogoVelha[0] !== '') {
      return matrixJogoVelha[0];
    }

    if (matrixJogoVelha[2] === matrixJogoVelha[4] && matrixJogoVelha[4] === matrixJogoVelha[6] && matrixJogoVelha[2] !== '') {
      return matrixJogoVelha[2];
    }

    return '';
  }

  function avaliaEmpate() {
    return matrixJogoVelha.filter((item) => item === '').length === 0;
  }

  return (
    <View style={styles.containerParent}>
      <View style={[styles.verticalContainer]}>
        <View style={[styles.horizontalContainer]}>
          <TouchableOpacity style={styles.box} onPress={() => jogar(0)}>
            <Text style={styles.text}>{matrixJogoVelha[0] === '' ? null : matrixJogoVelha[0] === 'X' ? '✖️' : '⭕'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box} onPress={() => jogar(1)}>
            <Text style={styles.text}>{matrixJogoVelha[1] === '' ? null : matrixJogoVelha[1] === 'X' ? '✖️' : '⭕'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box} onPress={() => jogar(2)}>
            <Text style={styles.text}>{matrixJogoVelha[2] === '' ? null : matrixJogoVelha[2] === 'X' ? '✖️' : '⭕'}</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.horizontalContainer]}>
          <TouchableOpacity style={styles.box} onPress={() => jogar(3)}>
            <Text style={styles.text}>{matrixJogoVelha[3] === '' ? null : matrixJogoVelha[3] === 'X' ? '✖️' : '⭕'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box} onPress={() => jogar(4)}>
            <Text style={styles.text}>{matrixJogoVelha[4] === '' ? null : matrixJogoVelha[4] === 'X' ? '✖️' : '⭕'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box} onPress={() => jogar(5)}>
            <Text style={styles.text}>{matrixJogoVelha[5] === '' ? null : matrixJogoVelha[5] === 'X' ? '✖️' : '⭕'}</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.horizontalContainer]}>
          <TouchableOpacity style={styles.box} onPress={() => jogar(6)}>
            <Text style={styles.text}>{matrixJogoVelha[6] === '' ? null : matrixJogoVelha[6] === 'X' ? '✖️' : '⭕'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box} onPress={() => jogar(7)}>
            <Text style={styles.text}>{matrixJogoVelha[7] === '' ? null : matrixJogoVelha[7] === 'X' ? '✖️' : '⭕'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box} onPress={() => jogar(8)}>
            <Text style={styles.text}>{matrixJogoVelha[8] === '' ? null : matrixJogoVelha[8] === 'X' ? '✖️' : '⭕'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}