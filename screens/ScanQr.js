import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { getAuth } from "firebase/auth"; // Assurez-vous que cette importation est correcte
import { getDatabase, ref, set , push} from "firebase/database";

// Importez directement les données JSON
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
  const [text, setText] = useState('Not yet scanned');
  const [medicineName, setMedicineName] = useState(''); // État pour stocker le nom du médicament
  const [cip, setCip] = useState(''); // État pour stocker le code CIP


  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const askForCameraPermission = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    askForCameraPermission();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    const cipCode = data.substring(3, 16); // Assurez-vous que cette logique d'extraction est correcte pour votre cas d'utilisation
    setCip(cipCode); // Mise à jour de l'état avec le code CIP
    setText(cipCode); // Cela semble être votre tentative de suivre le CIP, mais vous ne l'utilisez pas ensuite
    console.log('Type : ' + type + '\nCIP : ' + cipCode);
    const medicineName = findMedicineNameByCIP(cipCode);
    setMedicineName(medicineName);
    console.log('Nom du médicament :', medicineName);
};

  // Fonction pour le bouton "Signaler", qui ne fait rien pour le moment
  const handleReport = () => {
    console.log("Signalement enregistré");
    writeSignalementData(user.uid, medicineName, cip);
};

  // Affichage conditionnel en fonction des permissions et du scan
  if (hasPermission === null) {
    return <View style={styles.container}><Text>Veuillez scanner pour signaler</Text></View>;
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>Pas d'accès à la caméra</Text>
        <Button title="Autoriser la caméra" onPress={() => setHasPermission(null)} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.phraseAccueil}>Bienvenue chez ToumaiMarket</Text>
      <View style={styles.barcodeBox}>
        <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={StyleSheet.absoluteFillObject} />
      </View>
      {medicineName ? <Text style={styles.medicineName}>{medicineName}</Text> : null}
      <Button title="Scanner à nouveau" onPress={() => setScanned(false)} color="tomato" />
      {scanned && medicineName && <Button title="Signaler" onPress={handleReport} />}
    </View>
  );
};

function writeSignalementData(userId, nomMedic, cipCode) {
  const db = getDatabase();
  // Créer une nouvelle référence de signalement avec un ID unique
  const signalementRef = ref(db, 'signalements');
  
  // Créer un nouvel enfant avec un ID unique sous 'signalements' et sauvegarder les données
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
  },
  medicineName: {
    fontSize: 18,
    margin: 10,
  },
});

export default ScanQr;
