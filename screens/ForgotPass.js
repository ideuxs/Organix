import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { auth } from '../firebase'; // Ensure the correct import path
import { Image } from 'react-native';

const ForgotPass = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const sendMail = async () => {
    try {
      await auth.sendPasswordResetEmail(email);
      alert('Un email de réinitialisation de mot de passe a été envoyé à votre adresse email.');
      navigation.goBack(); // Go back to the login screen
    } catch (error) {
      console.error('Error sending reset email:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../images/logo.png')} style={styles.logo} />
      <Text style={styles.txt}>Réinitialisez votre MDP !</Text>
      <TextInput
        style={styles.email}
        placeholder='Entrez votre mail'
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TouchableOpacity style={styles.boutonSend} onPress={sendMail}>
        <Text style={styles.submit}>Valider</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#011e36', // Dark blue background to match the theme
    alignItems: 'center',
  },
  txt: {
    fontSize: 24,
    color: '#03a770', // White text color for consistency
    marginBottom: 25,
    fontWeight: 'bold',
  },
  email: {
    width: 245,
    height: 45,
    textAlign: 'center',
    marginBottom: 25,
    borderBottomRightRadius: 14,
    borderTopLeftRadius: 14,
    backgroundColor: '#ffffff', // White background for input fields
  },
  boutonSend: {
    backgroundColor: '#38d2aa', // Button background color to match the LoginScreen and Register styles
    padding: 10,
    width: 160,
    alignItems: 'center',
    borderRadius: 10,
  },
  submit: {
    color: '#ffffff', // White text color for the button text
  },
  logo: {
    marginTop:200,
    height: 120, // Adjust the size as needed
    width: 120, // Adjust the size as needed
    resizeMode: 'contain', // This makes sure the logo is scaled properly
    alignSelf: 'center', // This aligns the logo to the center
}
});

export default ForgotPass;
