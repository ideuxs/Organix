import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {auth} from '../firebase'
import { getDatabase, ref, set , push} from "firebase/database";


function searchMedicamentByCIS(cip) {
    // Rechercher le médicament correspondant dans les données CIP
    const cipMedicine = cipData.find(item => item.codeCIP === cip);

    // Si le médicament correspondant est trouvé dans les données CIP
    if (cipMedicine) {
      // Rechercher le nom du médicament correspondant dans les données CIS
      const cisMedicine = cisData.find(item => item.code === cipMedicine.code);
  
      // Si le médicament correspondant est trouvé dans les données CIS
      if (cisMedicine) {
        return cisMedicine.nom; // Retourner le nom du médicament
      }
    }
  
    return null; // Retourner null si le médicament n'est pas trouvé
  
}

import cipData from '../resultat.json';
import cisData from '../resultats.json';

const RechercheCode = () => {
  const [cipCode, setCipCode] = useState('');
  const [medicineName, setMedicineName] = useState('');

  const user = auth.currentUser;

  const fetchMedicineName = async () => {
    
    const medicineName = searchMedicamentByCIS(cipCode);
    
    setMedicineName(medicineName);
    
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Entrez le code CIP"
        placeholderTextColor="#5e8b7e" // Une teinte de vert plus foncé pour le placeholder
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
  onPress={() => writeSignalementData(user.uid, medicineName, cipCode)} // Utilisation d'une fonction anonyme
>
  <Text style={styles.buttonText}>Signaler</Text>
</TouchableOpacity>

        </View>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8', // Un fond légèrement gris, propre et professionnel
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '90%',
    backgroundColor: 'white', // Fond blanc pour l'input
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#5e8b7e', // Une bordure verte
    marginBottom: 20,
    fontSize: 18,
  },
  button: {
    backgroundColor: '#5e8b7e', // Vert de la pharmacie
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white', // Texte blanc pour contraster avec le bouton vert
    fontSize: 18,
  },
  buttonSignaler: {
    marginTop: 30,
  },
  medicineContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  medicineNameLabel: {
    fontSize: 16,
    color: '#5e8b7e', // Utiliser le vert pour le label
    textAlign: 'center',
  },
  medicineName: {
    fontSize: 24,
    color: '#3a5a40', // Un vert plus sombre pour le nom du médicament
    textAlign: 'center',
  },
});

export default RechercheCode;
