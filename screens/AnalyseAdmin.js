import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AnalyseAdmin = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.intro}>
        Quelques statistiques intéressantes !
      </Text>   

      <TouchableOpacity 
        style={styles.bouton} 
        onPress={() => navigation.navigate('NbMedoc')}>
        <Text style={styles.texteBouton}>Médicaments signalés</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.bouton} 
        onPress={() => navigation.navigate('AgeAnalyse')}>
        <Text style={styles.texteBouton}>Âge des utilisateurs</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#011e36', // Updated to match the dark blue background from LoginScreen
  },
  bouton: {
    width: '80%',
    padding: 15, // Adjusted for better touch area
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#38d2aa', // Matching the button color from LoginScreen
    borderRadius: 10,
    elevation: 3, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  texteBouton: {
    fontSize: 18,
    color: '#ffffff', // Updated to white for consistency with LoginScreen button text
  },
  intro: {
    fontSize: 35,
    textAlign: 'center',
    color: '#03a770', // Text color from your logo
    fontWeight: 'bold',
    lineHeight: 35,
    marginBottom: 20,
},
});

export default AnalyseAdmin;