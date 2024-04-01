import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { getAuth } from "firebase/auth";
import { getDatabase, ref, push } from "firebase/database";
import { useNavigation } from '@react-navigation/native';

import cipData from '../resultat.json';
import cisData from '../resultats.json';

function findMedicineNameByCIP(cip) {
  const cipMedicine = cipData.find(item => item.codeCIP === cip);
  if (cipMedicine) {
    const cisMedicine = cisData.find(item => item.code === cipMedicine.code);
    if (cisMedicine) {
      return cisMedicine.nom;
    }
  }
  return null;
}

const ScanQr = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [medicineName, setMedicineName] = useState('');
  const [cip, setCip] = useState('');
  const auth = getAuth();
  const user = auth.currentUser;
  const navigation = useNavigation();

  useEffect(() => {
    const askForCameraPermission = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    askForCameraPermission();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    const cipCode = data.substring(3, 16);
    setCip(cipCode);
    const medicineName = findMedicineNameByCIP(cipCode);
    setMedicineName(medicineName);
  };

  const handleReport = () => {
    writeSignalementData(user.uid, medicineName, cip);
    navigation.navigate('Accueil');
  };

  // Modification ici: Réinitialise scanned et medicineName
  const handleScanAgain = () => {
    setScanned(false);
    setMedicineName(''); // Réinitialise le nom du médicament pour permettre un nouveau scan
  };

  return (
    <View style={styles.container}>
      <Text style={styles.intro}>Scanner pour signaler :</Text>
      <View style={styles.barcodeBox}>
        <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={StyleSheet.absoluteFillObject} />
      </View>
      
      <TouchableOpacity style={[styles.button, styles.buttonSignaler]} onPress={handleScanAgain}>
        <Text style={styles.buttonText}>Scanner à nouveau</Text>
      </TouchableOpacity>

      <View style={styles.medicineContainer}>
        {medicineName ? <Text style={styles.medicineNameLabel}>Nom du médicament:</Text> : null}
        {medicineName ? <Text style={styles.medicineName}>{medicineName}</Text> : null}
        {scanned && medicineName && <TouchableOpacity style={[styles.button, {marginTop: 30}]} onPress={handleReport}>
          <Text style={styles.buttonText}>Signaler</Text>
        </TouchableOpacity>}
      </View>
    </View>
  );
};

function writeSignalementData(userId, nomMedic, cipCode) {
  const db = getDatabase();
  const signalementRef = ref(db, 'signalements');
  const newSignalementRef = push(signalementRef);
  set(newSignalementRef, {
    userId: userId,
    medicament: nomMedic,
    cip: cipCode,
    methode: "qrCode"
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#101c34', // Changement du fond
  },
  barcodeBox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato',
  },
  phraseAccueil: {
    fontSize: 20,
    marginBottom: 20,
    color: '#ffffff', // Texte blanc pour contraste
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

export default ScanQr;
