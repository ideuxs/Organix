import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, Button, View } from 'react-native';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Image } from 'react-native';

import logoImage from '../images/photo1.png';

const AccueilScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned');

  const user = auth.currentUser;
  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // Example: Data might be in the format "01XXXXXXXXXXXXXXXX1122334455"
    // Extracting only the first 13 characters as CIP
    const cip = data.substring(3, 16); // Assuming the CIP is 13 characters long
  
    setText(cip);
    console.log('Type : ' + type + '\nCIP : ' + cip);

    console.log(user.displayName);
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.phraseAccueil}>Bienvenue chez Solutions Organix !</Text>
          
        <Text style={styles.name}>{user ? `Bonjour ${user.displayName} !` : "Bonjour !"}</Text>
  
        <Text style={styles.introduction}>
          Nous sommes désolés d'apprendre que votre médicament n'est pas disponible,
          ne perdez plus de temps et déclarez-le comme non-présent dans votre pharmacie ! 
        </Text>

        <Image source={logoImage} style={styles.logo} />

    </ScrollView>
  );
};

export default AccueilScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#011e36',
  },
  phraseAccueil: {
    fontSize: 30, // Slightly larger text
    color: '#03a770',
    textAlign: 'center',
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginTop: 20, // Adjust spacing as needed
    marginBottom: 50,
  },
  logo: {
    width: 200, // Adjust size as needed
    height: 200, // Adjust size as needed
    resizeMode: 'contain',
    marginVertical: 10, // Adjust spacing as needed
  },
  name: {
    fontSize: 22, // Slightly larger text
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  introduction: {
    fontSize: 18, // Slightly larger text
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
    marginBottom: 30,
  },
});
