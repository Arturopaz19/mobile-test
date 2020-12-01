import React, { useEffect } from 'react'
import { StyleSheet, Text, View, BackHandler, Alert, SafeAreaView } from 'react-native'
import Constants from 'expo-constants'
import { StatusBar } from 'expo-status-bar'

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
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#000000'} style='light' />
      <Text style={styles.text}>Bienvenidos a Bank App!</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Constants.statusBarHeight,
  },
  text: {
    fontSize: 16,
    color: '#ffffff'
 }
});
