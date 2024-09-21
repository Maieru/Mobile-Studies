import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Touchable, TouchableOpacity, View, TextInput, Alert } from 'react-native';
import { styles } from '../../styles/formularioStyles';
import React, { useState, useEffect } from 'react';
import { TemaDbService } from '../../services/Database/temaDbService';
import { PerguntaDbService } from '../../services/Database/perguntaDbService';
import Listagem from '../../components/listagem';
import { useFocusEffect } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

export default function PerguntasForms({ route, navigation }) {
    const [id, setId] = useState(0);
    const [pergunta, setPergunta] = useState('');
    const [alternativa1, setalternativa1] = useState('');
    const [alternativa2, setalternativa2] = useState('');
    const [alternativa3, setalternativa3] = useState('');
    const [alternativa4, setalternativa4] = useState('');
    const [alternativaCorreta, setAlternativaCorreta] = useState(1);
    const [temaId, setTemaId] = useState(0);
    const [temaDescricao, setTemaDescricao] = useState('');
    const [edicao, setEdicao] = useState(false);

    useEffect(() => {
        setTemaId(route.params.temaId);
        setTemaDescricao(route.params.temaDescricao);

        if (route.params && route.params.perguntaEditando) {
            setId(route.params.perguntaEditando.id);
            setPergunta(route.params.perguntaEditando.textoPergunta);
            setalternativa1(route.params.perguntaEditando.alternativa1);
            setalternativa2(route.params.perguntaEditando.alternativa2);
            setalternativa3(route.params.perguntaEditando.alternativa3);
            setalternativa4(route.params.perguntaEditando.alternativa4);
            setAlternativaCorreta(route.params.perguntaEditando.alternativaCorreta);
            setTemaId(route.params.perguntaEditando.temaId);
            setEdicao(true);
        }
        else {
            let perguntaDbService = new PerguntaDbService();
            const fetchDataAsync = async () => {
                setId(await perguntaDbService.getNextAvailableId());
            };
            fetchDataAsync();
        }
    }, []);

    async function salvar() {
        let perguntaDbService = new PerguntaDbService();

        if (!await valida(perguntaDbService))
            return;

        const perguntaModel = {
            id: id,
            textPergunta: pergunta,
            alternativa1: alternativa1,
            alternativa2: alternativa2,
            alternativa3: alternativa3,
            alternativa4: alternativa4,
            alternativaCorreta: alternativaCorreta,
            temaId: temaId
        };

        if (edicao) {
            if (await perguntaDbService.updatePergunta(perguntaModel) > 0) {
                Alert.alert('Pergunta atualizado com sucesso');
                navigation.navigate('TemaForm', { temaEditando: { id: temaId, nome: temaDescricao } });
            }
            else {
                Alert.alert('Erro ao atualizar pergunta');
            }
        }
        else {
            if (await perguntaDbService.insertPergunta(perguntaModel)) {
                Alert.alert('Pergunta inserido com sucesso');
                navigation.navigate('TemaForm', { temaEditando: { id: temaId, nome: temaDescricao } });
            }
            else {
                Alert.alert('Erro ao inserir pergunta');
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
            if (await dbService.getPerguntaById(id) != null && !edicao) {
                Alert.alert('Id já cadastrado');
                return;
            }
        }

        if (pergunta === '' || pergunta === undefined) {
            Alert.alert('Preencha a pergunta');
            return false;
        }

        if (alternativa1 === '' || alternativa1 === undefined) {
            Alert.alert('Preencha a alternativa 1');
            return false;
        }

        if (alternativa2 === '' || alternativa2 === undefined) {
            Alert.alert('Preencha a alternativa 2');
            return false;
        }

        if (alternativa3 === '' || alternativa3 === undefined) {
            Alert.alert('Preencha a alternativa 3');
            return false;
        }

        if (alternativa4 === '' || alternativa4 === undefined) {
            Alert.alert('Preencha a alternativa 4');
            return false;
        }

        if (alternativaCorreta === 0) {
            Alert.alert('Selecione a alternativa correta');
            return false;
        }

        return true;
    }

    return (<View style={styles.container}>
        <View style={styles.containerComMargin}>
            <View style={styles.containerInformacoes}>
                <Text style={styles.label}>Tema</Text>
                <TextInput style={styles.textInput} value={`${temaId} - ${temaDescricao}`} editable={false} keyboardType='numeric'></TextInput>
                <Text style={styles.label}>Id</Text>
                <TextInput style={styles.textInput} onChangeText={text => setId(text)} value={id.toString()} keyboardType='numeric'></TextInput>
                <Text style={styles.label}>Pergunta</Text>
                <TextInput style={styles.textInput} onChangeText={text => setPergunta(text)} value={pergunta}></TextInput>
                <Text style={styles.label}>Alternativa 1</Text>
                <TextInput style={styles.textInput} onChangeText={text => setalternativa1(text)} value={alternativa1}></TextInput>
                <Text style={styles.label}>Alternativa 2</Text>
                <TextInput style={styles.textInput} onChangeText={text => setalternativa2(text)} value={alternativa2}></TextInput>
                <Text style={styles.label}>Alternativa 3</Text>
                <TextInput style={styles.textInput} onChangeText={text => setalternativa3(text)} value={alternativa3}></TextInput>
                <Text style={styles.label}>Alternativa 4</Text>
                <TextInput style={styles.textInput} onChangeText={text => setalternativa4(text)} value={alternativa4}></TextInput>
                <Text style={styles.label}>Alternativa Correta</Text>
                <View style={styles.pickerContainer}>
                    <Picker selectedValue={alternativaCorreta}
                        onValueChange={(itemValue, itemIndex) => setAlternativaCorreta(itemValue)}
                        mode='dropdown'
                        style={styles.picker} >
                        <Picker.Item label="Alternativa 1" value={1} />
                        <Picker.Item label="Alternativa 2" value={2} />
                        <Picker.Item label="Alternativa 3" value={3} />
                        <Picker.Item label="Alternativa 4" value={4} />
                    </Picker>
                </View>
                <TouchableOpacity style={styles.button} onPress={async () => await salvar()}>
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
    );
};