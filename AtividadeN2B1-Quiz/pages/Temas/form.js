import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Touchable, TouchableOpacity, View, TextInput, Alert } from 'react-native';
import { styles } from '../../styles/formularioStyles';
import { useState, useEffect } from 'react';
import { TemaDbService } from '../../services/Database/temaDbService';

export default function TemaForm({ route, navigation }) {
    const [id, setId] = useState(0);
    const [edicao, setEdicao] = useState(false);
    const [descricao, setDescricao] = useState('');

    useEffect(() => {
        if (route.params && route.params.temaEditando) {
            setId(route.params.temaEditando.id);
            setDescricao(route.params.temaEditando.descricao);
            setEdicao(true);
        }
    }, []);

    async function salvar() {
        let temaDbService = new TemaDbService();

        if (!await valida(temaDbService))
            return;

        const tema = {
            id: id,
            nome: descricao,
        };

        if (edicao) {
            await temaDbService.updateTema(tema);
        }
        else {
            await temaDbService.insertTema(tema);
        }
    }

    async function valida(dbService) {
        if (id === 0) {
            Alert.alert('Preencha o id');
            return false;
        }

        if (await dbService.getTemaById(id) != null && !edicao) {
            Alert.alert('Id já cadastrado');
            return;
        }

        if (descricao === '') {
            Alert.alert('Preencha a descrição');
            return false;
        }

        return true;
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerComMargin}>
                <Text style={styles.label}>Id</Text>
                <TextInput style={styles.textInput} onChangeText={text => setId(text)} value={id}></TextInput>
                <Text style={styles.label}>Descrição</Text>
                <TextInput style={styles.textInput} onChangeText={text => setDescricao(text)} value={descricao}></TextInput>
                <TouchableOpacity style={styles.button} onPress={async () => await salvar()}>
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}