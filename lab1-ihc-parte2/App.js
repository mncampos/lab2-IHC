import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Gyroscope, Magnetometer } from 'expo-sensors';

export default function App() {
  const [dataGyroscope, setDataGyroscope] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [dataMagneto, setDataMagneto] = useState({
    X: 0,
    Y: 0,
    Z: 0,
  });
  const [subscriptionGyro, setSubscriptionGyro] = useState(null);

  const [subscriptionMag, setSubscriptionMag] = useState(null);


  const _slow = () => {
    Gyroscope.setUpdateInterval(1000);
    Magnetometer.setUpdateInterval(1000);
  };

  const _fast = () => {
    Gyroscope.setUpdateInterval(160);
    Magnetometer.setUpdateInterval(160);
  };

  const _subscribe = () => {
    setSubscriptionGyro(
      Gyroscope.addListener(gyroscopeData => {
        setDataGyroscope(gyroscopeData);
      }))};

    const _subs = () => {
      setSubscriptionMag(
      Magnetometer.addListener(result => {
        setDataMagneto(result);
      }));
      
     
    };
  

  const _unsubscribe = () => {
    subscriptionGyro && subscriptionGyro.remove();
    subscriptionMag && subscriptionMag.remove();
    setSubscriptionGyro(null);
    setSubscriptionMag(null);
  };

  useEffect(() => {
    _subscribe();
    _subs();
    return () => _unsubscribe();
  }, []);

  const { x, y, z } = dataGyroscope;
  const { X, Y, Z} = dataMagneto;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Giroscópio:</Text>
      <Text style={styles.text}>
        x: {Math.round(x)} y: {Math.round(y)} z: {Math.round(z)}
      </Text>

      <Text style={styles.text}>Magnetômetro:</Text>
      <Text style={styles.text}>
      x: {X} y: {Math.round(Y)} z: {Math.round(Z)}
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={_slow} style={[styles.button, styles.middleButton]}>
          <Text>Update lento</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_fast} style={styles.button}>
          <Text>Update rápido</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
