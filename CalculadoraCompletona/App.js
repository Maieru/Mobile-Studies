import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import { defaultStyles } from './styles';
import { useState } from 'react';

export default function App() {
  const [campo1, setCampo1] = useState(0);
  const [campo2, setCampo2] = useState(0);
  const [resultado, setResultado] = useState();

  function somar() {
    if (campo1 == '' || campo2 == '')
      Alert.alert('Preencha os 2 campos!');
    else {
      let v1 = Number.parseFloat(campo1.replace(',', '.'));
      let v2 = Number.parseFloat(campo2.replace(',', '.'));
      setResultado(v1 + v2);
    }
  }

  function substrair() {
    if (campo1 == '' || campo2 == '')
      Alert.alert('Preencha os 2 campos!');
    else {
      let v1 = Number.parseFloat(campo1.replace(',', '.'));
      let v2 = Number.parseFloat(campo2.replace(',', '.'));
      setResultado(v1 - v2);
    }
  }

  function multiplicar() {
    if (campo1 == '' || campo2 == '')
      Alert.alert('Preencha os 2 campos!');
    else {
      let v1 = Number.parseFloat(campo1.replace(',', '.'));
      let v2 = Number.parseFloat(campo2.replace(',', '.'));
      setResultado(v1 * v2);
    }
  }

  function dividir() {
    if (campo1 == '' || campo2 == '')
      Alert.alert('Preencha os 2 campos!');
    else {
      let v1 = Number.parseFloat(campo1.replace(',', '.'));
      let v2 = Number.parseFloat(campo2.replace(',', '.'));

      if (v2 == 0) {
        Alert.alert('Preenche o campo 2 direito');
        return;
      }

      setResultado(v1 / v2);
    }
  }

  function exponenciacao() {
    if (campo1 == '' || campo2 == '')
      Alert.alert('Preencha os 2 campos!');
    else {
      let v1 = Number.parseFloat(campo1.replace(',', '.'));
      let v2 = Number.parseFloat(campo2.replace(',', '.'));
      setResultado(Math.pow(v1, v2));
    }
  }

  function raiz() {
    if (campo1 == '' || campo2 == '')
      Alert.alert('Preencha os 2 campos!');
    else {
      let v1 = Number.parseFloat(campo1.replace(',', '.'));
      let v2 = Number.parseFloat(campo2.replace(',', '.'));
      setResultado(Math.pow(v1, 1 / v2));
    }
  }

  function limpar() {
    setResultado();
  }

  return (
    <View style={defaultStyles.container}>
      <View style={defaultStyles.verticalContainer}>
        <Text style={defaultStyles.icon}>
          🧮
        </Text>
        <Text style={defaultStyles.title}>
          Minha Calculadorinha :)
        </Text>
        <Text style={defaultStyles.label}>
          Digite o primeiro valor:
        </Text>
        <TextInput style={defaultStyles.input} keyboardType='decimal-pad' onChangeText={text => setCampo1(text)} />
        <Text style={defaultStyles.label}>
          Digite o segundo valor:
        </Text>
        <TextInput style={defaultStyles.input} keyboardType='decimal-pad' onChangeText={text => setCampo2(text)} />

        <View style={defaultStyles.horizontalContainer}>
          <View style={defaultStyles.verticalContainerButtons}>
            <TouchableOpacity title="Somar" onPress={somar} style={defaultStyles.button}>
              <Text style={defaultStyles.buttonText}>
                ➕ Somar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity title="Subtrair" onPress={substrair} style={defaultStyles.button}>
              <Text style={defaultStyles.buttonText}>
                ➖ Subtrair
              </Text>
            </TouchableOpacity>
            <TouchableOpacity title="Exponenciacao" onPress={exponenciacao} style={defaultStyles.button}>
              <Text style={defaultStyles.buttonText}>
                💪 Exponenciação
              </Text>
            </TouchableOpacity>
          </View>
          <View style={defaultStyles.verticalContainerButtons}>
            <TouchableOpacity title="Multiplicar" onPress={multiplicar} style={defaultStyles.button}>
              <Text style={defaultStyles.buttonText}>
                ✖️ Multiplicar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity title="Dividir" onPress={dividir} style={defaultStyles.button}>
              <Text style={defaultStyles.buttonText}>
                ➗ Dividir
              </Text>
            </TouchableOpacity>
            <TouchableOpacity title="Raiz" onPress={raiz} style={defaultStyles.button}>
              <Text style={defaultStyles.buttonText}>
                🫚 Raiz
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {
          resultado == undefined ? null : <Text style={defaultStyles.resultado}> Resultado: {resultado}  </Text>
        }

        <TouchableOpacity title="Limpar" onPress={limpar} style={defaultStyles.button}>
          <Text style={defaultStyles.buttonText}>
            Limpar Tela
          </Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    </View >
  );
}
