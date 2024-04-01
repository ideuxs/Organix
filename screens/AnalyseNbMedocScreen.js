import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';

const AnalyseNbMedocScreen = () => {
  const [medicaments, setMedicaments] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const signalementsRef = ref(db, 'signalements');
  
    onValue(signalementsRef, (snapshot) => {
      const data = snapshot.val();
      const medicamentCounts = {};
  
      // Comptabiliser le nombre de signalements par médicament
      for (const id in data) {
        const medicamentName = data[id].medicament;
        if (medicamentCounts[medicamentName]) {
          medicamentCounts[medicamentName] += 1;
        } else {
          medicamentCounts[medicamentName] = 1;
        }
      }
  
      // Transformer l'objet en tableau et trier par nombre de signalements en ordre décroissant
      const sortedMeds = Object.entries(medicamentCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);
  
      setMedicaments(sortedMeds);
    }, {
      onlyOnce: true
    });
  }, []);
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Analyse des Signalements</Text>
      </View>
      <FlatList
        data={medicaments}
        keyExtractor={(item, index) => `med-${index}`}
        renderItem={({ item }) => (
          <View style={styles.medicamentItem}>
            <Text style={styles.medicamentName}>{item.name}</Text>
            <View style={styles.medicamentCountContainer}>
              <Text style={styles.medicamentCount}>{item.count}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7', // Couleur de fond de la page plus douce
  },
  header: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5dade2', // Couleur de l'en-tête
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white', // Couleur du texte de l'en-tête
  },
  medicamentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: 'white', // Couleur de fond des items
    borderRadius: 10, // Bords arrondis pour les items
    elevation: 4, // Ombre pour Android
    // Ombre pour iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  medicamentName: {
    fontSize: 16, // Taille de la police ajustée pour le nom des médicaments
    color: '#2c3e50', // Couleur de texte plus foncée pour le nom des médicaments
  },
  medicamentCountContainer: {
    backgroundColor: '#aed581', // Couleur de fond pour le compteur
    borderRadius: 20, // Bords arrondis pour le compteur
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  medicamentCount: {
    fontSize: 16, // Taille de la police ajustée pour le nombre de signalements
    fontWeight: 'bold', // Gras pour mettre en évidence le nombre de signalements
    color: '#2c3e50', // Couleur de texte plus foncée pour le compteur
  },
});

export default AnalyseNbMedocScreen;
