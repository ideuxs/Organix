import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase'; // Assurez-vous que le chemin d'import est correct

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

    const goToSignUp = () => {
        navigation.navigate('Register');
    };

    const passwordForgot = () => {
        navigation.navigate('Forgot');
    };

    return (
        <View style={styles.div}>
            <View style={styles.bienvenue}>
                <Text style={styles.intro}>
                    Bienvenue dans la page de connexion !
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
            <TouchableOpacity style={styles.boutonInscr} onPress={goToSignUp}>
                <Text style={styles.text}>S'inscrire</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.boutonMdp} onPress={passwordForgot}>
                <Text style={styles.mdpTxt}>Mot de passe oublié ?</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    div: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#6c2919',
        alignItems: 'center'
    },
    bouton: {
        backgroundColor: 'black',
        padding: 10,
        width: 160,
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 40,
        marginTop: 20,
        borderColor: '#0782F9',
    },
    boutonInscr: {
        borderColor: '#0782F9',
        padding: 10,
        marginLeft: 40,
        borderRadius: 10,
        backgroundColor: 'white',
        width: 160,
        marginTop: 15,
        alignItems: 'center',
    },
    boutonMdp: {
        marginLeft: 65,
        marginTop: 25,
    },
    mdpTxt: {
        color: 'white',
    },
    txt: {
        color: 'white',
    },
    text: {
        color: 'black',
    },
    email: {
        width: 245,
        height: 45,
        textAlign: 'center',
        marginBottom: 25,
        borderBottomLeftRadius: 14,
        borderTopRightRadius: 14,
        backgroundColor: 'white'
    },
    mdp: {
        width: 245,
        height: 45,
        textAlign: 'center',
        marginBottom: 25,
        borderBottomLeftRadius: 14,
        borderTopRightRadius: 14,
        backgroundColor: 'white'
    },
    bienvenue: {
        marginBottom: 80,
        width: 210,
    },
    intro: {
        fontSize: 27,
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
    }
});

export default LoginScreen;
