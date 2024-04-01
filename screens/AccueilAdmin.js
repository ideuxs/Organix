import React from 'react';
import { StyleSheet, Text, ScrollView, Image, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { auth } from '../firebase';


import logoImage from '../images/photo1.png';

const AccueilAdmin = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
      auth.signOut().then(() => {
        console.log('User signed out!');
        navigation.replace('Login');
    }).catch((error) => {
        console.error('Sign out error', error);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.phraseAccueil}>Bienvenue sur le compte Administrateur</Text>
      
      <View style={styles.introduction}>
        <Text style={styles.section}>
        Vous pouvez avoir des détails statistiques sur les signalements de médicaments dans l'onglet "Analyse". 
        Mais aussi retrouvez tous les derniers signalements dans sa section.
        </Text>
      </View>
      
      <TouchableOpacity style={styles.bouton} onPress={handleLogout}>
                <Text style={styles.txt}>Se déconnecter</Text>
      </TouchableOpacity>

      <Image source={logoImage} style={styles.logo} />
    </ScrollView>
  );
};

export default AccueilAdmin;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#011e36',
  },
  phraseAccueil: {
    fontSize: 30,
    color: '#03a770',
    textAlign: 'center',
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginTop: 50,
    marginBottom: 50,
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginVertical: 10,
  },
  introduction: {
    fontSize: 18,
    color: '#ffffff',
    backgroundColor: '#38d2aa',
    padding: 20,
    borderRadius: 10,
    textAlign: 'justify',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  section: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  bouton: {
    backgroundColor: '#03a770',
    borderRadius: 10,
    marginTop: 50,
    padding: 10,
    width: 160,
    alignItems: 'center',
  },
  txt: {
    color: '#ffffff', // White text color for the buttons
  }
});
