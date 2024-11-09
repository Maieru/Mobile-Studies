import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './pages/Home';
import ListarAluno from './pages/Aluno';
import AlunoForm from './pages/Aluno/form';
import ListarSolicitacoes from './pages/SolicitacaoLanche';
import SolicitacaoForm from './pages/SolicitacaoLanche/form'
import EntregarLanche from './pages/EntregaLanche';
import LanchesEntregues from './pages/LanchesEntregues';
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
        <Stack.Screen name="Home" component={Home} options={{ headerBackVisible: false, title: "Tela inicial" }} />
        <Stack.Screen name='ListarAluno' component={ListarAluno} options={{ title: 'Listagem de alunos' }} />
        <Stack.Screen name='AlunoForm' component={AlunoForm} options={{ title: 'Formulário de aluno' }} />
        <Stack.Screen name='ListarSolicitacoes' component={ListarSolicitacoes} options={{ title: 'Listagem Solicitações Lanche' }} />
        <Stack.Screen name='SolicitacaoForm' component={SolicitacaoForm} options={{ title: 'Formulário de Solicitações Lanche' }} />
        <Stack.Screen name='EntregarLanche' component={EntregarLanche} options={{ title: 'Entregar lanches' }} ></Stack.Screen>
        <Stack.Screen name='LanchesEntregues' component={LanchesEntregues} options={{ title: 'Lanches Entregues' }} ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer >
  );
}

const headerStyles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#bae6e3', // Cor de fundo do cabeçalho
  }
});