import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RechercheScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.intro}>
        Choisissez la méthode pour retrouver votre médicament : 
      </Text>     
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Scan')}>
        <Text style={styles.buttonText}>Recherche via DataMatrix</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Code')}>
        <Text style={styles.buttonText}>Recherche via code CIP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#011e36', // Matching dark blue background color
  },
  button: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#38d2aa', // Button background color matching the theme
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff', // White text for better readability on buttons
    fontSize: 20,
  },
  intro: {
    fontSize: 25,
    textAlign: 'center',
    color: '#03a770', // Text color from your logo
    fontWeight: 'bold',
    lineHeight: 25,
    marginBottom: 50,
  },
});

export default RechercheScreen;
