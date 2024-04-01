import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Button, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase'; // Ensure the correct path
import { getDatabase, ref, set } from "firebase/database";
import { Image } from 'react-native';


const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');

    const navigation = useNavigation();

    const signIn = () => {
        navigation.navigate('Login');
    };

    const handleSignUp = async () => {
        try {
            await auth.createUserWithEmailAndPassword(email, password);
            const user = auth.currentUser;
            writeUserData(user.uid, name, email, age);
            await user.updateProfile({
              displayName: name,
            });
        } catch (error) {
            console.error(error);
            alert("Erreur lors de l'inscription. Veuillez réessayer.");
        }
    };

    return (
        <View style={styles.div}>
            <Image source={require('../images/logo.png')} style={styles.logo} />
            <Text style={styles.intro}>
                Bienvenue dans la page d'inscription !
            </Text>
            <TextInput
                style={styles.input1}
                placeholder="Votre nom"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input1}
                placeholder="Votre age"
                value={age}
                onChangeText={setAge}
            />
            <TextInput
                style={styles.input1}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input1}
                placeholder="Mot de passe"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>S'inscrire</Text>
            </TouchableOpacity>
            <Text style={styles.switchText} onPress={signIn}>
                Déjà un compte ? Se connecter
            </Text>
        </View>
    );
};

function writeUserData(userId, firstName, email, age) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      name: firstName,
      email: email,
      age: age,
    });
}

const styles = StyleSheet.create({
    div: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#011e36', // Background color to match LoginScreen
        alignItems: 'center',
    },
    input1: {
        width: 245,
        height: 45,
        textAlign: 'center',
        marginBottom: 25,
        backgroundColor: '#ffffff', // White background for input fields
        borderBottomRightRadius: 14,
        borderTopLeftRadius: 14,
    },
    button: {
        backgroundColor: '#38d2aa', // Button background color to match LoginScreen
        padding: 10,
        width: 160,
        alignItems: 'center',
        borderRadius: 10,
    },
    buttonText: {
        color: '#ffffff', // White text color for buttons
    },
    intro: {
        marginBottom: 20,
        fontSize: 20,
        textAlign: 'center',
        color: '#03a770', // Text color to match LoginScreen
        fontWeight: 'bold',
    },
    switchText: {
        color: '#03a770', // Text color to match LoginScreen, for switching between login and registration
        marginTop: 15,
    },
    logo: {
        height: 120, // Adjust the size as needed
        width: 120, // Adjust the size as needed
        resizeMode: 'contain', // This makes sure the logo is scaled properly
        alignSelf: 'center', // This aligns the logo to the center
    }
});

export default Register;
