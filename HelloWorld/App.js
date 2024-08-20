import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { styles } from './styles';

export default function App() {

  const [nome, setNome] = useState('');

  function exibirNome() {
    Alert.alert(`Olá, ${nome}`);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World! This is my first app in react :)</Text>
      <Text style={styles.labelNome}>Digite seu nome</Text>
      <TextInput style={styles.inputNome} placeholder="Digite seu nome" onChangeText={text => setNome(text)} />
      <Text style={styles.labelNome}>Olá, {nome}</Text>
      <TouchableOpacity onLongPress={exibirNome}>
        <Text style={styles.pessoa}>🧑</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}