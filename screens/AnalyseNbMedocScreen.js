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
    backgroundColor: '#011e36', // Using the dark blue background color
  },
  headerText: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 15,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#03a770', // White color for text to contrast against the header background
  },
  medicamentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#38d2aa', // Keeping the item background white for contrast
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  medicamentName: {
    fontSize: 16,
    color: '#2c3e50', // Keeping a dark color for readability
  },
  medicamentCountContainer: {
    backgroundColor: '#ffffff', // Green color matching the theme
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  medicamentCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#011e36', // White color for contrast against the count container
  },
});

export default AnalyseNbMedocScreen;
