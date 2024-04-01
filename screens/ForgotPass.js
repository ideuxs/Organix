import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { auth } from '../firebase';

const ForgotPass = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const sendMail = async () => {
    try {
      await auth.sendPasswordResetEmail(email);
      alert('Un email de réinitialisation de mot de passe a été envoyé à votre adresse email.');
      navigation.goBack(); // Retour à l'écran de connexion
    } catch (error) {
      console.error('Error sending reset email:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  return (
    <View style={styles.container}>

    {/* Bouton de retour */}
    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>←</Text> {/* Utilisez une flèche Unicode ou un caractère similaire */}
      </TouchableOpacity>

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
    justifyContent: 'center',
    backgroundColor: '#47BDC1',
    alignItems: 'center',
  },

  backButton: {
    position: 'absolute',
    top: 60, // Ajustez selon la maquette de votre application
    left: 20, // Ajustez selon la maquette de votre application
    padding: 10,
  },
  backButtonText: {
    fontSize: 24, // Ajustez la taille si nécessaire
    color: '#FFF', // Choisissez une couleur qui se démarque sur votre fond
  },
  
  txt: {
    fontSize: 24, // Taille de police accrue
    color: '#ffffff', // Couleur de police
    marginBottom: 45,
    fontWeight: 'bold', // Gras
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Ombre du texte
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  email: {
    width: 245,
    fontStyle: 'italic',
    height: 45,
    textAlign: 'center',
    marginBottom: 25,
    borderBottomLeftRadius: 14,
    borderTopRightRadius: 14,
    backgroundColor: 'white',
  },
  boutonSend: {
    borderColor: '#0782F9',
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'blue',
    width: 160,
    marginTop: 15,
    alignItems: 'center',
  },
  submit: {
    color: 'white',
  },
});

export default ForgotPass;
