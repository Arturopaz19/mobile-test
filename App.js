import { Asset } from 'expo-asset'
import { AppLoading } from 'expo'
import React, { useState } from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import AppNavigator from './navigation/AppNavigator'

export default function App() {
  const [ isReady, setIsReady ] = useState(false)

  const cacheResourcesAsync = async () => {
    //example for charge images and save in cache
    const images = [require('./assets/icon.png'), require('./assets/splash.png'), require('./assets/bank-background.jpeg')]

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync()
    })
    return Promise.all(cacheImages)
  }

  return (
    <>
    {!isReady &&
      <AppLoading
      startAsync={cacheResourcesAsync}
      onFinish={() => setIsReady(true)}
      onError={console.warn}
    />
    }
    {isReady &&
      <AppNavigator />
    }
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#555',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
})
