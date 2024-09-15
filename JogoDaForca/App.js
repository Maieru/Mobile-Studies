import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, Alert } from 'react-native';
import { styles } from './styles';
import { useState, useEffect } from 'react';


export default function App() {
  const [palavraAleatoria, setPalavraAleatoria] = useState('');
  const [numeroTentativas, setNumeroTentativas] = useState(0);
  const [letrasChutadas, setLetrasChutada] = useState([]);
  const [letrasApertadas, setLetrasApertadas] = useState(0);
  const [dica, setDica] = useState('');

  let palavras =
    [
      { palavra: 'REACT', dica: 'Esse aplicativo está feito nisso' },
      { palavra: 'NATIVE', dica: 'Nome para os Iroquis e Cherokees' },
      { palavra: 'MUITO', dica: 'Representa quantidades absurdas' },
      { palavra: 'LEGAL', dica: 'O que Java não é' },
      { palavra: 'MICROSOFT', dica: 'Melho empresa do mundo. -Github Copilot' }, ,
      { palavra: 'DEVERIA', dica: 'Não sei qual dica dá pra isso. Talvez eu DEVERIA estudar mais portugues :)' },
      { palavra: 'COMPRAR', dica: 'Ato de boletar' },
      { palavra: 'INCEPTION', dica: 'E se tivesse um jogo da forca dentro do jogo da forca' },
      { palavra: 'FORCA', dica: 'O que você está jogando' },
      { palavra: 'CRIATIVIDADE', dica: 'O que eu não tenho' },
    ];

  let letrasValidas = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'w', 'y', 'z'];

  useEffect(() => {
    geraNovaPalavra();
  }, []);

  useEffect(() => {
    if (numeroTentativas === 7) {
      Alert.alert('Você perdeu! A palavra era: ' + palavraAleatoria);
      setNumeroTentativas(0);
      geraNovaPalavra();
      return;
    }

    if (palavraAleatoria != '' && palavraAleatoria.split('').every(letra => letrasChutadas.includes(letra))) {
      Alert.alert('Você venceu! A palavra era: ' + palavraAleatoria);
      setNumeroTentativas(0);
      geraNovaPalavra();
    }
  }, [letrasApertadas]);

  function geraNovaPalavra() {
    const number = Math.round(Math.random() * palavras.length); // Gera um número aleatório entre 0 e 6
    console.log(number);
    setPalavraAleatoria(palavras[number].palavra);
    setDica(palavras[number].dica);
    setNumeroTentativas(0);
    setLetrasChutada([]);
  }

  function retornaImagemNumeroTentativas() {
    switch (numeroTentativas) {
      case 0: return require('./resources/png-transparent-gallows-with-rope-gibbet-cartoon.png');
      case 1: return require('./resources/Forca1Erro.png');
      case 2: return require('./resources/Forca2Erro.png');
      case 3: return require('./resources/Forca3Erro.png');
      case 4: return require('./resources/Forca4Erro.png');
      case 5: return require('./resources/Forca5Erro.png');
      case 6: return require('./resources/Forca6Erro.png');
      case 7: return require('./resources/Forca7Erro.png');
    }
  }

  function chutaLetra(letra) {
    if (letrasChutadas.includes(letra.toUpperCase()))
      return;

    setLetrasChutada([...letrasChutadas, letra.toUpperCase()]);

    if (!palavraAleatoria.includes(letra.toUpperCase()))
      setNumeroTentativas(numeroTentativas + 1);

    setLetrasApertadas(letrasApertadas + 1);
  }

  return (
    <View style={styles.container}>
      <Image source={retornaImagemNumeroTentativas()} style={styles.image}></Image>
      <View style={styles.palavraChutadaContainer}>
        {
          palavraAleatoria?.split('').map((letra, index) => {
            if (letrasChutadas.includes(letra)) {
              return <Text key={index} style={styles.palavraChutada}>{letra}</Text>
            } else {
              return <Text key={index} style={styles.palavraChutada}>_</Text>
            }
          })
        }
      </View>
      {
        console.log(letrasChutadas.join(', '))
      }
      <Text style={styles.letraChutada}>DICA: {dica}</Text>
      <Text style={styles.letraChutada}>Letras chutadas: {letrasChutadas.join(', ')}</Text>
      <StatusBar style="auto" />

      <View style={styles.letraContainer}>
        {
          letrasValidas.map((letra, index) => {
            return <Text key={index} style={styles.botaoLetra} onPress={() => chutaLetra(letra)}>{letra}</Text>
          })
        }
      </View>
    </View>
  );
}