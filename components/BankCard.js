import React from 'react'
import { Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Card } from 'react-native-elements'

export default function BankCard (props) {
   const { url, title, description, pressBank } = props
   return (
      <TouchableOpacity onPress={() => pressBank({ url, title, description})}>
         <Card containerStyle={styles.card}>
            <Image
               style={styles.logo}
               resizeMode='cover'
               source={{ uri: url }}
            />
            <Text style={styles.title}>{title}</Text>
         </Card>
      </TouchableOpacity>
   )
}

const styles = StyleSheet.create({
   logo: {
      width: 66,
      height: 58
   },
   card: {
      borderRadius: 8,
      backgroundColor: '#000'
   },
   title: {
      fontSize: 22,
      color: '#fff'
   },
   text: {
      fontSize: 12,
      color: '#fff'
   }
})