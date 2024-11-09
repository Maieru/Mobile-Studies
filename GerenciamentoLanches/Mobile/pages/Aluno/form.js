import { StyleSheet, Text, Touchable, TouchableOpacity, View, TextInput, Alert, Image } from 'react-native';
import { styles as formularioStyles } from '../../styles/formularioStyles';
import React, { useState, useEffect } from 'react';
import apiClient from '../../services/apiService';
import * as ImagePicker from 'expo-image-picker';

export default function AlunoForm({ route, navigation }) {
    const [ra, setRA] = useState(0);
    const [nome, setNome] = useState('');
    const [imagem, setImagem] = useState([]);

    const [edicao, setEdicao] = useState(false);

    useEffect(() => {
        if (route.params && route.params.alunoEditando) {
            setRA(route.params.alunoEditando.ra);
            setNome(route.params.alunoEditando.nome);
            setImagem(route.params.alunoEditando.foto);
            setEdicao(true);
        }
    }, []);

    async function selecionarImagem() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.1,
            base64: true
        });

        if (result.didCancel) {
            console.log('User cancelled image picker');
        } else if (result.error) {
            console.log('ImagePicker Error: ', result.error);
        } else {
            const source = result.assets[0].base64;
            console.log(source);
            setImagem(source);
        }
    };

    async function salvar() {
        const aluno = {
            ra: ra,
            nome: nome,
            foto: imagem
        };

        if (edicao) {
            var resposta = await apiClient.put(`/aluno/${ra}`, aluno);

            if (resposta && resposta.status && resposta.status == 200) {
                navigation.navigate('ListarAluno');
            }
            else {
                Alert.alert("Erro!", "Não foi possível salvar o aluno.");
            }
        } else {
            var resposta = await apiClient.post('/aluno', aluno);

            if (resposta && resposta.status && resposta.status == 200) {
                navigation.navigate('ListarAluno');
            }
            else {
                Alert.alert("Erro!", "Não foi possível salvar o aluno.");
            }
        }
    }

    return (
        <View style={formularioStyles.container}>
            <View style={formularioStyles.containerComMargin}>
                <View style={formularioStyles.containerInformacoes}>
                    <Text style={formularioStyles.label}>RA</Text>
                    <TextInput style={formularioStyles.textInput} onChangeText={text => setRA(text)} value={ra.toString()} keyboardType='numeric'></TextInput>
                    <Text style={formularioStyles.label}>Nome</Text>
                    <TextInput style={formularioStyles.textInput} onChangeText={text => setNome(text)} value={nome}></TextInput>
                    <TouchableOpacity style={formularioStyles.button} onPress={selecionarImagem}>
                        <Text style={formularioStyles.buttonText}>Selecionar Imagem</Text>
                    </TouchableOpacity>
                    {imagem && <Image source={{ uri: `data:image/jpeg;base64,${imagem}` }} style={formularioStyles.imagem} />}
                    <TouchableOpacity style={formularioStyles.button} onPress={async () => await salvar()}>
                        <Text style={formularioStyles.buttonText}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}