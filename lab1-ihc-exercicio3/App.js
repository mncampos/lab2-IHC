import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Appbar, TextInput, Button } from 'react-native-paper';
import { NavigationContainer, StackActions} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Accelerometer } from 'expo-sensors';
import { useFocusEffect } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Tela 1"
        component={TelaInicial}
        options={{ title : 'Atividade 3', headerStyle: {
          backgroundColor:  '#6200ee',
        },
        headerTitleStyle: {
          color: 'white'
        }
      }}

        />

<Stack.Screen name="Tela 2" 
          component={TelaDeMensagem}
          options={{ title: 'Atividade 3', headerStyle: {
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

const TelaInicial = ({ navigation }) => {

  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);

  const _slow = () => {
    Accelerometer.setUpdateInterval(1000);
  };

  const _fast = () => {
    Accelerometer.setUpdateInterval(100);
  };

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener(accelerometerData => {
        setData(accelerometerData);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };


  useFocusEffect(
    React.useCallback( () => {
      _subscribe();

      return () => {
        _unsubscribe();
      };
    }, [])
  );



  const { x, y, z } = data;


  if(Math.round(x) == 1 && Math.round(y) == 1 && Math.round(z) == 1)
  {


  navigation.navigate('Tela 2');

  }


  return (
    <View>


      <TextInput style={styles.text} value={`X :` + Math.round(x).toString()} editable={false}/>
      <TextInput style={styles.text} value={`Y :` + Math.round(y).toString()} editable={false}/>
      <TextInput style={styles.text} value={`Z :` + Math.round(z).toString()} editable={false}/>

      <Button mode = "contained" onPress={_slow}>  Velocidade de Update Lenta </Button>


      <Button mode = "contained" onPress={_fast}>  Velocidade de Update Rapida </Button>

      


    </View>
  );
};

const TelaDeMensagem = ({ navigation, route }) => {
  return <Text>Você conseguiu 1 em todas as variáveis!</Text>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    justifyContent: 'space-between',
    marginBottom: 10
    
  }
});
