import React, { useEffect } from 'react'
import { StyleSheet, Text, Image, BackHandler, Alert, SafeAreaView, Dimensions } from 'react-native'
import { Card } from 'react-native-elements'
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
      <Card containerStyle={{ backgroundColor: '#000', borderRadius: 20, width: Dimensions.get('window').width - 50 }}>
        <Card.Title style={{color: '#fff'}}>BANK APP</Card.Title>
        <Card.Divider/>
        <Image source={require('../assets/bank-background.jpeg')} style={{ width: (Dimensions.get('window').width)-((Dimensions.get('window').width * 20) / 100) , height: 250}} />
        <Text style={styles.text}>Bienvenidos a Bank App!</Text>
      </Card>
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
    color: '#ffffff',
    paddingVertical: 10,
    alignSelf: 'center'
 }
});
