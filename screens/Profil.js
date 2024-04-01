import { Text, View, StyleSheet, TouchableOpacity,Alert} from 'react-native'
import React, { Component } from 'react'
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';


const Profil= () => {
    const user = auth.currentUser;

    const confirmLogout = () => {
        // Alert.alert(
        //     'Se déconnecter',
        //     'Êtes-vous sûr de vouloir vous déconnecter ?',
        //     [
        //         {
        //             text: 'Annuler',
        //             onPress: () => {},
        //             style: 'cancel',
        //         },
        //         {
        //             text: 'Confirmer',
        //             onPress: () => {
        //                 handleSignOut();
        //             },
        //         },
        //     ],
        // );

        auth.signOut().then(() => navigation.replace('Login'));
    };

    const navigation = useNavigation();
    const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('Login');
      })
      .catch((error) => alert(error.message));
  };
    return (
      <View style={styles.container}>
        <View style = {styles.phraseAccueil}>
            <Text style = {styles.perso}>Bonjour, {user.displayName} 😊</Text>
        </View>
        <View style = {styles.deco}>
        <TouchableOpacity style={styles.button} onPress={confirmLogout}>
            <Text style={{color:'white'}}>Se deconnecter</Text>
      </TouchableOpacity>
        </View>
      </View>

    )
  
}

const styles = StyleSheet.create ({
    container:{
        flex: 1,
        backgroundColor:'grey',
    },
    phraseAccueil:{
        flexDirection: 'row', // Arrange elements horizontally
        justifyContent: 'flex-start', // Align content to the left
        alignItems: 'center', // Align vertically
        width: '100%', // Span the full width
        padding: 10, // Add some padding
        backgroundColor: '#f0f0f0',
        marginTop:55,
    },
    perso:{
        fontSize: 40,
        fontWeight: 'bold',
        
    },
    deco:{
        position: 'absolute', // Position absolutely to fix at bottom
        bottom: 0, // Anchor bottom edge to screen bottom
        left: 0, // Anchor left edge to screen left
        right: 0, // Anchor right edge to screen right
        justifyContent: 'center', // Center button vertically
        alignItems: 'center', // Center button horizontally (optional)
        padding: 10,
    },
    button: {
        alignItems: 'center',
        width: '50%',
        backgroundColor: '#0782F9',
        padding: 15,
        borderRadius: 10,
    },
});


export default Profil;