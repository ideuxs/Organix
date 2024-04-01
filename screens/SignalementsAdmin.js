import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';


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

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('Login');
      })
      .catch((error) => alert(error.message));
  };

  const confirmLogout = () => {
    Alert.alert(
        'Se déconnecter',
        'Êtes-vous sûr de vouloir vous déconnecter ?',
        [
            {
                text: 'Annuler',
                onPress: () => {},
                style: 'cancel',
            },
            {
                text: 'Confirmer',
                onPress: () => {
                    handleSignOut();
                },
            },
        ],
    );
    };


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Chargement des signalements...</Text>
      </View>
    );
  }

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
      <View style={styles.deco}>
        <TouchableOpacity style={styles.button} onPress={confirmLogout}>
          <Text style={{color:'white'}}>Se déconnecter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f5e9',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e8f5e9',
  },
  loadingText: {
    fontSize: 20,
    color: '#388e3c',
  },
  list: {
    marginTop:40,
  },
  itemContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#c8e6c9',
    backgroundColor: 'white',
    marginVertical: 8,
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
    color: '#2e7d32',
    marginBottom: 5,
  },
  deco: {
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1976d2',
    padding: 10,
    borderRadius: 5,
  },
});

export default SignalementAdmin;
