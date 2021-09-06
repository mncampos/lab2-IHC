import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Appbar, TextInput, Button } from 'react-native-paper';

export default function App() {

  const [number1, setNumber1] = React.useState('');
  const [number2, setNumber2] = React.useState('');
  const [result, setResult] = React.useState('');


  return (
    <View>
    <Appbar.Header>
        <Appbar.Content title="Atividade 1"/>
    </Appbar.Header>

    <TextInput label="First number" value={number1} onChangeText={ (number1) => setNumber1(number1)} />
    <TextInput label="Second number" value={number2} onChangeText={ (number2) => setNumber2(number2)} />
    <Button mode="contained" onPress={() => setResult(parseInt(number1)+parseInt(number2))}>
      SUM
    </Button>
    <Text>
      RESULT = {result}
    </Text>

</View>
);
}



function SomaNumero()
{

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
