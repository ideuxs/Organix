import React, { useState, useEffect } from 'react';
import { View, Alert, ScrollView } from 'react-native';
import { TextInput, Button, Text, Provider as PaperProvider, DefaultTheme, Appbar } from 'react-native-paper';
import { auth } from '../firebase'; // Assurez-vous que auth est bien initialisé ici
import { getDatabase, ref, onValue } from "firebase/database"; // Import modulaire pour la database

// Définition du thème vert écolo
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#03a770', // Couleur principale, bleu foncé
    accent: '#38d2aa', // Couleur d'accent, vert
    background: '#011e36', // Couleur de fond, bleu foncé
    text: '#ffffff', // Couleur du texte, blanc
    surface: '#011e36', // Couleur de la surface, blanc
  },
  roundness: 5, // Augmente le roundness pour tous les composants
};


const Profil = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const db = getDatabase();
      const userRef = ref(db, `/users/${userId}`);
      const unsubscribe = onValue(userRef, (snapshot) => {
        const data = snapshot.val();
      });

      // Nettoyage de l'abonnement
      return () => unsubscribe();
    }
  }, []);

  const updateEmail = () => {
    if (auth.currentUser) {
      auth.currentUser.updateEmail(email).then(() => {
        Alert.alert('Succès', 'Email mis à jour avec succès.');
      }).catch((error) => {
        Alert.alert('Erreur', error.message);
      });
    }
  };

  const updatePassword = () => {
    if (auth.currentUser) {
      auth.currentUser.updatePassword(password).then(() => {
        Alert.alert('Succès', 'Mot de passe mis à jour avec succès.');
      }).catch((error) => {
        Alert.alert('Erreur', error.message);
      });
    }
  };

  const handleSignOut = () => {
    auth.signOut().then(() => {
      // Redirige l'utilisateur vers la page de connexion après la déconnexion
      navigation.navigate('Login'); // Assurez-vous que 'Login' est le nom correct de votre écran de connexion
    }).catch((error) => {
      Alert.alert('Erreur', error.message);
    });
  };

  return (
    <PaperProvider theme={theme}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 20, backgroundColor: theme.colors.background }}>
          <Text variant="headlineMedium" style={{ marginBottom: 20, color: theme.colors.text, textAlign: 'center' }}>
            Gérez votre compte
          </Text>
          <TextInput
            label="Nouvel Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            style={{ marginBottom: 10 }}
            left={<TextInput.Icon name="email" />}
          />
          <Button
            mode="contained"
            onPress={updateEmail}
            style={{ marginBottom: 10 }}
            icon="update"
            color={theme.colors.accent}
          >
            Mettre à jour l'email
          </Button>
          <TextInput
            label="Nouveau Mot de Passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            mode="outlined"
            style={{ marginBottom: 10 }}
            left={<TextInput.Icon name="lock" />}
          />
          <Button
            mode="contained"
            onPress={updatePassword}
            icon="key"
            color={theme.colors.accent}
          >
            Mettre à jour le mot de passe
          </Button>
          <Button
            mode="contained"
            onPress={handleSignOut}
            icon="logout"
            color={theme.colors.primary}
            style={{ marginTop: 20 }}
          >
            Se déconnecter
          </Button>
        </View>
      </ScrollView>
    </PaperProvider>
  );
};

export default Profil;
