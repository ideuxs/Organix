import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState }from 'react';
import { StyleSheet, TextInput, View, Button, Text, TouchableOpacity } from 'react-native';
import {auth} from '../firebase'


const LoginScreen =  () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()

    useEffect(() => {
        const unsuscribe = auth.onAuthStateChanged(user =>{
            if(user){
                navigation.navigate("Home");
            }
        })
        return unsuscribe;
    })

    const goToSignUp = () => {
        navigation.navigate('Register');
       /* auth.createUserWithEmailAndPassword(email, password)
        .then(userCrendentials => {
            const user = userCrendentials.user;
            console.log(email);
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                // L'adresse e-mail est déjà utilisée, informez l'utilisateur
                alert('Cette adresse e-mail est déjà associée à un compte existant.');
            } else {
                // Une autre erreur s'est produite, affichez le message d'erreur générique
                alert("Veuillez saisir quelque chose !");
            }
        });*/
    };

    const handleLogin = () => {
        auth
        .signInWithEmailAndPassword(email,password)
        .then(userCrendentials => {
            const user = userCrendentials.user;
            console.log("Connecté avec : ",user.email);
        })
    }

    const passwordForgot = () => {
        navigation.navigate('Forgot');
    }

    return (
        <View style={styles.div}>
            <View style={styles.bienvenue}>
                <Text style={styles.intro}> 
                    Bienvenue dans la page de connexion !
                </Text>
            </View>
            <View >
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
    bouton:{
        backgroundColor: 'black',
        padding: 10,
        width:160,
        alignItems:'center',
        borderRadius:10,
        marginLeft: 40,
        marginTop: 20,
        borderColor:'#0782F9',

    },
    boutonInscr:{
        borderColor:'#0782F9',
        padding:10,
        marginLeft: 40,
        borderRadius:10,
        backgroundColor:'white',
        width:160,
        marginTop:15,
        alignItems:'center',
    },
    boutonMdp:{
      marginLeft:65,
      marginTop: 25,
    },
    mdpTxt:{
        color:'white',
    },
    txt:{
        color:'white',
    },
    text:{
        color: 'black',
    },
    email:{
        width: 245,
        
        //fontStyle:'italic',
        height: 45,
        textAlign:'center',
        marginBottom: 25,
        borderBottomLeftRadius: 14,
        borderTopRightRadius:14,
        backgroundColor:'white'
    },
    mdp:{
        //fontStyle:'italic',
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

export default LoginScreen;