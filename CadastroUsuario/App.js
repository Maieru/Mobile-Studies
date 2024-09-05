import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { styles } from './styles';
import { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [codigo, setCodigo] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmacao, setConfirmacao] = useState('');
  const [visualizarSenha, setVisualizarSenha] = useState(true);

  useEffect(() => {}, visualizarSenha);

  async function salva() {
    let objeto = {
      codigo,
      nome,
      email,
      senha
    }

    if (!validar(objeto, confirmacao))
      return;

    await AsyncStorage.setItem('@usuario', JSON.stringify(objeto));
    Alert.alert('Salvo com sucesso!');
    console.log(visualizarSenha);
  }

  function validar(objeto, confirmacaoSenha) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (objeto.codigo == undefined || objeto.codigo == '') {
      Alert.alert('Preencha o campo código');
      return false;
    }

    if (objeto.nome == undefined || objeto.nome == '') {
      Alert.alert('Preencha o campo nome');
      return false;
    }

    if (objeto.email == undefined || objeto.email == '' || !emailRegex.test(objeto.email)) {
      Alert.alert('Preencha o campo email');
      return false;
    }

    if (objeto.senha == undefined || objeto.senha == '') {
      Alert.alert('Preencha o campo senha');
      return false;
    }

    if (objeto.senha != confirmacaoSenha) {
      Alert.alert('Digita a senha direito');
      return false;
    }

    return true;
  }

  function limpar() {
    setCodigo('');
    setNome('');
    setEmail('');
    setSenha('');
    setConfirmacao('');
  }

  async function carregar() {
    const objeto = await AsyncStorage.getItem('@usuario');

    if (objeto != null) {
      const usuario = JSON.parse(objeto);
      setCodigo(usuario.codigo);
      setNome(usuario.nome);
      setEmail(usuario.email);
      setSenha(usuario.senha);
      setConfirmacao(usuario.senha);
    } else {
      Alert.alert('Não há dados cadastrados');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.verticalContainer}>
        <Text style={styles.text}>Código</Text>
        <TextInput style={styles.textInput} onChangeText={text => setCodigo(text)} value={codigo}></TextInput>

        <Text style={styles.text}>Nome</Text>
        <TextInput style={styles.textInput} onChangeText={text => setNome(text)} value={nome}></TextInput>

        <Text style={styles.text}>Email</Text>
        <TextInput style={styles.textInput} onChangeText={text => setEmail(text)} value={email}></TextInput>

        <Text style={styles.text}>Senha</Text>
        <View style={styles.containerHorizontal}>
          <TextInput style={styles.senha} onChangeText={text => setSenha(text)} value={senha} secureTextEntry={visualizarSenha}></TextInput>
          <TouchableOpacity style={styles.visualizarSenha} onPress={() => setVisualizarSenha(!visualizarSenha)}>
            <Text style={styles.text}>{visualizarSenha ? '🙈' : '👁️'}</Text> 
          </TouchableOpacity>
        </View>

        <View style={styles.espacoVertical}></View>

        <Text style={styles.text}>Confirmação Senha</Text>
        <TextInput style={styles.textInput} onChangeText={text => setConfirmacao(text)} value={confirmacao} secureTextEntry={visualizarSenha}></TextInput>

        <View style={styles.containerHorizontal}>
          <TouchableOpacity style={styles.botao} onPress={async () => await salva()}>
            <Text style={styles.text}>Cadastrar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botao} onPress={limpar}>
            <Text style={styles.text}>Limpar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botao} onPress={async () => await carregar()}>
            <Text style={styles.text}>Carregar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}