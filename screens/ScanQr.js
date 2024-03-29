import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

// Importez directement les données JSON
import cipData from '../resultat.json';
import cisData from '../resultats.json';

// Fonction pour rechercher le nom du médicament à partir du code CIP
function findMedicineNameByCIP(cip) {
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

const ScanQr = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned');
  
  const askForCameraPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    const cip = data.substring(3, 16);
    setText(cip);
    console.log('Type : ' + type + '\nCIP : ' + cip);
    const medicineName = findMedicineNameByCIP(cip);
    console.log('Nom du médicament :', medicineName);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.phraseAccueil}>Bienvenue chez ToumaiMarket</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>Pas d'accès à la caméra</Text>
        <Button title={'Autoriser la caméra'} onPress={askForCameraPermission} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.phraseAccueil}>Bienvenue chez ToumaiMarket</Text>
      <View style={styles.barcode}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }}
        />
      </View>
      <Text>{text}</Text>
      {scanned && (
        <Button title={'Scanner à nouveau ?'} onPress={() => setScanned(false)} color="tomato" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phraseAccueil: {
    fontSize: 25,
  },
  barcode: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato',
  },
});

export default ScanQr;
