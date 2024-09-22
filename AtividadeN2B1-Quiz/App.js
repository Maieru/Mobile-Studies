import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './pages/Home';
import ListarTemas from './pages/Temas/index';
import TemaForm from './pages/Temas/form';
import PerguntasForms from './pages/Perguntas/form';
import MenuJogar from './pages/Jogo/index';
import Questionario from './pages/Jogo/questionario';
import { StyleSheet, Text, Touchable, TouchableOpacity, View, TextInput } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{
        headerStyle: headerStyles.headerStyle,
        headerTitleStyle: {
          fontWeight: 'bold', // Estilo do texto do título
        },
      }}>
        <Stack.Screen name="Home" component={Home} options={{ headerBackVisible: false, }} />
        <Stack.Screen name="ListarTemas" component={ListarTemas} options={{ headerBackVisible: true, }} />
        <Stack.Screen name="TemaForm" component={TemaForm} options={{ headerBackVisible: true, }} />
        <Stack.Screen name="PerguntasForms" component={PerguntasForms} options={{ headerBackVisible: true, }} />
        <Stack.Screen name="MenuJogar" component={MenuJogar} options={{ headerBackVisible: true, }} />
        <Stack.Screen name="Questionario" component={Questionario} options={{ headerBackVisible: false, }} />
      </Stack.Navigator>
    </NavigationContainer >
  );
}

const headerStyles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#bae6e3', // Cor de fundo do cabeçalho
  }
});