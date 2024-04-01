import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { auth } from '../firebase';
import { getDatabase, ref, set, push } from "firebase/database";
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


import logoImage from '../images/logo.png'; // Assurez-vous que le chemin d'accès est correct
import cipData from '../resultat.json'; // Les données fictives pour la démonstration
import cisData from '../resultats.json'; // Les données fictives pour la démonstration

function searchMedicamentByCIS(cip) {
  const cipMedicine = cipData.find(item => item.codeCIP === cip);
  if (cipMedicine) {
    const cisMedicine = cisData.find(item => item.code === cipMedicine.code);
    if (cisMedicine) {
      return cisMedicine.nom;
    }
  }
  return null;
}

const RechercheCode = () => {
  const [cipCode, setCipCode] = useState('');
  const [medicineName, setMedicineName] = useState('');
  const [found, setFound] = useState(true); // Nouvel état pour suivre si un médicament a été trouvé

  const user = auth.currentUser;
  const navigation = useNavigation();
  
  const fetchMedicineName = () => {
    const name = searchMedicamentByCIS(cipCode);
    setMedicineName(name);
    setFound(!!name); // Met à jour l'état `found` basé sur si un nom a été trouvé ou non
  };

  return (
    <View style={styles.container}>
      <Image source={logoImage} style={styles.logo} />
      <Text style={styles.intro}>Recherche via code CIP :</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrez le code CIP"
        value={cipCode}
        onChangeText={setCipCode}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={fetchMedicineName}>
        <Text style={styles.buttonText}>Rechercher le médicament</Text>
      </TouchableOpacity>
      {medicineName ? (
        <View style={styles.medicineContainer}>
          <Text style={styles.medicineNameLabel}>Nom du médicament:</Text>
          <Text style={styles.medicineName}>{medicineName}</Text>
          <TouchableOpacity
            style={[styles.button, styles.buttonSignaler]}
            onPress={() => writeSignalementData(user.uid, medicineName, cipCode)}
          >
            <Text style={styles.buttonText}>Signaler</Text>
          </TouchableOpacity>
        </View>
      ) : found === false ? ( // Afficher ce bloc si un médicament n'a pas été trouvé
        <Text style={styles.notFound}>Aucun médicament trouvé.</Text>
      ) : null}
    </View>
  );
};

function writeSignalementData(userId, nomMedic, cipCode) {
  if (!userId || !nomMedic || !cipCode) {
    console.error('Les données fournies sont incomplètes.');
    return;
  }

  const db = getDatabase();
  const signalementRef = ref(db, 'signalements');
  const newSignalementRef = push(signalementRef);
  set(newSignalementRef, {
    userId,
    medicament: nomMedic,
    cip: cipCode,
    methode: "codeCIP"
  });

  navigation.navigate("Accueil");
}

const styles = StyleSheet.create({
  notFound: {
    fontSize: 18,
    color: '#ffffff', // Blanc pour une meilleure lisibilité
    marginTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#011e36', // Dark blue background color
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '90%',
    backgroundColor: '#ffffff', // White background for input fields
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomLeftRadius: 14,
    borderTopRightRadius: 14,
    borderWidth: 1,
    borderColor: '#38d2aa', // Border color to match button color
    marginBottom: 20,
    fontSize: 18,
  },
  button: {
    backgroundColor: '#38d2aa', // Green button background color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10, // Rounded corners for buttons
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff', // White text for better readability on buttons
    fontSize: 18,
  },
  buttonSignaler: {
    marginTop: 30, // Additional margin for the "Signaler" button
  },
  medicineContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  medicineNameLabel: {
    fontSize: 16,
    color: '#03a770', // Green text color to match the theme
    textAlign: 'center',
  },
  medicineName: {
    fontSize: 24,
    color: '#ffffff', // White text for better readability
    textAlign: 'center',
    marginTop: 5,
  },
  intro: {
    fontSize: 25,
    textAlign: 'center',
    color: '#03a770', // Text color from your logo
    fontWeight: 'bold',
    marginBottom: 25,
  },
  logo: {
    width: 150, // Adjust size as needed
    height: 150, // Adjust size as needed
    resizeMode: 'contain',
    marginVertical: 10, // Adjust spacing as needed
  },
});

export default RechercheCode;
