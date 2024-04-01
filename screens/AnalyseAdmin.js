import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AnalyseAdmin = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.bouton} 
        onPress={() => navigation.navigate('NbMedoc')}>
        <Text style={styles.texteBouton}>Statistiques 1</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.bouton} 
        onPress={() => navigation.navigate('AgeAnalyse')}>
        <Text style={styles.texteBouton}>Statistiques 2</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.bouton} 
        onPress={() => navigation.navigate('StatistiquePage3')}>
        <Text style={styles.texteBouton}>Statistiques 3</Text>
      </TouchableOpacity>
      {/* Ajoutez plus de boutons si nécessaire */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  bouton: {
    width: '80%',
    padding: 20,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DDD', // Remplacez par votre couleur de fond
    borderRadius: 10,
    elevation: 3, // Ombre pour Android
    // Ombre pour iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  texteBouton: {
    fontSize: 18,
    color: 'black', // Remplacez par votre couleur de texte
  },
  navbar: {
    // Définir le style pour votre navbar ici
  },
});

export default AnalyseAdmin;
