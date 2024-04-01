import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState }from 'react';
import { StyleSheet, TextInput, View, Button, Text, TouchableOpacity } from 'react-native';
import {auth} from '../firebase'
import { getDatabase, ref, set } from "firebase/database";

const Register = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('');
    const [age, setAge] = useState('');

    const navigation = useNavigation()

    const signIn = () => {
        navigation.navigate('Login');
    };
    
    const handleSignUp = async () => {
        /*auth.createUserWithEmailAndPassword(email, password)
        .then(userCrendentials => {
            const user = userCrendentials.user;
            console.log(email);
        })
        .catch(error => {
            
        });*/

        try {
            await auth.createUserWithEmailAndPassword(email, password);
            
            const user = auth.currentUser;
            writeUserData(user.uid, name, email, age);
            // Stocker le nom dans le profil utilisateur
            await user.updateProfile({
              displayName: name,
            });
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                // L'adresse e-mail est déjà utilisée, informez l'utilisateur
                alert('Cette adresse e-mail est déjà associée à un compte existant.');
        } else {
                // Une autre erreur s'est produite, affichez le message d'erreur générique
                console.log(error);
                alert("Veuillez saisir quelque chose !");
            }
          }

        
    };
    return (
    <View style={styles.div}>
        <View style={styles.bienvenue}>
            <Text style={styles.intro}> 
                Bienvenue dans la page d'inscription !
            </Text>
        </View>
        <View >
        <TextInput style={styles.email}
            placeholder="Votre nom"
            value={name}
            onChangeText={(text) => setName(text)}
        />
        <TextInput style={styles.email}
            placeholder="Votre age"
            value={age}
            onChangeText={(text) => setAge(text)}
        />
        <TextInput style={styles.email}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        />
        <TextInput style={styles.mdp}
            placeholder="Mot de passe"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.boutonInscr} onPress={handleSignUp}>
            <Text style={styles.text}>S'inscrire</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.boutonCo} onPress={signIn}>
            <Text>Se connecter</Text>
        </TouchableOpacity>
        </View>
    </View>
    )
}

function writeUserData(userId, firstName, email, age) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      prenom: firstName,
      email: email, 
      age: age
    });
  }



const styles = StyleSheet.create({
    div: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#47BDC1',

    },
    text:{
        color:'white',
    },
    phraseAccueil: {
        fontSize: 25,
    },
    deco: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    boutonCo: {
        borderColor:'#0782F9',
        padding:10,
        marginLeft: 40,
        borderRadius:10,
        backgroundColor:'white',
        width:160,
        marginTop:15,
        alignItems:'center',
    },
    boutonInscr:{
        borderColor:'#0782F9',
        padding:10,
        marginLeft: 40,
        borderRadius:10,
        backgroundColor:'black',
        width:160,
        marginTop:15,
        alignItems:'center',
    },
    email:{
        width: 245,
        
        fontStyle:'italic',
        height: 45,
        textAlign:'center',
        marginBottom: 25,
        borderBottomLeftRadius: 14,
        borderTopRightRadius:14,
        backgroundColor:'white'
    },
    mdp:{
        fontStyle:'italic',
        width: 245,
        height: 45,
        textAlign:'center',
        marginBottom: 25,
        borderBottomLeftRadius: 14,
        borderTopRightRadius:14,
        backgroundColor:'white'
    },
    bienvenue:{
        marginBottom: 80,
        width: 210,   
    },
    intro:{
        fontSize : 27,
        textAlign:'center',
        color:'white',
        fontWeight:'bold',
    }

});

export default Register;