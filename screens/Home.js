import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
import { StyleSheet, Text, View, BackHandler, Alert } from 'react-native'

export default function Home (props) {

  useEffect(() => {
    const backAction = () => {
      if (!props.navigation.canGoBack()) {
        Alert.alert('Alerta', '¿Seguro que quieres salir de la aplicación?', [
          {
            text: 'Cancelar',
            onPress: () => null,
            style: 'cancel'
          },
          { text: 'Si', onPress: () => BackHandler.exitApp() }
        ])
      } else {
        props.navigation.goBack()
      }
      return true
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    )

    return () => backHandler.remove()
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <Text>Bienvenidos a Bank App!</Text>
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
