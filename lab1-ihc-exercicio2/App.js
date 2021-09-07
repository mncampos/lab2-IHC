import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Appbar, TextInput, Button } from 'react-native-paper';
import { NavigationContainer, StackActions} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Tela 1"
          component={HomeScreen}
          options={{ title : 'Atividade 2', headerStyle: {
            backgroundColor:  '#6200ee',
          },
          headerTitleStyle: {
            color: 'white'
          }
        }}
          />
          <Stack.Screen name="Tela 2" 
          component={TelaDeMensagem}
          options={{ title: 'Atividade 2', headerStyle: {
            backgroundColor: '#6200ee',
          },
          headerTitleStyle: {
            color: 'white'
          }
          }}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const HomeScreen = ({ navigation }) => {

  const [message, setMessage] = React.useState('');

  return (

    <View> 
    <TextInput label="Enter a message" value={message} onChangeText={ (message) => setMessage(message)}/>
    <Button
      title="Send information"
      onPress={() =>
        navigation.navigate('Tela 2', { mensagem: message })
      }>
      SEND
    </Button>
    </View>
  );
};
const TelaDeMensagem = ({ navigation, route }) => {
  return <Text>{route.params.mensagem}</Text>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
