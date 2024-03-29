import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, Button, View } from 'react-native';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';

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
    <View style={styles.container}>
        <Text style={styles.phraseAccueil}>Bienvenue chez Solutions Organix !</Text>
  
        <Text style= {styles.name}>(Re) Bonjour {user.displayName} ! </Text>
  
        <Text style = {styles.introduction}>
          Nous sommes désolés d'apprendre que votre médicament n'est pas disponible,
          ne perdez plus de temps et déclarez le comme non-présent dans votre pharmacie ! 
        </Text>
    </View>
  );
  
};

export default AccueilScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:30,
    justifyContent :"flex-start",
    margin:25,
    alignItems: 'center',
  },
  phraseAccueil: {
    fontSize: 45,
    marginBottom: 40,
    backgroundColor:'',
    width:'100%',
    textAlign:'center',
  },
  name:{
    marginBottom:35,
  },
  introduction:{
    width: 220,
    borderColor:'red',
    borderWidth:1,
    justifyContent:'center',
    textAlign:'justify',
  },
  deco: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  button: {
    alignItems: 'center',
    width: '50%',
    backgroundColor: '#0782F9',
    padding: 15,
    borderRadius: 10,
    marginTop: 40,
  },
  barcode: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato',
  }
});
