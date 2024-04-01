import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';


const SignalementAdmin = () => {
  const [loading, setLoading] = useState(true);
  const [signalements, setSignalements] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    const db = getDatabase();
    const signalementsRef = ref(db, 'signalements');

    onValue(signalementsRef, (snapshot) => {
      const signalementsData = snapshot.val();
      const signalementsList = [];

      if (signalementsData) {
        const signalementsEntries = Object.entries(signalementsData);
        
        const fetchUserDetails = async () => {
          for (const [key, value] of signalementsEntries) {
            const userRef = ref(db, `users/${value.userId}`);
            const userSnapshot = await new Promise(resolve => {
              onValue(userRef, (snapshot) => {
                resolve(snapshot);
              }, {
                onlyOnce: true
              });
            });

            const userData = userSnapshot.val();
            if (userData) {
              signalementsList.push({
                id: key,
                medicament: value.medicament,
                prenom: userData.prenom,
                age: userData.age,
              });
            }
          }
          setSignalements(signalementsList);
          setLoading(false);
        };

        fetchUserDetails();
      } else {
        // Handle the case where there are no signalements
        setLoading(false);
        Alert.alert('Information', 'Aucun signalement trouvé.');
      }
    }, {
      onlyOnce: true
    });
  }, []);



  return (
    <View style={styles.container}>
      <FlatList
        data={signalements}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>Médicament: {item.medicament}</Text>
            <Text style={styles.itemText}>Prénom: {item.prenom}</Text>
            <Text style={styles.itemText}>Âge: {item.age}</Text>
          </View>
        )}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#011e36', // Consistent dark blue background
  },
  list: {
    marginTop: 20, // Adjusted to match other pages' margins
  },
  itemContainer: {
    paddingVertical: 10, // Reduced padding for a smaller height
    paddingHorizontal: 10, // Optionally reduced for less width
    backgroundColor: '#38d2aa', // Using the accent color from the LoginScreen for consistency
    marginVertical: 4, // Reduced margin for closer spacing between items
    marginHorizontal: 10,
    borderRadius: 5,
    elevation: 3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  itemText: {
    fontSize: 16,
    color: '#ffffff', // White text for better contrast and consistency
    marginBottom: 3, // Slightly reduced spacing between lines of text
  },
});

export default SignalementAdmin;
