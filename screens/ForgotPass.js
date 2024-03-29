import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import {auth} from '../firebase';
import { useEffect, useState }from 'react';


const ForgotPass = () => {

  const [email, setEmail] = useState('');

    const sendMail = async () =>{
      try {
        await auth.sendPasswordResetEmail(email);
        alert('Un email de réinitialisation de mot de passe a été envoyé à votre adresse email.');
        navigation.goBack(); // Go back to Login screen
      } catch (error) {
        console.error('Error sending reset email:', error);
        alert('Une erreur est survenue. Veuillez réessayer.');
      }
    };

    return (
      <View style = {styles.container}>
        <Text style = {styles.txt}>Réinitialisez votre MDP !</Text>
        <TextInput style = {styles.email}
          placeholder='Entrez votre mail'
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TouchableOpacity style={styles.boutonSend} onPress={sendMail}>
          <Text style= {styles.submit}>Valider</Text>
        </TouchableOpacity>
      </View>
    ) 
}

const styles = StyleSheet.create({
    container : {
      flex: 1, 
      justifyContent: 'center', 
      backgroundColor: '#47BDC1',
      alignItems: 'center'
    },
    txt: {
      fontSize: 35,
      marginBottom: 45, 
    },
    email:{
      width: 245,
      fontStyle:'italic',
      height: 45,
      textAlign:'center',
      marginBottom: 25,
      borderBottomLeftRadius: 14,
      borderTopRightRadius:14,
      backgroundColor:'white'
    },
    boutonSend: {
      borderColor: '#0782F9',
      padding: 10,
      marginLeft: 12,
      borderRadius: 10,
      backgroundColor: 'blue',
      width: 160,
      marginTop: 15,
      alignItems: 'center',
    },
    submit:{
      color:'white',
    },

});

export default ForgotPass;