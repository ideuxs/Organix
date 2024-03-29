import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState }from 'react';
import { StyleSheet, TextInput, View, Button, Text, TouchableOpacity } from 'react-native';
import {auth} from '../firebase'
import { BarCodeScanner } from 'expo-barcode-scanner';


const ScanQr = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned');


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
            {/*<TouchableOpacity style={styles.button} onPress={handleSignOut}>
                <Text style={styles.deco}>Se deconnecter</Text>
                </TouchableOpacity>*/}
      </View>
    )
  
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    phraseAccueil: {
      fontSize: 25,
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


export default ScanQr;
