import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, googleProvider } from '../firebase'; // Assurez-vous que le chemin d'import est correct
import { Image } from 'react-native';
import { getDatabase, ref, set } from "firebase/database";

import googleLogo from '../images/google.png';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                // Détermine si l'utilisateur est l'admin pour rediriger vers la page spécifique
                if (user.email === "admin@example.com") {
                    navigation.navigate("HomeAdmin");
                } else {
                    navigation.navigate("Home");
                }
            }
        });
        return unsubscribe;
    }, [navigation]);

    const handleLogin = () => {
        if (email === 'travailsaefirebase@gmail.com' && password === 'adminOrganix') {
            // Redirection vers la page HomeAdmin pour les identifiants "admin"/"admin"
            navigation.navigate('Admin', { screen: 'AccueilAdmin' });
        } else {
            // Connexion pour les autres utilisateurs via Firebase
            auth.signInWithEmailAndPassword(email, password)
                .then(userCredentials => {
                    const user = userCredentials.user;
                    console.log("Connecté avec : ", user.email);
                    // Si les identifiants ne sont pas ceux de l'admin, redirection vers "Home"
                    navigation.navigate("Home");
                })
                .catch(error => {
                    if (error.code === 'auth/user-not-found') {
                        alert('Aucun utilisateur trouvé pour cet email.');
                    } else if (error.code === 'auth/wrong-password') {
                        alert('Mot de passe incorrect pour cet email.');
                    } else {
                        alert(error.message);
                    }
                });
        }
    };

    const handleGoogleLogin = () => {
        auth.signInWithPopup(googleProvider)
          .then(result => {
            const user = result.user;
            console.log('Connected with Google:', user.email);
      
            // Extraire les informations de l'utilisateur
            const { displayName, email } = user;
            const [firstName, lastName] = displayName.split(' ');
      
            // Mettre à jour le profil de l'utilisateur avec le nom complet s'il n'est pas défini
            if (!user.displayName) {
              user.updateProfile({
                displayName: `${firstName} ${lastName}`
              });
            }
      
            // Écrire les informations de l'utilisateur dans la base de données
            writeUserData(user.uid, firstName, email);
      
            navigation.replace('Home');
          })
          .catch(error => alert(error.message));
      };


    const goToSignUp = () => {
        navigation.navigate('Register');
    };

    const passwordForgot = () => {
        navigation.navigate('Forgot');
    };

    return (
        <View style={styles.div}>
            <Image source={require('../images/logo.png')} style={styles.logo} />
            <View style={styles.bienvenue}>
                <Text style={styles.intro}>
                    Bienvenue chez Solutions Organix !
                </Text>            
                <Text style={styles.intro1}>
                    Votre partenaire de santé
                </Text>
            </View>
            <TextInput
                style={styles.email}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.mdp}
                placeholder="Mot de passe"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.bouton} onPress={handleLogin}>
                <Text style={styles.txt}>Se connecter</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.googleSignInButton} onPress={handleGoogleLogin}>
                <Text style={styles.googleSignInText}>Se connecter avec </Text>
                <Image source={googleLogo} style={styles.googleLogo} />
            </TouchableOpacity>

            <Text style={styles.signupTxt} onPress={goToSignUp}>
                Pas de compte ? Inscrivez-vous
            </Text>
            <TouchableOpacity style={styles.boutonMdp} onPress={passwordForgot}>
                <Text style={styles.mdpTxt}>Mot de passe oublié ?</Text>
            </TouchableOpacity>
        </View>
    );
};

function writeUserData(userId, firstName, email) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      prenom: firstName,
      email: email,
      age : 0
    });
  }

const styles = StyleSheet.create({
    div: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#011e36', // Dark blue background color from your logo
        alignItems: 'center'
    },
    bouton: {
        backgroundColor: '#38d2aa', // Button background color from your logo
        padding: 10,
        width: 160,
        alignItems: 'center',
        borderRadius: 10,
        // Removed marginLeft for center alignment
    },

    boutonMdp: {
        marginTop: 5,
        // Removed marginLeft for center alignment
    },
    mdpTxt: {
        color: '#03a770', // Text color from your logo
    },
    signupTxt: {
        color: '#03a770', // White text color for clickable text
    },
    txt: {
        color: '#ffffff', // White text color for the buttons
    },
    email: {
        width: 245,
        height: 45,
        textAlign: 'center',
        marginBottom: 25,
        borderBottomLeftRadius: 14,
        borderTopRightRadius: 14,
        backgroundColor: '#ffffff', // White background for input fields
    },
    mdp: {
        width: 245,
        height: 45,
        textAlign: 'center',
        marginBottom: 25,
        borderBottomLeftRadius: 14,
        borderTopRightRadius: 14,
        backgroundColor: '#ffffff', // Same as above for consistency
    },
    bienvenue: {
        marginBottom: 25,
        width: 350,
        // Removed marginLeft for center alignment
    },
    intro: {
        fontSize: 35,
        textAlign: 'center',
        color: '#03a770', // Text color from your logo
        fontWeight: 'bold',
        lineHeight: 35,
    },
    intro1: {
        fontSize: 17,
        textAlign: 'center',
        color: '#ffffff', // Text color from your logo
        fontWeight: 'lighter',
        fontStyle: 'italic',
        marginTop: 2,
    },
    logo: {
        height: 120, // Adjust the size as needed
        width: 120, // Adjust the size as needed
        resizeMode: 'contain', // This makes sure the logo is scaled properly
        alignSelf: 'center', // This aligns the logo to the center
    },
    googleSignInButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#38d2aa', // White background for the button
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 20,
    },
    googleLogo: {
        width: 18,
        height: 18,
        resizeMode: 'contain',
        marginLeft: 5,
    },
    googleSignInText: {
        color: '#ffffff', // A gray color for the text, you can change it as needed
    },
});



export default LoginScreen;