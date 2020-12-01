import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, ScrollView, View, SafeAreaView, ActivityIndicator, Dimensions, Modal, Image, Alert } from 'react-native'
import Constants from 'expo-constants'
import { getBanks } from '../api/api'
import BankCard from '../components/BankCard'
import { Button } from 'react-native-elements'

const windowWidth = Dimensions.get('window').width

export default function Banks () {
   const [ banks, setBanks ] = useState([])
   const [ isLoading, setIsLoading ] = useState(true)
   const [ isError, setIsError ] = useState(false)
   const [ error, setError ] = useState('')
   const [ bankSelected, setBankSelected ] = useState({})
   const [ modalBank, setModalBank ] = useState(false)

   useEffect(() => {
      const fetchBanks = async () => {
         try {
            const response = await getBanks()
            if (response.ok){
               setBanks(response.obj)
               setIsError(false)
               setError('')
               setIsLoading(false)
            } else {
               setBanks([])
               setIsError(true)
               setError(response.obj.message)
               setIsLoading(false)
            }
         } catch (error) {
            console.log(error.message)
         }
      }

      fetchBanks()
   }, [])

   const handleSelected = (obj) => {
      setBankSelected(obj)
      setModalBank(true)
   }

   const list = Object.keys(banks).map(key => {
      return (
         <BankCard
            key={key}
            url={banks[key].url}
            title={banks[key].bankName}
            description={banks[key].description}
            pressBank={handleSelected}
         />
      )
   })
   return (
      <SafeAreaView style={styles.container}>
         <StatusBar backgroundColor={'#000000'} style='light' />
         <View style={styles.content}>
            {!isLoading &&
               <>
                  <ScrollView style={styles.scrollView}>
                     {!isError &&
                        list
                     }
                     {isError &&
                        Alert.alert('Alerta', `${error}`, [
                           {
                             text: 'OK',
                             onPress: () => null
                           }
                        ])
                     }
                  </ScrollView>
                  {modalBank && Object.keys(bankSelected).length > 0 &&
                     <Modal
                        animationType='slide'
                        transparent={true}
                        visible={modalBank}
                        onRequestClose={() => {
                           setModalBank(false)
                           setBankSelected({})
                        }}
                     >
                        <View style={styles.centeredView}>
                           <View style={styles.modalView}>
                           <Image
                              style={styles.logo}
                              resizeMode='cover'
                              source={{ uri: bankSelected.url }}
                           />
                           <View style={{ alignItems: 'center', marginVertical: 15 }}>
                              <Text style={styles.title}>{bankSelected.title}</Text>
                              <Text style={styles.text}>{bankSelected.description}</Text>
                           </View>
                           <Button title={'Cerrar'} onPress={() => { setModalBank(false)}}/>
                           </View>
                        </View>
                     </Modal>
                  }
               </>
            }
            {isLoading &&
               <ActivityIndicator size='large' color='#0000ff' />
            }
         </View>
      </SafeAreaView>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: Constants.statusBarHeight,
      backgroundColor: '#333333',
   },
   scrollView: {
      width: windowWidth,
      paddingBottom: 10
   },
   content: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1
   },
   centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(52, 52, 52, 0.8)'
   },
   modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
   },
   logo: {
      width: 66,
      height: 58
   },
   title: {
      fontSize: 22
   },
   text: {
      fontSize: 16
   }
})
