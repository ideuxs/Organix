import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, Button, View } from 'react-native';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Image } from 'react-native';
import logoImage from '../images/photo1.png';


const AccueilAdmin = () => {
  return (
   <ScrollView contentContainerStyle={styles.container}>
        <Text style = {styles.intro}>Bonjour Admin</Text>

        <View style = {styles.introduction}>
            <Text style = {styles.section}>
                Retrouvez tout les derniers signalements dans la section "Signalement"
            </Text>
        </View>
        <Image source={logoImage} style={styles.logo} />
   </ScrollView>
  )
}

export default AccueilAdmin;

const styles = StyleSheet.create({ 
    container: {
        flexGrow: 1,
        alignItems: 'center',
        backgroundColor: '#011e36',

    },
    introduction:{
      marginTop: 200,
      marginLeft:35,
      marginRight:35,
      borderWidth:3,
      height:150,
      backgroundColor:'#e8f5e9',
      justifyContent:'center',
      borderRadius:9,
    },
    section:{
        color:'black',
        fontSize:20,
        fontStyle:'italic',
    },
    intro:{
        fontSize:50,
        marginTop:50,
        color:'white',
        textAlign:'left',
        fontWeight:'700',
    },
    logo: {
        width: 200, // Adjust size as needed
        height: 200, // Adjust size as needed
        resizeMode: 'contain',
        marginVertical: 10, // Adjust spacing as needed
    },
});